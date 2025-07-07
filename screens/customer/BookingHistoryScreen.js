import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native"
import { styles } from "../../styles/styles"
import { customerBookings } from "../../data/mockData"
import { statusConfig } from "../../constants/statusConfig"
import { CustomerBottomNav } from "../../components/BottomNavigation"

const BookingHistoryScreen = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = customerBookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  const renderBooking = ({ item }) => {
    const status = statusConfig[item.status]
    return (
      <View style={styles.bookingCard}>
        <View style={styles.bookingHeader}>
          <View>
            <Text style={styles.bookingServiceName}>{item.service}</Text>
            <Text style={styles.bookingWorkerName}>Thợ: {item.worker}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>
              {item.date} - {item.time}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{item.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💰</Text>
            <Text style={styles.detailText}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.bookingActions}>
          {item.status === "completed" && (
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={styles.reviewButtonText}>Đánh giá</Text>
            </TouchableOpacity>
          )}
          {item.status === "confirmed" && (
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Hủy lịch</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.rebookButton}>
            <Text style={styles.rebookButtonText}>Đặt lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Lịch sử đặt lịch</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={[styles.tabText, activeTab === "all" && styles.activeTabText]}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "confirmed" && styles.activeTab]}
          onPress={() => setActiveTab("confirmed")}
        >
          <Text style={[styles.tabText, activeTab === "confirmed" && styles.activeTabText]}>Đã xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <Text style={[styles.tabText, activeTab === "completed" && styles.activeTabText]}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredBookings}
        renderItem={renderBooking}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
      />
      <CustomerBottomNav onTabPress={onTabPress} activeTab="history" />
    </SafeAreaView>
  )
}

export default BookingHistoryScreen
