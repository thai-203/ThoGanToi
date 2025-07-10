"use client"

import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from "react-native"
import { styles } from "../styles/styles"
import UserService from "../services/userService"
import OTPService from "../services/otpService"

const ForgotPasswordScreen = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1) // 1: Nhập SĐT, 2: Nhập OTP, 3: Đổi MK
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [canResend, setCanResend] = useState(true)

  // Countdown timer cho resend OTP
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  // Bước 1: Kiểm tra số điện thoại và gửi OTP
  const handleSendOTP = async () => {
    if (!phone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại")
      return
    }

    if (phone.length < 10) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ")
      return
    }

    try {
      setLoading(true)

      // Kiểm tra số điện thoại có tồn tại không
      const users = await UserService.getAllUsers()
      const userExists = users.some((user) => user.phone === phone.trim())

      if (!userExists) {
        Alert.alert("Lỗi", "Số điện thoại này chưa được đăng ký")
        return
      }

      // Gửi OTP
      const result = await OTPService.sendOTP(phone.trim())

      if (result.success) {
        Alert.alert("Thành công", result.message, [
          {
            text: "OK",
            onPress: () => {
              setStep(2)
              setCountdown(60) // 60 giây countdown
              setCanResend(false)
            },
          },
        ])

        // Trong development mode, hiển thị OTP
        if (result.otp) {
          console.log(`🔐 OTP for testing: ${result.otp}`)
        }
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

  // Bước 2: Xác thực OTP
  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mã OTP")
      return
    }

    if (otp.length !== 6) {
      Alert.alert("Lỗi", "Mã OTP phải có 6 số")
      return
    }

    try {
      setLoading(true)

      const result = OTPService.verifyOTP(phone.trim(), otp.trim())

      if (result.success) {
        Alert.alert("Thành công", result.message, [
          {
            text: "OK",
            onPress: () => setStep(3),
          },
        ])
      } else {
        Alert.alert("Lỗi", result.message)
        if (result.message.includes("yêu cầu gửi lại")) {
          setStep(1)
          setOtp("")
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      Alert.alert("Lỗi", "Lỗi xác thực. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  // Bước 3: Đổi mật khẩu
  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới")
      return
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp")
      return
    }

    try {
      setLoading(true)

      // Tìm user theo số điện thoại
      const users = await UserService.getAllUsers()
      const user = users.find((u) => u.phone === phone.trim())

      if (!user) {
        Alert.alert("Lỗi", "Không tìm thấy tài khoản")
        return
      }

      // Cập nhật mật khẩu mới vào Firebase
      await UserService.updateUser(user.id, {
        password: newPassword.trim(),
        updatedAt: Date.now(),
      })

      Alert.alert("Thành công! 🎉", "Mật khẩu đã được thay đổi thành công. Bạn có thể đăng nhập với mật khẩu mới.", [
        {
          text: "Đăng nhập ngay",
          onPress: onBackToLogin,
        },
      ])
    } catch (error) {
      console.error("Error resetting password:", error)
      Alert.alert("Lỗi", "Không thể thay đổi mật khẩu. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  // Gửi lại OTP
  const handleResendOTP = async () => {
    if (!canResend) return

    try {
      setLoading(true)
      const result = await OTPService.sendOTP(phone.trim())

      if (result.success) {
        Alert.alert("Thành công", "Mã OTP mới đã được gửi")
        setCountdown(60)
        setCanResend(false)
        setOtp("")

        // Trong development mode
        if (result.otp) {
          console.log(`🔐 New OTP for testing: ${result.otp}`)
        }
      } else {
        Alert.alert("Lỗi", result.message)
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi lại mã OTP")
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.logo}>🔐</Text>
        <Text style={styles.title}>Quên mật khẩu</Text>
        <Text style={styles.subtitle}>Nhập số điện thoại để nhận mã xác thực</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại đã đăng ký"
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
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Gửi mã xác thực</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={onBackToLogin} disabled={loading}>
          <Text style={styles.registerButtonText}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </>
  )

  const renderStep2 = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.logo}>📱</Text>
        <Text style={styles.title}>Xác thực OTP</Text>
        <Text style={styles.subtitle}>Mã xác thực đã được gửi đến {phone}</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, styles.otpInput]}
          placeholder="Nhập mã OTP (6 số)"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.7 }]}
          onPress={handleVerifyOTP}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Xác thực</Text>}
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          {countdown > 0 ? (
            <Text style={styles.countdownText}>Gửi lại mã sau {countdown}s</Text>
          ) : (
            <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP} disabled={loading}>
              <Text style={styles.resendButtonText}>Gửi lại mã OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={() => setStep(1)} disabled={loading}>
          <Text style={styles.registerButtonText}>Thay đổi số điện thoại</Text>
        </TouchableOpacity>
      </View>
    </>
  )

  const renderStep3 = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.logo}>🔑</Text>
        <Text style={styles.title}>Đặt mật khẩu mới</Text>
        <Text style={styles.subtitle}>Nhập mật khẩu mới cho tài khoản của bạn</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới (ít nhất 6 ký tự)"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu mới"
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
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Đổi mật khẩu</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={onBackToLogin} disabled={loading}>
          <Text style={styles.registerButtonText}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </View>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen
