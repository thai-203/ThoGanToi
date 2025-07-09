import { useState, useEffect } from "react"
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Switch, ActivityIndicator } from "react-native"
import { styles } from "../../styles/additional"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import UserService from "../../services/userService"

const WorkerInfoScreen = ({ onTabPress, onBack, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [workerInfo, setWorkerInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("CurrentUser in WorkerInfoScreen:", currentUser)
    const fetchWorkerInfo = async () => {
      try {
        setLoading(true)
        if (currentUser?.id) {
          const userData = await UserService.getUserById(currentUser.id)
  
          // Join qua bảng workers
          const workers = await FirebaseService.readAll("workers")
          console.log("Workers loaded:", workers)
          console.log("Looking for userId:", userData.id)
          const worker = workers.find(w => String(w.userId) === String(userData.id))
  
          if (worker) {
            console.log("Matched worker:", worker)
            const combinedData = {
              ...userData,
              isAvailable: worker.status,
              completedOrders: worker.reviews,
              rating: worker.rating,
              serviceId: worker.serviceId,
              distance: worker.distance,
              experience: worker.experience,
              price: worker.price
            }
            setWorkerInfo(combinedData)
          } else {
            console.log("No matching worker found for userId:", userData.id)
            setWorkerInfo(userData)
          }
        }
      } catch (error) {
        console.error("Error fetching worker info:", error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchWorkerInfo()
  }, [currentUser])
  
  
  

  const handleSave = async () => {
    setIsEditing(false)
    try {
      await UserService.updateUser(currentUser.id, workerInfo)
      console.log("Worker info updated successfully")
    } catch (error) {
      console.error("Error saving worker info:", error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (currentUser?.id) {
      UserService.getUserById(currentUser.id).then(data => setWorkerInfo(data))
    }
  }

  const updateInfo = (field, value) => {
    setWorkerInfo(prev => ({ ...prev, [field]: value }))
  }

  if (loading || !workerInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thông tin thợ</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? "Hủy" : "Sửa"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.workerInfoContent}>
        <View style={styles.workerInfoAvatar}>
          <Text style={styles.avatarIcon}>👨‍🔧</Text>
          <Text style={styles.workerInfoName}>{workerInfo.name}</Text>
          <Text style={styles.workerInfoSpecialty}>{workerInfo.specialty}</Text>
          <View style={styles.workerInfoRating}>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>{workerInfo.rating || "4.8"} ({workerInfo.completedOrders || 0} đơn)</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          {["name", "phone", "email", "area"].map((field) => (
            <View style={styles.infoRow} key={field}>
              <Text style={styles.infoLabel}>{field === "area" ? "Địa chỉ" : field === "name" ? "Họ tên" : field}</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={workerInfo[field]}
                  onChangeText={(text) => updateInfo(field, text)}
                />
              ) : (
                <Text style={styles.infoValue}>{workerInfo[field]}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông tin nghề nghiệp</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Chuyên môn</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.specialty}
                onChangeText={(text) => updateInfo("specialty", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.specialty}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Chứng chỉ</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.certificate}
                onChangeText={(text) => updateInfo("certificate", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.certificate}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Đơn hoàn thành</Text>
            <Text style={styles.infoValue}>{workerInfo.completedOrders}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rating</Text>
            <Text style={styles.infoValue}>{workerInfo.rating}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Trạng thái</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sẵn sàng nhận việc</Text>
            <Switch
              value={workerInfo.isAvailable ?? true}
              onValueChange={(value) => updateInfo('isAvailable', value)}
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={workerInfo.isAvailable ? "#ffffff" : "#f3f4f6"}
            />
          </View>
        </View>

        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.cancelEditButton} onPress={handleCancel}>
              <Text style={styles.cancelEditButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveEditButton} onPress={handleSave}>
              <Text style={styles.saveEditButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  )
}

export default WorkerInfoScreen
