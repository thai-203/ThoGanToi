import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native"
import { styles } from "../../styles/styles"
import { workers } from "../../data/mockData"
import { CustomerBottomNav } from "../../components/BottomNavigation"

const WorkerListScreen = ({ service, onWorkerPress, onBack, onTabPress }) => {
  const renderWorker = ({ item }) => (
    <TouchableOpacity style={styles.workerCard} onPress={() => onWorkerPress(item, service)}>
      <View style={styles.workerHeader}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>{item.name}</Text>
          <Text style={styles.experience}>{item.experience}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews} đánh giá)</Text>
          </View>
        </View>
        <View style={styles.workerMeta}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.distance}>📍 {item.distance}</Text>
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
        contentContainerStyle={styles.workersList}
        showsVerticalScrollIndicator={false}
      />
      <CustomerBottomNav onTabPress={onTabPress} activeTab="home" />
    </SafeAreaView>
  )
}

export default WorkerListScreen