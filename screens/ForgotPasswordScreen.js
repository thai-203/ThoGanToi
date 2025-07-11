import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from "react-native"
import { styles } from "../styles/styles"
import OTPService from "../services/otpService"
import UserService from "../services/userService"

const ForgotPasswordScreen = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1) // 1: Phone, 2: OTP, 3: New Password
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Step 1: Send OTP
  const handleSendOTP = async () => {
    if (!phone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại")
      return
    }

    try {
      setLoading(true)

      // Check if phone exists
      const phoneExists = await UserService.phoneExists(phone)
      if (!phoneExists) {
        Alert.alert("Lỗi", "Số điện thoại không tồn tại trong hệ thống")
        return
      }

      const result = await OTPService.sendOTP(phone)
      if (result.success) {
        Alert.alert("Thành công", result.message)
        setStep(2)
        startCountdown()
      } else {
        Alert.alert("Lỗi", result.message)
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      Alert.alert("Lỗi", "Không thể gửi mã OTP. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mã OTP")
      return
    }

    const result = await OTPService.verifyOTP(phone, otp)
    if (result.success) {
      Alert.alert("Thành công", result.message)
      setStep(3)
    } else {
      Alert.alert("Lỗi", result.message)
    }
  }

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin")
      return
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp")
      return
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    try {
      setLoading(true)

      // Update password in database
      const users = await UserService.getAllUsers()
      const user = users.find((u) => u.phone === phone)

      if (user) {
        await UserService.updateUser(user.id, { password: newPassword })
        Alert.alert("Thành công", "Đặt lại mật khẩu thành công!", [{ text: "OK", onPress: onBackToLogin }])
      } else {
        Alert.alert("Lỗi", "Không tìm thấy người dùng")
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      Alert.alert("Lỗi", "Không thể đặt lại mật khẩu. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleResendOTP = async () => {
    if (countdown > 0) return
    await handleSendOTP()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🔐</Text>
          <Text style={styles.title}>
            {step === 1 && "Quên mật khẩu"}
            {step === 2 && "Xác thực OTP"}
            {step === 3 && "Đặt lại mật khẩu"}
          </Text>
          <Text style={styles.subtitle}>
            {step === 1 && "Nhập số điện thoại để nhận mã OTP"}
            {step === 2 && "Nhập mã OTP đã gửi đến số điện thoại"}
            {step === 3 && "Nhập mật khẩu mới"}
          </Text>
        </View>

        <View style={styles.form}>
          {step === 1 && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={!loading}
              />
              <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.7 }]}
                onPress={handleSendOTP}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Gửi mã OTP</Text>}
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <TextInput
                style={[styles.input, styles.otpInput]}
                placeholder="Nhập mã OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
                editable={!loading}
              />

              <View style={styles.resendContainer}>
                {countdown > 0 ? (
                  <Text style={styles.countdownText}>Gửi lại mã sau {countdown}s</Text>
                ) : (
                  <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
                    <Text style={styles.resendButtonText}>Gửi lại mã OTP</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.7 }]}
                onPress={handleVerifyOTP}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>Xác thực</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 3 && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
              />
              <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.7 }]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.loginButtonText}>Đặt lại mật khẩu</Text>
                )}
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.registerButton} onPress={onBackToLogin}>
            <Text style={styles.registerButtonText}>← Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen
