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
import { users } from "../../data/mockData";
import { AdminBottomNav } from "../../components/BottomNavigation";

const AdminAccountManagementScreen = ({ onTabPress, onBack }) => {
  const [adminList, setAdminList] = useState(
    users.filter((user) => user.role === "admin")
  );
  const [searchText, setSearchText] = useState("");

  const filteredAdmins = adminList.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchText.toLowerCase()) ||
      admin.phone.includes(searchText) ||
      admin.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddAdmin = () => {
    Alert.alert("Thêm tài khoản admin", "Chức năng đang được phát triển");
  };

  const handleEditPermissions = (admin) => {
    Alert.alert("Phân quyền", `Chỉnh sửa quyền cho ${admin.name}`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Admin chính",
        onPress: () => Alert.alert("Cập nhật", "Đã cập nhật quyền Admin chính"),
      },
      {
        text: "Kiểm duyệt viên",
        onPress: () =>
          Alert.alert("Cập nhật", "Đã cập nhật quyền Kiểm duyệt viên"),
      },
      {
        text: "Hỗ trợ",
        onPress: () => Alert.alert("Cập nhật", "Đã cập nhật quyền Hỗ trợ"),
      },
    ]);
  };

  const handleToggle2FA = (adminId) => {
    Alert.alert("Bảo mật 2 lớp", "Bật/tắt xác thực 2 lớp cho tài khoản này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Bật/Tắt",
        onPress: () => {
          Alert.alert("Thành công", "Đã cập nhật cài đặt bảo mật");
        },
      },
    ]);
  };

  const handleDeleteAdmin = (adminId, adminName) => {
    Alert.alert(
      "Xóa tài khoản admin",
      `Bạn có chắc muốn xóa tài khoản ${adminName}?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            setAdminList(adminList.filter((admin) => admin.id !== adminId));
            Alert.alert("Thành công", "Đã xóa tài khoản admin");
          },
        },
      ]
    );
  };

  const renderAdmin = ({ item }) => (
    <View style={styles.adminAccountCard}>
      <View style={styles.adminAccountHeader}>
        <Text style={styles.adminAccountAvatar}>👨‍💼</Text>
        <View style={styles.adminAccountInfo}>
          <Text style={styles.adminAccountName}>{item.name}</Text>
          <Text style={styles.adminAccountPhone}>📞 {item.phone}</Text>
          <Text style={styles.adminAccountEmail}>✉️ {item.email}</Text>
          <Text style={styles.adminAccountRole}>🔑 Admin chính</Text>
          <Text style={styles.adminAccount2FA}>🔒 2FA: Đã bật</Text>
        </View>
      </View>

      <View style={styles.adminAccountActions}>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={() => handleEditPermissions(item)}
        >
          <Text style={styles.permissionButtonText}>Phân quyền</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.securityButton}
          onPress={() => handleToggle2FA(item.id)}
        >
          <Text style={styles.securityButtonText}>Bảo mật</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAdminButton}
          onPress={() => handleDeleteAdmin(item.id, item.name)}
        >
          <Text style={styles.deleteAdminButtonText}>Xóa</Text>
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
        <Text style={styles.screenTitle}>Tài khoản admin</Text>
        <TouchableOpacity onPress={handleAddAdmin}>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.adminAccountStatsContainer}>
        <View style={styles.adminAccountStatCard}>
          <Text style={styles.adminAccountStatIcon}>👨‍💼</Text>
          <Text style={styles.adminAccountStatNumber}>{adminList.length}</Text>
          <Text style={styles.adminAccountStatLabel}>Tổng admin</Text>
        </View>
        <View style={styles.adminAccountStatCard}>
          <Text style={styles.adminAccountStatIcon}>🔒</Text>
          <Text style={styles.adminAccountStatNumber}>{adminList.length}</Text>
          <Text style={styles.adminAccountStatLabel}>Đã bật 2FA</Text>
        </View>
        <View style={styles.adminAccountStatCard}>
          <Text style={styles.adminAccountStatIcon}>🟢</Text>
          <Text style={styles.adminAccountStatNumber}>{adminList.length}</Text>
          <Text style={styles.adminAccountStatLabel}>Hoạt động</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm admin..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredAdmins}
        renderItem={renderAdmin}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav
        onTabPress={onTabPress}
        activeTab="adminAccountManagement"
      />
    </SafeAreaView>
  );
};

export default AdminAccountManagementScreen;
