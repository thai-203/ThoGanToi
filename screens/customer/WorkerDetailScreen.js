import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { styles } from '../../styles/styles';
import { CustomerBottomNav } from '../../components/BottomNavigation';
import * as Location from 'expo-location';
import orderService from '../../services/orderService';
import { getCurrentUserId } from '../../utils/auth';
import userService from '../../services/userService';

const WorkerDetailScreen = ({
  worker,
  service,
  onBack,
  onTabPress,
  previousOrder,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');
  const [customer, setCustomer] = useState(null);

  const [gettingLocation, setGettingLocation] = useState(false); // set location

  useEffect(() => {
    if (previousOrder) {
      setSelectedDate(previousOrder.date || '');
      setSelectedTime(previousOrder.time || '');
      setAddress(previousOrder.address || '');
    }
  }, [previousOrder]);

  useEffect(() => {
    const fetchCustomerAndAddress = async () => {
      const customerId = await getCurrentUserId();
      if (!customerId) return;

      const user = await userService.getUserById(customerId);
      if (user) {
        setCustomer(user);
        if (!address) {
          setAddress(user.address || '');
        }
      }
    };

    fetchCustomerAndAddress();
  }, []);

  // lấy vị trí hiện tại
  const getCurrentLocation = async () => {
    try {
      setGettingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Quyền bị từ chối', 'Không thể truy cập vị trí.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const reverseGeocode = await Location.reverseGeocodeAsync(
        location.coords
      );

      if (reverseGeocode.length > 0) {
        const { street, district, city, region } = reverseGeocode[0];
        const fullAddress = `${street || ''}, ${district || ''}, ${
          city || ''
        }, ${region || ''}`;
        setAddress(fullAddress);
      } else {
        Alert.alert('Lỗi', 'Không tìm được địa chỉ.');
      }
    } catch (error) {
      console.error('Lỗi lấy vị trí:', error);
      Alert.alert('Lỗi', 'Không thể lấy vị trí.');
    } finally {
      setGettingLocation(false);
    }
  };

  // Giờ cố định
  const times = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  // Hàm gửi SMS
  // const sendSMS = (phone, message) => {
  //   if (!phone || !message) return;

  //   const formattedPhone = phone.startsWith('+')
  //     ? phone
  //     : `+84${phone.slice(1)}`;
  //   const url = `sms:${formattedPhone}${
  //     Platform.OS === 'ios' ? '&' : '?'
  //   }body=${encodeURIComponent(message)}`;

  //   Linking.openURL(url).catch(() => {
  //     Alert.alert('Lỗi', 'Không thể mở ứng dụng nhắn tin.');
  //   });
  // };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !address) {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày, giờ và địa chỉ');
      return;
    }

    if (!customer) {
      Alert.alert('Lỗi', 'Không xác định được người dùng.');
      return;
    }

    const orderData = {
      address,
      date: selectedDate,
      time: selectedTime,
      customer: customer?.name,
      service: service?.name,
      serviceId: service?.id,
      avatar: worker?.avatar,
      worker: worker?.name,
      price: worker?.price,
      estimatedHours: '1',
      description: 'mô tả',
      status: 'pending',
      customerId: customer?.id,
      workerId: worker?.id,
    };

    Alert.alert(
      'Xác nhận đặt lịch',
      `Đặt lịch với ${worker?.name}\nDịch vụ: ${service?.name}\nNgày: ${selectedDate}\nGiờ: ${selectedTime}\nĐịa chỉ: ${address}`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: async () => {
            try {
              await orderService.createOrder(orderData);
              Alert.alert('Thành công', 'Đặt lịch thành công!');

              // Nội dung tin nhắn gửi cho worker
              // const smsContent = `Chào ${worker?.name}, khách hàng ${customer?.name} đã đặt lịch dịch vụ "${service?.name}" vào ${selectedDate} lúc ${selectedTime}. Địa chỉ: ${address}.`;

              // // Gửi SMS
              // sendSMS(worker?.phone, smsContent);

              onBack && onBack();
            } catch (error) {
              console.error('Lỗi tạo booking:', error);
              Alert.alert('Lỗi', 'Không thể đặt lịch. Vui lòng thử lại.');
            }
          },
        },
      ]
    );
  };

  const handleCall = () => {
    Alert.alert(
      'Gọi điện',
      `Bạn có muốn gọi cho ${worker?.name}: ${worker?.phone} không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Gọi',
          onPress: () => {
            const phoneNumber = `tel:${worker?.phone}`;
            Linking.openURL(phoneNumber).catch((err) =>
              Alert.alert('Lỗi', 'Không thể mở trình quay số.')
            );
          },
        },
      ]
    );
  };

  const formatCurrency = (value) => {
    const number = Number(value);
    if (isNaN(number)) return '0 đ/giờ';
    return `${new Intl.NumberFormat('vi-VN').format(number)} đ/giờ`;
  };

  // Tạo danh sách ngày: Hôm nay, Ngày mai, +3 ngày
  const getNextDays = (numDays = 7) => {
    const result = [];
    const today = new Date();

    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      let label = '';
      if (i === 0) label = 'Hôm nay';
      else if (i === 1) label = 'Ngày mai';
      else {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        label = `${day}/${month}`;
      }

      const value = date.toISOString().split('T')[0]; // yyyy-mm-dd
      result.push({ id: i, label, value });
    }

    return result;
  };

  if (!worker || !service) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20 }}>
          <Text>Thiếu thông tin thợ hoặc dịch vụ.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.screenHeader}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backButton}>← Quay lại</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Chi tiết thợ</Text>
          <TouchableOpacity>
            <Text style={styles.favoriteButton}>❤️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailContent}>
          <View style={styles.workerProfile}>
            <Text style={styles.detailAvatar}>{worker.avatar}</Text>
            <Text style={styles.detailWorkerName}>{worker.name}</Text>
            <Text style={styles.detailExperience}>{worker.experience}</Text>
            <View style={styles.detailRatingContainer}>
              <Text style={styles.detailRating}>⭐ {worker.rating}</Text>
              <Text style={styles.detailReviews}>
                ({worker.reviews} đánh giá)
              </Text>
            </View>

            {/* <Text style={styles.detailPrice}>
              {`${new Intl.NumberFormat('vi-VN').format(worker.price)} đ/giờ`}
            </Text> */}

            <Text style={styles.detailPrice}>
              {formatCurrency(worker.price)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Về tôi</Text>
            <Text style={styles.description}>
              Tôi là thợ {service.name.toLowerCase()} với {worker.experience}.
              Cam kết làm việc chuyên nghiệp, tận tâm và đảm bảo chất lượng.
              Phục vụ 24/7, có thể đến tận nơi trong vòng 30 phút.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn ngày</Text>
            <View style={styles.dateContainer}>
              {getNextDays().map((date) => (
                <TouchableOpacity
                  key={date.id}
                  style={[
                    styles.dateButton,
                    selectedDate === date.value && styles.selectedDate,
                  ]}
                  onPress={() => setSelectedDate(date.value)}
                >
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === date.value && styles.selectedDateText,
                    ]}
                  >
                    {date.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn giờ</Text>
            <View style={styles.timeContainer}>
              {times.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedTime === time && styles.selectedTime,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.selectedTimeText,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>


          {/* Nhập địa chỉ bình thường bằng tay*/}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ</Text>

            {/* {customer?.address && !address && (
              <Text style={{ color: '#999', marginBottom: 4 }}>
                Địa chỉ mặc định: {customer.address}
              </Text>
            )} */}

            <TextInput
              style={styles.addressInput}
              placeholder='Nhập địa chỉ nơi thực hiện dịch vụ'
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </ScrollView>

        <View style={styles.detailFooter}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callButtonText}>📞 Gọi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookButtonText}>Đặt lịch ngay</Text>
          </TouchableOpacity>
        </View>

        <CustomerBottomNav onTabPress={onTabPress} activeTab='home' />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default WorkerDetailScreen;
