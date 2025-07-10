import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from '../../styles/styles';
import { statusConfig } from '../../constants/statusConfig';
import { CustomerBottomNav } from '../../components/BottomNavigation';
import orderService from '../../services/orderService';
import { getCurrentUserId } from '../../utils/auth';
import workerService from '../../services/workerService';
import serviceService from '../../services/serviceService';
import ReviewScreen from './ReviewScreen';
import Modal from 'react-native-modal';

const BookingHistoryScreen = ({ onTabPress, onRebook }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const customerId = await getCurrentUserId();
        if (!customerId) {
          throw new Error('Không tìm thấy người dùng hiện tại');
        }

        const result = await orderService.getOrdersByCustomer(customerId);
        // setBookings(result);

        // Sort theo createdAt mới nhất
        const sorted = result.sort(
          (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
        );

        setBookings(sorted);
      } catch (error) {
        console.error('❌ Lỗi khi tải lịch sử đặt lịch:', error);
        Alert.alert('Lỗi', 'Không thể tải lịch sử đặt lịch');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // hủy lịch
  const handleCancelBooking = async (bookingId) => {
    try {
      Alert.alert('Xác nhận hủy', 'Bạn có chắc muốn hủy đơn đặt lịch này?', [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Hủy lịch',
          style: 'destructive',
          onPress: async () => {
            await orderService.updateOrderStatus(bookingId, 'cancelled');
            // Cập nhật lại danh sách đơn sau khi hủy
            const customerId = await getCurrentUserId();
            const updated = await orderService.getOrdersByCustomer(customerId);
            setBookings(updated);
          },
        },
      ]);
    } catch (error) {
      console.error('❌ Lỗi khi hủy lịch:', error);
      Alert.alert('Lỗi', 'Không thể hủy đơn đặt lịch');
    }
  };

  const openReviewModal = (order) => {
    setReviewOrder(order);
    setReviewModalVisible(true);
  };

  const closeReviewModal = () => {
    setReviewOrder(null);
    setReviewModalVisible(false);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const renderBooking = ({ item }) => {
    const status = statusConfig[item.status] || {
      label: item.status,
      bg: '#eee',
      color: '#333',
    };

    return (
      <View style={styles.bookingCard}>
        <View style={styles.bookingHeader}>
          <View>
            <Text style={styles.bookingServiceName}>
              {item?.service || 'Dịch vụ'}
            </Text>
            <Text style={styles.bookingWorkerName}>Thợ: {item?.worker}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.label}
            </Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>{item.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🕒</Text>
            <Text style={styles.detailText}>{item.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{item.address}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💰</Text>
            <Text style={styles.detailText}>{item.price || 'Thỏa thuận'}</Text>
          </View>
        </View>

        <View style={styles.bookingActions}>
          {item.status === 'completed' && (
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => openReviewModal(item)}
            >
              <Text style={styles.reviewButtonText}>Đánh giá</Text>
            </TouchableOpacity>
          )}

          {(item.status === 'accepted' ||
            (item.status === 'pending' && activeTab === 'all')) && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelBooking(item.id)}
            >
              <Text style={styles.cancelButtonText}>Hủy lịch</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.rebookButton}
            onPress={async () => {
              try {
                const worker = await workerService.getWorkerById(item.workerId);
                const service = await serviceService.getServiceById(
                  item.serviceId
                );
                onRebook(worker, service, item);
              } catch (error) {
                console.error(
                  '❌ Lỗi khi lấy thông tin worker/service:',
                  error
                );
                Alert.alert('Lỗi', 'Không thể đặt lại đơn hàng');
              }
            }}
          >
            <Text style={styles.rebookButtonText}>Đặt lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' style={{ marginTop: 50 }} />
        <CustomerBottomNav onTabPress={onTabPress} activeTab='history' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Lịch sử đặt lịch</Text>
      </View>

      <View style={styles.tabContainer}>
        {['all', 'accepted', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === 'all'
                ? 'Tất cả'
                : tab === 'accepted'
                ? 'Đã xác nhận'
                : 'Hoàn thành'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
            Không có đơn nào
          </Text>
        }
      />

      {/* ✅ Modal đánh giá */}
      <Modal
        isVisible={reviewModalVisible}
        onBackdropPress={closeReviewModal}
        backdropOpacity={0.5}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 24,
            width: '90%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {reviewOrder && (
            <ReviewScreen order={reviewOrder} onBack={closeReviewModal} />
          )}
        </View>
      </Modal>

      <CustomerBottomNav onTabPress={onTabPress} activeTab='history' />
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
