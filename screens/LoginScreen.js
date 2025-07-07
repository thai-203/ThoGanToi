import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from "react-native"
import { styles } from "../styles/styles"
// Cập nhật import để thêm users data
import { users } from "../data/mockData"

const LoginScreen = ({ onLogin }) => {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  // Cập nhật hàm handleLogin
  const handleLogin = () => {
    if (phone && password) {
      // Tìm user trong database
      const user = users.find((u) => u.phone === phone && u.password === password)

      if (user) {
        onLogin(user.role, user)
      } else {
        Alert.alert("Lỗi", "Số điện thoại hoặc mật khẩu không đúng")
      }
    } else {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🔧</Text>
          <Text style={styles.title}>Thợ Gần Tôi</Text>
          <Text style={styles.subtitle}>Tìm thợ sửa chữa gần bạn</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {/* Xóa Switch component và isWorker state vì không cần nữa
          Thay thế bằng text hướng dẫn */}
          <View style={styles.loginInfo}>
            <Text style={styles.loginInfoText}>Tài khoản demo:</Text>
            <Text style={styles.loginInfoText}>• Admin: 0123456789</Text>
            <Text style={styles.loginInfoText}>• Customer: 0111111111</Text>
            <Text style={styles.loginInfoText}>• Worker: 0444444444</Text>
            <Text style={styles.loginInfoText}>Mật khẩu: 123456</Text>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Chưa có tài khoản? Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
