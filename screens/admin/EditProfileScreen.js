import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Modal } from "react-native"
import { styles } from "../../styles/styles"

const EditProfileScreen = ({ visible, onClose, onSave, userInfo }) => {
  const [formData, setFormData] = useState({
    id: userInfo.id,
    name: userInfo?.name || "Admin",
    phone: userInfo?.phone || "0123 456 789",
    email: userInfo?.email || "admin@email.com",
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { maxHeight: "90%" }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <Text style={styles.editProfileAvatar}>👤</Text>
              <TouchableOpacity style={styles.changeAvatarButton}>
                <Text style={styles.changeAvatarButtonText}>Đổi ảnh đại diện</Text>
              </TouchableOpacity>
            </View>

            {/* Name */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Họ và tên *</Text>
              <TextInput
                style={[styles.formInput, errors.name && styles.formInputError]}
                placeholder="Nhập họ tên"
                value={formData.name}
                onChangeText={(text) => {
                  setFormData({ ...formData, name: text })
                  if (errors.name) setErrors({ ...errors, name: null })
                }}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Phone */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Số điện thoại *</Text>
              <TextInput
                style={[styles.formInput, errors.phone && styles.formInputError]}
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChangeText={(text) => {
                  setFormData({ ...formData, phone: text })
                  if (errors.phone) setErrors({ ...errors, phone: null })
                }}
                keyboardType="phone-pad"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            {/* Email */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email *</Text>
              <TextInput
                style={[styles.formInput, errors.email && styles.formInputError]}
                placeholder="Nhập email"
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text })
                  if (errors.email) setErrors({ ...errors, email: null })
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default EditProfileScreen
