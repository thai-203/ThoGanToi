import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { styles } from "../../styles/styles"
import { adminMenuItems } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"
import FirebaseService from "../../services/firebaseService"

const AdminDashboardScreen = ({ onTabPress, onMenuPress, currentUser }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkers: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, workers, orders] = await Promise.all([
          FirebaseService.readAll("users"),
          FirebaseService.readAll("workers"),
          FirebaseService.readAll("orders"),
        ])

        const currentMonth = new Date().getMonth()

        // Tách đơn đã hoàn thành và đơn đang chờ
        const completedOrders = orders.filter(o => o.status === "completed")
        const pendingOrders = orders.filter(o => o.status === "pending")

        // Chuyển đổi giá (string như "300,000đ") -> number
        const parsePrice = (value) => {
          if (typeof value === "string") {
            return parseInt(value.replace(/[^\d]/g, "")) || 0
          }
          return typeof value === "number" ? value : 0
        }

        // Xác định tháng từ ngày
        const extractMonth = (order) => {
          if (order.date) {
            const parts = order.date.split("/") // "dd/mm/yyyy"
            return parseInt(parts[1], 10) - 1 // Trả về 0-based month
          }
          if (order.completedAt || order.updatedAt) {
            return new Date(order.completedAt || order.updatedAt).getMonth()
          }
          return -1
        }

        const totalRevenue = completedOrders.reduce((sum, o) => sum + parsePrice(o.price), 0)

        const monthlyRevenue = completedOrders.reduce((sum, o) => {
          const orderMonth = extractMonth(o)
          return orderMonth === currentMonth ? sum + parsePrice(o.price) : sum
        }, 0)

        setStats({
          totalUsers: users.length,
          totalWorkers: workers.length,
          totalOrders: orders.length,
          completedOrders: completedOrders.length,
          pendingOrders: pendingOrders.length,
          totalRevenue,
          monthlyRevenue,
        })
      } catch (error) {
        console.error("Error fetching admin stats:", error)
      }
    }

    fetchData()
  }, [])

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
            <Text style={styles.adminStatNumber}>{stats.totalUsers}</Text>
            <Text style={styles.adminStatLabel}>Tổng người dùng</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>🔧</Text>
            <Text style={styles.adminStatNumber}>{stats.totalWorkers}</Text>
            <Text style={styles.adminStatLabel}>Thợ sửa chữa</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>📋</Text>
            <Text style={styles.adminStatNumber}>{stats.totalOrders}</Text>
            <Text style={styles.adminStatLabel}>Tổng đơn hàng</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>💰</Text>
            <Text style={styles.adminStatNumber}>
              {(stats.totalRevenue / 1_000_000).toFixed(1)}M
            </Text>
            <Text style={styles.adminStatLabel}>Doanh thu (VNĐ)</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thống kê nhanh</Text>
          <View style={styles.quickStatsContainer}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{stats.completedOrders}</Text>
              <Text style={styles.quickStatLabel}>Đơn hoàn thành</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{stats.pendingOrders}</Text>
              <Text style={styles.quickStatLabel}>Đơn chờ xử lý</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>
                {(stats.monthlyRevenue / 1_000_000).toFixed(1)}M
              </Text>
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
                onPress={() => onMenuPress && onMenuPress(item.screen)}
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
