import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, TextInput } from "react-native"
import { styles } from "../../styles/styles"
import { users } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"

const CustomerManagementScreen = ({ onTabPress, onBack }) => {
  const [customerList, setCustomerList] = useState(users.filter((user) => user.role === "customer"))
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredCustomers = customerList.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.phone.includes(searchText) ||
      customer.area?.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleToggleStatus = (customerId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active"
    const action = newStatus === "blocked" ? "khóa" : "mở khóa"

    Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} tài khoản này?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          setCustomerList(
            customerList.map((customer) =>
              customer.id === customerId ? { ...customer, status: newStatus } : customer,
            ),
          )
          Alert.alert("Thành công", `Đã ${action} tài khoản`)
        },
      },
    ])
  }

  const handleViewHistory = (customer) => {
    Alert.alert("Lịch sử đặt dịch vụ", `Xem lịch sử của ${customer.name}`)
  }

  const renderCustomer = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userCardHeader}>
        <Text style={styles.userAvatar}>👤</Text>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userPhone}>📞 {item.phone}</Text>
          <Text style={styles.userPhone}>✉️ {item.email}</Text>
          <Text style={styles.userPhone}>📍 {item.area}</Text>
          <Text style={styles.userPhone}>📅 Tham gia: {item.joinDate}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: item.status === "active" ? "#d1fae5" : "#fee2e2",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: item.status === "active" ? "#065f46" : "#dc2626",
              },
            ]}
          >
            {item.status === "active" ? "Hoạt động" : "Đã khóa"}
          </Text>
        </View>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity style={styles.editUserButton} onPress={() => handleViewHistory(item)}>
          <Text style={styles.editUserButtonText}>Lịch sử</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.deleteUserButton,
            {
              backgroundColor: item.status === "active" ? "#ef4444" : "#10b981",
            },
          ]}
          onPress={() => handleToggleStatus(item.id, item.status)}
        >
          <Text style={styles.deleteUserButtonText}>{item.status === "active" ? "Khóa" : "Mở khóa"}</Text>
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
        <Text style={styles.screenTitle}>Quản lý khách hàng</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>📊</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo tên, SĐT, khu vực..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "all" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("all")}
        >
          <Text style={[styles.filterText, filterStatus === "all" && styles.activeFilterText]}>
            Tất cả ({customerList.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "active" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("active")}
        >
          <Text style={[styles.filterText, filterStatus === "active" && styles.activeFilterText]}>
            Hoạt động ({customerList.filter((c) => c.status === "active").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "blocked" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("blocked")}
        >
          <Text style={[styles.filterText, filterStatus === "blocked" && styles.activeFilterText]}>
            Đã khóa ({customerList.filter((c) => c.status === "blocked").length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="customerManagement" />
    </SafeAreaView>
  )
}

export default CustomerManagementScreen
