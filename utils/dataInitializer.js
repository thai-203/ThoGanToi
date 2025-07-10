import UserService from "../services/userService"
import WorkerService from "../services/workerService"
import ServiceService from "../services/serviceService"
import FirebaseService from "../services/firebaseService"

// Initial data to populate Firebase
const initialUsers = [
  // Admin users
  {
    phone: "0123456789",
    password: "123456",
    role: "admin",
    name: "Admin Nguyễn",
    email: "admin@example.com",
    status: "active",
  },
  {
    phone: "0987654321",
    password: "123456",
    role: "admin",
    name: "Admin Trần",
    email: "admin2@example.com",
    status: "active",
  },

  // Customer users
  {
    phone: "0111111111",
    password: "123456",
    role: "customer",
    name: "Nguyễn Văn A",
    email: "customer1@example.com",
    status: "active",
    joinDate: "2024-01-01",
    area: "Quận 1, TP.HCM",
  },
  {
    phone: "0222222222",
    password: "123456",
    role: "customer",
    name: "Trần Thị B",
    email: "customer2@example.com",
    status: "active",
    joinDate: "2024-01-05",
    area: "Quận 3, TP.HCM",
  },
  {
    phone: "0333333333",
    password: "123456",
    role: "customer",
    name: "Lê Văn C",
    email: "customer3@example.com",
    status: "active", // Changed from blocked to active
    joinDate: "2024-01-10",
    area: "Quận 7, TP.HCM",
  },

  // Worker users (basic info only)
  {
    phone: "0444444444",
    password: "123456",
    role: "worker",
    name: "Thợ Minh Tuấn",
    email: "worker1@example.com",
    status: "active",
    joinDate: "2024-01-02",
    area: "Quận 1, TP.HCM",
  },
  {
    phone: "0555555555",
    password: "123456",
    role: "worker",
    name: "Thợ Văn Nam",
    email: "worker2@example.com",
    status: "active",
    joinDate: "2024-01-15",
    area: "Quận 3, TP.HCM",
  },
  {
    phone: "0666666666",
    password: "123456",
    role: "worker",
    name: "Thợ Hoàng Long",
    email: "worker3@example.com",
    status: "active",
    joinDate: "2024-01-08",
    area: "Quận 7, TP.HCM",
  },
]

// Worker profiles (separate table)
const initialWorkers = [
  {
    userId: "user_worker_1", // Will be replaced with actual user ID
    name: "Thợ Minh Tuấn",
    phone: "0444444444",
    email: "worker1@example.com",
    specialty: "Thợ điện",
    status: "active",
    area: "Quận 1, TP.HCM",
    rating: 4.8,
    completedOrders: 127,
    certificate: "Chứng chỉ điện công nghiệp",
    experience: "5 năm kinh nghiệm",
    price: "150,000đ/giờ",
    avatar: "👨‍🔧",
    reviews: 127,
    joinDate: "2024-01-02",
  },
  {
    userId: "user_worker_2",
    name: "Thợ Văn Nam",
    phone: "0555555555",
    email: "worker2@example.com",
    specialty: "Thợ nước",
    status: "pending", // This one is pending approval
    area: "Quận 3, TP.HCM",
    rating: 4.6,
    completedOrders: 89,
    certificate: "Chứng chỉ kỹ thuật nước",
    experience: "3 năm kinh nghiệm",
    price: "120,000đ/giờ",
    avatar: "👨‍🔧",
    reviews: 89,
    joinDate: "2024-01-15",
  },
  {
    userId: "user_worker_3",
    name: "Thợ Hoàng Long",
    phone: "0666666666",
    email: "worker3@example.com",
    specialty: "Thợ máy lạnh",
    status: "active",
    area: "Quận 7, TP.HCM",
    rating: 4.9,
    completedOrders: 203,
    certificate: "Chứng chỉ điện lạnh",
    experience: "7 năm kinh nghiệm",
    price: "180,000đ/giờ",
    avatar: "👨‍🔧",
    reviews: 203,
    joinDate: "2024-01-08",
  },
]

const initialServices = [
  {
    name: "Thợ điện",
    icon: "⚡",
    color: "#fbbf24",
    suggestedPrice: "150,000đ/giờ",
    description: "Sửa chữa, lắp đặt hệ thống điện",
    status: "active",
  },
  {
    name: "Thợ nước",
    icon: "🚰",
    color: "#3b82f6",
    suggestedPrice: "120,000đ/giờ",
    description: "Sửa chữa đường ống nước, vòi sen",
    status: "active",
  },
  {
    name: "Thợ máy lạnh",
    icon: "❄️",
    color: "#06b6d4",
    suggestedPrice: "200,000đ/giờ",
    description: "Sửa chữa, bảo trì máy lạnh",
    status: "active",
  },
  {
    name: "Thợ IT",
    icon: "💻",
    color: "#8b5cf6",
    suggestedPrice: "180,000đ/giờ",
    description: "Sửa chữa máy tính, laptop",
    status: "active",
  },
  {
    name: "Giặt ghế sofa",
    icon: "🛋️",
    color: "#10b981",
    suggestedPrice: "300,000đ/bộ",
    description: "Vệ sinh ghế sofa chuyên nghiệp",
    status: "active",
  },
  {
    name: "Vệ sinh nhà",
    icon: "🧹",
    color: "#f59e0b",
    suggestedPrice: "100,000đ/giờ",
    description: "Dọn dẹp nhà cửa theo giờ",
    status: "active",
  },
  {
    name: "Sửa xe máy",
    icon: "🏍️",
    color: "#ef4444",
    suggestedPrice: "80,000đ/lần",
    description: "Sửa chữa xe máy tại nhà",
    status: "inactive",
  },
  {
    name: "Thợ mộc",
    icon: "🔨",
    color: "#84cc16",
    suggestedPrice: "160,000đ/giờ",
    description: "Làm đồ gỗ, sửa chữa nội thất",
    status: "active",
  },
]

class DataInitializer {
  async checkFirebaseConnection() {
    try {
      const isConnected = await FirebaseService.checkConnection()
      if (!isConnected) {
        console.warn("Firebase connection not available, using offline mode")
        return false
      }
      return true
    } catch (error) {
      console.error("Error checking Firebase connection:", error)
      return false
    }
  }

  async initializeData() {
    try {
      console.log("Checking Firebase connection...")

      // Check if Firebase is available
      const isConnected = await this.checkFirebaseConnection()
      if (!isConnected) {
        console.log("Firebase not available, skipping data initialization")
        return false
      }

      console.log("Initializing Firebase data...")

      // Check if data already exists
      const existingUsers = await UserService.getAllUsers()
      if (existingUsers.length > 0) {
        console.log("Data already exists, skipping initialization")
        return true
      }

      // Initialize users first
      console.log("Creating users...")
      const userIdMap = new Map() // To track user IDs for workers

      for (const user of initialUsers) {
        try {
          const userId = await UserService.createUser(user)
          if (user.role === "worker") {
            userIdMap.set(user.phone, userId)
          }
          console.log(`✅ Created user: ${user.name} (${user.role})`)
        } catch (error) {
          console.error("Error creating user:", user.name, error)
        }
      }

      // Initialize worker profiles
      console.log("Creating worker profiles...")
      for (const worker of initialWorkers) {
        try {
          // Find the corresponding user ID
          const userId = userIdMap.get(worker.phone)
          if (userId) {
            const workerData = { ...worker, userId }
            await WorkerService.createWorker(workerData)
            console.log(`✅ Created worker profile: ${worker.name}`)
          } else {
            console.warn(`⚠️ No user found for worker: ${worker.name}`)
          }
        } catch (error) {
          console.error("Error creating worker:", worker.name, error)
        }
      }

      // Initialize services
      console.log("Creating services...")
      for (const service of initialServices) {
        try {
          await ServiceService.createService(service)
          console.log(`✅ Created service: ${service.name}`)
        } catch (error) {
          console.error("Error creating service:", service.name, error)
        }
      }

      console.log("🎉 Firebase data initialization completed!")
      return true
    } catch (error) {
      console.error("Error initializing Firebase data:", error)
      return false
    }
  }

  async resetData() {
    try {
      console.log("Resetting Firebase data...")

      // This would require admin privileges in a real app
      // For now, we'll just reinitialize
      await this.initializeData()

      console.log("Firebase data reset completed!")
      return true
    } catch (error) {
      console.error("Error resetting Firebase data:", error)
      return false
    }
  }
}

export default new DataInitializer()
