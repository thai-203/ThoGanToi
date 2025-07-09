import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native"
import { styles } from "../../styles/styles"
import { CustomerBottomNav } from "../../components/BottomNavigation"
import workerService from "../../services/workerService"

const WorkerListScreen = ({ service, onWorkerPress, onBack, onTabPress }) => {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const filteredWorkers = await workerService.getWorkersByService(service.id)
        setWorkers(filteredWorkers)
      } catch (error) {
        console.error("Lỗi tải danh sách thợ:", error)
        Alert.alert("Lỗi", "Không thể tải danh sách thợ.")
      } finally {
        setLoading(false)
      }
    }

    fetchWorkers()
  }, [service])

  const renderWorker = ({ item }) => (
    <TouchableOpacity style={styles.workerCard} onPress={() => onWorkerPress(item, service)}>
      <View style={styles.workerHeader}>
        <Text style={styles.avatar}>{item.avatar || "👷"}</Text>
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>{item.name || "Chưa rõ tên"}</Text>
          <Text style={styles.experience}>{item.experience || "Kinh nghiệm chưa rõ"}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.rating || "5.0"}</Text>
            <Text style={styles.reviews}>({item.reviews || 0} đánh giá)</Text>
          </View>
        </View>
        <View style={styles.workerMeta}>
          <Text style={styles.price}>{item.price || "Liên hệ"}</Text>
          <Text style={styles.distance}>📍 {item.distance || "Không rõ"}</Text>
        </View>
      </View>
      <View style={styles.workerFooter}>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>📞 Gọi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Đặt lịch</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>{service.name}</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Gần nhất</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Giá tốt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Đánh giá cao</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={workers}
        renderItem={renderWorker}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workersList}
        showsVerticalScrollIndicator={false}
      />

      <CustomerBottomNav onTabPress={onTabPress} activeTab="home" />
    </SafeAreaView>
  )
}

export default WorkerListScreen
