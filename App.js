import { useState } from "react"
import { StatusBar } from "react-native"

// Screen imports
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/customer/HomeScreen"
import WorkerListScreen from "./screens/customer/WorkerListScreen"
import WorkerDetailScreen from "./screens/customer/WorkerDetailScreen"
import BookingHistoryScreen from "./screens/customer/BookingHistoryScreen"
import ProfileScreen from "./screens/customer/ProfileScreen"
import WorkerDashboardScreen from "./screens/worker/WorkerDashboardScreen"
import WorkerOrdersScreen from "./screens/worker/WorkerOrdersScreen"
import WorkerOrderDetailScreen from "./screens/worker/WorkerOrderDetailScreen"
import WorkerProfileScreen from "./screens/worker/WorkerProfileScreen"

// Cập nhật imports để thêm admin screens
import AdminDashboardScreen from "./screens/admin/AdminDashboardScreen"
import UserManagementScreen from "./screens/admin/UserManagementScreen"
import OrderManagementScreen from "./screens/admin/OrderManagementScreen"
import AdminProfileScreen from "./screens/admin/AdminProfileScreen"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login")
  const [userType, setUserType] = useState("customer") // 'customer' or 'worker'
  const [selectedService, setSelectedService] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Cập nhật state để thêm currentUser
  const [currentUser, setCurrentUser] = useState(null)

  // Cập nhật handleLogin để nhận user data
  const handleLogin = (role, user) => {
    setUserType(role)
    setCurrentUser(user)
    if (role === "customer") {
      setCurrentScreen("home")
    } else if (role === "worker") {
      setCurrentScreen("workerDashboard")
    } else if (role === "admin") {
      setCurrentScreen("adminDashboard")
    }
  }

  const handleServicePress = (service) => {
    setSelectedService(service)
    setCurrentScreen("workerList")
  }

  const handleWorkerPress = (worker, service) => {
    setSelectedWorker(worker)
    setSelectedService(service)
    setCurrentScreen("workerDetail")
  }

  const handleOrderPress = (order) => {
    setSelectedOrder(order)
    setCurrentScreen("workerOrderDetail")
  }

  // Thêm handleMenuPress cho admin
  const handleMenuPress = (screen) => {
    setCurrentScreen(screen)
  }

  // Cập nhật handleTabPress để thêm admin navigation
  const handleTabPress = (tab) => {
    if (userType === "customer") {
      if (tab === "home") {
        setCurrentScreen("home")
      } else if (tab === "history") {
        setCurrentScreen("history")
      } else if (tab === "profile") {
        setCurrentScreen("profile")
      }
    } else if (userType === "worker") {
      if (tab === "dashboard") {
        setCurrentScreen("workerDashboard")
      } else if (tab === "orders") {
        setCurrentScreen("workerOrders")
      } else if (tab === "workerProfile") {
        setCurrentScreen("workerProfile")
      }
    } else if (userType === "admin") {
      if (tab === "adminDashboard") {
        setCurrentScreen("adminDashboard")
      } else if (tab === "userManagement") {
        setCurrentScreen("userManagement")
      } else if (tab === "orderManagement") {
        setCurrentScreen("orderManagement")
      } else if (tab === "adminProfile") {
        setCurrentScreen("adminProfile")
      }
    }
  }

  // Cập nhật handleBack để thêm admin navigation
  const handleBack = () => {
    if (currentScreen === "workerDetail") {
      setCurrentScreen("workerList")
    } else if (currentScreen === "workerList") {
      setCurrentScreen("home")
    } else if (currentScreen === "workerOrderDetail") {
      setCurrentScreen("workerOrders")
    } else if (currentScreen === "userManagement" || currentScreen === "orderManagement") {
      setCurrentScreen("adminDashboard")
    }
  }

  // Cập nhật handleLogout để reset currentUser
  const handleLogout = () => {
    setCurrentScreen("login")
    setUserType("customer")
    setCurrentUser(null)
  }

  // Render current screen
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onLogin={handleLogin} />

      // Customer Screens
      case "home":
        return <HomeScreen onServicePress={handleServicePress} onTabPress={handleTabPress} />
      case "workerList":
        return (
          <WorkerListScreen
            service={selectedService}
            onWorkerPress={handleWorkerPress}
            onBack={handleBack}
            onTabPress={handleTabPress}
          />
        )
      case "workerDetail":
        return (
          <WorkerDetailScreen
            worker={selectedWorker}
            service={selectedService}
            onBack={handleBack}
            onTabPress={handleTabPress}
          />
        )
      case "history":
        return <BookingHistoryScreen onTabPress={handleTabPress} />
      case "profile":
        return <ProfileScreen onTabPress={handleTabPress} onLogout={handleLogout} />

      // Worker Screens
      case "workerDashboard":
        return <WorkerDashboardScreen onTabPress={handleTabPress} onOrderPress={handleOrderPress} />
      case "workerOrders":
        return <WorkerOrdersScreen onTabPress={handleTabPress} onOrderPress={handleOrderPress} />
      case "workerOrderDetail":
        return <WorkerOrderDetailScreen order={selectedOrder} onBack={handleBack} onTabPress={handleTabPress} />
      case "workerProfile":
        return <WorkerProfileScreen onTabPress={handleTabPress} onLogout={handleLogout} />

      // Thêm admin screens vào renderCurrentScreen
      // Admin Screens
      case "adminDashboard":
        return (
          <AdminDashboardScreen onTabPress={handleTabPress} onMenuPress={handleMenuPress} currentUser={currentUser} />
        )
      case "userManagement":
        return <UserManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "orderManagement":
        return <OrderManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "adminProfile":
        return (
          <AdminProfileScreen
            onTabPress={handleTabPress}
            onLogout={handleLogout}
            currentUser={currentUser}
            onMenuPress={handleMenuPress}
          />
        )

      default:
        return <LoginScreen onLogin={handleLogin} />
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      {renderCurrentScreen()}
    </>
  )
}
