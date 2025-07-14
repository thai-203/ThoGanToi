import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { styles } from "../../styles/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import EditUserModal from "../../components/EditUserModal";
import userService from "../../services/userService";

const UserManagementScreen = ({ onTabPress, onBack }) => {
  const [userList, setUserList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const users = await userService.getAllUsers();
    setUserList(users);
    setLoading(false);
  };

  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone?.includes(searchText);
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const handleDeleteUser = (userId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa người dùng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await userService.deleteUser(userId);
          fetchUsers();
          Alert.alert("Đã xóa", "Người dùng đã được xóa.");
        },
      },
    ]);
  };

  const handleSaveUser = async (updatedUser) => {
    await userService.updateUser(updatedUser.id, updatedUser);
    setEditModalVisible(false);
    setEditingUser(null);
    fetchUsers();
    Alert.alert("Thành công", "Đã cập nhật thông tin người dùng.");
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case "admin":
        return [styles.userRole, styles.adminRole];
      case "customer":
        return [styles.userRole, styles.customerRole];
      case "worker":
        return [styles.userRole, styles.workerRole];
      default:
        return styles.userRole;
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "customer":
        return "Khách hàng";
      case "worker":
        return "Thợ sửa chữa";
      default:
        return role;
    }
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userCardHeader}>
        <Text style={styles.userAvatar}>
          {item.role === "admin" ? "👨‍💼" : item.role === "worker" ? "👨‍🔧" : "👤"}
        </Text>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userPhone}>📞 {item.phone}</Text>
          <Text style={styles.userPhone}>✉️ {item.email}</Text>
          {item.specialty && (
            <Text style={styles.userPhone}>🔧 {item.specialty}</Text>
          )}
        </View>
        <Text style={getRoleStyle(item.role)}>{getRoleText(item.role)}</Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity
          style={styles.editUserButton}
          onPress={() => handleEditUser(item)}
        >
          <Text style={styles.editUserButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteUserButton}
          onPress={() => handleDeleteUser(item.id)}
        >
          <Text style={styles.deleteUserButtonText}>Xóa</Text>
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
        <Text style={styles.screenTitle}>Quản lý người dùng</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView   
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterScroll}
      contentContainerStyle={styles.filterContainer}>
        {["all", "admin", "customer", "worker"].map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.filterChip,
              filterRole === role && styles.activeFilterChip,
            ]}
            onPress={() => setFilterRole(role)}
          >
            <Text
              style={[
                styles.filterText,
                filterRole === role && styles.activeFilterText,
              ]}
            >
              {role === "all"
                ? `Tất cả (${userList.length})`
                : `${getRoleText(role)} (${
                    userList.filter((u) => u.role === role).length
                  })`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#3b82f6"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <EditUserModal
        visible={isEditModalVisible}
        user={editingUser}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveUser}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="userManagement" />
    </SafeAreaView>
  );
};

export default UserManagementScreen;
