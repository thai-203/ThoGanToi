class OTPService {
  constructor() {
    this.otpStorage = new Map() // phone -> {otp, expiry, attempts}
    this.maxAttempts = 3
    this.otpExpiry = 5 * 60 * 1000 // 5 minutes
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  async sendOTP(phone) {
    try {
      // Validate phone number
      if (!phone || typeof phone !== "string") {
        console.error("Invalid phone number")
        return false
      }

      // Clean phone number (remove spaces, dashes, etc.)
      const cleanPhone = phone.replace(/\D/g, "")

      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        console.error("Phone number must be 10-11 digits")
        return false
      }

      const otp = this.generateOTP()
      const expiry = Date.now() + this.otpExpiry

      // Store OTP data
      this.otpStorage.set(cleanPhone, {
        otp,
        expiry,
        attempts: 0,
        createdAt: Date.now(),
      })

      // Simulate SMS sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Log OTP for development (remove in production)
      console.log(`📱 OTP sent to ${cleanPhone}: ${otp}`)
      console.log(`⏰ OTP expires at: ${new Date(expiry).toLocaleTimeString()}`)

      // In real app, integrate with SMS service like:
      // - Firebase Auth Phone Authentication
      // - Twilio SMS API
      // - AWS SNS
      // - Other SMS providers

      return true
    } catch (error) {
      console.error("Send OTP error:", error)
      return false
    }
  }

  async verifyOTP(phone, inputOTP) {
    try {
      // Validate inputs
      if (!phone || !inputOTP) {
        console.error("Phone and OTP are required")
        return false
      }

      // Clean phone number
      const cleanPhone = phone.replace(/\D/g, "")

      // Clean OTP input
      const cleanOTP = inputOTP.replace(/\D/g, "")

      if (cleanOTP.length !== 6) {
        console.error("OTP must be 6 digits")
        return false
      }

      const otpData = this.otpStorage.get(cleanPhone)

      if (!otpData) {
        console.error("No OTP found for this phone number")
        return false
      }

      // Check if OTP expired
      if (Date.now() > otpData.expiry) {
        console.error("OTP has expired")
        this.otpStorage.delete(cleanPhone)
        return false
      }

      // Check attempts limit
      if (otpData.attempts >= this.maxAttempts) {
        console.error("Too many failed attempts")
        this.otpStorage.delete(cleanPhone)
        return false
      }

      // Verify OTP
      if (otpData.otp === cleanOTP) {
        console.log("✅ OTP verified successfully")
        this.otpStorage.delete(cleanPhone) // Remove OTP after successful verification
        return true
      } else {
        // Increment failed attempts
        otpData.attempts++
        console.error(`❌ Invalid OTP. Attempts: ${otpData.attempts}/${this.maxAttempts}`)

        if (otpData.attempts >= this.maxAttempts) {
          this.otpStorage.delete(cleanPhone)
        }

        return false
      }
    } catch (error) {
      console.error("Verify OTP error:", error)
      return false
    }
  }

  clearOTP(phone) {
    try {
      const cleanPhone = phone.replace(/\D/g, "")
      const deleted = this.otpStorage.delete(cleanPhone)
      console.log(`OTP cleared for ${cleanPhone}: ${deleted}`)
      return deleted
    } catch (error) {
      console.error("Clear OTP error:", error)
      return false
    }
  }

  // Get remaining time for OTP expiry
  getRemainingTime(phone) {
    try {
      const cleanPhone = phone.replace(/\D/g, "")
      const otpData = this.otpStorage.get(cleanPhone)

      if (!otpData) {
        return 0
      }

      const remaining = Math.max(0, otpData.expiry - Date.now())
      return Math.ceil(remaining / 1000) // Return seconds
    } catch (error) {
      console.error("Get remaining time error:", error)
      return 0
    }
  }

  // Get OTP attempts count
  getAttempts(phone) {
    try {
      const cleanPhone = phone.replace(/\D/g, "")
      const otpData = this.otpStorage.get(cleanPhone)

      return otpData ? otpData.attempts : 0
    } catch (error) {
      console.error("Get attempts error:", error)
      return 0
    }
  }

  // For development/testing purposes only
  getOTP(phone) {
    if (process.env.NODE_ENV !== "development") {
      console.warn("getOTP should only be used in development")
      return null
    }

    try {
      const cleanPhone = phone.replace(/\D/g, "")
      const otpData = this.otpStorage.get(cleanPhone)
      return otpData ? otpData.otp : null
    } catch (error) {
      console.error("Get OTP error:", error)
      return null
    }
  }

  // Clean up expired OTPs (call periodically)
  cleanupExpiredOTPs() {
    try {
      const now = Date.now()
      let cleanedCount = 0

      for (const [phone, otpData] of this.otpStorage.entries()) {
        if (now > otpData.expiry) {
          this.otpStorage.delete(phone)
          cleanedCount++
        }
      }

      if (cleanedCount > 0) {
        console.log(`🧹 Cleaned up ${cleanedCount} expired OTPs`)
      }

      return cleanedCount
    } catch (error) {
      console.error("Cleanup expired OTPs error:", error)
      return 0
    }
  }

  // Get statistics (for debugging)
  getStats() {
    try {
      const stats = {
        totalOTPs: this.otpStorage.size,
        activeOTPs: 0,
        expiredOTPs: 0,
      }

      const now = Date.now()
      for (const otpData of this.otpStorage.values()) {
        if (now <= otpData.expiry) {
          stats.activeOTPs++
        } else {
          stats.expiredOTPs++
        }
      }

      return stats
    } catch (error) {
      console.error("Get stats error:", error)
      return { totalOTPs: 0, activeOTPs: 0, expiredOTPs: 0 }
    }
  }
}

// Create singleton instance
const otpService = new OTPService()

// Auto cleanup expired OTPs every 10 minutes
setInterval(
  () => {
    otpService.cleanupExpiredOTPs()
  },
  10 * 60 * 1000,
)

export default otpService
