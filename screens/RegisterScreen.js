import { useState, useEffect } from "react"
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
import ServiceService from "../services/serviceService"

const RegisterScreen = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    serviceId: [],
    experience: "",
    certificate: "",
    address: "",
  })

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const allServices = await ServiceService.getActiveServices()
        setServices(allServices)
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }
    fetchServices()
  }, [])

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const { name, phone, email, password, confirmPassword, role, serviceId, experience } = formData

    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin")
      return false
    }

    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/
    if (!phoneRegex.test(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ")
      return false
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp")
      return false
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự")
      return false
    }

    if (role === "worker" && (!serviceId.length || !experience.trim())) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một chuyên môn và nhập kinh nghiệm")
      return false
    }

    return true
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)

      const phoneExists = await UserService.phoneExists(formData.phone)
      if (phoneExists) {
        Alert.alert("Lỗi", "Số điện thoại đã được sử dụng")
        return
      }

      const emailExists = await UserService.emailExists(formData.email)
      if (emailExists) {
        Alert.alert("Lỗi", "Email đã được sử dụng")
        return
      }

      const userData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.role === "worker" ? "pending" : "active",
        joinDate: new Date().toISOString().split("T")[0],
        address: formData.address || "TP.HCM",
        avatar: formData.role === "worker" ? "👨‍🔧" : "👤",
      }

      const userId = await UserService.createUser(userData)

      if (formData.role === "worker") {
        const selectedServiceNames = services
          .filter((s) => formData.serviceId.includes(s.id))
          .map((s) => s.name)
          .join(", ")

        const workerData = {
          userId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          specialty: selectedServiceNames || "Không rõ",
          serviceId: formData.serviceId,
          experience: formData.experience,
          certificate: formData.certificate,
          address: formData.address || "Hà Nội",
          status: "false",
          rating: 0,
          completedOrders: 0,
          price: "Thỏa thuận",
          avatar: "👨‍🔧",
          reviews: 0,
        }

        await WorkerService.createWorker(workerData)
      }

      Alert.alert(
        "Đăng ký thành công!",
        formData.role === "worker"
          ? "Tài khoản thợ đã được tạo và đang chờ phê duyệt từ admin."
          : "Tài khoản đã được tạo thành công. Bạn có thể đăng nhập ngay.",
        [{ text: "OK", onPress: onRegister }]
      )
    } catch (error) {
      console.error("Registration error:", error)
      Alert.alert("Lỗi", "Đăng ký thất bại. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  const toggleService = (serviceId) => {
    const isSelected = formData.serviceId.includes(serviceId)
    const updatedServiceIds = isSelected
      ? formData.serviceId.filter((id) => id !== serviceId)
      : [...formData.serviceId, serviceId]
    updateFormData("serviceId", updatedServiceIds)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>📝</Text>
            <Text style={styles.title}>Đăng ký tài khoản</Text>
            <Text style={styles.subtitle}>Tạo tài khoản mới để sử dụng dịch vụ</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Loại tài khoản</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity
                  style={[styles.roleButton, formData.role === "customer" && styles.activeRoleButton]}
                  onPress={() => updateFormData("role", "customer")}
                >
                  <Text style={[styles.roleButtonText, formData.role === "customer" && styles.activeRoleButtonText]}>
                    👤 Khách hàng
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.roleButton, formData.role === "worker" && styles.activeRoleButton]}
                  onPress={() => updateFormData("role", "worker")}
                >
                  <Text style={[styles.roleButtonText, formData.role === "worker" && styles.activeRoleButtonText]}>
                    🔧 Thợ sửa chữa
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              value={formData.name}
              onChangeText={(value) => updateFormData("name", value)}
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={formData.phone}
              onChangeText={(value) => updateFormData("phone", value)}
              keyboardType="phone-pad"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
              secureTextEntry
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData("confirmPassword", value)}
              secureTextEntry
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Khu vực (VD: Quận 1, TP.HCM)"
              value={formData.address}
              onChangeText={(value) => updateFormData("address", value)}
              editable={!loading}
            />

            {formData.role === "worker" && (
              <View style={styles.workerFieldsContainer}>
                <Text style={styles.workerFieldsTitle}>Thông tin thợ</Text>

                <View style={styles.multiSelectContainer}>
                  <Text style={styles.multiSelectLabel}>Chọn chuyên môn</Text>
                  {services.map((service) => {
                    const isSelected = formData.serviceId.includes(service.id)
                    return (
                      <TouchableOpacity
                        key={service.id}
                        style={[
                          styles.serviceItem,
                          isSelected && styles.serviceItemSelected,
                        ]}
                        onPress={() => toggleService(service.id)}
                        disabled={loading}
                      >
                        <Text style={isSelected ? styles.serviceTextSelected : styles.serviceText}>
                          {isSelected ? "✅ " : "☑️ "} {service.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Kinh nghiệm (VD: 5 năm kinh nghiệm)"
                  value={formData.experience}
                  onChangeText={(value) => updateFormData("experience", value)}
                  editable={!loading}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Chứng chỉ (tùy chọn)"
                  value={formData.certificate}
                  onChangeText={(value) => updateFormData("certificate", value)}
                  editable={!loading}
                />

                <View style={styles.workerNote}>
                  <Text style={styles.workerNoteText}>
                    📝 Lưu ý: Tài khoản thợ sẽ được admin xem xét và phê duyệt trước khi có thể sử dụng.
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Đăng ký</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={onBackToLogin}>
              <Text style={styles.registerButtonText}>← Đã có tài khoản? Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen
