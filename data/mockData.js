// Thêm dữ liệu users với role vào đầu file
export const users = [
  // Admin users
  { id: "1", phone: "0123456789", password: "123456", role: "admin", name: "Admin Nguyễn", email: "admin@example.com" },
  { id: "2", phone: "0987654321", password: "123456", role: "admin", name: "Admin Trần", email: "admin2@example.com" },

  // Customer users
  {
    id: "3",
    phone: "0111111111",
    password: "123456",
    role: "customer",
    name: "Nguyễn Văn A",
    email: "customer1@example.com",
  },
  {
    id: "4",
    phone: "0222222222",
    password: "123456",
    role: "customer",
    name: "Trần Thị B",
    email: "customer2@example.com",
  },
  {
    id: "5",
    phone: "0333333333",
    password: "123456",
    role: "customer",
    name: "Lê Văn C",
    email: "customer3@example.com",
  },

  // Worker users
  {
    id: "6",
    phone: "0444444444",
    password: "123456",
    role: "worker",
    name: "Thợ Minh Tuấn",
    email: "worker1@example.com",
    specialty: "Thợ điện",
  },
  {
    id: "7",
    phone: "0555555555",
    password: "123456",
    role: "worker",
    name: "Thợ Văn Nam",
    email: "worker2@example.com",
    specialty: "Thợ nước",
  },
  {
    id: "8",
    phone: "0666666666",
    password: "123456",
    role: "worker",
    name: "Thợ Hoàng Long",
    email: "worker3@example.com",
    specialty: "Thợ máy lạnh",
  },
]

export const services = [
  { id: "1", name: "Thợ điện", icon: "⚡", color: "#fbbf24" },
  { id: "2", name: "Thợ nước", icon: "🚰", color: "#3b82f6" },
  { id: "3", name: "Thợ máy lạnh", icon: "❄️", color: "#06b6d4" },
  { id: "4", name: "Thợ IT", icon: "💻", color: "#8b5cf6" },
  { id: "5", name: "Giặt ghế sofa", icon: "🛋️", color: "#10b981" },
  { id: "6", name: "Vệ sinh nhà", icon: "🧹", color: "#f59e0b" },
  { id: "7", name: "Sửa xe máy", icon: "🏍️", color: "#ef4444" },
  { id: "8", name: "Thợ mộc", icon: "🔨", color: "#84cc16" },
]

export const workers = [
  {
    id: "1",
    name: "Anh Minh",
    experience: "5 năm kinh nghiệm",
    rating: 4.8,
    price: "150,000đ/giờ",
    distance: "0.5km",
    avatar: "👨‍🔧",
    reviews: 127,
    phone: "0901234567",
  },
  {
    id: "2",
    name: "Anh Tuấn",
    experience: "3 năm kinh nghiệm",
    rating: 4.6,
    price: "120,000đ/giờ",
    distance: "1.2km",
    avatar: "👨‍🔧",
    reviews: 89,
    phone: "0907654321",
  },
  {
    id: "3",
    name: "Anh Hùng",
    experience: "7 năm kinh nghiệm",
    rating: 4.9,
    price: "180,000đ/giờ",
    distance: "2.1km",
    avatar: "👨‍🔧",
    reviews: 203,
    phone: "0912345678",
  },
]

export const customerBookings = [
  {
    id: "1",
    service: "Thợ điện",
    worker: "Anh Minh",
    date: "15/01/2024",
    time: "09:00",
    status: "completed",
    price: "150,000đ",
    address: "123 Nguyễn Văn A, Q1",
  },
  {
    id: "2",
    service: "Thợ nước",
    worker: "Anh Tuấn",
    date: "16/01/2024",
    time: "14:00",
    status: "confirmed",
    price: "120,000đ",
    address: "456 Lê Văn B, Q3",
  },
  {
    id: "3",
    service: "Thợ máy lạnh",
    worker: "Anh Hùng",
    date: "14/01/2024",
    time: "10:00",
    status: "cancelled",
    price: "180,000đ",
    address: "789 Trần Văn C, Q7",
  },
]

export const workerOrders = [
  {
    id: "1",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    service: "Sửa điện",
    date: "18/01/2024",
    time: "14:00",
    address: "123 Nguyễn Văn Cừ, Q1, TP.HCM",
    description: "Sửa ổ cắm điện bị chập, kiểm tra hệ thống điện phòng khách",
    estimatedHours: 2,
    price: "300,000đ",
    status: "pending",
    avatar: "👤",
  },
  {
    id: "2",
    customer: "Trần Thị B",
    phone: "0907654321",
    service: "Lắp đặt quạt trần",
    date: "19/01/2024",
    time: "09:00",
    address: "456 Lê Lợi, Q1, TP.HCM",
    description: "Lắp đặt quạt trần phòng khách, kéo dây điện mới",
    estimatedHours: 1.5,
    price: "225,000đ",
    status: "accepted",
    avatar: "👩",
  },
  {
    id: "3",
    customer: "Lê Văn C",
    phone: "0912345678",
    service: "Kiểm tra hệ thống điện",
    date: "17/01/2024",
    time: "15:30",
    address: "789 Trần Hưng Đạo, Q5, TP.HCM",
    description: "Kiểm tra toàn bộ hệ thống điện nhà, thay thế cầu dao cũ",
    estimatedHours: 3,
    price: "450,000đ",
    status: "completed",
    avatar: "👨",
  },
  {
    id: "4",
    customer: "Phạm Thị D",
    phone: "0923456789",
    service: "Sửa bóng đèn",
    date: "20/01/2024",
    time: "10:00",
    address: "321 Võ Văn Tần, Q3, TP.HCM",
    description: "Thay bóng đèn LED, sửa công tắc đèn bị hỏng",
    estimatedHours: 1,
    price: "150,000đ",
    status: "pending",
    avatar: "👩",
  },
]

export const dates = [
  { id: "1", label: "Hôm nay", value: "2024-01-15" },
  { id: "2", label: "Ngày mai", value: "2024-01-16" },
  { id: "3", label: "17/01", value: "2024-01-17" },
  { id: "4", label: "18/01", value: "2024-01-18" },
]

export const times = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

export const menuItems = [
  { id: "1", title: "Thông tin cá nhân", icon: "👤", action: "profile" },
  { id: "2", title: "Địa chỉ của tôi", icon: "📍", action: "address" },
  { id: "3", title: "Phương thức thanh toán", icon: "💳", action: "payment" },
  { id: "4", title: "Ưu đãi của tôi", icon: "🎁", action: "offers" },
  { id: "5", title: "Hỗ trợ khách hàng", icon: "💬", action: "support" },
  { id: "6", title: "Cài đặt", icon: "⚙️", action: "settings" },
  { id: "7", title: "Về chúng tôi", icon: "ℹ️", action: "about" },
]

export const workerMenuItems = [
  { id: "1", title: "Thông tin thợ", icon: "👤", action: "profile" },
  { id: "2", title: "Khu vực làm việc", icon: "📍", action: "area" },
  { id: "3", title: "Lịch làm việc", icon: "📅", action: "schedule" },
  { id: "4", title: "Báo cáo thu nhập", icon: "💰", action: "income" },
  { id: "5", title: "Đánh giá từ khách", icon: "⭐", action: "reviews" },
  { id: "6", title: "Hỗ trợ thợ", icon: "💬", action: "support" },
  { id: "7", title: "Cài đặt", icon: "⚙️", action: "settings" },
]

// Thêm dữ liệu thống kê cho admin
export const adminStats = {
  totalUsers: 156,
  totalWorkers: 45,
  totalCustomers: 111,
  totalOrders: 1247,
  completedOrders: 1089,
  pendingOrders: 158,
  totalRevenue: 45600000,
  monthlyRevenue: 8900000,
}

// Thêm menu items cho admin
export const adminMenuItems = [
  { id: "1", title: "Quản lý người dùng", icon: "👥", action: "users", screen: "userManagement" },
  { id: "2", title: "Quản lý dịch vụ", icon: "🔧", action: "services", screen: "serviceManagement" },
  { id: "3", title: "Quản lý đơn hàng", icon: "📋", action: "orders", screen: "orderManagement" },
  { id: "4", title: "Báo cáo thống kê", icon: "📊", action: "reports", screen: "reports" },
  { id: "5", title: "Cài đặt hệ thống", icon: "⚙️", action: "settings", screen: "settings" },
  { id: "6", title: "Hỗ trợ", icon: "💬", action: "support", screen: "support" },
]
