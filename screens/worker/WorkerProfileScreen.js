import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, Switch, ActivityIndicator } from "react-native"
import { styles } from "../../styles/styles"
import { workerMenuItems } from "../../data/mockData"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import WorkerEditProfileScreen from "./WorkerEditProfileScreen"
import WorkerService from "../../services/workerService"
import ServiceService from "../../services/serviceService"
import TransactionService from "../../services/transactionService"

const WorkerProfileScreen = ({ currentUser, onTabPress, onLogout, onMenuPress }) => {
  const [isAvailable, setIsAvailable] = useState(true)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState(null)
  const [monthlyIncome, setMonthlyIncome] = useState(0)

  useEffect(() => {
    const loadWorkerInfo = async () => {
      if (!currentUser?.id) {
        return
      }
      setLoading(true)
      try {
        const [allWorkers, allServices] = await Promise.all([
          WorkerService.getAllWorkers(),
          ServiceService.getAllServices()
        ])
        const worker = allWorkers.find(w => String(w.userId) === String(currentUser.id))

        if (worker) {
          const serviceNames = (worker.serviceId || [])
            .map(id => {
              const svc = allServices.find(s => String(s.id) === String(id))
              return svc ? svc.name : `#${id}`
            })
            .join(", ")

          setUserInfo({
            id: worker.id,
            name: worker.name,
            phone: worker.phone,
            specialty: serviceNames || "N/A",
            experience: worker.experience,
            hourlyRate: worker.price,
            address: worker.area,
            rating: worker.rating,
            completedOrders: worker.reviews,
            isAvailable: worker.status === "active" || worker.status === true,
          })
          setIsAvailable(worker.status === "active" || worker.status === true)

          // 🎯 Tính thu nhập tháng này
          const now = new Date()
          const transactions = await TransactionService.getTransactionsByWorkerAndMonth(
            worker.id, now.getMonth() + 1, now.getFullYear()
          )
          const income = transactions.reduce((acc, tx) => acc + (tx.workerReceived || 0), 0)
          setMonthlyIncome(income)
        } else {
          console.log("⚠️ Không tìm thấy worker tương ứng userId")
        }
      } catch (err) {
        console.error("❌ Lỗi load worker:", err)
      } finally {
        setLoading(false)
      }
    }

    loadWorkerInfo()
  }, [currentUser])

  const handleToggleAvailability = async (value) => {
    setIsAvailable(value)
    if (!userInfo) return
    try {
      await WorkerService.updateWorker(userInfo.id, { status: value ? true : false })
    } catch (err) {
      console.error("❌ Error updating availability:", err)
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái làm việc.")
    }
  }

  const handleSaveProfile = (newUserInfo) => {
    setUserInfo(newUserInfo)
  }

  const handleMenuPress = (action) => {
    if (onMenuPress) {
      onMenuPress(action)
    } else {
      Alert.alert("Thông báo", `Chức năng ${action} đang phát triển.`)
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
      </SafeAreaView>
    )
  }

  if (!userInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>Không tìm thấy thông tin thợ.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.workerProfileHeader}>
          <View style={styles.workerProfileInfo}>
            <Text style={styles.workerProfileAvatar}>👨‍🔧</Text>
            <View>
              <Text style={styles.workerProfileName}>{userInfo.name}</Text>
              <Text style={styles.workerProfilePhone}>{userInfo.phone}</Text>
              <Text style={styles.workerProfileSpecialty}>{userInfo.specialty}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => setShowEditProfile(true)}>
            <Text style={styles.editButtonText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={styles.availabilityInfo}>
            <Text style={styles.availabilityTitle}>Trạng thái làm việc</Text>
            <Text style={styles.availabilitySubtitle}>
              {isAvailable ? "Đang sẵn sàng nhận đơn" : "Tạm ngưng nhận đơn"}
            </Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={handleToggleAvailability}
            trackColor={{ false: "#e5e7eb", true: "#10b981" }}
            thumbColor={isAvailable ? "#ffffff" : "#f3f4f6"}
          />
        </View>

        <View style={styles.workerStatsContainer}>
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.rating ?? "-"}</Text>
            <Text style={styles.workerStatLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.completedOrders ?? "0"}</Text>
            <Text style={styles.workerStatLabel}>Đơn hoàn thành</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.experience ?? "-"}</Text>
            <Text style={styles.workerStatLabel}>Kinh nghiệm</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {workerMenuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item.action)}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.earningsContainer}>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsIcon}>💰</Text>
            <View style={styles.earningsContent}>
              <Text style={styles.earningsTitle}>Thu nhập tháng này</Text>
              <Text style={styles.earningsAmount}>
                {monthlyIncome.toLocaleString("vi-VN")}đ
              </Text>
              
            </View>
            <TouchableOpacity style={styles.earningsButton} onPress={() => handleMenuPress("workerIncome")}>
              <Text style={styles.earningsButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => {
          Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
            { text: "Hủy", style: "cancel" },
            { text: "Đăng xuất", style: "destructive", onPress: onLogout },
          ])
        }}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      <WorkerEditProfileScreen
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
        userInfo={userInfo}
      />

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  )
}

export default WorkerProfileScreen
