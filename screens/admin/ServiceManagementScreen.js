import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, TextInput } from "react-native"
import { styles } from "../../styles/styles"
import { services } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"

const ServiceManagementScreen = ({ onTabPress, onBack }) => {
  const [serviceList, setServiceList] = useState(services)
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredServices = serviceList.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchText.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = filterStatus === "all" || service.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleToggleStatus = (serviceId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    const action = newStatus === "inactive" ? "tắt" : "bật"

    Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} dịch vụ này?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          setServiceList(
            serviceList.map((service) => (service.id === serviceId ? { ...service, status: newStatus } : service)),
          )
          Alert.alert("Thành công", `Đã ${action} dịch vụ`)
        },
      },
    ])
  }

  const handleEditService = (service) => {
    Alert.alert("Chỉnh sửa dịch vụ", `Chỉnh sửa: ${service.name}`, [
      { text: "Hủy", style: "cancel" },
      { text: "Sửa giá", onPress: () => handleEditPrice(service) },
      { text: "Sửa mô tả", onPress: () => handleEditDescription(service) },
    ])
  }

  const handleEditPrice = (service) => {
    Alert.prompt(
      "Cập nhật giá",
      `Giá hiện tại: ${service.suggestedPrice}`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Cập nhật",
          onPress: (newPrice) => {
            if (newPrice) {
              setServiceList(serviceList.map((s) => (s.id === service.id ? { ...s, suggestedPrice: newPrice } : s)))
              Alert.alert("Thành công", "Đã cập nhật giá dịch vụ")
            }
          },
        },
      ],
      "plain-text",
      service.suggestedPrice,
    )
  }

  const handleEditDescription = (service) => {
    Alert.prompt(
      "Cập nhật mô tả",
      `Mô tả hiện tại: ${service.description}`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Cập nhật",
          onPress: (newDescription) => {
            if (newDescription) {
              setServiceList(serviceList.map((s) => (s.id === service.id ? { ...s, description: newDescription } : s)))
              Alert.alert("Thành công", "Đã cập nhật mô tả dịch vụ")
            }
          },
        },
      ],
      "plain-text",
      service.description,
    )
  }

  const handleAddService = () => {
    Alert.alert("Thêm dịch vụ mới", "Chức năng đang được phát triển")
  }

  const renderService = ({ item }) => (
    <View style={styles.serviceManagementCard}>
      <View style={styles.serviceCardHeader}>
        <View style={[styles.serviceIconContainer, { backgroundColor: item.color + "20" }]}>
          <Text style={styles.serviceManagementIcon}>{item.icon}</Text>
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.servicePrice}>{item.suggestedPrice}</Text>
          <Text style={styles.serviceDescription}>{item.description}</Text>
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
            {item.status === "active" ? "Hoạt động" : "Tạm dừng"}
          </Text>
        </View>
      </View>
      <View style={styles.serviceActions}>
        <TouchableOpacity style={styles.editServiceButton} onPress={() => handleEditService(item)}>
          <Text style={styles.editServiceButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleServiceButton,
            {
              backgroundColor: item.status === "active" ? "#ef4444" : "#10b981",
            },
          ]}
          onPress={() => handleToggleStatus(item.id, item.status)}
        >
          <Text style={styles.toggleServiceButtonText}>{item.status === "active" ? "Tắt" : "Bật"}</Text>
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
        <Text style={styles.screenTitle}>Quản lý dịch vụ</Text>
        <TouchableOpacity onPress={handleAddService}>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm dịch vụ..."
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
            Tất cả ({serviceList.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "active" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("active")}
        >
          <Text style={[styles.filterText, filterStatus === "active" && styles.activeFilterText]}>
            Hoạt động ({serviceList.filter((s) => s.status === "active").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "inactive" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("inactive")}
        >
          <Text style={[styles.filterText, filterStatus === "inactive" && styles.activeFilterText]}>
            Tạm dừng ({serviceList.filter((s) => s.status === "inactive").length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="serviceManagement" />
    </SafeAreaView>
  )
}

export default ServiceManagementScreen