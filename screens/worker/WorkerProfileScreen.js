import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, Switch } from "react-native"
import { styles } from "../../styles/styles"
import { workerMenuItems } from "../../data/mockData"
import { WorkerBottomNav } from "../../components/BottomNavigation"

const WorkerProfileScreen = ({ onTabPress, onLogout }) => {
  const [isAvailable, setIsAvailable] = useState(true)

  const handleMenuPress = (action) => {
    Alert.alert("Thông báo", `Chức năng ${action} đang được phát triển`)
  }

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: onLogout },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.workerProfileHeader}>
          <View style={styles.workerProfileInfo}>
            <Text style={styles.workerProfileAvatar}>👨‍🔧</Text>
            <View>
              <Text style={styles.workerProfileName}>Thợ Minh Tuấn</Text>
              <Text style={styles.workerProfilePhone}>0901234567</Text>
              <Text style={styles.workerProfileSpecialty}>Thợ điện chuyên nghiệp</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
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
            onValueChange={setIsAvailable}
            trackColor={{ false: "#e5e7eb", true: "#10b981" }}
            thumbColor={isAvailable ? "#ffffff" : "#f3f4f6"}
          />
        </View>

        {/* Stats */}
        <View style={styles.workerStatsContainer}>
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>4.8</Text>
            <Text style={styles.workerStatLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>127</Text>
            <Text style={styles.workerStatLabel}>Đơn hoàn thành</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.workerStatItem}>
            <Text style={styles.workerStatNumber}>5</Text>
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
            <TouchableOpacity style={styles.earningsButton}>
              <Text style={styles.earningsButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  )
}

export default WorkerProfileScreen
