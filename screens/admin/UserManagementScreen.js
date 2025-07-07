import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, TextInput } from "react-native"
import { styles } from "../../styles/styles"
import { users } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"

const UserManagementScreen = ({ onTabPress, onBack }) => {
  const [userList, setUserList] = useState(users)
  const [searchText, setSearchText] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const filteredUsers = userList.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) || user.phone.includes(searchText)
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleEditUser = (user) => {
    Alert.alert("Chỉnh sửa người dùng", `Chỉnh sửa thông tin của ${user.name}`)
  }

  const handleDeleteUser = (userId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa người dùng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setUserList(userList.filter((user) => user.id !== userId))
          Alert.alert("Thành công", "Đã xóa người dùng")
        },
      },
    ])
  }

  const getRoleStyle = (role) => {
    switch (role) {
      case "admin":
        return [styles.userRole, styles.adminRole]
      case "customer":
        return [styles.userRole, styles.customerRole]
      case "worker":
        return [styles.userRole, styles.workerRole]
      default:
        return styles.userRole
    }
  }

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "Quản trị viên"
      case "customer":
        return "Khách hàng"
      case "worker":
        return "Thợ sửa chữa"
      default:
        return role
    }
  }

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userCardHeader}>
        <Text style={styles.userAvatar}>{item.role === "admin" ? "👨‍💼" : item.role === "worker" ? "👨‍🔧" : "👤"}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userPhone}>📞 {item.phone}</Text>
          <Text style={styles.userPhone}>✉️ {item.email}</Text>
          {item.specialty && <Text style={styles.userPhone}>🔧 {item.specialty}</Text>}
        </View>
        <Text style={getRoleStyle(item.role)}>{getRoleText(item.role)}</Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity style={styles.editUserButton} onPress={() => handleEditUser(item)}>
          <Text style={styles.editUserButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteUserButton} onPress={() => handleDeleteUser(item.id)}>
          <Text style={styles.deleteUserButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Quản lý người dùng</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterChip, filterRole === "all" && styles.activeFilterChip]}
          onPress={() => setFilterRole("all")}
        >
          <Text style={[styles.filterText, filterRole === "all" && styles.activeFilterText]}>
            Tất cả ({userList.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterRole === "admin" && styles.activeFilterChip]}
          onPress={() => setFilterRole("admin")}
        >
          <Text style={[styles.filterText, filterRole === "admin" && styles.activeFilterText]}>
            Admin ({userList.filter((u) => u.role === "admin").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterRole === "customer" && styles.activeFilterChip]}
          onPress={() => setFilterRole("customer")}
        >
          <Text style={[styles.filterText, filterRole === "customer" && styles.activeFilterText]}>
            Khách hàng ({userList.filter((u) => u.role === "customer").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterRole === "worker" && styles.activeFilterChip]}
          onPress={() => setFilterRole("worker")}
        >
          <Text style={[styles.filterText, filterRole === "worker" && styles.activeFilterText]}>
            Thợ ({userList.filter((u) => u.role === "worker").length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="userManagement" />
    </SafeAreaView>
  )
}

export default UserManagementScreen
