import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, ActivityIndicator } from "react-native"
import { styles } from "../../styles/styles"
import { statusConfig } from "../../constants/statusConfig"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import OrderService from "../../services/orderService"

const WorkerOrdersScreen = ({ onTabPress, onOrderPress, currentUser }) => {
  const [activeTab, setActiveTab] = useState("all")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [workerId, setWorkerId] = useState(null)

  // Lấy workerId từ currentUser
  useEffect(() => {
    if (!currentUser?.id) return
    const fetchWorkerId = async () => {
      const allWorkers = await import("../../services/workerService").then(m => m.default.getAllWorkers())
      
      const matchedWorker = allWorkers.find(w => String(w.userId) === String(currentUser.id))
      if (matchedWorker) {
        console.log("✅ Tìm thấy worker:", matchedWorker)
        setWorkerId(matchedWorker.id)
      } else {
        console.log("❌ Không tìm thấy worker phù hợp userId")
      }
    }
    fetchWorkerId()
  }, [currentUser])

  // Lắng nghe đơn hàng realtime
  useEffect(() => {
    if (!workerId) return
    setLoading(true)
    const unsubscribe = OrderService.listenToWorkerOrders(workerId, (workerOrders) => {

      const sortedOrders = workerOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      setOrders(sortedOrders)
      console.log("🚀 Đã cập nhật đơn hàng:", sortedOrders);
      
      setLoading(false)
    })
    return () => unsubscribe()
  }, [workerId])

  // Lọc theo tab
  const filteredOrders = orders.filter(order => 
    activeTab === "all" ? true : order.status === activeTab
  )

  // Hàm update trạng thái đơn
  const handleUpdateStatus = async (orderId, newStatus, confirmation) => {
    console.log("🚀 Gọi handleUpdateStatus với:", { orderId, newStatus })
    Alert.alert(confirmation.title, confirmation.message, [
      { text: "Hủy", style: "cancel" },
      {
        text: confirmation.confirmText,
        style: newStatus === "rejected" ? "destructive" : "default",
        onPress: async () => {
          try {
            console.log("OrderId,,", orderId);
            
            await OrderService.updateOrderStatus(orderId, newStatus)
            console.log("✅ Đã gọi OrderService.updateOrderStatus")
            Alert.alert("Thành công", "Đã cập nhật trạng thái đơn hàng thành công!")
          } catch (error) {
            console.error("❌ Failed to update order status:", error)
            Alert.alert("Lỗi", "Không thể cập nhật trạng thái. Vui lòng thử lại.")
          }
        },
      },
    ])
  }

  // Render từng đơn
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
              <Text style={styles.orderTime}>📅 {item.date} - {item.time}</Text>
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
        {["all", "pending", "accepted", "completed"].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === "all" ? "Tất cả" : tab === "pending" ? "Chờ xác nhận" : tab === "accepted" ? "Đang làm" : "Hoàn thành"}
            </Text>
          </TouchableOpacity>
        ))}
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
