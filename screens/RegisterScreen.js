"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import { styles } from "../styles/styles"
import UserService from "../services/userService"
import WorkerService from "../services/workerService"
import { users } from "../data/mockData" // Fallback data

const RegisterScreen = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer", // default role
    specialty: "", // for workers
    area: "",
    certificate: "", // for workers
  })
  const [loading, setLoading] = useState(false)
  const [showWorkerFields, setShowWorkerFields] = useState(false)

  const validateForm = () => {
    const { name, phone, email, password, confirmPassword, role, specialty, area } = formData

    if (!name.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập họ tên")
      return false
    }

    if (!phone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại")
      return false
    }

    if (phone.length < 10) {
      Alert.alert("Lỗi", "Số điện thoại phải có ít nhất 10 số")
      return false
    }

    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ")
      return false
    }

    if (!password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu")
      return false
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự")
      return false
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp")
      return false
    }

    if (!area.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập khu vực")
      return false
    }

    if (role === "worker" && !specialty.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập chuyên môn")
      return false
    }

    return true
  }

  const checkPhoneExists = async (phone) => {
    try {
      // Check in Firebase first
      const existingUsers = await UserService.getAllUsers()
      const phoneExists = existingUsers.some((user) => user.phone === phone)

      if (phoneExists) return true

      // Check in mock data as fallback
      const mockUser = users.find((user) => user.phone === phone)
      return !!mockUser
    } catch (error) {
      console.error("Error checking phone:", error)
      // Check in mock data as fallback
      const mockUser = users.find((user) => user.phone === phone)
      return !!mockUser
    }
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)

      // Check if phone already exists
      const phoneExists = await checkPhoneExists(formData.phone)
      if (phoneExists) {
        Alert.alert("Lỗi", "Số điện thoại đã được sử dụng")
        return
      }

      // 1. Tạo user cơ bản trong bảng users
      const basicUserData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
        area: formData.area.trim(),
        status: "active", // User cơ bản luôn active
        joinDate: new Date().toISOString().split("T")[0],
      }

      let userId = null
      try {
        userId = await UserService.createUser(basicUserData)
        console.log("✅ User created successfully in users table:", userId)
      } catch (error) {
        console.error("❌ Error creating user:", error)
        throw new Error("Không thể tạo tài khoản cơ bản")
      }

      // 2. Nếu là worker, tạo thêm bản ghi trong bảng workers
      if (formData.role === "worker" && userId) {
        const workerData = {
          userId: userId, // Liên kết với user
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
          specialty: formData.specialty.trim(),
          certificate: formData.certificate.trim(),
          area: formData.area.trim(),
          status: "pending", // Worker cần admin duyệt
          rating: 0,
          completedOrders: 0,
          experience: "Mới bắt đầu",
          price: "100,000đ/giờ", // Default price
          avatar: "👨‍🔧",
          reviews: 0,
          joinDate: new Date().toISOString().split("T")[0],
        }

        try {
          const workerId = await WorkerService.createWorker(workerData)
          console.log("✅ Worker profile created successfully:", workerId)
        } catch (error) {
          console.error("❌ Error creating worker profile:", error)
          // Nếu tạo worker thất bại, có thể xóa user đã tạo hoặc để user tồn tại
          console.warn("⚠️ User created but worker profile failed")
        }
      }

      // Show success message
      Alert.alert(
        "Đăng ký thành công! 🎉",
        formData.role === "worker"
          ? "Tài khoản của bạn đã được tạo. Hồ sơ thợ đang chờ admin duyệt. Bạn sẽ nhận được thông báo khi được kích hoạt."
          : "Bạn có thể đăng nhập ngay bây giờ!",
        [
          {
            text: "Đăng nhập ngay",
            onPress: () => {
              onRegister()
            },
          },
        ],
      )
    } catch (error) {
      console.error("Registration error:", error)
      Alert.alert("Lỗi", error.message || "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role: role,
      specialty: "",
      certificate: "",
    }))
    setShowWorkerFields(role === "worker")
  }

  const registerContentStyle = {
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={registerContentStyle} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>📝</Text>
          <Text style={styles.title}>Đăng ký tài khoản</Text>
          <Text style={styles.subtitle}>Tạo tài khoản mới để sử dụng dịch vụ</Text>
        </View>

        <View style={styles.form}>
          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Loại tài khoản:</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[styles.roleButton, formData.role === "customer" && styles.activeRoleButton]}
                onPress={() => handleRoleChange("customer")}
                disabled={loading}
              >
                <Text style={[styles.roleButtonText, formData.role === "customer" && styles.activeRoleButtonText]}>
                  👤 Khách hàng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleButton, formData.role === "worker" && styles.activeRoleButton]}
                onPress={() => handleRoleChange("worker")}
                disabled={loading}
              >
                <Text style={[styles.roleButtonText, formData.role === "worker" && styles.activeRoleButtonText]}>
                  👨‍🔧 Thợ sửa chữa
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Basic Information */}
          <TextInput
            style={styles.input}
            placeholder="Họ và tên *"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Số điện thoại *"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            keyboardType="phone-pad"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Email *"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Khu vực (VD: Quận 1, TP.HCM) *"
            value={formData.area}
            onChangeText={(value) => handleInputChange("area", value)}
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Mật khẩu (ít nhất 6 ký tự) *"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu *"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            secureTextEntry
            editable={!loading}
          />

          {/* Worker-specific fields */}
          {showWorkerFields && (
            <>
              <View style={styles.workerFieldsContainer}>
                <Text style={styles.workerFieldsTitle}>Thông tin thợ sửa chữa</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Chuyên môn (VD: Thợ điện, Thợ nước) *"
                  value={formData.specialty}
                  onChangeText={(value) => handleInputChange("specialty", value)}
                  editable={!loading}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Chứng chỉ (nếu có)"
                  value={formData.certificate}
                  onChangeText={(value) => handleInputChange("certificate", value)}
                  editable={!loading}
                />

                <View style={styles.workerNote}>
                  <Text style={styles.workerNoteText}>
                    📝 Lưu ý: Hồ sơ thợ sẽ được lưu riêng và cần admin duyệt trước khi có thể nhận đơn hàng.
                  </Text>
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Đăng ký</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={onBackToLogin} disabled={loading}>
            <Text style={styles.registerButtonText}>Đã có tài khoản? Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen
