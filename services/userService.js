import FirebaseService from "./firebaseService"

class UserService {
  constructor() {
    this.basePath = "users"
  }

  async createUser(userData) {
    try {
      const userId = await FirebaseService.create(this.basePath, userData)
      return userId
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  async getUserById(userId) {
    try {
      const user = await FirebaseService.read(`${this.basePath}/${userId}`)
      return user
    } catch (error) {
      console.error("Error getting user:", error)
      throw error
    }
  }

  async getAllUsers() {
    try {
      const users = await FirebaseService.readAll(this.basePath)
      return users
    } catch (error) {
      console.error("Error getting all users:", error)
      throw error
    }
  }

  async getUsersByRole(role) {
    try {
      const users = await FirebaseService.queryByField(this.basePath, "role", role)
      return users
    } catch (error) {
      console.error("Error getting users by role:", error)
      throw error
    }
  }

  async updateUser(userId, userData) {
    try {
      await FirebaseService.update(`${this.basePath}/${userId}`, userData)
      return true
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  }

  async deleteUser(userId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${userId}`)
      return true
    } catch (error) {
      console.error("Error deleting user:", error)
      throw error
    }
  }

  async authenticateUser(phone, password) {
    try {
      const users = await FirebaseService.queryByField(this.basePath, "phone", phone)
      const user = users.find((u) => u.password === password)
      return user || null
    } catch (error) {
      console.error("Error authenticating user:", error)
      throw error
    }
  }

  // Real-time listener for users
  listenToUsers(callback) {
    return FirebaseService.listen(this.basePath, (usersArray) => {
      callback(Array.isArray(usersArray) ? usersArray : []);
    });
  }
}

export default new UserService()
