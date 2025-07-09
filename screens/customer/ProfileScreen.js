import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native"
import { styles } from "../../styles/styles"
import { menuItems } from "../../data/mockData"
import { CustomerBottomNav } from "../../components/BottomNavigation"
import EditProfileScreen from "./EditProfileScreen"

const ProfileScreen = ({ onTabPress, onLogout, onMenuPress }) => {
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A",
    phone: "0123 456 789",
    email: "nguyenvana@email.com",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    dateOfBirth: "01/01/1990",
    gender: "Nam",
  })

  const handleMenuPress = (action) => {
    if (action === "profile" && onMenuPress) {
      onMenuPress("personalInfo")
    } else if (action === "address" && onMenuPress) {
      onMenuPress("addressManagement")
    } else if (action === "payment" && onMenuPress) {
      onMenuPress("paymentMethod")
    } else if (action === "offers" && onMenuPress) {
      onMenuPress("offers")
    } else if (action === "support" && onMenuPress) {
      onMenuPress("helpSupport")
    } else if (action === "settings" && onMenuPress) {
      onMenuPress("customerSettings")
    } else if (action === "about" && onMenuPress) {
      onMenuPress("aboutUs")
    } else {
      Alert.alert("Thông báo", `Chức năng ${action} đang được phát triển`)
    }
  }

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: onLogout },
    ])
  }

  const handleSaveProfile = (newUserInfo) => {
    setUserInfo(newUserInfo)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileAvatar}>👤</Text>
            <View>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userPhone}>{userInfo.phone}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => setShowEditProfile(true)}>
            <Text style={styles.editButtonText}>Sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Đơn hoàn thành</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Ưu đãi</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item.action)}>
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
            <Text style={styles.promoIcon}>🎉</Text>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Mời bạn bè - Nhận ưu đãi</Text>
              <Text style={styles.promoText}>Giảm 50k cho mỗi bạn bè tham gia</Text>
            </View>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Mời ngay</Text>
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

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  )
}

export default ProfileScreen
