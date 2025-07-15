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
import { WorkerBottomNav } from "../../components/BottomNavigation";

const WorkerNotificationScreen = ({ onTabPress, onBack }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "order",
      title: "Đơn hàng mới",
      message:
        "Bạn có đơn hàng sửa điện từ khách hàng Nguyễn Văn A. Thời gian: 14:00 hôm nay.",
      time: "5 phút trước",
      read: false,
      icon: "🔔",
      priority: "high",
    },
    {
      id: "2",
      type: "payment",
      title: "Thanh toán đã được xử lý",
      message:
        "Bạn đã nhận được 270.000đ từ đơn hàng #12345. Tiền sẽ được chuyển vào tài khoản trong 24h.",
      time: "1 giờ trước",
      read: false,
      icon: "💰",
      priority: "medium",
    },
    {
      id: "3",
      type: "system",
      title: "Cập nhật lịch làm việc",
      message:
        "Hãy cập nhật lịch làm việc của bạn để nhận được nhiều đơn hàng hơn.",
      time: "3 giờ trước",
      read: true,
      icon: "📅",
      priority: "low",
    },
    {
      id: "4",
      type: "review",
      title: "Đánh giá mới",
      message: "Khách hàng Trần Thị B đã đánh giá 5 sao cho dịch vụ của bạn.",
      time: "1 ngày trước",
      read: true,
      icon: "⭐",
      priority: "medium",
    },
    {
      id: "5",
      type: "promotion",
      title: "Chương trình khuyến mãi",
      message:
        "Tham gia chương trình thợ xuất sắc tháng để nhận thưởng 500.000đ.",
      time: "2 ngày trước",
      read: true,
      icon: "🎉",
      priority: "low",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "high") return notification.priority === "high";
    return notification.type === filter;
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.workerNotificationCard,
        !item.read && styles.unreadWorkerNotificationCard,
      ]}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View style={styles.workerNotificationHeader}>
        <View style={styles.workerNotificationIconContainer}>
          <Text style={styles.workerNotificationIcon}>{item.icon}</Text>
          <View
            style={[
              styles.workerNotificationPriority,
              { backgroundColor: getPriorityColor(item.priority) },
            ]}
          />
        </View>
        <View style={styles.workerNotificationContent}>
          <Text
            style={[
              styles.workerNotificationTitle,
              !item.read && styles.unreadWorkerNotificationTitle,
            ]}
          >
            {item.title}
          </Text>
          <Text style={styles.workerNotificationMessage}>{item.message}</Text>
          <Text style={styles.workerNotificationTime}>{item.time}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteWorkerNotificationButton}
          onPress={() => handleDeleteNotification(item.id)}
        >
          <Text style={styles.deleteWorkerNotificationButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      {!item.read && <View style={styles.unreadWorkerIndicator} />}
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

      {/* Filter Tabs */}
      <View style={styles.workerNotificationFilters}>
        <TouchableOpacity
          style={[
            styles.workerNotificationFilter,
            filter === "all" && styles.activeWorkerNotificationFilter,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.workerNotificationFilterText,
              filter === "all" && styles.activeWorkerNotificationFilterText,
            ]}
          >
            Tất cả ({notifications.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.workerNotificationFilter,
            filter === "unread" && styles.activeWorkerNotificationFilter,
          ]}
          onPress={() => setFilter("unread")}
        >
          <Text
            style={[
              styles.workerNotificationFilterText,
              filter === "unread" && styles.activeWorkerNotificationFilterText,
            ]}
          >
            Chưa đọc ({notifications.filter((n) => !n.read).length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.workerNotificationFilter,
            filter === "high" && styles.activeWorkerNotificationFilter,
          ]}
          onPress={() => setFilter("high")}
        >
          <Text
            style={[
              styles.workerNotificationFilterText,
              filter === "high" && styles.activeWorkerNotificationFilterText,
            ]}
          >
            Quan trọng
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workerNotificationsList}
        showsVerticalScrollIndicator={false}
      />

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  );
};

export default WorkerNotificationScreen;
