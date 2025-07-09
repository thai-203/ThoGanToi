import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "../../styles/styles";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const NotificationScreen = ({ onTabPress, onBack }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "booking",
      title: "Đơn hàng đã được xác nhận",
      message:
        "Thợ Minh Tuấn đã xác nhận đơn sửa điện của bạn. Dự kiến hoàn thành lúc 14:00 hôm nay.",
      time: "5 phút trước",
      read: false,
      icon: "✅",
    },
    {
      id: "2",
      type: "promotion",
      title: "Ưu đãi đặc biệt cho bạn!",
      message:
        "Giảm 30% cho dịch vụ sửa chữa điện - nước. Áp dụng đến 31/12/2024.",
      time: "2 giờ trước",
      read: false,
      icon: "🎁",
    },
    {
      id: "3",
      type: "booking",
      title: "Đơn hàng hoàn thành",
      message:
        "Cảm ơn bạn đã sử dụng dịch vụ. Đánh giá trải nghiệm để giúp chúng tôi cải thiện.",
      time: "1 ngày trước",
      read: true,
      icon: "⭐",
    },
    {
      id: "4",
      type: "system",
      title: "Cập nhật ứng dụng",
      message:
        "Phiên bản mới với nhiều tính năng thú vị đã có sẵn. Cập nhật ngay!",
      time: "2 ngày trước",
      read: true,
      icon: "🔄",
    },
    {
      id: "5",
      type: "payment",
      title: "Thanh toán thành công",
      message:
        "Bạn đã thanh toán 300.000đ cho dịch vụ sửa điện. Mã GD: #TX123456",
      time: "3 ngày trước",
      read: true,
      icon: "💳",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  const handleMarkAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    Alert.alert("Thành công", "Đã đánh dấu tất cả thông báo là đã đọc");
  };

  const handleDeleteNotification = (notificationId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa thông báo này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setNotifications(
            notifications.filter(
              (notification) => notification.id !== notificationId
            )
          );
        },
      },
    ]);
  };

  const getNotificationTypeColor = (type) => {
    switch (type) {
      case "booking":
        return "#3b82f6";
      case "promotion":
        return "#f59e0b";
      case "payment":
        return "#10b981";
      case "system":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.read && styles.unreadNotificationCard,
      ]}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationIconContainer}>
          <Text style={styles.notificationIcon}>{item.icon}</Text>
        </View>
        <View style={styles.notificationContent}>
          <Text
            style={[
              styles.notificationTitle,
              !item.read && styles.unreadNotificationTitle,
            ]}
          >
            {item.title}
          </Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <View style={styles.notificationActions}>
          {!item.read && <View style={styles.unreadDot} />}
          <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
            <Text style={styles.deleteNotificationButton}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thông báo</Text>
        <TouchableOpacity onPress={handleMarkAllAsRead}>
          <Text style={styles.markAllReadButton}>Đọc tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.notificationTabContainer}>
        <TouchableOpacity
          style={[
            styles.notificationTab,
            activeTab === "all" && styles.activeNotificationTab,
          ]}
          onPress={() => setActiveTab("all")}
        >
          <Text
            style={[
              styles.notificationTabText,
              activeTab === "all" && styles.activeNotificationTabText,
            ]}
          >
            Tất cả ({notifications.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.notificationTab,
            activeTab === "unread" && styles.activeNotificationTab,
          ]}
          onPress={() => setActiveTab("unread")}
        >
          <Text
            style={[
              styles.notificationTabText,
              activeTab === "unread" && styles.activeNotificationTabText,
            ]}
          >
            Chưa đọc ({notifications.filter((n) => !n.read).length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      />

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default NotificationScreen;
