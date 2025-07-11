import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { styles } from "../../styles/additional";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const AboutUsScreen = ({ onTabPress, onBack }) => {
  const [activeTab, setActiveTab] = useState("company");

  const tabs = [
    { id: "company", label: "Công ty" },
    { id: "team", label: "Đội ngũ" },
    { id: "contact", label: "Liên hệ" },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "CEO & Founder",
      avatar: "👨‍💼",
      description: "10+ năm kinh nghiệm trong lĩnh vực công nghệ và dịch vụ",
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "CTO",
      avatar: "👩‍💻",
      description: "Chuyên gia phát triển ứng dụng di động và hệ thống",
    },
    {
      id: 3,
      name: "Lê Văn C",
      position: "Head of Operations",
      avatar: "👨‍🔧",
      description: "Quản lý vận hành và đảm bảo chất lượng dịch vụ",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      position: "Customer Success Manager",
      avatar: "👩‍💼",
      description: "Chăm sóc khách hàng và phát triển quan hệ đối tác",
    },
  ];

  const coreValues = [
    {
      icon: "🎯",
      title: "Chất lượng",
      description: "Cam kết dịch vụ tốt nhất",
    },
    {
      icon: "⚡",
      title: "Nhanh chóng",
      description: "Phản hồi và xử lý nhanh",
    },
    { icon: "🤝", title: "Tin cậy", description: "Đáng tin cậy và minh bạch" },
    { icon: "💡", title: "Sáng tạo", description: "Luôn đổi mới và cải tiến" },
  ];

  const achievements = [
    { number: "10K+", label: "Khách hàng hài lòng" },
    { number: "5K+", label: "Thợ chuyên nghiệp" },
    { number: "50K+", label: "Đơn hàng hoàn thành" },
    { number: "4.8", label: "Đánh giá trung bình" },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Thành lập công ty",
      description: "Ra mắt với tầm nhìn kết nối thợ và khách hàng",
    },
    {
      year: "2021",
      title: "Mở rộng dịch vụ",
      description: "Thêm nhiều loại hình dịch vụ sửa chữa",
    },
    {
      year: "2022",
      title: "Ứng dụng di động",
      description: "Ra mắt ứng dụng trên iOS và Android",
    },
    {
      year: "2023",
      title: "Mở rộng khu vực",
      description: "Phục vụ toàn bộ TP.HCM và các tỉnh lân cận",
    },
  ];

  const cultureValues = [
    {
      icon: "🌟",
      title: "Văn hóa học hỏi",
      description: "Khuyến khích học hỏi và phát triển bản thân liên tục",
    },
    {
      icon: "🤝",
      title: "Tinh thần đồng đội",
      description: "Hợp tác chặt chẽ và hỗ trợ lẫn nhau",
    },
    {
      icon: "🎯",
      title: "Định hướng kết quả",
      description: "Tập trung vào kết quả và giá trị mang lại",
    },
    {
      icon: "💚",
      title: "Trách nhiệm xã hội",
      description: "Đóng góp tích cực cho cộng đồng",
    },
  ];

  const workingHours = [
    { day: "Thứ 2 - Thứ 6", time: "8:00 - 18:00" },
    { day: "Thứ 7", time: "8:00 - 17:00" },
    { day: "Chủ nhật", time: "9:00 - 16:00" },
    { day: "Ngày lễ", time: "Theo thông báo" },
  ];

  const handleSocialMedia = (platform) => {
    const urls = {
      facebook: "https://facebook.com/serviceapp",
      instagram: "https://instagram.com/serviceapp",
      youtube: "https://youtube.com/serviceapp",
      linkedin: "https://linkedin.com/company/serviceapp",
    };

    Linking.openURL(urls[platform]).catch(() => {
      Alert.alert("Lỗi", "Không thể mở liên kết");
    });
  };

  const handleCall = () => {
    Linking.openURL("tel:1900123456");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@serviceapp.com");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <View>
            {/* Company Logo & Name */}
            <View style={styles.aboutSection}>
              <View style={styles.companyLogo}>
                <Text style={styles.logoIcon}>🔧</Text>
                <Text style={styles.companyName}>ServiceApp</Text>
                <Text style={styles.companySlogan}>
                  "Kết nối - Tin cậy - Chất lượng"
                </Text>
              </View>
            </View>

            {/* Mission & Vision */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Sứ mệnh & Tầm nhìn</Text>
              <View style={styles.missionVisionContainer}>
                <View style={styles.missionCard}>
                  <Text style={styles.missionIcon}>🎯</Text>
                  <Text style={styles.missionTitle}>Sứ mệnh</Text>
                  <Text style={styles.missionText}>
                    Kết nối khách hàng với những thợ chuyên nghiệp, đáng tin
                    cậy, mang đến dịch vụ sửa chữa chất lượng cao với giá cả hợp
                    lý.
                  </Text>
                </View>
                <View style={styles.visionCard}>
                  <Text style={styles.visionIcon}>🚀</Text>
                  <Text style={styles.visionTitle}>Tầm nhìn</Text>
                  <Text style={styles.visionText}>
                    Trở thành nền tảng dịch vụ sửa chữa hàng đầu Việt Nam, nơi
                    mọi người có thể dễ dàng tìm thấy giải pháp cho ngôi nhà của
                    mình.
                  </Text>
                </View>
              </View>
            </View>

            {/* Core Values */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Giá trị cốt lõi</Text>
              <View style={styles.coreValuesContainer}>
                {coreValues.map((value, index) => (
                  <View key={index} style={styles.valueItem}>
                    <Text style={styles.valueIcon}>{value.icon}</Text>
                    <Text style={styles.valueTitle}>{value.title}</Text>
                    <Text style={styles.valueDescription}>
                      {value.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Achievements */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Thành tựu</Text>
              <View style={styles.achievementsGrid}>
                {achievements.map((achievement, index) => (
                  <View key={index} style={styles.achievementCard}>
                    <Text style={styles.achievementNumber}>
                      {achievement.number}
                    </Text>
                    <Text style={styles.achievementLabel}>
                      {achievement.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Timeline */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Lịch sử phát triển</Text>
              <View style={styles.timelineContainer}>
                {timeline.map((item, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineYear}>
                      <Text style={styles.timelineYearText}>{item.year}</Text>
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>{item.title}</Text>
                      <Text style={styles.timelineDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );

      case "team":
        return (
          <View>
            {/* Team Introduction */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Đội ngũ của chúng tôi</Text>
              <Text style={styles.teamIntroText}>
                Chúng tôi là một đội ngũ đam mê công nghệ và dịch vụ, luôn nỗ
                lực mang đến trải nghiệm tốt nhất cho khách hàng.
              </Text>
            </View>

            {/* Team Members */}
            <View style={styles.teamMembersContainer}>
              {teamMembers.map((member) => (
                <View key={member.id} style={styles.teamMemberCard}>
                  <Text style={styles.teamMemberAvatar}>{member.avatar}</Text>
                  <View style={styles.teamMemberInfo}>
                    <Text style={styles.teamMemberName}>{member.name}</Text>
                    <Text style={styles.teamMemberPosition}>
                      {member.position}
                    </Text>
                    <Text style={styles.teamMemberDescription}>
                      {member.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Company Culture */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Văn hóa công ty</Text>
              <View style={styles.cultureContainer}>
                {cultureValues.map((culture, index) => (
                  <View key={index} style={styles.cultureItem}>
                    <Text style={styles.cultureIcon}>{culture.icon}</Text>
                    <Text style={styles.cultureTitle}>{culture.title}</Text>
                    <Text style={styles.cultureText}>
                      {culture.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );

      case "contact":
        return (
          <View>
            {/* Contact Information */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
              <View style={styles.contactInfoContainer}>
                <TouchableOpacity
                  style={styles.contactInfoItem}
                  onPress={handleCall}
                >
                  <Text style={styles.contactInfoIcon}>📞</Text>
                  <View style={styles.contactInfoContent}>
                    <Text style={styles.contactInfoTitle}>Hotline</Text>
                    <Text style={styles.contactInfoText}>1900 123 456</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.contactInfoItem}
                  onPress={handleEmail}
                >
                  <Text style={styles.contactInfoIcon}>✉️</Text>
                  <View style={styles.contactInfoContent}>
                    <Text style={styles.contactInfoTitle}>Email</Text>
                    <Text style={styles.contactInfoText}>
                      support@serviceapp.com
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.contactInfoItem}>
                  <Text style={styles.contactInfoIcon}>📍</Text>
                  <View style={styles.contactInfoContent}>
                    <Text style={styles.contactInfoTitle}>Địa chỉ</Text>
                    <Text style={styles.contactInfoText}>
                      123 Nguyễn Văn Cừ, Quận 5, TP.HCM
                    </Text>
                  </View>
                </View>

                <View style={styles.contactInfoItem}>
                  <Text style={styles.contactInfoIcon}>🌐</Text>
                  <View style={styles.contactInfoContent}>
                    <Text style={styles.contactInfoTitle}>Website</Text>
                    <Text style={styles.contactInfoText}>
                      www.serviceapp.com
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Social Media */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Mạng xã hội</Text>
              <View style={styles.socialMediaContainer}>
                <TouchableOpacity
                  style={styles.socialMediaButton}
                  onPress={() => handleSocialMedia("facebook")}
                >
                  <Text style={styles.socialMediaIcon}>📘</Text>
                  <Text style={styles.socialMediaText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialMediaButton}
                  onPress={() => handleSocialMedia("instagram")}
                >
                  <Text style={styles.socialMediaIcon}>📷</Text>
                  <Text style={styles.socialMediaText}>Instagram</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.socialMediaContainer}>
                <TouchableOpacity
                  style={styles.socialMediaButton}
                  onPress={() => handleSocialMedia("youtube")}
                >
                  <Text style={styles.socialMediaIcon}>📺</Text>
                  <Text style={styles.socialMediaText}>YouTube</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialMediaButton}
                  onPress={() => handleSocialMedia("linkedin")}
                >
                  <Text style={styles.socialMediaIcon}>💼</Text>
                  <Text style={styles.socialMediaText}>LinkedIn</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Working Hours */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Giờ làm việc</Text>
              <View style={styles.workingHoursContainer}>
                {workingHours.map((schedule, index) => (
                  <View key={index} style={styles.workingHoursItem}>
                    <Text style={styles.workingHoursDay}>{schedule.day}</Text>
                    <Text style={styles.workingHoursTime}>{schedule.time}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Support Note */}
            <View style={styles.aboutSection}>
              <View style={styles.supportNote}>
                <Text style={styles.supportNoteIcon}>💬</Text>
                <Text style={styles.supportNoteTitle}>Hỗ trợ 24/7</Text>
                <Text style={styles.supportNoteText}>
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi. Đừng ngần
                  ngại liên hệ khi cần giúp đỡ!
                </Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Về chúng tôi</Text>
        <View />
      </View>

      {/* Tab Navigation */}
      <View style={styles.aboutTabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.aboutTab,
              activeTab === tab.id && styles.activeAboutTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.aboutTabText,
                activeTab === tab.id && styles.activeAboutTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.aboutContent}>{renderTabContent()}</ScrollView>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default AboutUsScreen;
