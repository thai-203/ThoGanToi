import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, ActivityIndicator } from "react-native"
import { styles } from "../../styles/styles"
import { adminMenuItems } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"
import FirebaseService from "../../services/firebaseService"
import EditProfileScreen from "./EditProfileScreen"
import userService from "../../services/userService"
import { getCurrentUserId } from "../../utils/auth"

const AdminProfileScreen = ({ onTabPress, onLogout, onMenuPress }) => {
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkers: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  })

  const fetchUserInfo = async () => {
    const userId = await getCurrentUserId()
    const userData = await userService.getUserById(userId)
    if (userData) {
      setUserInfo({ ...userData, id: userId })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, workers, orders] = await Promise.all([
          FirebaseService.readAll("users"),
          FirebaseService.readAll("workers"),
          FirebaseService.readAll("orders"),
        ])

        const currentMonth = new Date().getMonth()
        const completedOrders = orders.filter(o => o.status === "completed")
        const pendingOrders = orders.filter(o => o.status === "pending")

        const parsePrice = (value) => {
          if (typeof value === "string") {
            return parseInt(value.replace(/[^\d]/g, "")) || 0
          }
          return typeof value === "number" ? value : 0
        }

        const extractMonth = (order) => {
          if (order.date) {
            const parts = order.date.split("/") // "dd/mm/yyyy"
            return parseInt(parts[1], 10) - 1
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

  const handleMenuPress = (screen) => {
    if (screen && onMenuPress) {
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

  const handleSaveProfile = async (newUserInfo) => {
    await userService.updateUser(newUserInfo.id, newUserInfo)
    setUserInfo(newUserInfo)
    setShowEditProfile(false)
    Alert.alert("Thành công", "Đã lưu thông tin cá nhân.")
  }

  if (loading || !userInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 50 }} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileAvatar}>👨‍💼</Text>
            <View>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userPhone}>{userInfo.phone}</Text>
              <Text style={styles.userPhone}>{userInfo.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => setShowEditProfile(true)}>
            <Text style={styles.editButtonText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalUsers}</Text>
            <Text style={styles.statLabel}>Người dùng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalOrders}</Text>
            <Text style={styles.statLabel}>Đơn hàng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{(stats.totalRevenue / 1000000).toFixed(1)}M</Text>
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

      <EditProfileScreen
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
        userInfo={userInfo}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="adminProfile" />
    </SafeAreaView>
  )
}

export default AdminProfileScreen
