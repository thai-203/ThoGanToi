import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, FlatList } from "react-native"
import { styles } from "../../styles/styles"
import { WorkerBottomNav } from "../../components/BottomNavigation"

const WorkerSkillsScreen = ({ onTabPress, onBack }) => {
  const [skills, setSkills] = useState([
    { id: "1", name: "Sửa chữa điện dân dụng", level: "expert", verified: true },
    { id: "2", name: "Lắp đặt thiết bị điện", level: "expert", verified: true },
    { id: "3", name: "Bảo trì hệ thống điện", level: "intermediate", verified: false },
    { id: "4", name: "Sửa chữa motor", level: "beginner", verified: false },
  ])

  const [availableSkills] = useState([
    "Điều hòa nhiệt độ",
    "Máy giặt",
    "Tủ lạnh",
    "Bếp từ",
    "Quạt trần",
    "Đèn LED",
    "Camera an ninh",
    "Chuông cửa",
    "Ổ cắm điện",
    "Máy nước nóng",
  ])

  const [newSkill, setNewSkill] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("beginner")

  const skillLevels = [
    { id: "beginner", name: "Cơ bản", color: "#f59e0b" },
    { id: "intermediate", name: "Trung bình", color: "#3b82f6" },
    { id: "expert", name: "Chuyên gia", color: "#10b981" },
  ]

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên kỹ năng")
      return
    }

    const existingSkill = skills.find((skill) => skill.name.toLowerCase() === newSkill.toLowerCase().trim())
    if (existingSkill) {
      Alert.alert("Lỗi", "Kỹ năng này đã tồn tại")
      return
    }

    const newSkillObj = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: selectedLevel,
      verified: false,
    }

    setSkills([...skills, newSkillObj])
    setNewSkill("")
    Alert.alert("Thành công", "Đã thêm kỹ năng mới")
  }

  const handleRemoveSkill = (skillId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa kỹ năng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setSkills(skills.filter((skill) => skill.id !== skillId))
          Alert.alert("Thành công", "Đã xóa kỹ năng")
        },
      },
    ])
  }

  const handleUpdateSkillLevel = (skillId, newLevel) => {
    setSkills(skills.map((skill) => (skill.id === skillId ? { ...skill, level: newLevel } : skill)))
    Alert.alert("Thành công", "Đã cập nhật trình độ kỹ năng")
  }

  const handleRequestVerification = (skillId) => {
    Alert.alert("Yêu cầu xác minh", "Bạn có muốn gửi yêu cầu xác minh kỹ năng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Gửi yêu cầu",
        onPress: () => {
          Alert.alert("Thành công", "Đã gửi yêu cầu xác minh. Chúng tôi sẽ liên hệ trong vòng 3-5 ngày làm việc.")
        },
      },
    ])
  }

  const getLevelColor = (level) => {
    const levelData = skillLevels.find((l) => l.id === level)
    return levelData?.color || "#6b7280"
  }

  const getLevelName = (level) => {
    const levelData = skillLevels.find((l) => l.id === level)
    return levelData?.name || level
  }

  const renderSkill = ({ item }) => (
    <View style={styles.skillManagementCard}>
      <View style={styles.skillManagementHeader}>
        <View style={styles.skillManagementInfo}>
          <Text style={styles.skillManagementName}>{item.name}</Text>
          <View style={styles.skillManagementMeta}>
            <View style={[styles.skillLevelBadge, { backgroundColor: getLevelColor(item.level) + "20" }]}>
              <Text style={[styles.skillLevelText, { color: getLevelColor(item.level) }]}>
                {getLevelName(item.level)}
              </Text>
            </View>
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Đã xác minh</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRemoveSkill(item.id)}>
          <Text style={styles.removeSkillButton}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.skillManagementActions}>
        <Text style={styles.skillActionLabel}>Trình độ:</Text>
        <View style={styles.skillLevelSelector}>
          {skillLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.skillLevelOption,
                item.level === level.id && styles.selectedSkillLevel,
                { borderColor: level.color },
              ]}
              onPress={() => handleUpdateSkillLevel(item.id, level.id)}
            >
              <Text
                style={[
                  styles.skillLevelOptionText,
                  item.level === level.id && { color: level.color, fontWeight: "600" },
                ]}
              >
                {level.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {!item.verified && (
          <TouchableOpacity style={styles.verifyButton} onPress={() => handleRequestVerification(item.id)}>
            <Text style={styles.verifyButtonText}>Yêu cầu xác minh</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  const renderSuggestedSkill = (skillName) => (
    <TouchableOpacity key={skillName} style={styles.suggestedSkillChip} onPress={() => setNewSkill(skillName)}>
      <Text style={styles.suggestedSkillText}>{skillName}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Quản lý kỹ năng</Text>
        <View />
      </View>

      <ScrollView style={styles.skillsContent} showsVerticalScrollIndicator={false}>
        {/* Add New Skill */}
        <View style={styles.addSkillSection}>
          <Text style={styles.addSkillTitle}>Thêm kỹ năng mới</Text>

          <View style={styles.addSkillForm}>
            <TextInput
              style={styles.skillInput}
              placeholder="Tên kỹ năng"
              value={newSkill}
              onChangeText={setNewSkill}
            />

            <Text style={styles.levelSelectorLabel}>Trình độ:</Text>
            <View style={styles.levelSelectorContainer}>
              {skillLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.levelSelectorButton,
                    selectedLevel === level.id && styles.selectedLevelButton,
                    { borderColor: level.color },
                  ]}
                  onPress={() => setSelectedLevel(level.id)}
                >
                  <Text
                    style={[
                      styles.levelSelectorText,
                      selectedLevel === level.id && { color: level.color, fontWeight: "600" },
                    ]}
                  >
                    {level.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.addSkillSubmitButton} onPress={handleAddSkill}>
              <Text style={styles.addSkillSubmitButtonText}>Thêm kỹ năng</Text>
            </TouchableOpacity>
          </View>

          {/* Suggested Skills */}
          <View style={styles.suggestedSkillsSection}>
            <Text style={styles.suggestedSkillsTitle}>Gợi ý kỹ năng:</Text>
            <View style={styles.suggestedSkillsContainer}>
              {availableSkills.map((skill) => renderSuggestedSkill(skill))}
            </View>
          </View>
        </View>

        {/* Skills List */}
        <View style={styles.skillsListSection}>
          <View style={styles.skillsListHeader}>
            <Text style={styles.skillsListTitle}>Kỹ năng của bạn ({skills.length})</Text>
            <View style={styles.skillsStats}>
              <Text style={styles.skillsStatsText}>{skills.filter((s) => s.verified).length} đã xác minh</Text>
            </View>
          </View>

          <FlatList
            data={skills}
            renderItem={renderSkill}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.skillsList}
          />
        </View>
      </ScrollView>

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  )
}

export default WorkerSkillsScreen
