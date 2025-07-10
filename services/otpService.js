import { __DEV__ } from "../config/appConfig" // Import __DEV__ variable

class OTPService {
  constructor() {
    this.otpStorage = new Map() // Lưu tạm OTP trong memory (production nên dùng Redis)
    this.otpExpiry = 5 * 60 * 1000 // 5 phút
  }

  // Tạo mã OTP 6 số
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Gửi OTP (giả lập gửi SMS)
  async sendOTP(phone) {
    try {
      const otp = this.generateOTP()
      const expiryTime = Date.now() + this.otpExpiry

      // Lưu OTP với thời gian hết hạn
      this.otpStorage.set(phone, {
        otp: otp,
        expiryTime: expiryTime,
        attempts: 0,
      })

      // Giả lập gửi SMS (trong thực tế sẽ tích hợp với Twilio, Firebase SMS, etc.)
      console.log(`📱 SMS sent to ${phone}: Your OTP is ${otp}`)

      // Trong môi trường development, hiển thị OTP
      if (__DEV__) {
        console.log(`🔐 DEBUG - OTP for ${phone}: ${otp}`)
      }

      return {
        success: true,
        message: "Mã OTP đã được gửi đến số điện thoại của bạn",
        // Trong development, trả về OTP để test
        ...(__DEV__ ? { otp: otp } : {}),
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      return {
        success: false,
        message: "Không thể gửi mã OTP. Vui lòng thử lại.",
      }
    }
  }

  // Xác thực OTP
  verifyOTP(phone, inputOTP) {
    try {
      const otpData = this.otpStorage.get(phone)

      if (!otpData) {
        return {
          success: false,
          message: "Không tìm thấy mã OTP. Vui lòng yêu cầu gửi lại.",
        }
      }

      // Kiểm tra hết hạn
      if (Date.now() > otpData.expiryTime) {
        this.otpStorage.delete(phone)
        return {
          success: false,
          message: "Mã OTP đã hết hạn. Vui lòng yêu cầu gửi lại.",
        }
      }

      // Kiểm tra số lần thử
      if (otpData.attempts >= 3) {
        this.otpStorage.delete(phone)
        return {
          success: false,
          message: "Bạn đã nhập sai quá nhiều lần. Vui lòng yêu cầu gửi lại.",
        }
      }

      // Kiểm tra OTP
      if (otpData.otp === inputOTP.toString()) {
        this.otpStorage.delete(phone) // Xóa OTP sau khi xác thực thành công
        return {
          success: true,
          message: "Xác thực thành công!",
        }
      } else {
        // Tăng số lần thử
        otpData.attempts += 1
        this.otpStorage.set(phone, otpData)

        return {
          success: false,
          message: `Mã OTP không đúng. Còn ${3 - otpData.attempts} lần thử.`,
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      return {
        success: false,
        message: "Lỗi xác thực. Vui lòng thử lại.",
      }
    }
  }

  // Xóa OTP (khi user hủy hoặc timeout)
  clearOTP(phone) {
    this.otpStorage.delete(phone)
  }

  // Kiểm tra OTP còn hiệu lực
  isOTPValid(phone) {
    const otpData = this.otpStorage.get(phone)
    if (!otpData) return false
    return Date.now() <= otpData.expiryTime
  }

  // Lấy thời gian còn lại của OTP
  getOTPTimeRemaining(phone) {
    const otpData = this.otpStorage.get(phone)
    if (!otpData) return 0

    const remaining = otpData.expiryTime - Date.now()
    return Math.max(0, Math.ceil(remaining / 1000)) // Trả về giây
  }
}

export default new OTPService()
