"use client"

import { useState } from "react"
import { StatusBar, Platform } from "react-native"

// Screen imports
import LoginScreen from "./screens/LoginScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"
import HomeScreen from "./screens/customer/HomeScreen"
import WorkerListScreen from "./screens/customer/WorkerListScreen"
import WorkerDetailScreen from "./screens/customer/WorkerDetailScreen"
import BookingHistoryScreen from "./screens/customer/BookingHistoryScreen"
import ProfileScreen from "./screens/customer/ProfileScreen"
import WorkerDashboardScreen from "./screens/worker/WorkerDashboardScreen"
import WorkerOrdersScreen from "./screens/worker/WorkerOrdersScreen"
import WorkerOrderDetailScreen from "./screens/worker/WorkerOrderDetailScreen"
import WorkerProfileScreen from "./screens/worker/WorkerProfileScreen"

// Admin screens
import AdminDashboardScreen from "./screens/admin/AdminDashboardScreen"
import UserManagementScreen from "./screens/admin/UserManagementScreen"
import OrderManagementScreen from "./screens/admin/OrderManagementScreen"
import AdminProfileScreen from "./screens/admin/AdminProfileScreen"
import CustomerManagementScreen from "./screens/admin/CustomerManagementScreen"
import WorkerManagementScreen from "./screens/admin/WorkerManagementScreen"
import ServiceManagementScreen from "./screens/admin/ServiceManagementScreen"
import ReviewManagementScreen from "./screens/admin/ReviewManagementScreen"
import PaymentManagementScreen from "./screens/admin/PaymentManagementScreen"
import AreaManagementScreen from "./screens/admin/AreaManagementScreen"
import AdminAccountManagementScreen from "./screens/admin/AdminAccountManagementScreen"
import SystemSettingsScreen from "./screens/admin/SystemSettingsScreen"
import SystemLogsScreen from "./screens/admin/SystemLogsScreen"
import RegisterScreen from "./screens/RegisterScreen"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login")
  const [userType, setUserType] = useState("customer")
  const [selectedService, setSelectedService] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

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

  const handleRegister = () => {
    setCurrentScreen("login")
  }

  // Sửa lại hàm handleForgotPassword
  const handleForgotPassword = () => {
    console.log("Navigating to forgot password screen")
    setCurrentScreen("forgotPassword")
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

  const handleMenuPress = (screen) => {
    if (screen) {
      setCurrentScreen(screen)
    }
  }

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

  const handleBack = () => {
    if (currentScreen === "workerDetail") {
      setCurrentScreen("workerList")
    } else if (currentScreen === "workerList") {
      setCurrentScreen("home")
    } else if (currentScreen === "workerOrderDetail") {
      setCurrentScreen("workerOrders")
    } else if (currentScreen === "forgotPassword") {
      setCurrentScreen("login")
    } else if (
      currentScreen === "userManagement" ||
      currentScreen === "orderManagement" ||
      currentScreen === "customerManagement" ||
      currentScreen === "workerManagement" ||
      currentScreen === "serviceManagement" ||
      currentScreen === "reviewManagement" ||
      currentScreen === "paymentManagement" ||
      currentScreen === "areaManagement" ||
      currentScreen === "adminAccountManagement" ||
      currentScreen === "systemSettings" ||
      currentScreen === "systemLogs"
    ) {
      setCurrentScreen("adminDashboard")
    }
  }

  const handleLogout = () => {
    setCurrentScreen("login")
    setUserType("customer")
    setCurrentUser(null)
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            onLogin={handleLogin}
            onRegister={() => setCurrentScreen("register")}
            onForgotPassword={handleForgotPassword}
          />
        )

      case "forgotPassword":
        return <ForgotPasswordScreen onBackToLogin={() => setCurrentScreen("login")} />

      case "register":
        return <RegisterScreen onRegister={handleRegister} onBackToLogin={() => setCurrentScreen("login")} />

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
      case "customerManagement":
        return <CustomerManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "workerManagement":
        return <WorkerManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "serviceManagement":
        return <ServiceManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "reviewManagement":
        return <ReviewManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "paymentManagement":
        return <PaymentManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "areaManagement":
        return <AreaManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "adminAccountManagement":
        return <AdminAccountManagementScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "systemSettings":
        return <SystemSettingsScreen onTabPress={handleTabPress} onBack={handleBack} />
      case "systemLogs":
        return <SystemLogsScreen onTabPress={handleTabPress} onBack={handleBack} />

      default:
        return <LoginScreen onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
    }
  }

  return (
    <>
      {Platform.OS !== "web" && <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />}
      {renderCurrentScreen()}
    </>
  )
}
