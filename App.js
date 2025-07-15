import { useState } from 'react';
import { StatusBar } from 'react-native';

// Screen imports
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

// Customer screens
import HomeScreen from './screens/customer/HomeScreen';
import WorkerListScreen from './screens/customer/WorkerListScreen';
import WorkerDetailScreen from './screens/customer/WorkerDetailScreen';
import BookingHistoryScreen from './screens/customer/BookingHistoryScreen';
import ProfileScreen from './screens/customer/ProfileScreen';
import PersonalInfoScreen from './screens/customer/PersonalInfoScreen';
import AddressManagementScreen from './screens/customer/AddressManagementScreen';
import PaymentMethodScreen from './screens/customer/PaymentMethodScreen';
import OffersScreen from './screens/customer/OffersScreen';
import EditProfileScreen from './screens/customer/EditProfileScreen';
import NotificationScreen from './screens/customer/NotificationScreen';
import HelpSupportScreen from './screens/customer/HelpSupportScreen';
import CustomerSettingsScreen from './screens/customer/CustomerSettingsScreen';
import AboutUsScreen from './screens/customer/AboutUsScreen';

// Worker screens
import WorkerDashboardScreen from './screens/worker/WorkerDashboardScreen';
import WorkerOrdersScreen from './screens/worker/WorkerOrdersScreen';
import WorkerOrderDetailScreen from './screens/worker/WorkerOrderDetailScreen';
import WorkerProfileScreen from './screens/worker/WorkerProfileScreen';
import WorkerInfoScreen from './screens/worker/WorkerInfoScreen';
import WorkerAreaScreen from './screens/worker/WorkerAreaScreen';
import WorkerSkillsScreen from './screens/worker/WorkerSkillsScreen';
import WorkerScheduleScreen from './screens/worker/WorkerScheduleScreen';
import WorkerIncomeScreen from './screens/worker/WorkerIncomeScreen';
import WorkerReviewsScreen from './screens/worker/WorkerReviewsScreen';
import WorkerEditProfileScreen from './screens/worker/WorkerEditProfileScreen';
import WorkerSupportScreen from './screens/worker/WorkerSupportScreen';
import WorkerSettingsScreen from './screens/worker/WorkerSettingsScreen';

// Cập nhật imports để thêm admin screens
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import UserManagementScreen from './screens/admin/UserManagementScreen';
import OrderManagementScreen from './screens/admin/OrderManagementScreen';
import AdminProfileScreen from './screens/admin/AdminProfileScreen';
import CustomerManagementScreen from './screens/admin/CustomerManagementScreen';
import WorkerManagementScreen from './screens/admin/WorkerManagementScreen';
import ServiceManagementScreen from './screens/admin/ServiceManagementScreen';
import ReviewManagementScreen from './screens/admin/ReviewManagementScreen';
import PaymentManagementScreen from './screens/admin/PaymentManagementScreen';
import AreaManagementScreen from './screens/admin/AreaManagementScreen';
import AdminAccountManagementScreen from './screens/admin/AdminAccountManagementScreen';
import SystemSettingsScreen from './screens/admin/SystemSettingsScreen';
import SystemLogsScreen from './screens/admin/SystemLogsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userType, setUserType] = useState('customer'); // 'customer' or 'worker'
  const [selectedService, setSelectedService] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Cập nhật state để thêm currentUser
  const [currentUser, setCurrentUser] = useState(null);

  // Cập nhật handleLogin để nhận user data
  const handleLogin = (role, user) => {
    setUserType(role);
    setCurrentUser(user);
    if (role === 'customer') {
      setCurrentScreen('home');
    } else if (role === 'worker') {
      setCurrentScreen('workerDashboard');
    } else if (role === 'admin') {
      setCurrentScreen('adminDashboard');
    }
  };
 // Sửa lại hàm handleForgotPassword
  const handleForgotPassword = () => {
    console.log("Navigating to forgot password screen")
    setCurrentScreen("forgotPassword")
  }

  const handleServicePress = (service) => {
    setSelectedService(service);
    setCurrentScreen('workerList');
  };

  const handleWorkerPress = (worker, service) => {
    setSelectedWorker(worker);
    setSelectedService(service);
    setSelectedOrder(null); // Xoá order cũ nếu có
    setCurrentScreen('workerDetail');
  };

  //handle rebook
  const handleRebook = (worker, service, order) => {
    setSelectedWorker(worker);
    setSelectedService(service);
    setSelectedOrder(order); // 👈 lưu đơn cũ
    setCurrentScreen('workerDetail');
  };

  //review
  // const handleReviewPress = (order) => {
  //   setSelectedOrder(order);
  //   setCurrentScreen('review');
  // };

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setCurrentScreen('workerOrderDetail');
  };

  // Thêm handleMenuPress cho customer và worker profile navigation
  const handleMenuPress = (screen) => {
    if (screen) {
      setCurrentScreen(screen);
    }
  };

  // Cập nhật handleTabPress để thêm admin navigation
  const handleTabPress = (tab) => {
    if (userType === 'customer') {
      if (tab === 'home') {
        setCurrentScreen('home');
      } else if (tab === 'history') {
        setCurrentScreen('history');
      } else if (tab === 'profile') {
        setCurrentScreen('profile');
      }
    } else if (userType === 'worker') {
      if (tab === 'dashboard') {
        setCurrentScreen('workerDashboard');
      } else if (tab === 'orders') {
        setCurrentScreen('workerOrders');
      } else if (tab === 'workerProfile') {
        setCurrentScreen('workerProfile');
      }
    } else if (userType === 'admin') {
      if (tab === 'adminDashboard') {
        setCurrentScreen('adminDashboard');
      } else if (tab === 'userManagement') {
        setCurrentScreen('userManagement');
      } else if (tab === 'orderManagement') {
        setCurrentScreen('orderManagement');
      } else if (tab === 'adminProfile') {
        setCurrentScreen('adminProfile');
      }
    }
  };

  // Cập nhật handleBack để thêm navigation cho các trang mới
  const handleBack = () => {
    // Define back navigation logic based on current screen
    const backNavigation = {
      // Customer screens
      workerDetail: 'workerList',
      personalInfo: 'profile',
      addressManagement: 'profile',
      paymentMethod: 'profile',
      offers: 'profile',
      editProfile: 'profile',
      notification: 'profile',
      helpSupport: 'profile',
      customerSettings: 'profile',
      aboutUs: 'profile',

      // Worker screens
      workerOrderDetail: 'workerOrders',
      workerInfo: 'workerProfile',
      workerArea: 'workerProfile',
      workerSkills: 'workerProfile',
      workerSchedule: 'workerProfile',
      workerIncome: 'workerProfile',
      workerReviews: 'workerProfile',
      workerEditProfile: 'workerProfile',
      workerSupport: 'workerProfile',
      workerSettings: 'workerProfile',

      // Admin screens
      customerManagement: 'adminDashboard',
      workerManagement: 'adminDashboard',
      serviceManagement: 'adminDashboard',
      orderManagement: 'adminDashboard',
      reviewManagement: 'adminDashboard',
      paymentManagement: 'adminDashboard',
      areaManagement: 'adminDashboard',
      adminAccountManagement: 'adminDashboard',
      systemSettings: 'adminDashboard',
      systemLogs: 'adminDashboard',
    };

    const backScreen = backNavigation[currentScreen];
    console.log(backScreen);
    if (backScreen) {
      setCurrentScreen(backScreen);
    } else {
      // Default back behavior
      if (userType === 'customer') {
        setCurrentScreen('home');
      } else if (userType === 'worker') {
        setCurrentScreen('workerDashboard');
      } else if (userType === 'admin') {
        setCurrentScreen('adminDashboard');
      }
    }
  };

  // Cập nhật handleLogout để reset currentUser
  const handleLogout = () => {
    setCurrentScreen('login');
    setUserType('customer');
    setCurrentUser(null);
  };

  // Render current screen
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
      case 'history':
        return (
          <BookingHistoryScreen
            onTabPress={handleTabPress}
            onRebook={handleRebook}
          />
        );
      case 'register':
        return <RegisterScreen onRegister={() => setCurrentScreen('login')} onBackToLogin={() => setCurrentScreen('login')} />;
      case 'forgotPassword':
        return <ForgotPasswordScreen onBackToLogin={() => setCurrentScreen('login')}  />;
      case 'profile':
        return (
          <ProfileScreen
            onTabPress={handleTabPress}
            onLogout={handleLogout}
            currentUser={currentUser}
            onMenuPress={handleMenuPress}
          />
        );

      // Customer screens
      case 'home':
        return (
          <HomeScreen
            onServicePress={handleServicePress}
            onTabPress={handleTabPress}
          />
        );
      case 'workerList':
        return (
          <WorkerListScreen
            service={selectedService}
            onWorkerPress={handleWorkerPress}
            onBack={handleBack}
            onTabPress={handleTabPress}
          />
        );
      case 'workerDetail':
        return (
          <WorkerDetailScreen
            worker={selectedWorker}
            service={selectedService}
            onBack={handleBack}
            onTabPress={handleTabPress}
            previousOrder={selectedOrder}
          />
        );
      case 'bookingHistory':
        return (
          <BookingHistoryScreen
            onServicePress={handleServicePress}
            onTabPress={handleTabPress}
          />
        );
      case 'personalInfo':
        return (
          <PersonalInfoScreen onTabPress={handleTabPress} onBack={handleBack} />
        );
      case 'addressManagement':
        return (
          <AddressManagementScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'paymentMethod':
        return (
          <PaymentMethodScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'offers':
        return <OffersScreen onTabPress={handleTabPress} onBack={handleBack} />;
      case 'editProfile':
        return (
          <EditProfileScreen onTabPress={handleTabPress} onBack={handleBack} />
        );
      case 'notification':
        return (
          <NotificationScreen onTabPress={handleTabPress} onBack={handleBack} />
        );
      case 'helpSupport':
        return (
          <HelpSupportScreen onTabPress={handleTabPress} onBack={handleBack} />
        );
      case 'customerSettings':
        return (
          <CustomerSettingsScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'aboutUs':
        return (
          <AboutUsScreen onTabPress={handleTabPress} onBack={handleBack} />
        );

      // Worker screens
      case 'workerDashboard':
        return (
          <WorkerDashboardScreen
            onServicePress={handleServicePress}
            onTabPress={handleTabPress}
          />
        );
      case 'workerOrders':
        return (
          <WorkerOrdersScreen
            onOrderPress={handleOrderPress}
            onTabPress={handleTabPress}
          />
        );
      case 'workerOrderDetail':
        return (
          <WorkerOrderDetailScreen
            order={selectedOrder}
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'workerProfile':
        return (
          <WorkerProfileScreen
            onTabPress={handleTabPress}
            onLogout={handleLogout}
            currentUser={currentUser}
            onMenuPress={handleMenuPress}
          />
        );
      case 'workerInfo':
        return (
          <WorkerInfoScreen onTabPress={handleTabPress} onBack={handleBack} currentUser={currentUser}/>
        );
      case 'workerArea':
        return (
          <WorkerAreaScreen onTabPress={handleTabPress} onBack={handleBack} />
        );
      case 'workerSkills':
        return (
          <WorkerSkillsScreen onTabPress={handleTabPress} onBack={handleBack} />
        );
      case 'workerSchedule':
        return (
          <WorkerScheduleScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'workerIncome':
        return (
          <WorkerIncomeScreen onTabPress={handleTabPress} onBack={handleBack} currentUser={currentUser} />
        );
      case 'workerReviews':
        return (
          <WorkerReviewsScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
            currentUser={currentUser}
          />
        );
      case 'workerEditProfile':
        return (
          <WorkerEditProfileScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'workerSupport':
        return (
          <WorkerSupportScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'workerSettings':
        return (
          <WorkerSettingsScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );

      // Admin screens
      case 'adminDashboard':
        return (
          <AdminDashboardScreen
            onTabPress={handleTabPress}
            onMenuPress={handleMenuPress}
            currentUser={currentUser}
          />
        );
      case 'userManagement':
        return (
          <UserManagementScreen
            onTabPress={handleTabPress}
            onMenuPress={handleMenuPress}
            currentUser={currentUser}
            onBack={handleBack}
          />
        );
      case 'orderManagement':
        return (
          <OrderManagementScreen
            onTabPress={handleTabPress}
            onMenuPress={handleMenuPress}
            currentUser={currentUser}
            onBack={handleBack}
          />
        );
      case 'adminProfile':
        return (
          <AdminProfileScreen
            onTabPress={handleTabPress}
            onLogout={handleLogout}
            currentUser={currentUser}
            onMenuPress={handleMenuPress}
          />
        );
      case 'customerManagement':
        return (
          <CustomerManagementScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'workerManagement':
        return (
          <WorkerManagementScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'serviceManagement':
        return (
          <ServiceManagementScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'reviewManagement':
        return (
          <ReviewManagementScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'paymentManagement':
        return (
          <PaymentManagementScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'areaManagement':
        return (
          <AreaManagementScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'adminAccountManagement':
        return (
          <AdminAccountManagementScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'systemSettings':
        return (
          <SystemSettingsScreen
            onTabPress={handleTabPress}
            onBack={handleBack}
          />
        );
      case 'systemLogs':
        return (
          <SystemLogsScreen onTabPress={handleTabPress} onBack={handleBack} />
        );

      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#f8fafc' />
      {renderCurrentScreen()}
    </>
  );
}