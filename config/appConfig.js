// appConfig.js - Cấu hình ứng dụng
export const __DEV__ = process.env.NODE_ENV !== "production"

// Các cấu hình khác có thể thêm vào đây
export const APP_CONFIG = {
  OTP_EXPIRY_TIME: 5 * 60 * 1000, // 5 phút
  MAX_OTP_ATTEMPTS: 3,
  RESEND_COOLDOWN: 60, // 60 giây
}
