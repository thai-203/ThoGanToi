import UserService from "../services/userService"
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
    status: "blocked",
    joinDate: "2024-01-10",
    area: "Quận 7, TP.HCM",
  },

  // Worker users
  {
    phone: "0444444444",
    password: "123456",
    role: "worker",
    name: "Thợ Minh Tuấn",
    email: "worker1@example.com",
    specialty: "Thợ điện",
    status: "active",
    joinDate: "2024-01-02",
    area: "Quận 1, TP.HCM",
    rating: 4.8,
    completedOrders: 127,
    certificate: "Chứng chỉ điện công nghiệp",
    experience: "5 năm kinh nghiệm",
    price: "150,000đ/giờ",
    distance: "0.5km",
    avatar: "👨‍🔧",
    reviews: 127,
  },
  {
    phone: "0555555555",
    password: "123456",
    role: "worker",
    name: "Thợ Văn Nam",
    email: "worker2@example.com",
    specialty: "Thợ nước",
    status: "pending",
    joinDate: "2024-01-15",
    area: "Quận 3, TP.HCM",
    rating: 4.6,
    completedOrders: 89,
    certificate: "Chứng chỉ kỹ thuật nước",
    experience: "3 năm kinh nghiệm",
    price: "120,000đ/giờ",
    distance: "1.2km",
    avatar: "👨‍🔧",
    reviews: 89,
  },
  {
    phone: "0666666666",
    password: "123456",
    role: "worker",
    name: "Thợ Hoàng Long",
    email: "worker3@example.com",
    specialty: "Thợ máy lạnh",
    status: "active",
    joinDate: "2024-01-08",
    area: "Quận 7, TP.HCM",
    rating: 4.9,
    completedOrders: 203,
    certificate: "Chứng chỉ điện lạnh",
    experience: "7 năm kinh nghiệm",
    price: "180,000đ/giờ",
    distance: "2.1km",
    avatar: "👨‍🔧",
    reviews: 203,
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

      // Initialize users
      console.log("Creating users...")
      for (const user of initialUsers) {
        try {
          await UserService.createUser(user)
        } catch (error) {
          console.error("Error creating user:", user.name, error)
        }
      }

      // Initialize services
      console.log("Creating services...")
      for (const service of initialServices) {
        try {
          await ServiceService.createService(service)
        } catch (error) {
          console.error("Error creating service:", service.name, error)
        }
      }

      console.log("Firebase data initialization completed!")
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
