import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, TextInput, Modal } from "react-native"
import { styles } from "../../styles/styles"
import { CustomerBottomNav } from "../../components/BottomNavigation"

const AddressManagementScreen = ({ onTabPress, onBack }) => {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      title: "Nhà riêng",
      address: "123 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM",
      phone: "0123456789",
      isDefault: true,
    },
    {
      id: "2",
      title: "Văn phòng",
      address: "456 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
      phone: "0987654321",
      isDefault: false,
    },
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    phone: "",
  })

  const handleAddAddress = () => {
    setFormData({ title: "", address: "", phone: "" })
    setEditingAddress(null)
    setShowAddModal(true)
  }

  const handleEditAddress = (address) => {
    setFormData({
      title: address.title,
      address: address.address,
      phone: address.phone,
    })
    setEditingAddress(address)
    setShowAddModal(true)
  }

  const handleSaveAddress = () => {
    if (!formData.title || !formData.address || !formData.phone) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin")
      return
    }

    if (editingAddress) {
      // Edit existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id
            ? { ...addr, title: formData.title, address: formData.address, phone: formData.phone }
            : addr,
        ),
      )
      Alert.alert("Thành công", "Đã cập nhật địa chỉ")
    } else {
      // Add new address
      const newAddress = {
        id: Date.now().toString(),
        title: formData.title,
        address: formData.address,
        phone: formData.phone,
        isDefault: addresses.length === 0,
      }
      setAddresses([...addresses, newAddress])
      Alert.alert("Thành công", "Đã thêm địa chỉ mới")
    }

    setShowAddModal(false)
  }

  const handleDeleteAddress = (addressId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa địa chỉ này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setAddresses(addresses.filter((addr) => addr.id !== addressId))
          Alert.alert("Thành công", "Đã xóa địa chỉ")
        },
      },
    ])
  }

  const handleSetDefault = (addressId) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    )
    Alert.alert("Thành công", "Đã đặt làm địa chỉ mặc định")
  }

  const renderAddress = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.addressTitleContainer}>
          <Text style={styles.addressTitle}>{item.title}</Text>
          {item.isDefault && <Text style={styles.defaultBadge}>Mặc định</Text>}
        </View>
        <TouchableOpacity onPress={() => handleEditAddress(item)}>
          <Text style={styles.editAddressButton}>Sửa</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.addressText}>{item.address}</Text>
      <Text style={styles.addressPhone}>📞 {item.phone}</Text>
      <View style={styles.addressActions}>
        {!item.isDefault && (
          <TouchableOpacity style={styles.setDefaultButton} onPress={() => handleSetDefault(item.id)}>
            <Text style={styles.setDefaultButtonText}>Đặt mặc định</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteAddressButton} onPress={() => handleDeleteAddress(item.id)}>
          <Text style={styles.deleteAddressButtonText}>Xóa</Text>
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
        <Text style={styles.screenTitle}>Địa chỉ của tôi</Text>
        <TouchableOpacity onPress={handleAddAddress}>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.addressList}
        showsVerticalScrollIndicator={false}
      />

      {/* Add/Edit Address Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tên địa chỉ</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="VD: Nhà riêng, Văn phòng..."
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Địa chỉ chi tiết</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea]}
                  placeholder="Nhập địa chỉ đầy đủ..."
                  value={formData.address}
                  onChangeText={(text) => setFormData({ ...formData, address: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Số điện thoại</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Số điện thoại liên hệ"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddModal(false)}>
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
                  <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  )
}

export default AddressManagementScreen
