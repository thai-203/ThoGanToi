import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import { styles } from "../../styles/additional";
import { WorkerBottomNav } from "../../components/BottomNavigation";

const WorkerInfoScreen = ({ onTabPress, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workerInfo, setWorkerInfo] = useState({
    name: "Thợ Minh Tuấn",
    phone: "0901234567",
    email: "minhtuan@email.com",
    specialty: "Thợ điện chuyên nghiệp",
    experience: "5",
    description:
      "Có 5 năm kinh nghiệm sửa chữa điện dân dụng và công nghiệp. Tận tâm, chuyên nghiệp.",
    hourlyRate: "50000",
    address: "Quận 7, TP.HCM",
    workingAreas: ["Quận 1", "Quận 3", "Quận 7"],
    isAvailable: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset changes
  };

  const updateInfo = (field, value) => {
    setWorkerInfo((prev) => ({ ...prev, [field]: value }));
  };

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
        {/* Avatar Section */}
        <View style={styles.workerInfoAvatar}>
          <Text style={styles.avatarIcon}>👨‍🔧</Text>
          <Text style={styles.workerInfoName}>{workerInfo.name}</Text>
          <Text style={styles.workerInfoSpecialty}>{workerInfo.specialty}</Text>
          <View style={styles.workerInfoRating}>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>4.8 (127 đánh giá)</Text>
          </View>
        </View>

        {/* Basic Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Họ tên</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.name}
                onChangeText={(text) => updateInfo("name", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.name}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.phone}
                onChangeText={(text) => updateInfo("phone", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.phone}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.email}
                onChangeText={(text) => updateInfo("email", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.email}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Địa chỉ</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.address}
                onChangeText={(text) => updateInfo("address", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.address}</Text>
            )}
          </View>
        </View>

        {/* Professional Info */}
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
            <Text style={styles.infoLabel}>Kinh nghiệm</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.experience}
                onChangeText={(text) => updateInfo("experience", text)}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.experience} năm</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mô tả</Text>
            {isEditing ? (
              <TextInput
                style={[styles.infoInput, styles.infoTextArea]}
                value={workerInfo.description}
                onChangeText={(text) => updateInfo("description", text)}
                multiline
              />
            ) : (
              <Text style={styles.infoValue}>{workerInfo.description}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giá theo giờ</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={workerInfo.hourlyRate}
                onChangeText={(text) => updateInfo("hourlyRate", text)}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>
                {parseInt(workerInfo.hourlyRate).toLocaleString()}đ/giờ
              </Text>
            )}
          </View>
        </View>

        {/* Working Areas */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Khu vực làm việc</Text>
          <View style={styles.workingAreasContainer}>
            {workerInfo.workingAreas.map((area, index) => (
              <View key={index} style={styles.areaTag}>
                <Text style={styles.areaTagText}>{area}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thống kê</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>127</Text>
              <Text style={styles.statLabel}>Đơn hoàn thành</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Đánh giá TB</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Tỷ lệ hoàn thành</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2.4M</Text>
              <Text style={styles.statLabel}>Thu nhập tháng</Text>
            </View>
          </View>
        </View>

        {/* Availability */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Trạng thái</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sẵn sàng nhận việc</Text>
            <Switch
              value={workerInfo.isAvailable}
              onValueChange={(value) => updateInfo("isAvailable", value)}
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={workerInfo.isAvailable ? "#ffffff" : "#f3f4f6"}
            />
          </View>
        </View>

        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelEditButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelEditButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveEditButton}
              onPress={handleSave}
            >
              <Text style={styles.saveEditButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  );
};

export default WorkerInfoScreen;
