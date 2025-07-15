import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native"
import { styles } from "../../styles/styles"
import { statusConfig } from "../../constants/statusConfig"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import { getCurrentUserId } from "../../utils/auth"
import OrderService from "../../services/orderService"
import WorkerService from "../../services/workerService"
import ServiceService from "../../services/serviceService"

const WorkerDashboardScreen = ({ onTabPress, onOrderPress }) => {
  const [orders, setOrders] = useState([])
  const [workerInfo, setWorkerInfo] = useState(null)

  useEffect(() => {
    const fetchAndListenOrders = async () => {
      try {
        const userId = await getCurrentUserId()
        const [worker, allServices] = await Promise.all([
          WorkerService.getWorkerByUserId(userId),
          ServiceService.getAllServices(),
        ])

        if (!worker || !worker.id) {
          console.warn("Không tìm thấy thông tin worker tương ứng với userId:", userId)
          setOrders([])
          return
        }

        // Xử lý specialty từ serviceId
        const serviceNames = (worker.serviceId || [])
          .map((id) => {
            const svc = allServices.find((s) => String(s.id) === String(id))
            return svc ? svc.name : `#${id}`
          })
          .join(", ")

        setWorkerInfo({
          ...worker,
          specialty: serviceNames,
          rating: worker.rating || "4.8",
          totalReviews: worker.reviews || 0,
        })

        const unsubscribe = OrderService.listenToWorkerOrders(worker.id, (workerOrders) => {
          const sortedOrders = workerOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
          setOrders(sortedOrders)
        })

        return unsubscribe
      } catch (error) {
        console.error("Lỗi khi fetch và listen orders:", error)
      }
    }

    let unsubscribeFn
    fetchAndListenOrders().then((unsub) => {
      if (typeof unsub === "function") {
        unsubscribeFn = unsub
      }
    })

    return () => {
      if (unsubscribeFn) unsubscribeFn()
    }
  }, [])

  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const acceptedOrders = orders.filter((o) => o.status === "accepted").length
  const completedOrders = orders.filter((o) => o.status === "completed").length
  const totalEarnings = orders
  .filter((o) => o.status === "completed")
  .reduce((sum, o) => {
    const rawPrice = o.price?.toLowerCase?.().trim()
    const price =
      rawPrice === "thỏa thuận"
        ? 0
        : Number.parseInt(rawPrice.replace(/[^\d]/g, ""), 10) || 0
    return sum + price
  }, 0)

  const recentOrders = orders.slice(0, 3)

  const renderRecentOrder = ({ item }) => {
    const status = statusConfig[item.status] || {}
    return (
      <TouchableOpacity style={styles.recentOrderCard} onPress={() => onOrderPress(item)}>
        <View style={styles.recentOrderHeader}>
          <Text style={styles.recentOrderCustomer}>{item.customer}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
        <Text style={styles.recentOrderService}>{item.service}</Text>
        <Text style={styles.recentOrderTime}>📅 {item.date} - {item.time}</Text>
        <Text style={styles.recentOrderPrice}>💰 {item.price}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Worker Header */}
        <View style={styles.workerHeader}>
          <View style={styles.workerInfo}>
            <Text style={styles.workerAvatar}>👨‍🔧</Text>
            <View>
              <Text style={styles.workerName}>{workerInfo?.name || "Thợ chưa đặt tên"}</Text>
              <Text style={styles.workerSpecialty}>{workerInfo?.specialty || "Chuyên ngành chưa xác định"}</Text>
              <View style={styles.workerRating}>
                <Text style={styles.rating}>⭐ {workerInfo?.rating}</Text>
                <Text style={styles.reviews}>({workerInfo?.totalReviews} đánh giá)</Text>
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
            keyExtractor={(item, index) => item.id || index.toString()}
          />
        </View>
      </ScrollView>

      <WorkerBottomNav onTabPress={onTabPress} activeTab="dashboard" />
    </SafeAreaView>
  )
}

export default WorkerDashboardScreen
