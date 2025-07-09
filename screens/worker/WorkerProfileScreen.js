import { useState, useEffect } from "react"
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, ActivityIndicator, Alert } from "react-native"
import UserService from "../../services/userService"
import FirebaseService from "../../services/firebaseService"
import { styles } from "../../styles/styles"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import WorkerEditProfileScreen from "./WorkerEditProfileScreen"
import { workerMenuItems } from "../../data/mockData"

const WorkerProfileScreen = ({ onTabPress, onLogout, onMenuPress, currentUser }) => {
  const [isAvailable, setIsAvailable] = useState(true)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [workerId, setWorkerId] = useState(null)

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       setLoading(true)
  //       if (currentUser?.id) {
  //         const data = await UserService.getUserById(currentUser.id)
  //         setUserInfo(data)
  
  //         const workers = await FirebaseService.readAll("workers")
  //         console.log("Workers loaded:", workers)
  //         console.log("Looking for userId:", data.id)
  //         const worker = workers.find(w => String(w.userId) === String(data.id))
  //         if (worker) {
  //           setWorkerId(worker.id)
  //           setIsAvailable(worker.status ?? true)
  //           console.log("Matched worker:", worker)
  //         } else {
  //           console.log("No matching worker found for userId:", data.id)
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching worker profile:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchProfile()
  // }, [currentUser])
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        if (currentUser?.id) {
          const data = await UserService.getUserById(currentUser.id)
          setUserInfo(data)
  
          const workers = await FirebaseService.readAll("workers")
          const worker = workers.find(w => String(w.userId) === String(data.id))
          if (worker) {
            setWorkerId(worker.id)
            setIsAvailable(worker.status ?? true)
          }
        }
      } catch (error) {
        console.error("Error fetching worker profile:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [currentUser])
  
  

  const handleAvailabilityChange = async (value) => {
    console.log("Toggle clicked:", value)
    setIsAvailable(value)
    try {
      console.log("Current workerId:", workerId)
      if (workerId) {
        await FirebaseService.update(`workers/${workerId}`, { status: value })
        console.log("Updated status in workers:", value)
      } else {
        console.log("workerId is not set!")
      }
    } catch (error) {
      console.error("Error updating worker status:", error)
    }
  }
  

  const handleMenuPress = (action) => {
    if (action && onMenuPress) {
      onMenuPress(action)
    } else {
      Alert.alert("Thông báo", `Chức năng ${action} đang được phát triển`)
    }
  }

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: onLogout },
    ])
  }

  const handleSaveProfile = (newUserInfo) => {
    setUserInfo(newUserInfo)
  }

  if (loading || !userInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
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

        {/* Availability Toggle */}
        <View style={styles.availabilityContainer}>
          <View style={styles.availabilityInfo}>
            <Text style={styles.availabilityTitle}>Trạng thái làm việc</Text>
            <Text style={styles.availabilitySubtitle}>
              {isAvailable ? "Đang sẵn sàng nhận đơn" : "Tạm ngưng nhận đơn"}
            </Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={handleAvailabilityChange}
            trackColor={{ false: "#e5e7eb", true: "#10b981" }}
            thumbColor={isAvailable ? "#ffffff" : "#f3f4f6"}
          />
        </View>

        {/* Stats */}
        <View style={styles.workerStatsContainer}>
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.rating ?? "4.8"}</Text>
            <Text style={styles.workerStatLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.completedOrders ?? "0"}</Text>
            <Text style={styles.workerStatLabel}>Đơn hoàn thành</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.experience ?? "0"}</Text>
            <Text style={styles.workerStatLabel}>Năm kinh nghiệm</Text>
          </View>
        </View>

        {/* Menu */}
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

        {/* Earnings Summary */}
        <View style={styles.earningsContainer}>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsIcon}>💰</Text>
            <View style={styles.earningsContent}>
              <Text style={styles.earningsTitle}>Thu nhập tháng này</Text>
              <Text style={styles.earningsAmount}>2.450.000đ</Text>
              <Text style={styles.earningsSubtext}>+15% so với tháng trước</Text>
            </View>
            <TouchableOpacity style={styles.earningsButton} onPress={() => handleMenuPress("income")}>
              <Text style={styles.earningsButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
