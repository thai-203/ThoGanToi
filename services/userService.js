import FirebaseService from "./firebaseService"

class UserService {
  constructor() {
    this.users = [
      {
        id: "1",
        name: "Admin System",
        phone: "0123456789",
        email: "admin@thogantoi.com",
        password: "123456",
        role: "admin",
        status: "active",
        joinDate: "2024-01-01",
        area: "TP.HCM",
        avatar: "👨‍💼",
      },
      {
        id: "2",
        name: "Nguyễn Văn A",
        phone: "0111111111",
        email: "customer@test.com",
        password: "123456",
        role: "customer",
        status: "active",
        joinDate: "2024-01-15",
        area: "Quận 1, TP.HCM",
        avatar: "👤",
      },
      {
        id: "3",
        name: "Trần Văn B",
        phone: "0444444444",
        email: "worker@test.com",
        password: "123456",
        role: "worker",
        status: "active",
        joinDate: "2024-01-10",
        area: "Quận 3, TP.HCM",
        avatar: "👨‍🔧",
      },
    ]
  }

  async login(phone, password) {
    try {
      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        const firebaseUsers = await FirebaseService.queryByField("users", "phone", phone)
        const user = firebaseUsers.find((u) => u.password === password)
        if (user) return user
      }

      // Fallback to mock data
      const user = this.users.find((u) => u.phone === phone && u.password === password)
      return user || null
    } catch (error) {
      console.error("Login error:", error)
      // Fallback to mock data
      const user = this.users.find((u) => u.phone === phone && u.password === password)
      return user || null
    }
  }

  async createUser(userData) {
    try {
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }

      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        const firebaseId = await FirebaseService.create("users", newUser)
        newUser.firebaseId = firebaseId
      }

      // Always add to local storage as backup
      this.users.push(newUser)
      return newUser.id
    } catch (error) {
      console.error("Create user error:", error)
      // Fallback to local only
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      this.users.push(newUser)
      return newUser.id
    }
  }

  async phoneExists(phone) {
    try {
      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        const firebaseUsers = await FirebaseService.queryByField("users", "phone", phone)
        if (firebaseUsers.length > 0) return true
      }

      // Check local data
      return this.users.some((u) => u.phone === phone)
    } catch (error) {
      console.error("Phone exists check error:", error)
      // Fallback to local data
      return this.users.some((u) => u.phone === phone)
    }
  }

  async resetPassword(phone, newPassword) {
    try {
      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        const firebaseUsers = await FirebaseService.queryByField("users", "phone", phone)
        if (firebaseUsers.length > 0) {
          const user = firebaseUsers[0]
          await FirebaseService.update(`users/${user.firebaseKey}`, { password: newPassword })
        }
      }

      // Update local data
      const userIndex = this.users.findIndex((u) => u.phone === phone)
      if (userIndex !== -1) {
        this.users[userIndex].password = newPassword
        return true
      }
      return false
    } catch (error) {
      console.error("Reset password error:", error)
      // Fallback to local data only
      const userIndex = this.users.findIndex((u) => u.phone === phone)
      if (userIndex !== -1) {
        this.users[userIndex].password = newPassword
        return true
      }
      return false
    }
  }

  async getAllUsers() {
    try {
      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        const firebaseUsers = await FirebaseService.readAll("users")
        return [...firebaseUsers, ...this.users]
      }

      return this.users
    } catch (error) {
      console.error("Get all users error:", error)
      return this.users
    }
  }

  async updateUser(userId, userData) {
    try {
      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        await FirebaseService.update(`users/${userId}`, userData)
      }

      // Update local data
      const userIndex = this.users.findIndex((u) => u.id === userId)
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...userData }
        return true
      }
      return false
    } catch (error) {
      console.error("Update user error:", error)
      // Fallback to local data only
      const userIndex = this.users.findIndex((u) => u.id === userId)
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...userData }
        return true
      }
      return false
    }
  }
}

export default new UserService()
