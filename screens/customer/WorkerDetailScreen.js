import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native"
import { styles } from "../../styles/styles"
import { dates, times } from "../../data/mockData"
import { CustomerBottomNav } from "../../components/BottomNavigation"

const WorkerDetailScreen = ({ worker, service, onBack, onTabPress }) => {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Thông báo", "Vui lòng chọn ngày và giờ")
      return
    }
    Alert.alert(
      "Xác nhận đặt lịch",
      `Đặt lịch với ${worker.name}\nDịch vụ: ${service.name}\nNgày: ${selectedDate}\nGiờ: ${selectedTime}`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xác nhận",
          onPress: () => {
            Alert.alert("Thành công", "Đặt lịch thành công!")
            onBack()
          },
        },
      ],
    )
  }

  const handleCall = () => {
    Alert.alert("Gọi điện", `Gọi cho ${worker.name}: ${worker.phone}`)
  }

  return (
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
            <Text style={styles.detailReviews}>({worker.reviews} đánh giá)</Text>
          </View>
          <Text style={styles.detailPrice}>{worker.price}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Về tôi</Text>
          <Text style={styles.description}>
            Tôi là thợ {service.name.toLowerCase()} với {worker.experience}. Cam kết làm việc chuyên nghiệp, tận tâm và
            đảm bảo chất lượng. Phục vụ 24/7, có thể đến tận nơi trong vòng 30 phút.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dịch vụ</Text>
          <View style={styles.servicesList}>
            <Text style={styles.serviceItem}>• Sửa chữa, bảo trì</Text>
            <Text style={styles.serviceItem}>• Lắp đặt mới</Text>
            <Text style={styles.serviceItem}>• Tư vấn kỹ thuật</Text>
            <Text style={styles.serviceItem}>• Bảo hành 6 tháng</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chọn ngày</Text>
          <View style={styles.dateContainer}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date.id}
                style={[styles.dateButton, selectedDate === date.value && styles.selectedDate]}
                onPress={() => setSelectedDate(date.value)}
              >
                <Text style={[styles.dateText, selectedDate === date.value && styles.selectedDateText]}>
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
                style={[styles.timeButton, selectedTime === time && styles.selectedTime]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
      <CustomerBottomNav onTabPress={onTabPress} activeTab="home" />
    </SafeAreaView>
  )
}

export default WorkerDetailScreen
