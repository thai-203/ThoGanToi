import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { styles } from "../../styles/styles"

const WorkerProfileDetailScreen = ({ worker, onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.workerProfileDetailContainer}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#1f2937" }}>
            Thông tin chi tiết thợ
          </Text>

          <View style={styles.workerProfileDetailRow}>
            <Text style={styles.workerProfileDetailLabel}>Tên:</Text>
            <Text style={styles.workerProfileDetailValue}>{worker?.name}</Text>
          </View>

          <View style={styles.workerProfileDetailRow}>
            <Text style={styles.workerProfileDetailLabel}>Số điện thoại:</Text>
            <Text style={styles.workerProfileDetailValue}>{worker?.phone}</Text>
          </View>

          <View style={styles.workerProfileDetailRow}>
            <Text style={styles.workerProfileDetailLabel}>Chuyên ngành:</Text>
            <Text style={styles.workerProfileDetailValue}>{worker?.specialty}</Text>
          </View>

          <View style={styles.workerProfileDetailRow}>
            <Text style={styles.workerProfileDetailLabel}>Khu vực:</Text>
            <Text style={styles.workerProfileDetailValue}>{worker?.area}</Text>
          </View>

          <View style={styles.workerProfileDetailRow}>
            <Text style={styles.workerProfileDetailLabel}>Chứng chỉ:</Text>
            <Text style={styles.workerProfileDetailValue}>{worker?.certificate}</Text>
          </View>

          <View style={styles.workerProfileDetailRow}>
            <Text style={styles.workerProfileDetailLabel}>Ngày tham gia:</Text>
            <Text style={styles.workerProfileDetailValue}>{worker?.joinDate}</Text>
          </View>

          <View style={styles.workerProfileDetailRow}>
            <Text style={styles.workerProfileDetailLabel}>Đơn hoàn thành:</Text>
            <Text style={styles.workerProfileDetailValue}>{worker?.completedOrders}</Text>
          </View>

          <View style={styles.workerProfileDetailRow}>
            <Text style={styles.workerProfileDetailLabel}>Đánh giá:</Text>
            <Text style={styles.workerProfileDetailValue}>{worker?.rating}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default WorkerProfileDetailScreen
