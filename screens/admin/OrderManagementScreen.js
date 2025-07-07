import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert } from "react-native"
import { styles } from "../../styles/styles"
import { workerOrders, customerBookings } from "../../data/mockData"
import { statusConfig } from "../../constants/statusConfig"
import { AdminBottomNav } from "../../components/BottomNavigation"

const OrderManagementScreen = ({ onTabPress, onBack }) => {
  const [activeTab, setActiveTab] = useState("all")

  // Combine all orders from both worker and customer perspectives
  const allOrders = [
    ...workerOrders.map((order) => ({ ...order, type: "worker_order" })),
    ...customerBookings.map((booking) => ({ ...booking, type: "customer_booking" })),
  ]

  const filteredOrders = allOrders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  const handleOrderAction = (orderId, action) => {
    Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} đơn hàng này?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          Alert.alert("Thành công", `Đã ${action} đơn hàng!`)
        },
      },
    ])
  }

  const renderOrder = ({ item }) => {
    const status = statusConfig[item.status]

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerAvatar}>{item.type === "worker_order" ? item.avatar : "👤"}</Text>
            <View>
              <Text style={styles.customerName}>
                {item.type === "worker_order" ? item.customer : `Khách: ${item.service}`}
              </Text>
              <Text style={styles.orderService}>
                {item.type === "worker_order" ? item.service : `Thợ: ${item.worker}`}
              </Text>
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
          {item.description && <Text style={styles.orderDescription}>{item.description}</Text>}
          <View style={styles.orderMeta}>
            <Text style={styles.orderDuration}>{item.estimatedHours ? `⏱️ ${item.estimatedHours}h` : "⏱️ N/A"}</Text>
            <Text style={styles.orderPrice}>💰 {item.price}</Text>
          </View>
        </View>

        <View style={styles.orderActions}>
          <TouchableOpacity
            style={styles.phoneButton}
            onPress={() => Alert.alert("Liên hệ", `SĐT: ${item.phone || "N/A"}`)}
          >
            <Text style={styles.phoneButtonText}>📞 Liên hệ</Text>
          </TouchableOpacity>

          {item.status === "pending" && (
            <View style={styles.pendingActions}>
              <TouchableOpacity style={styles.rejectButton} onPress={() => handleOrderAction(item.id, "hủy")}>
                <Text style={styles.rejectButtonText}>Hủy đơn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={() => handleOrderAction(item.id, "xác nhận")}>
                <Text style={styles.acceptButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Quản lý đơn hàng</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>📊</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={[styles.tabText, activeTab === "all" && styles.activeTabText]}>Tất cả ({allOrders.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pending" && styles.activeTab]}
          onPress={() => setActiveTab("pending")}
        >
          <Text style={[styles.tabText, activeTab === "pending" && styles.activeTabText]}>
            Chờ xử lý ({allOrders.filter((o) => o.status === "pending").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <Text style={[styles.tabText, activeTab === "completed" && styles.activeTabText]}>
            Hoàn thành ({allOrders.filter((o) => o.status === "completed").length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="orderManagement" />
    </SafeAreaView>
  )
}

export default OrderManagementScreen
