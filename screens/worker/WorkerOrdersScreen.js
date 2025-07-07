import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert } from "react-native"
import { styles } from "../../styles/styles"
import { workerOrders } from "../../data/mockData"
import { statusConfig } from "../../constants/statusConfig"
import { WorkerBottomNav } from "../../components/BottomNavigation"

const WorkerOrdersScreen = ({ onTabPress, onOrderPress }) => {
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = workerOrders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  const handleAcceptOrder = (orderId) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn nhận đơn hàng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Nhận đơn",
        onPress: () => {
          Alert.alert("Thành công", "Đã nhận đơn hàng!")
        },
      },
    ])
  }

  const handleRejectOrder = (orderId) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn từ chối đơn hàng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Từ chối",
        style: "destructive",
        onPress: () => {
          Alert.alert("Đã từ chối", "Đơn hàng đã được từ chối")
        },
      },
    ])
  }

  const handleCompleteOrder = (orderId) => {
    Alert.alert("Hoàn thành công việc", "Xác nhận đã hoàn thành công việc?", [
      { text: "Chưa xong", style: "cancel" },
      {
        text: "Hoàn thành",
        onPress: () => {
          Alert.alert("Thành công", "Đã cập nhật trạng thái hoàn thành!")
        },
      },
    ])
  }

  const renderOrder = ({ item }) => {
    const status = statusConfig[item.status]

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
              <TouchableOpacity style={styles.rejectButton} onPress={() => handleRejectOrder(item.id)}>
                <Text style={styles.rejectButtonText}>Từ chối</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={() => handleAcceptOrder(item.id)}>
                <Text style={styles.acceptButtonText}>Nhận đơn</Text>
              </TouchableOpacity>
            </View>
          )}
          {item.status === "accepted" && (
            <TouchableOpacity style={styles.completeButton} onPress={() => handleCompleteOrder(item.id)}>
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
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />
      <WorkerBottomNav onTabPress={onTabPress} activeTab="orders" />
    </SafeAreaView>
  )
}

export default WorkerOrdersScreen
