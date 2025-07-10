import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, ActivityIndicator } from "react-native"
import { styles } from "../../styles/styles"
// import { workerOrders } from "../../data/mockData" // XÓA: Không dùng mock data nữa
import { statusConfig } from "../../constants/statusConfig"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import { getCurrentUserId } from "../../utils/auth";

// IMPORT: Thêm các service cần thiết
import OrderService from "../../services/orderService"
import WorkerService from "../../services/workerService" 

const WorkerOrdersScreen = ({ onTabPress, onOrderPress }) => {
  // GIẢ ĐỊNH: ID của thợ đang đăng nhập. Trong ứng dụng thực tế, bạn sẽ lấy ID này từ
  // global state (Context/Redux) hoặc từ route params sau khi đăng nhập.
  const loggedInWorkerId = "0" 

  const [activeTab, setActiveTab] = useState("all")
  const [orders, setOrders] = useState([]) // State để lưu danh sách đơn hàng từ Firebase
  const [loading, setLoading] = useState(true) // State để quản lý trạng thái loading

  // Lấy dữ liệu từ Firebase khi component được mount
  useEffect(() => {
    const fetchAndListenOrders = async () => {
      setLoading(true)

      try {
        const userId = await getCurrentUserId()
        const worker = await WorkerService.getWorkerByUserId(userId)

        if (!worker || !worker.id) {
          console.warn("Không tìm thấy thông tin worker tương ứng với userId:", userId)
          setOrders([])
          setLoading(false)
          return
        }

        const unsubscribe = OrderService.listenToWorkerOrders(worker.id, (workerOrders) => {
          const sortedOrders = workerOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
          setOrders(sortedOrders)
          setLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error("Lỗi khi fetch và listen orders:", error)
        setLoading(false)
      }
    }

    let unsubscribeFn

    fetchAndListenOrders().then((unsub) => {
      if (typeof unsub === "function") {
        unsubscribeFn = unsub
      }
    })

    return () => {
      if (unsubscribeFn) {
        unsubscribeFn()
      }
    }
  }, [])



  // Lọc dữ liệu từ state 'orders' thay vì mock data
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  // Hàm cập nhật trạng thái chung
  const handleUpdateStatus = async (orderId, newStatus, confirmation) => {
    Alert.alert(confirmation.title, confirmation.message, [
      { text: "Hủy", style: "cancel" },
      {
        text: confirmation.confirmText,
        style: newStatus === "rejected" ? "destructive" : "default", // 'rejected' is a custom status, not in your data
        onPress: async () => {
          try {
            await OrderService.updateOrderStatus(orderId, newStatus)
            Alert.alert("Thành công", `Đã cập nhật trạng thái đơn hàng thành công!`)
            // Không cần làm gì thêm, listener sẽ tự động cập nhật lại UI
          } catch (error) {
            console.error("Failed to update order status:", error)
            Alert.alert("Lỗi", "Không thể cập nhật trạng thái. Vui lòng thử lại.")
          }
        },
      },
    ])
  }

  const renderOrder = ({ item }) => {
    const status = statusConfig[item.status] || statusConfig.default

    return (
      <TouchableOpacity style={styles.orderCard} onPress={() => onOrderPress(item)}>
        <View style={styles.orderHeader}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerAvatar}>{item.avatar}</Text>
            <View>
              <Text style={styles.customerName}>{item.customer}</Text>
              <Text style={styles.orderService}>{item.service}</Text>
              <Text style={styles.orderTime}>
                📅 {item.date} - {item.time}
              </Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderAddress}>📍 {item.address}</Text>
          <Text style={styles.orderDescription}>{item.description}</Text>
          <View style={styles.orderMeta}>
            <Text style={styles.orderDuration}>⏱️ {item.estimatedHours}h</Text>
            <Text style={styles.orderPrice}>💰 {item.price}</Text>
          </View>
        </View>
        <View style={styles.orderActions}>
          <TouchableOpacity style={styles.phoneButton}>
            <Text style={styles.phoneButtonText}>📞 {item.phone}</Text>
          </TouchableOpacity>
          {item.status === "pending" && (
            <View style={styles.pendingActions}>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => handleUpdateStatus(item.id, "rejected", {
                    title: "Từ chối đơn",
                    message: "Bạn có chắc muốn từ chối đơn hàng này?",
                    confirmText: "Từ chối"
                })}
              >
                <Text style={styles.rejectButtonText}>Từ chối</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleUpdateStatus(item.id, "accepted", {
                    title: "Nhận đơn",
                    message: "Bạn có chắc muốn nhận đơn hàng này?",
                    confirmText: "Nhận đơn"
                })}
              >
                <Text style={styles.acceptButtonText}>Nhận đơn</Text>
              </TouchableOpacity>
            </View>
          )}
          {item.status === "accepted" && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => handleUpdateStatus(item.id, "completed", {
                  title: "Hoàn thành công việc",
                  message: "Xác nhận đã hoàn thành công việc?",
                  confirmText: "Hoàn thành"
              })}
            >
              <Text style={styles.completeButtonText}>Hoàn thành</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Quản lý đơn hàng</Text>
      </View>
      <View style={styles.tabContainer}>
        {/* Các tab không đổi */}
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={[styles.tabText, activeTab === "all" && styles.activeTabText]}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pending" && styles.activeTab]}
          onPress={() => setActiveTab("pending")}
        >
          <Text style={[styles.tabText, activeTab === "pending" && styles.activeTabText]}>Chờ xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "accepted" && styles.activeTab]}
          onPress={() => setActiveTab("accepted")}
        >
          <Text style={[styles.tabText, activeTab === "accepted" && styles.activeTabText]}>Đang làm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <Text style={[styles.tabText, activeTab === "completed" && styles.activeTabText]}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyListText}>Không có đơn hàng nào.</Text>}
        />
      )}
      <WorkerBottomNav onTabPress={onTabPress} activeTab="orders" />
    </SafeAreaView>
  )
}

export default WorkerOrdersScreen