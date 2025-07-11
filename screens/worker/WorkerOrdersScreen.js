import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { styles } from '../../styles/styles';
import { statusConfig } from '../../constants/statusConfig';
import { WorkerBottomNav } from '../../components/BottomNavigation';
import { getCurrentUserId } from '../../utils/auth';
import userService from '../../services/userService';

// IMPORT: Thêm các service cần thiết
import OrderService from '../../services/orderService';
import WorkerService from '../../services/workerService';

const WorkerOrdersScreen = ({ onTabPress, onOrderPress }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]); // State để lưu danh sách đơn hàng từ Firebase
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading

  // Lấy dữ liệu từ Firebase khi component được mount
  useEffect(() => {
    const fetchAndListenOrders = async () => {
      setLoading(true);

      try {
        const userId = await getCurrentUserId();
        const worker = await WorkerService.getWorkerByUserId(userId);

        if (!worker || !worker.id) {
          console.warn(
            'Không tìm thấy thông tin worker tương ứng với userId:',
            userId
          );
          setOrders([]);
          setLoading(false);
          return;
        }

        const unsubscribe = OrderService.listenToWorkerOrders(
          worker.id,
          (workerOrders) => {
            const sortedOrders = workerOrders.sort(
              (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
            );
            setOrders(sortedOrders);
            setLoading(false);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error('Lỗi khi fetch và listen orders:', error);
        setLoading(false);
      }
    };

    let unsubscribeFn;

    fetchAndListenOrders().then((unsub) => {
      if (typeof unsub === 'function') {
        unsubscribeFn = unsub;
      }
    });

    return () => {
      if (unsubscribeFn) {
        unsubscribeFn();
      }
    };
  }, []);

  // Lọc dữ liệu từ state 'orders' thay vì mock data
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  // handle call
  const handleCall = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ.');
      return;
    }

    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            'Không thể gọi',
            'Thiết bị không hỗ trợ chức năng gọi điện.'
          );
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => {
        console.error('Lỗi khi cố gắng gọi điện:', err);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cố gắng thực hiện cuộc gọi.');
      });
  };

  // Hàm cập nhật trạng thái chung
  const handleUpdateStatus = async (orderId, newStatus, confirmation) => {
    Alert.alert(confirmation.title, confirmation.message, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: confirmation.confirmText,
        style: newStatus === 'rejected' ? 'destructive' : 'default', // 'rejected' is a custom status, not in your data
        onPress: async () => {
          try {
            await OrderService.updateOrderStatus(orderId, newStatus);

            // Nếu trạng thái là "completed", cập nhật completedOrders
            if (newStatus === 'completed') {
              const userId = await getCurrentUserId();
              const worker = await WorkerService.getWorkerByUserId(userId);

              if (worker && worker.id) {
                const currentCompleted = parseInt(worker.completedOrders || 0);
                await WorkerService.updateWorker(worker.id, {
                  completedOrders: currentCompleted + 1,
                });
              } else {
                console.warn(
                  'Không tìm thấy worker tương ứng ',
                );
              }
            }

            Alert.alert(
              'Thành công',
              `Đã cập nhật trạng thái đơn hàng thành công!`
            );
            // Không cần làm gì thêm, listener sẽ tự động cập nhật lại UI
          } catch (error) {
            console.error('Failed to update order status:', error);
            Alert.alert(
              'Lỗi',
              'Không thể cập nhật trạng thái. Vui lòng thử lại.'
            );
          }
        },
      },
    ]);
  };

  const renderOrder = ({ item }) => {
    const status = statusConfig[item.status] || statusConfig.default;

    return (
      <TouchableOpacity
        style={styles.bookingCard}
        onPress={() => onOrderPress(item)}
      >
        {/* Header */}
        <View style={styles.bookingHeader}>
          <View>
            <Text style={styles.bookingServiceName}>{item?.service}</Text>
            <Text style={styles.bookingWorkerName}>
              Khách: {item?.customer}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.label}
            </Text>
          </View>
        </View>

        {/* Chi tiết đơn */}
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>⏱️</Text>
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{item.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💰</Text>
            <Text style={styles.detailText}>{item.price}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.bookingActions}>
          {/* Nút Gọi */}
          <View style={styles.singleRow}>
            <TouchableOpacity
              style={styles.phoneButtonOrder}
              onPress={async () => {
                try {
                  const user = await userService.getUserById(item.customerId);
                  if (user?.phone) {
                    handleCall(user.phone);
                  } else {
                    Alert.alert(
                      'Lỗi',
                      'Không tìm thấy số điện thoại của khách hàng.'
                    );
                  }
                } catch (error) {
                  console.error('Lỗi khi lấy số điện thoại:', error);
                  Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng.');
                }
              }}
            >
              <Text style={styles.phoneButtonTextOrder}>📞</Text>
            </TouchableOpacity>
          </View>

          {/* Nếu đơn chờ xác nhận */}
          {item.status === 'pending' && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.cancelButtonOrder}
                onPress={() =>
                  handleUpdateStatus(item.id, 'rejected', {
                    title: 'Từ chối đơn',
                    message: 'Bạn có chắc muốn từ chối đơn hàng này?',
                    confirmText: 'Từ chối',
                  })
                }
              >
                <Text style={styles.cancelButtonTextOrder}>Từ chối</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptButtonOrder}
                onPress={() =>
                  handleUpdateStatus(item.id, 'accepted', {
                    title: 'Nhận đơn',
                    message: 'Bạn có chắc muốn nhận đơn hàng này?',
                    confirmText: 'Nhận đơn',
                  })
                }
              >
                <Text style={styles.acceptButtonTextOrder}>Nhận đơn</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Nếu đã nhận đơn */}
          {item.status === 'accepted' && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.completeButtonOrder}
                onPress={() =>
                  handleUpdateStatus(item.id, 'completed', {
                    title: 'Hoàn thành công việc',
                    message: 'Xác nhận đã hoàn thành công việc?',
                    confirmText: 'Hoàn thành',
                  })
                }
              >
                <Text style={styles.completeButtonTextOrder}>Hoàn thành</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Quản lý đơn hàng</Text>
      </View>
      <View style={styles.tabContainer}>
        {/* Các tab không đổi */}
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'pending' && styles.activeTabText,
            ]}
          >
            Chờ xác nhận
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.tab, activeTab === 'accepted' && styles.activeTab]}
          onPress={() => setActiveTab('accepted')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'accepted' && styles.activeTabText,
            ]}
          >
            Đã xác nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Hoàn thành
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size='large'
          color='#0000ff'
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>Không có đơn hàng nào.</Text>
          }
        />
      )}
      <WorkerBottomNav onTabPress={onTabPress} activeTab='orders' />
    </SafeAreaView>
  );
};

export default WorkerOrdersScreen;
