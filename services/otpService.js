class OTPService {
  constructor() {
    this.otpStorage = new Map() // phone -> {otp, expiry, attempts}
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  async sendOTP(phone) {
    try {
      const otp = this.generateOTP()
      const expiry = Date.now() + 5 * 60 * 1000 // 5 minutes

      this.otpStorage.set(phone, {
        otp,
        expiry,
        attempts: 0,
      })

      // Simulate SMS sending
      console.log(`📱 OTP sent to ${phone}: ${otp}`)

      // In real app, integrate with SMS service like Twilio, Firebase Auth, etc.
      return true
    } catch (error) {
      console.error("Send OTP error:", error)
      return false
    }
  }

  async verifyOTP(phone, inputOTP) {
    try {
      const otpData = this.otpStorage.get(phone)

      if (!otpData) {
        return false // No OTP found
      }

      if (Date.now() > otpData.expiry) {
        this.otpStorage.delete(phone)
        return false // OTP expired
      }

      if (otpData.attempts >= 3) {
        this.otpStorage.delete(phone)
        return false // Too many attempts
      }

      if (otpData.otp === inputOTP) {
        this.otpStorage.delete(phone)
        return true // Valid OTP
      } else {
        otpData.attempts++
        return false // Invalid OTP
      }
    } catch (error) {
      console.error("Verify OTP error:", error)
      return false
    }
  }

  clearOTP(phone) {
    this.otpStorage.delete(phone)
  }

  // For testing purposes
  getOTP(phone) {
    const otpData = this.otpStorage.get(phone)
    return otpData ? otpData.otp : null
  }
}

export default new OTPService()
