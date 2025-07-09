import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from "react-native"
import { styles } from "../../styles/additional"
import { CustomerBottomNav } from "../../components/BottomNavigation"

const PersonalInfoScreen = ({ onTabPress, onBack }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    name: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@email.com",
    dateOfBirth: "01/01/1990",
    gender: "Nam",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    emergencyContact: "0987654321",
    emergencyName: "Nguyễn Thị B",
    memberSince: "Tháng 3, 2023",
    preferences: ["Sửa chữa điện", "Vệ sinh nhà cửa", "Sửa chữa nước"]
  })

  const genderOptions = ["Nam", "Nữ", "Khác"]

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset changes
  }

  const updateInfo = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thông tin cá nhân</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? "Hủy" : "Sửa"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.personalInfoContent}>
        {/* Avatar Section */}
        <View style={styles.personalInfoAvatar}>
          <Text style={styles.avatarIcon}>👤</Text>
          <Text style={styles.personalInfoName}>{personalInfo.name}</Text>
          <View style={styles.membershipBadge}>
            <Text style={styles.membershipText}>THÀNH VIÊN VIP</Text>
          </View>
          <Text style={styles.memberSinceText}>Thành viên từ {personalInfo.memberSince}</Text>
        </View>

        {/* Basic Info */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          
          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Họ tên</Text>
            {isEditing ? (
              <TextInput
                style={styles.personalInfoInput}
                value={personalInfo.name}
                onChangeText={(text) => updateInfo('name', text)}
              />
            ) : (
              <Text style={styles.personalInfoValue}>{personalInfo.name}</Text>
            )}
          </View>

          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Số điện thoại</Text>
            {isEditing ? (
              <TextInput
                style={styles.personalInfoInput}
                value={personalInfo.phone}
                onChangeText={(text) => updateInfo('phone', text)}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.personalInfoValue}>{personalInfo.phone}</Text>
            )}
          </View>

          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.personalInfoInput}
                value={personalInfo.email}
                onChangeText={(text) => updateInfo('email', text)}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.personalInfoValue}>{personalInfo.email}</Text>
            )}
          </View>

          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Ngày sinh</Text>
            {isEditing ? (
              <TextInput
                style={styles.personalInfoInput}
                value={personalInfo.dateOfBirth}
                onChangeText={(text) => updateInfo('dateOfBirth', text)}
                placeholder="DD/MM/YYYY"
              />
            ) : (
              <Text style={styles.personalInfoValue}>{personalInfo.dateOfBirth}</Text>
            )}
          </View>

          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Giới tính</Text>
            {isEditing ? (
              <View style={styles.genderSelector}>
                {genderOptions.map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderOption,
                      personalInfo.gender === gender && styles.selectedGenderOption
                    ]}
                    onPress={() => updateInfo('gender', gender)}
                  >
                    <Text style={[
                      styles.genderOptionText,
                      personalInfo.gender === gender && styles.selectedGenderOptionText
                    ]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.personalInfoValue}>{personalInfo.gender}</Text>
            )}
          </View>
        </View>

        {/* Address Info */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Địa chỉ</Text>
          
          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Địa chỉ hiện tại</Text>
            {isEditing ? (
              <TextInput
                style={[styles.personalInfoInput, styles.personalInfoTextArea]}
                value={personalInfo.address}
                onChangeText={(text) => updateInfo('address', text)}
                multiline
              />
            ) : (
              <Text style={styles.personalInfoValue}>{personalInfo.address}</Text>
            )}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Liên hệ khẩn cấp</Text>
          
          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Tên người liên hệ</Text>
            {isEditing ? (
              <TextInput
                style={styles.personalInfoInput}
                value={personalInfo.emergencyName}
                onChangeText={(text) => updateInfo('emergencyName', text)}
              />
            ) : (
              <Text style={styles.personalInfoValue}>{personalInfo.emergencyName}</Text>
            )}
          </View>

          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Số điện thoại</Text>
            {isEditing ? (
              <TextInput
                style={styles.personalInfoInput}
                value={personalInfo.emergencyContact}
                onChangeText={(text) => updateInfo('emergencyContact', text)}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.personalInfoValue}>{personalInfo.emergencyContact}</Text>
            )}
          </View>
        </View>

        {/* Account Statistics */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Thống kê tài khoản</Text>
          <View style={styles.accountStatsGrid}>
            <View style={styles.accountStatCard}>
              <Text style={styles.accountStatNumber}>12</Text>
              <Text style={styles.accountStatLabel}>Đơn hoàn thành</Text>
            </View>
            <View style={styles.accountStatCard}>
              <Text style={styles.accountStatNumber}>4.8</Text>
              <Text style={styles.accountStatLabel}>Đánh giá TB</Text>
            </View>
            <View style={styles.accountStatCard}>
              <Text style={styles.accountStatNumber}>8</Text>
              <Text style={styles.accountStatLabel}>Tháng thành viên</Text>
            </View>
            <View style={styles.accountStatCard}>
              <Text style={styles.accountStatNumber}>2.4M</Text>
              <Text style={styles.accountStatLabel}>Tiết kiệm</Text>
            </View>
          </View>
        </View>

        {/* Service Preferences */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Dịch vụ yêu thích</Text>
          <View style={styles.servicePreferences}>
            {personalInfo.preferences.map((preference, index) => (
              <View key={index} style={styles.preferenceTag}>
                <Text style={styles.preferenceTagText}>{preference}</Text>
              </View>
            ))}
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

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  )
}

export default PersonalInfoScreen
