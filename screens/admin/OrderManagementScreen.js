import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import { styles } from '../../styles/styles';
import { AdminBottomNav } from '../../components/BottomNavigation';
import { getDatabase, ref, onValue } from 'firebase/database';
import { statusConfig } from '../../constants/statusConfig';
import UserService from '../../services/userService';

const OrderManagementScreen = ({ onTabPress, onBack }) => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const db = getDatabase();
    const ordersRef = ref(db, 'orders');
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedOrders = Object.entries(data).map(([id, order]) => ({
          id,
          ...order,
        }));
        setOrders(parsedOrders);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const handleOrderAction = (orderId, action) => {
    Alert.alert('Xác nhận', `Bạn có chắc muốn ${action} đơn hàng này?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xác nhận',
        onPress: () => {
          Alert.alert('Thành công', `Đã ${action} đơn hàng!`);
        },
      },
    ]);
  };

  const handleCall = async (customerId, workerId) => {
    try {
      const [customer, worker] = await Promise.all([
        UserService.getUserById(customerId),
        UserService.getUserById(workerId),
      ]);

      Alert.alert(
        'Chọn người cần gọi',
        'Bạn muốn liên hệ với ai?',
        [
          {
            text: `Khách: ${customer?.phone || 'N/A'}`,
            onPress: () => {
              if (customer?.phone) {
                Linking.openURL(`tel:${customer.phone}`);
              } else {
                Alert.alert('Lỗi', 'Không tìm thấy số điện thoại khách hàng');
              }
            },
          },
          {
            text: `Thợ: ${worker?.phone || 'N/A'}`,
            onPress: () => {
              if (worker?.phone) {
                Linking.openURL(`tel:${worker.phone}`);
              } else {
                Alert.alert('Lỗi', 'Không tìm thấy số điện thoại thợ');
              }
            },
          },
          { text: 'Hủy', style: 'cancel' },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('❌ Lỗi khi lấy số điện thoại:', error);
      Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng.');
    }
  };

  const renderOrder = ({ item }) => {
    const status = statusConfig[item.status] || {
      label: 'Không xác định',
      bg: '#e5e7eb',
      color: '#000',
    };

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerAvatar}>{item.avatar || '👤'}</Text>
            <View>
              <Text style={styles.customerName}>
                {item.customer || 'Không rõ'}
              </Text>
              <Text style={styles.orderService}>{item.service}</Text>
              <Text style={styles.orderTime}>
                📅 {item.date} - {item.time}
              </Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.label}
            </Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <Text style={styles.orderAddress}>📍 {item.address}</Text>
          {item.description && (
            <Text style={styles.orderDescription}>{item.description}</Text>
          )}
          <View style={styles.orderMeta}>
            <Text style={styles.orderDuration}>
              ⏱️ {item.estimatedHours || 'N/A'}h
            </Text>
            <Text style={styles.orderPrice}>💰 {item.price}</Text>
          </View>
        </View>

        <View style={styles.orderActions}>
          {/* <TouchableOpacity
            style={styles.phoneButton}
            onPress={() =>
              Alert.alert('Liên hệ', `SĐT: ${item.phone || 'N/A'}`)
            }
          >
            <Text style={styles.phoneButtonText}>📞 Liên hệ</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.phoneButton}
            onPress={() => handleCall(item.customerId, item.workerId)}
          >
            <Text style={styles.phoneButtonText}>📞 Liên hệ</Text>
          </TouchableOpacity>

          {item.status === 'pending' && (
            <View style={styles.pendingActions}>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => handleOrderAction(item.id, 'hủy')}
              >
                <Text style={styles.rejectButtonText}>Hủy đơn</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleOrderAction(item.id, 'xác nhận')}
              >
                <Text style={styles.acceptButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const allTabs = [
    { key: 'all', label: 'Tất cả' },
    { key: 'pending', label: 'Chờ xác nhận' },
    { key: 'confirmed', label: 'Đã xác nhận' },
    { key: 'accepted', label: 'Đã nhận' },
    { key: 'completed', label: 'Hoàn thành' },
    { key: 'cancelled', label: 'Đã hủy' },
    { key: 'rejected', label: 'Đã từ chối' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Quản lý đơn hàng</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>📊</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}
          contentContainerStyle={styles.tabContainerScroll}
        >
          {allTabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label} (
                {tab.key === 'all'
                  ? orders.length
                  : orders.filter((o) => o.status === tab.key).length}
                )
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, padding: 15 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab='orderManagement' />
    </SafeAreaView>
  );
};

export default OrderManagementScreen;
