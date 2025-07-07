import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, TextInput } from "react-native"
import { styles } from "../../styles/styles"
import { users } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"

const WorkerManagementScreen = ({ onTabPress, onBack }) => {
  const [workerList, setWorkerList] = useState(users.filter((user) => user.role === "worker"))
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredWorkers = workerList.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchText.toLowerCase()) ||
      worker.phone.includes(searchText) ||
      worker.specialty?.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = filterStatus === "all" || worker.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleApproveWorker = (workerId) => {
    Alert.alert("Duyệt hồ sơ thợ", "Bạn có chắc muốn duyệt hồ sơ này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Duyệt",
        onPress: () => {
          setWorkerList(workerList.map((worker) => (worker.id === workerId ? { ...worker, status: "active" } : worker)))
          Alert.alert("Thành công", "Đã duyệt hồ sơ thợ")
        },
      },
    ])
  }

  const handleToggleStatus = (workerId, currentStatus) => {
    if (currentStatus === "pending") return

    const newStatus = currentStatus === "active" ? "blocked" : "active"
    const action = newStatus === "blocked" ? "khóa" : "mở khóa"

    Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} tài khoản này?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          setWorkerList(
            workerList.map((worker) => (worker.id === workerId ? { ...worker, status: newStatus } : worker)),
          )
          Alert.alert("Thành công", `Đã ${action} tài khoản`)
        },
      },
    ])
  }

  const handleViewDetails = (worker) => {
    Alert.alert(
      "Chi tiết thợ",
      `Tên: ${worker.name}\nChuyên môn: ${worker.specialty}\nĐánh giá: ${worker.rating}/5\nĐơn hoàn thành: ${worker.completedOrders}\nChứng chỉ: ${worker.certificate}\nKhu vực: ${worker.area}`,
    )
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return { backgroundColor: "#d1fae5", color: "#065f46" }
      case "pending":
        return { backgroundColor: "#fef3c7", color: "#92400e" }
      case "blocked":
        return { backgroundColor: "#fee2e2", color: "#dc2626" }
      default:
        return { backgroundColor: "#f3f4f6", color: "#6b7280" }
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Hoạt động"
      case "pending":
        return "Chờ duyệt"
      case "blocked":
        return "Đã khóa"
      default:
        return status
    }
  }

  const renderWorker = ({ item }) => {
    const statusStyle = getStatusStyle(item.status)

    return (
      <View style={styles.userCard}>
        <View style={styles.userCardHeader}>
          <Text style={styles.userAvatar}>👨‍🔧</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userPhone}>📞 {item.phone}</Text>
            <Text style={styles.userPhone}>🔧 {item.specialty}</Text>
            <Text style={styles.userPhone}>
              ⭐ {item.rating}/5 ({item.completedOrders} đơn)
            </Text>
            <Text style={styles.userPhone}>📍 {item.area}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{getStatusText(item.status)}</Text>
          </View>
        </View>
        <View style={styles.userActions}>
          <TouchableOpacity style={styles.editUserButton} onPress={() => handleViewDetails(item)}>
            <Text style={styles.editUserButtonText}>Chi tiết</Text>
          </TouchableOpacity>
          {item.status === "pending" ? (
            <TouchableOpacity
              style={[styles.deleteUserButton, { backgroundColor: "#10b981" }]}
              onPress={() => handleApproveWorker(item.id)}
            >
              <Text style={styles.deleteUserButtonText}>Duyệt</Text>
            </TouchableOpacity>
          ) : (
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
        <Text style={styles.screenTitle}>Quản lý thợ</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>📊</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo tên, SĐT, chuyên môn..."
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
            Tất cả ({workerList.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "pending" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("pending")}
        >
          <Text style={[styles.filterText, filterStatus === "pending" && styles.activeFilterText]}>
            Chờ duyệt ({workerList.filter((w) => w.status === "pending").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "active" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("active")}
        >
          <Text style={[styles.filterText, filterStatus === "active" && styles.activeFilterText]}>
            Hoạt động ({workerList.filter((w) => w.status === "active").length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredWorkers}
        renderItem={renderWorker}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="workerManagement" />
    </SafeAreaView>
  )
}

export default WorkerManagementScreen
