import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, Switch } from "react-native"
import { styles } from "../../styles/styles"
import { workerMenuItems } from "../../data/mockData"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import WorkerEditProfileScreen from "./WorkerEditProfileScreen"
import FirebaseService from "../../services/firebaseService"

const WorkerProfileScreen = ({ onTabPress, onLogout, onMenuPress, currentUser }) => {
  // fallback nếu chưa có currentUser
  const userInfo = currentUser || {
    id: "",
    name: "N/A",
    phone: "N/A",
    email: "N/A",
    specialty: "N/A",
    completedOrders: 0,
    rating: 0,
    experience: "0",
    area: "N/A",
    status: false,
  }

  const [isAvailable, setIsAvailable] = useState(userInfo.status === true)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const handleToggleAvailability = async (value) => {
    setIsAvailable(value)
    try {
      await FirebaseService.update(`workers/${userInfo.id}`, {
        status: value
      })
      console.log("✅ Đã cập nhật trạng thái workers trên Firebase:", value)
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật trạng thái workers:", err)
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái, vui lòng thử lại.")
    }
  }

  const handleMenuPress = (action) => {
    if (onMenuPress) {
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
    console.log("Đã lưu hồ sơ:", newUserInfo)
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
            onValueChange={handleToggleAvailability}
            trackColor={{ false: "#e5e7eb", true: "#10b981" }}
            thumbColor={isAvailable ? "#ffffff" : "#f3f4f6"}
          />
        </View>

        {/* Stats */}
        <View style={styles.workerStatsContainer}>
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.rating || "0"}</Text>
            <Text style={styles.workerStatLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.completedOrders || "0"}</Text>
            <Text style={styles.workerStatLabel}>Đơn hoàn thành</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>{userInfo.experience || "0"}</Text>
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
