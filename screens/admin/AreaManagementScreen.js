import { useState } from "react";
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
import { areas } from "../../data/mockData";
import { AdminBottomNav } from "../../components/BottomNavigation";

const AreaManagementScreen = ({ onTabPress, onBack }) => {
  const [areaList, setAreaList] = useState(areas);
  const [searchText, setSearchText] = useState("");

  const filteredAreas = areaList.filter(
    (area) =>
      area.name.toLowerCase().includes(searchText.toLowerCase()) ||
      area.city.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddArea = () => {
    Alert.prompt(
      "Thêm khu vực mới",
      "Nhập tên khu vực:",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Thêm",
          onPress: (areaName) => {
            if (areaName) {
              const newArea = {
                id: (areaList.length + 1).toString(),
                name: areaName,
                city: "TP.HCM",
                status: "active",
                workerCount: 0,
              };
              setAreaList([...areaList, newArea]);
              Alert.alert("Thành công", "Đã thêm khu vực mới");
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const handleToggleAreaStatus = (areaId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const action = newStatus === "inactive" ? "tắt" : "bật";

    Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} khu vực này?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          setAreaList(
            areaList.map((area) =>
              area.id === areaId ? { ...area, status: newStatus } : area
            )
          );
          Alert.alert("Thành công", `Đã ${action} khu vực`);
        },
      },
    ]);
  };

  const handleAssignWorkers = (area) => {
    Alert.alert(
      "Gán thợ cho khu vực",
      `Quản lý thợ trong khu vực ${area.name}`
    );
  };

  const renderArea = ({ item }) => (
    <View style={styles.areaCard}>
      <View style={styles.areaHeader}>
        <View style={styles.areaInfo}>
          <Text style={styles.areaName}>📍 {item.name}</Text>
          <Text style={styles.areaCity}>🏙️ {item.city}</Text>
          <Text style={styles.areaWorkerCount}>👨‍🔧 {item.workerCount} thợ</Text>
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

      <View style={styles.areaActions}>
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => handleAssignWorkers(item)}
        >
          <Text style={styles.assignButtonText}>Gán thợ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleAreaButton,
            {
              backgroundColor: item.status === "active" ? "#ef4444" : "#10b981",
            },
          ]}
          onPress={() => handleToggleAreaStatus(item.id, item.status)}
        >
          <Text style={styles.toggleAreaButtonText}>
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
        <Text style={styles.screenTitle}>Quản lý khu vực</Text>
        <TouchableOpacity onPress={handleAddArea}>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.areaStatsContainer}>
        <View style={styles.areaStatCard}>
          <Text style={styles.areaStatNumber}>{areaList.length}</Text>
          <Text style={styles.areaStatLabel}>Tổng khu vực</Text>
        </View>
        <View style={styles.areaStatCard}>
          <Text style={styles.areaStatNumber}>
            {areaList.filter((a) => a.status === "active").length}
          </Text>
          <Text style={styles.areaStatLabel}>Đang hoạt động</Text>
        </View>
        <View style={styles.areaStatCard}>
          <Text style={styles.areaStatNumber}>
            {areaList.reduce((total, area) => total + area.workerCount, 0)}
          </Text>
          <Text style={styles.areaStatLabel}>Tổng thợ</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm khu vực..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredAreas}
        renderItem={renderArea}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="areaManagement" />
    </SafeAreaView>
  );
};

export default AreaManagementScreen;
