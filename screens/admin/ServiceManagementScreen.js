import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { styles } from "../../styles/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import ServiceService from "../../services/serviceService";

const ServiceManagementScreen = ({ onTabPress, onBack }) => {
  const [serviceList, setServiceList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const unsubscribe = ServiceService.listenToServices(setServiceList);
    return unsubscribe; // Cleanup real-time listener on unmount
  }, []);

  const filteredServices = serviceList.filter((service) => {
    const name = typeof service.name === "string" ? service.name : "";
    const description = typeof service.description === "string" ? service.description : "";
    const search = typeof searchText === "string" ? searchText.toLowerCase() : "";

    const matchesSearch =
      name.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search);

    const matchesStatus =
      filterStatus === "all" || service.status === filterStatus;

    return matchesSearch && matchesStatus;
  });


  const handleToggleStatus = async (serviceId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const action = newStatus === "inactive" ? "tắt" : "bật";

    // console.log(serviceId)
    // console.log(currentStatus)
    // console.log(newStatus)
    // console.log(action)

    Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} dịch vụ này?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: async () => {
          try {
            await ServiceService.updateServiceStatus(serviceId, newStatus);
            Alert.alert("Thành công", `Đã ${action} dịch vụ`);
          } catch (error) {
            Alert.alert("Lỗi", "Không thể cập nhật trạng thái dịch vụ");
          }
        },
      },
    ]);
  };

  const handleEditService = (service) => {
    Alert.alert("Chỉnh sửa dịch vụ", `Chỉnh sửa: ${service.name}`, [
      { text: "Hủy", style: "cancel" },
      { text: "Sửa giá", onPress: () => handleEditPrice(service) },
      { text: "Sửa mô tả", onPress: () => handleEditDescription(service) },
    ]);
  };

  const handleEditPrice = (service) => {
    Alert.prompt(
      "Cập nhật giá",
      `Giá hiện tại: ${service.suggestedPrice}`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Cập nhật",
          onPress: async (newPrice) => {
            if (newPrice) {
              try {
                await ServiceService.updateService(service.id, {
                  suggestedPrice: newPrice,
                });
                Alert.alert("Thành công", "Đã cập nhật giá dịch vụ");
              } catch (error) {
                Alert.alert("Lỗi", "Không thể cập nhật giá dịch vụ");
              }
            }
          },
        },
      ],
      "plain-text",
      service.suggestedPrice
    );
  };

  const handleEditDescription = (service) => {
    Alert.prompt(
      "Cập nhật mô tả",
      `Mô tả hiện tại: ${service.description}`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Cập nhật",
          onPress: async (newDescription) => {
            if (newDescription) {
              try {
                await ServiceService.updateService(service.id, {
                  description: newDescription,
                });
                Alert.alert("Thành công", "Đã cập nhật mô tả dịch vụ");
              } catch (error) {
                Alert.alert("Lỗi", "Không thể cập nhật mô tả dịch vụ");
              }
            }
          },
        },
      ],
      "plain-text",
      service.description
    );
  };

  const handleAddService = () => {
    Alert.alert("Thêm dịch vụ mới", "Chức năng đang được phát triển");
  };

  const renderService = ({ item }) => (
    <View style={styles.serviceManagementCard}>
      <View style={styles.serviceCardHeader}>
        <View
          style={[
            styles.serviceIconContainer,
            { backgroundColor: item.color + "20" },
          ]}
        >
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
        <TouchableOpacity
          style={styles.editServiceButton}
          onPress={() => handleEditService(item)}
        >
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
          <Text style={styles.toggleServiceButtonText}>
            {item.status === "active" ? "Tắt" : "Bật"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        {["all", "active", "inactive"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterChip,
              filterStatus === status && styles.activeFilterChip,
            ]}
            onPress={() => setFilterStatus(status)}
          >
            <Text
              style={[
                styles.filterText,
                filterStatus === status && styles.activeFilterText,
              ]}
            >
              {status === "all"
                ? `Tất cả (${serviceList.length})`
                : `${status === "active" ? "Hoạt động" : "Tạm dừng"} (${
                    serviceList.filter((s) => s.status === status).length
                  })`}
            </Text>
          </TouchableOpacity>
        ))}
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
  );
};

export default ServiceManagementScreen;
