import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { styles } from "../../styles/styles"
import { adminStats, adminMenuItems } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"

const AdminDashboardScreen = ({ onTabPress, onMenuPress, currentUser }) => {
  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.adminMenuCard} onPress={() => onMenuPress && onMenuPress(item.screen)}>
      <Text style={styles.adminMenuIcon}>{item.icon}</Text>
      <Text style={styles.adminMenuTitle}>{item.title}</Text>
      <Text style={styles.adminMenuDescription}>
        {item.action === "users" && "Quản lý tài khoản người dùng"}
        {item.action === "services" && "Quản lý danh mục dịch vụ"}
        {item.action === "orders" && "Theo dõi đơn hàng"}
        {item.action === "reports" && "Xem báo cáo thống kê"}
        {item.action === "settings" && "Cấu hình hệ thống"}
        {item.action === "support" && "Hỗ trợ khách hàng"}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.adminHeader}>
        <View>
          <Text style={styles.adminTitle}>Admin Dashboard</Text>
          <Text style={styles.adminSubtitle}>Xin chào, {currentUser?.name || "Admin"}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.adminStatsGrid}>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>👥</Text>
            <Text style={styles.adminStatNumber}>{adminStats.totalUsers}</Text>
            <Text style={styles.adminStatLabel}>Tổng người dùng</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>🔧</Text>
            <Text style={styles.adminStatNumber}>{adminStats.totalWorkers}</Text>
            <Text style={styles.adminStatLabel}>Thợ sửa chữa</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>📋</Text>
            <Text style={styles.adminStatNumber}>{adminStats.totalOrders}</Text>
            <Text style={styles.adminStatLabel}>Tổng đơn hàng</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>💰</Text>
            <Text style={styles.adminStatNumber}>{(adminStats.totalRevenue / 1000000).toFixed(1)}M</Text>
            <Text style={styles.adminStatLabel}>Doanh thu (VNĐ)</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thống kê nhanh</Text>
          <View style={styles.quickStatsContainer}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{adminStats.completedOrders}</Text>
              <Text style={styles.quickStatLabel}>Đơn hoàn thành</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{adminStats.pendingOrders}</Text>
              <Text style={styles.quickStatLabel}>Đơn chờ xử lý</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{(adminStats.monthlyRevenue / 1000000).toFixed(1)}M</Text>
              <Text style={styles.quickStatLabel}>Doanh thu tháng</Text>
            </View>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quản lý hệ thống</Text>
          <View style={styles.adminMenuGrid}>
            {adminMenuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.adminMenuCard}
                onPress={() => {
                  console.log("Menu pressed:", item.screen)
                  if (onMenuPress) {
                    onMenuPress(item.screen)
                  }
                }}
              >
                <Text style={styles.adminMenuIcon}>{item.icon}</Text>
                <Text style={styles.adminMenuTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <AdminBottomNav onTabPress={onTabPress} activeTab="adminDashboard" />
    </SafeAreaView>
  )
}

export default AdminDashboardScreen
