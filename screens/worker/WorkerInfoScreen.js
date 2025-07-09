import { useState, useEffect } from "react"
import { View, Text, ScrollView, ActivityIndicator, Switch, TouchableOpacity } from "react-native"
import WorkerService from "../../services/workerService"
import ServiceService from "../../services/serviceService"
import { styles } from "../../styles/additional"
import { WorkerBottomNav } from "../../components/BottomNavigation"

const WorkerInfoScreen = ({ currentUser, onTabPress, onBack }) => {
  const [workerInfo, setWorkerInfo] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUser?.id) return
        const allWorkers = await WorkerService.getAllWorkers()
        const worker = allWorkers.find(w => String(w.userId) === String(currentUser.id))
        setWorkerInfo(worker)

        const allServices = await ServiceService.getAllServices()
        setServices(allServices)
      } catch (err) {
        console.error("❌ Error loading data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentUser])

  if (loading) {
    return <ActivityIndicator size="large" color="#10b981" style={{ marginTop: 20 }} />
  }

  if (!workerInfo) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>Không tìm thấy thông tin thợ.</Text>
  }

  // 👉 map serviceId -> name
  const serviceNames = (workerInfo.serviceId || [])
    .map(id => services.find(s => String(s.id) === String(id))?.name)
    .filter(Boolean)
    .join(", ")

  return (
    <ScrollView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thông tin thợ</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
        <Text style={styles.infoLabel}>Họ tên: <Text style={styles.infoValue}>{workerInfo.name}</Text></Text>
        <Text style={styles.infoLabel}>Điện thoại: <Text style={styles.infoValue}>{workerInfo.phone}</Text></Text>
        <Text style={styles.infoLabel}>Khu vực: <Text style={styles.infoValue}>{workerInfo.area}</Text></Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Nghề nghiệp</Text>
        <Text style={styles.infoLabel}>Giá: <Text style={styles.infoValue}>{workerInfo.price}</Text></Text>
        <Text style={styles.infoLabel}>Kinh nghiệm: <Text style={styles.infoValue}>{workerInfo.experience}</Text></Text>
        <Text style={styles.infoLabel}>Dịch vụ: <Text style={styles.infoValue}>{serviceNames}</Text></Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Trạng thái làm việc</Text>
        <Switch
          value={workerInfo.status === "active" || workerInfo.status === true}
          onValueChange={async (val) => {
            try {
              await WorkerService.updateWorker(workerInfo.id, { status: val ? true : false })
              setWorkerInfo({ ...workerInfo, status: val ? true : false })
            } catch (err) {
              console.error("❌ Error updating status:", err)
            }
          }}
          trackColor={{ false: "#e5e7eb", true: "#10b981" }}
          thumbColor={workerInfo.status ? "#ffffff" : "#f3f4f6"}
        />
      </View>

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </ScrollView>
  )
}

export default WorkerInfoScreen
