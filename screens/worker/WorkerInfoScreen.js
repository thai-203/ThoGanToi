import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator
} from "react-native"
import { styles } from "../../styles/additional"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import WorkerService from "../../services/workerService"
import UserService from "../../services/userService"

const WorkerInfoScreen = ({ currentUser, onTabPress, onBack }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [workerInfo, setWorkerInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        if (!currentUser?.id) return

        const allWorkers = await WorkerService.getAllWorkers()
        const worker = allWorkers.find(w => String(w.userId) === String(currentUser.id))
        if (!worker) return

        const user = await UserService.getUserById(worker.userId)

        const totalIncome = 2400000 // fake data

        setWorkerInfo({
          ...worker,
          email: user?.email,
          specialty: user?.specialty,
          completedOrders: user?.completedOrders,
          certificate: user?.certificate,
          area: user?.area,
          income: totalIncome
        })
      } catch (err) {
        // Do nothing for now
      } finally {
        setLoading(false)
      }
    }
    fetchWorkerData()
  }, [currentUser])

  const handleSave = async () => {
    try {
      await WorkerService.updateWorker(workerInfo.id, {
        name: workerInfo.name,
        phone: workerInfo.phone,
        price: workerInfo.price,
        experience: workerInfo.experience,
        status: workerInfo.status
      })
      setIsEditing(false)
    } catch (err) {
      // Handle error
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const updateInfo = (field, value) => {
    setWorkerInfo((prev) => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#10b981" style={{ marginTop: 20 }} />
    )
  }

  if (!workerInfo) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>Không tìm thấy thông tin thợ.</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thông tin thợ</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? "Hủy" : "Sửa"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.workerInfoContent}>
        <View style={styles.workerInfoAvatar}>
          <Text style={styles.avatarIcon}>{workerInfo.avatar || "👨‍🔧"}</Text>
          <Text style={styles.workerInfoName}>{workerInfo.name}</Text>
          <Text style={styles.workerInfoSpecialty}>{workerInfo.specialty}</Text>
          <View style={styles.workerInfoRating}>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>{workerInfo.rating} ({workerInfo.reviews} đánh giá)</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Họ tên</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.name}
                onChangeText={(text) => updateInfo("name", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.name}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.phone}
                onChangeText={(text) => updateInfo("phone", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.phone}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{workerInfo.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Khu vực</Text>
            <Text style={styles.infoValue}>{workerInfo.area}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông tin nghề nghiệp</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Chuyên môn</Text>
            <Text style={styles.infoValue}>{workerInfo.specialty}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kinh nghiệm</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.experience}
                onChangeText={(text) => updateInfo("experience", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.experience}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giá theo giờ</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.price}
                onChangeText={(text) => updateInfo("price", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.price}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Chứng chỉ</Text>
            <Text style={styles.infoValue}>{workerInfo.certificate}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thống kê</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{workerInfo.completedOrders || 0}</Text>
              <Text style={styles.statLabel}>Đơn hoàn thành</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{workerInfo.rating || 0}</Text>
              <Text style={styles.statLabel}>Đánh giá TB</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Tỷ lệ hoàn thành</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{(workerInfo.income || 0).toLocaleString()}đ</Text>
              <Text style={styles.statLabel}>Thu nhập tháng</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Trạng thái</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sẵn sàng nhận việc</Text>
            <Switch
              value={workerInfo.status === true}
              onValueChange={async (val) => {
                try {
                  await WorkerService.updateWorker(workerInfo.id, { status: val })
                  setWorkerInfo({ ...workerInfo, status: val })
                } catch (err) {
                  // Handle error
                }
              }}
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={workerInfo.status ? "#ffffff" : "#f3f4f6"}
            />
          </View>
        </View>

        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelEditButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelEditButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveEditButton}
              onPress={handleSave}
            >
              <Text style={styles.saveEditButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  )
}

export default WorkerInfoScreen
