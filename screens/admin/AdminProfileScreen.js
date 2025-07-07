import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native"
import { styles } from "../../styles/styles"
import { adminMenuItems, adminStats } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"

const AdminProfileScreen = ({ onTabPress, onLogout, currentUser, onMenuPress }) => {
  const handleMenuPress = (screen) => {
    if (screen) {
      onMenuPress(screen)
    } else {
      Alert.alert("Thông báo", "Chức năng đang được phát triển")
    }
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
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileAvatar}>👨‍💼</Text>
            <View>
              <Text style={styles.userName}>{currentUser?.name || "Admin"}</Text>
              <Text style={styles.userPhone}>{currentUser?.phone}</Text>
              <Text style={styles.userPhone}>{currentUser?.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{adminStats.totalUsers}</Text>
            <Text style={styles.statLabel}>Người dùng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{adminStats.totalOrders}</Text>
            <Text style={styles.statLabel}>Đơn hàng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{(adminStats.totalRevenue / 1000000).toFixed(1)}M</Text>
            <Text style={styles.statLabel}>Doanh thu</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {adminMenuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item.screen)}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.promoContainer}>
          <View style={styles.promoCard}>
            <Text style={styles.promoIcon}>⚡</Text>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Hệ thống hoạt động tốt</Text>
              <Text style={styles.promoText}>Tất cả dịch vụ đang hoạt động bình thường</Text>
            </View>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      <AdminBottomNav onTabPress={onTabPress} activeTab="adminProfile" />
    </SafeAreaView>
  )
}

export default AdminProfileScreen
