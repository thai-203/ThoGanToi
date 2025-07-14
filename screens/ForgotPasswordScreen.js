"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigation } from "@react-navigation/native"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { auth } from "../config/firebase"
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth"
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"
import UserService from "../services/userService"

const ForgotPasswordScreen = ({ onPasswordResetSuccess, onBackToLogin, onNavigateToLogin }) => {
  const [step, setStep] = useState(1) // 1: Phone, 2: OTP, 3: New Password
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState("")
  const [verificationId, setVerificationId] = useState(null)
  const recaptchaVerifier = useRef(null)
  let navigation = null;
  try {
    navigation = useNavigation();
  } catch (e) {
    navigation = null;
  }

  // Countdown timer for resend OTP
  useEffect(() => {
    let interval = null
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [countdown])

  // Chấp nhận cả 0xxxxxxxxx và +84xxxxxxxxx
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^(0[0-9]{9,10}|\+84[0-9]{9,10})$/;
    return phoneRegex.test(phoneNumber);
  }

  // Chuyển số về định dạng quốc tế nếu cần
  const getInternationalPhone = (phone) => {
    if (phone.startsWith("+84")) return phone;
    if (phone.startsWith("0")) return "+84" + phone.slice(1);
    return phone;
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const handleSendOTP = async () => {
    try {
      setError("")
      if (!phone.trim()) {
        setError("Vui lòng nhập số điện thoại")
        return
      }
      if (!validatePhone(phone)) {
        setError("Số điện thoại không hợp lệ (10-11 số)")
        return
      }
      setLoading(true)
      // Check if phone exists in database
      const phoneExists = await UserService.phoneExists(phone)
      if (!phoneExists) {
        setError("Số điện thoại không tồn tại trong hệ thống")
        setLoading(false)
        return
      }
      // Send OTP qua Firebase
      const provider = new PhoneAuthProvider(auth)
      const phoneToSend = getInternationalPhone(phone)
      const id = await provider.verifyPhoneNumber(
        phoneToSend,
        recaptchaVerifier.current
      )
      setVerificationId(id)
      setStep(2)
      setCountdown(60)
      Alert.alert("Thành công", `Mã OTP đã được gửi đến ${phone}`)
    } catch (error) {
      setError("Không thể gửi mã OTP. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    try {
      setError("")
      if (!otp.trim()) {
        setError("Vui lòng nhập mã OTP")
        return
      }
      if (otp.length !== 6) {
        setError("Mã OTP phải có 6 số")
        return
      }
      setLoading(true)
      const credential = PhoneAuthProvider.credential(verificationId, otp)
      await signInWithCredential(auth, credential)
      setStep(3)
      Alert.alert("Thành công", "Mã OTP hợp lệ")
    } catch (error) {
      setError("Mã OTP không đúng hoặc đã hết hạn")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (countdown > 0) return
    try {
      setError("")
      setLoading(true)
      const provider = new PhoneAuthProvider(auth)
      const phoneToSend = getInternationalPhone(phone)
      const id = await provider.verifyPhoneNumber(
        phoneToSend,
        recaptchaVerifier.current
      )
      setVerificationId(id)
      setCountdown(60)
      Alert.alert("Thành công", "Mã OTP mới đã được gửi")
    } catch (error) {
      setError("Không thể gửi lại mã OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    try {
      setError("")

      if (!newPassword.trim()) {
        setError("Vui lòng nhập mật khẩu mới")
        return
      }

      if (!validatePassword(newPassword)) {
        setError("Mật khẩu phải có ít nhất 6 ký tự")
        return
      }

      if (newPassword !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp")
        return
      }

      setLoading(true)

      // Đặt lại mật khẩu qua số điện thoại
      const resetSuccess = await UserService.resetPasswordByPhone(phone, newPassword)
      if (resetSuccess) {
        Alert.alert("Thành công", "Mật khẩu đã được đặt lại thành công", [
          {
            text: "OK",
            onPress: () => {
              // if (onPasswordResetSuccess) {
              //   onPasswordResetSuccess()
              // } else if (onNavigateToLogin) {
              //   onNavigateToLogin()
              // }
              onBackToLogin()
            },
          },
        ])
      } else {
        setError("Không thể đặt lại mật khẩu. Vui lòng thử lại.")
      }
    } catch (error) {
      console.error("Reset password error:", error)
      setError("Có lỗi xảy ra khi đặt lại mật khẩu")
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    // Reset lại các state khi quay lại đăng nhập
    setStep(1);
    setPhone("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setCountdown(0);
    setVerificationId(null);
    if (onBackToLogin) {
      onBackToLogin();
    } else if (navigation && navigation.navigate) {
      try {
        navigation.navigate("Login");
      } catch (e) {
        // ignore
      }
    } else if (onPasswordResetSuccess) {
      onPasswordResetSuccess();
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Nhập số điện thoại</Text>
            <Text style={styles.stepDescription}>Nhập số điện thoại đã đăng ký để nhận mã OTP</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={text => setPhone(text.replace(/[^0-9+]/g, ""))}
                keyboardType="number-pad"
                autoFocus
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.disabledButton]}
              onPress={handleSendOTP}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Gửi mã OTP</Text>}
            </TouchableOpacity>
          </View>
        )

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Nhập mã OTP</Text>
            <Text style={styles.stepDescription}>Mã OTP đã được gửi đến {phone}</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nhập mã OTP (6 số)"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.disabledButton]}
              onPress={handleVerifyOTP}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryButtonText}>Xác thực OTP</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, (countdown > 0 || loading) && styles.disabledButton]}
              onPress={handleResendOTP}
              disabled={countdown > 0 || loading}
            >
              <Text style={[styles.secondaryButtonText, (countdown > 0 || loading) && styles.disabledText]}>
                {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi lại mã OTP"}
              </Text>
            </TouchableOpacity>
          </View>
        )

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Đặt mật khẩu mới</Text>
            <Text style={styles.stepDescription}>Nhập mật khẩu mới cho tài khoản của bạn</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoFocus
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.disabledButton]}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryButtonText}>Đặt lại mật khẩu</Text>
              )}
            </TouchableOpacity>
          </View>
        )

      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed" size={50} color="#4A90E2" />
            </View>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <View style={styles.stepIndicator}>
              <Text style={styles.stepText}>Bước {step}/3</Text>
            </View>
          </View>

          {renderStepContent()}

          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <Ionicons name="arrow-back" size={20} color="#4A90E2" />
            <Text style={styles.backButtonText}>Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  stepIndicator: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  stepText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  primaryButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  secondaryButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  disabledText: {
    color: "#999",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingVertical: 10,
  },
  backButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    marginLeft: 5,
    fontWeight: "500",
  },
})

export default ForgotPasswordScreen
