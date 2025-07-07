import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native"
import { styles } from "../../styles/styles"
import { workerOrders } from "../../data/mockData"
import { statusConfig } from "../../constants/statusConfig"
import { WorkerBottomNav } from "../../components/BottomNavigation"

const WorkerDashboardScreen = ({ onTabPress, onOrderPress }) => {
  const pendingOrders = workerOrders.filter((order) => order.status === "pending").length
  const acceptedOrders = workerOrders.filter((order) => order.status === "accepted").length
  const completedOrders = workerOrders.filter((order) => order.status === "completed").length
  const totalEarnings = workerOrders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + Number.parseInt(order.price.replace(/[^\d]/g, "")), 0)

  const recentOrders = workerOrders.slice(0, 3)

  const renderRecentOrder = ({ item }) => {
    const status = statusConfig[item.status]
    return (
      <TouchableOpacity style={styles.recentOrderCard} onPress={() => onOrderPress(item)}>
        <View style={styles.recentOrderHeader}>
          <Text style={styles.recentOrderCustomer}>{item.customer}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
        <Text style={styles.recentOrderService}>{item.service}</Text>
        <Text style={styles.recentOrderTime}>
          📅 {item.date} - {item.time}
        </Text>
        <Text style={styles.recentOrderPrice}>💰 {item.price}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.workerHeader}>
          <View style={styles.workerInfo}>
            <Text style={styles.workerAvatar}>👨‍🔧</Text>
            <View>
              <Text style={styles.workerName}>Thợ Minh Tuấn</Text>
              <Text style={styles.workerSpecialty}>Thợ điện chuyên nghiệp</Text>
              <View style={styles.workerRating}>
                <Text style={styles.rating}>⭐ 4.8</Text>
                <Text style={styles.reviews}>(127 đánh giá)</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⏳</Text>
            <Text style={styles.statNumber}>{pendingOrders}</Text>
            <Text style={styles.statLabel}>Chờ xác nhận</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔧</Text>
            <Text style={styles.statNumber}>{acceptedOrders}</Text>
            <Text style={styles.statLabel}>Đang làm</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statNumber}>{completedOrders}</Text>
            <Text style={styles.statLabel}>Hoàn thành</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statNumber}>{(totalEarnings / 1000).toFixed(0)}K</Text>
            <Text style={styles.statLabel}>Thu nhập</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => onTabPress("orders")}>
              <Text style={styles.actionIcon}>📋</Text>
              <Text style={styles.actionText}>Đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📅</Text>
              <Text style={styles.actionText}>Lịch làm việc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💰</Text>
              <Text style={styles.actionText}>Thu nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>⭐</Text>
              <Text style={styles.actionText}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrdersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
            <TouchableOpacity onPress={() => onTabPress("orders")}>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentOrders}
            renderItem={renderRecentOrder}
            scrollEnabled={false}
            contentContainerStyle={styles.recentOrdersList}
          />
        </View>
      </ScrollView>
      <WorkerBottomNav onTabPress={onTabPress} activeTab="dashboard" />
    </SafeAreaView>
  )
}

export default WorkerDashboardScreen
