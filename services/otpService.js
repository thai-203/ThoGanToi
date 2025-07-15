// import sendMailOTP from './sendMailOTP'

// class OTPService {
//   constructor() {
//     this.otpStorage = new Map() // phone -> {otp, expiry, attempts}
//     this.maxAttempts = 3
//     this.otpExpiry = 5 * 60 * 1000 // 5 minutes
//   }

//   generateOTP() {
//     return Math.floor(100000 + Math.random() * 900000).toString()
//   }

//   /**
//    * Gửi OTP về email (gmail)
//    * @param {string} email - Địa chỉ email nhận OTP
//    * @returns {Promise<boolean>}
//    */
//   async sendOTP(email) {
//     try {
//       // Validate email
//       if (!email || typeof email !== 'string' || !email.includes('@')) {
//         console.error('Invalid email')
//         return false
//       }

//       const otp = this.generateOTP()
//       const expiry = Date.now() + this.otpExpiry

//       // Store OTP data
//       this.otpStorage.set(email, {
//         otp,
//         expiry,
//         attempts: 0,
//         createdAt: Date.now(),
//       })

//       // Gửi OTP qua email
//       const sent = await sendMailOTP(email, otp)
//       if (!sent) {
//         this.otpStorage.delete(email)
//         return false
//       }
//       console.log(`📧 OTP sent to ${email}: ${otp}`)
//       return true
//     } catch (error) {
//       console.error('Send OTP error:', error)
//       return false
//     }
//   }

//   async verifyOTP(phone, inputOTP) {
//     try {
//       // Validate inputs
//       if (!phone || !inputOTP) {
//         console.error("Phone and OTP are required")
//         return false
//       }

//       // Clean phone number
//       const cleanPhone = phone.replace(/\D/g, "")

//       // Clean OTP input
//       const cleanOTP = inputOTP.replace(/\D/g, "")

//       if (cleanOTP.length !== 6) {
//         console.error("OTP must be 6 digits")
//         return false
//       }

//       const otpData = this.otpStorage.get(cleanPhone)

//       if (!otpData) {
//         console.error("No OTP found for this phone number")
//         return false
//       }

//       // Check if OTP expired
//       if (Date.now() > otpData.expiry) {
//         console.error("OTP has expired")
//         this.otpStorage.delete(cleanPhone)
//         return false
//       }

//       // Check attempts limit
//       if (otpData.attempts >= this.maxAttempts) {
//         console.error("Too many failed attempts")
//         this.otpStorage.delete(cleanPhone)
//         return false
//       }

//       // Verify OTP
//       if (otpData.otp === cleanOTP) {
//         console.log("✅ OTP verified successfully")
//         this.otpStorage.delete(cleanPhone) // Remove OTP after successful verification
//         return true
//       } else {
//         // Increment failed attempts
//         otpData.attempts++
//         console.error(`❌ Invalid OTP. Attempts: ${otpData.attempts}/${this.maxAttempts}`)

//         if (otpData.attempts >= this.maxAttempts) {
//           this.otpStorage.delete(cleanPhone)
//         }

//         return false
//       }
//     } catch (error) {
//       console.error("Verify OTP error:", error)
//       return false
//     }
//   }

//   clearOTP(phone) {
//     try {
//       const cleanPhone = phone.replace(/\D/g, "")
//       const deleted = this.otpStorage.delete(cleanPhone)
//       console.log(`OTP cleared for ${cleanPhone}: ${deleted}`)
//       return deleted
//     } catch (error) {
//       console.error("Clear OTP error:", error)
//       return false
//     }
//   }

//   // Get remaining time for OTP expiry
//   getRemainingTime(phone) {
//     try {
//       const cleanPhone = phone.replace(/\D/g, "")
//       const otpData = this.otpStorage.get(cleanPhone)

//       if (!otpData) {
//         return 0
//       }

//       const remaining = Math.max(0, otpData.expiry - Date.now())
//       return Math.ceil(remaining / 1000) // Return seconds
//     } catch (error) {
//       console.error("Get remaining time error:", error)
//       return 0
//     }
//   }

//   // Get OTP attempts count
//   getAttempts(phone) {
//     try {
//       const cleanPhone = phone.replace(/\D/g, "")
//       const otpData = this.otpStorage.get(cleanPhone)

//       return otpData ? otpData.attempts : 0
//     } catch (error) {
//       console.error("Get attempts error:", error)
//       return 0
//     }
//   }

//   // For development/testing purposes only
//   getOTP(phone) {
//     if (process.env.NODE_ENV !== "development") {
//       console.warn("getOTP should only be used in development")
//       return null
//     }

//     try {
//       const cleanPhone = phone.replace(/\D/g, "")
//       const otpData = this.otpStorage.get(cleanPhone)
//       return otpData ? otpData.otp : null
//     } catch (error) {
//       console.error("Get OTP error:", error)
//       return null
//     }
//   }

//   // Clean up expired OTPs (call periodically)
//   cleanupExpiredOTPs() {
//     try {
//       const now = Date.now()
//       let cleanedCount = 0

//       for (const [phone, otpData] of this.otpStorage.entries()) {
//         if (now > otpData.expiry) {
//           this.otpStorage.delete(phone)
//           cleanedCount++
//         }
//       }

//       if (cleanedCount > 0) {
//         console.log(`🧹 Cleaned up ${cleanedCount} expired OTPs`)
//       }

//       return cleanedCount
//     } catch (error) {
//       console.error("Cleanup expired OTPs error:", error)
//       return 0
//     }
//   }

//   // Get statistics (for debugging)
//   getStats() {
//     try {
//       const stats = {
//         totalOTPs: this.otpStorage.size,
//         activeOTPs: 0,
//         expiredOTPs: 0,
//       }

//       const now = Date.now()
//       for (const otpData of this.otpStorage.values()) {
//         if (now <= otpData.expiry) {
//           stats.activeOTPs++
//         } else {
//           stats.expiredOTPs++
//         }
//       }

//       return stats
//     } catch (error) {
//       console.error("Get stats error:", error)
//       return { totalOTPs: 0, activeOTPs: 0, expiredOTPs: 0 }
//     }
//   }
// }

// // Create singleton instance
// const otpService = new OTPService()

// // Auto cleanup expired OTPs every 10 minutes
// setInterval(
//   () => {
//     otpService.cleanupExpiredOTPs()
//   },
//   10 * 60 * 1000,
// )

// export default otpService

import FirebaseService from './firebaseService';

class OtpService {
  constructor() {
    this.basePath = 'otps';
  }

  // Gửi và lưu OTP mới
  async sendOtp(otpCode, userId) {
    try {
      const data = {
        otp: otpCode,
        userId,
        verified: false,
        createdAt: Date.now(),
      };
      const otpId = await FirebaseService.create(this.basePath, data);
      return otpId;
    } catch (error) {
      console.error('❌ Error sending OTP:', error);
      return null;
    }
  }

  // Lấy OTP mới nhất theo userId
  async getLatestOtpByUserId(userId) {
    try {
      const otps = await FirebaseService.queryByField(
        this.basePath,
        'userId',
        userId
      );
      // Sắp xếp theo createdAt giảm dần để lấy OTP mới nhất
      const sortedOtps = otps.sort((a, b) => b.createdAt - a.createdAt);
      return sortedOtps[0] || null;
    } catch (error) {
      console.error('❌ Error getting latest OTP by userId:', error);
      return null;
    }
  }

  // Xác thực OTP
  async verifyOtp(userId, inputOtp, expireMs = 5 * 60 * 1000) {
    const otpData = await this.getLatestOtpByUserId(userId);
    if (!otpData) {
      return { success: false, message: 'Không tìm thấy mã OTP' };
    }

    const now = Date.now();

    if (otpData.verified) {
      return { success: false, message: 'Mã OTP đã được sử dụng' };
    }

    if (otpData.otp !== inputOtp) {
      return { success: false, message: 'Mã OTP không đúng' };
    }

    if (now - otpData.createdAt > expireMs) {
      return { success: false, message: 'Mã OTP đã hết hạn' };
    }

    // Cập nhật trạng thái verified = true
    await FirebaseService.update(`${this.basePath}/${otpData.id}`, {
      verified: true,
    });

    return { success: true, message: 'Xác thực thành công' };
  }

  // Xoá toàn bộ OTP của 1 user (nếu cần)
  async deleteOtpsByUserId(userId) {
    const otps = await FirebaseService.queryByField(
      this.basePath,
      'userId',
      userId
    );
    for (const otp of otps) {
      await FirebaseService.delete(`${this.basePath}/${otp.id}`);
    }
  }
}

export default new OtpService();
