import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native"
import { styles } from "../../styles/styles"
import { menuItems } from "../../data/mockData"
import { CustomerBottomNav } from "../../components/BottomNavigation"

const ProfileScreen = ({ onTabPress, onLogout }) => {
  const handleMenuPress = (action) => {
    Alert.alert("Thông báo", `Chức năng ${action} đang được phát triển`)
  }

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: onLogout },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileAvatar}>👤</Text>
            <View>
              <Text style={styles.userName}>Nguyễn Văn A</Text>
              <Text style={styles.userPhone}>0123 456 789</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
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
      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  )
}

export default ProfileScreen