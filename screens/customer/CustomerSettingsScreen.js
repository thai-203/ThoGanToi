import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { styles } from "../../styles/additional";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const CustomerSettingsScreen = ({ onTabPress, onBack }) => {
  const [settings, setSettings] = useState({
    // Notification settings
    orderNotifications: true,
    promotionNotifications: true,
    reminderNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,

    // Privacy settings
    shareLocation: true,
    allowReviews: true,
    showProfile: true,
    dataCollection: false,

    // Service preferences
    preferredTime: "morning", // morning, afternoon, evening, flexible
    maxDistance: "10", // km
    priceRange: "medium", // low, medium, high, any
    autoBooking: false,
  });

  const timePreferences = [
    { id: "morning", label: "Buổi sáng", time: "6:00 - 12:00" },
    { id: "afternoon", label: "Buổi chiều", time: "12:00 - 18:00" },
    { id: "evening", label: "Buổi tối", time: "18:00 - 22:00" },
    { id: "flexible", label: "Linh hoạt", time: "Bất kỳ lúc nào" },
  ];

  const distanceOptions = ["3", "5", "10", "15", "20"];

  const priceRanges = [
    { id: "low", label: "Tiết kiệm", range: "< 100k" },
    { id: "medium", label: "Trung bình", range: "100k - 300k" },
    { id: "high", label: "Cao cấp", range: "> 300k" },
    { id: "any", label: "Bất kỳ", range: "Không giới hạn" },
  ];

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          // Handle logout
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Xóa tài khoản",
      "Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            // Handle account deletion
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Cài đặt</Text>
        <View />
      </View>

      <ScrollView style={styles.settingsContent}>
        {/* Notification Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Thông báo</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thông báo đơn hàng</Text>
                <Text style={styles.settingSubtitle}>
                  Cập nhật trạng thái đơn hàng
                </Text>
              </View>
              <Switch
                value={settings.orderNotifications}
                onValueChange={(value) =>
                  updateSetting("orderNotifications", value)
                }
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.orderNotifications ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thông báo khuyến mãi</Text>
                <Text style={styles.settingSubtitle}>
                  Ưu đãi và chương trình mới
                </Text>
              </View>
              <Switch
                value={settings.promotionNotifications}
                onValueChange={(value) =>
                  updateSetting("promotionNotifications", value)
                }
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={
                  settings.promotionNotifications ? "#ffffff" : "#f3f4f6"
                }
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Nhắc nhở</Text>
                <Text style={styles.settingSubtitle}>
                  Nhắc nhở lịch hẹn và thanh toán
                </Text>
              </View>
              <Switch
                value={settings.reminderNotifications}
                onValueChange={(value) =>
                  updateSetting("reminderNotifications", value)
                }
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={
                  settings.reminderNotifications ? "#ffffff" : "#f3f4f6"
                }
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Âm thanh</Text>
                <Text style={styles.settingSubtitle}>
                  Phát âm thanh khi có thông báo
                </Text>
              </View>
              <Switch
                value={settings.soundEnabled}
                onValueChange={(value) => updateSetting("soundEnabled", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.soundEnabled ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Rung</Text>
                <Text style={styles.settingSubtitle}>
                  Rung khi có thông báo
                </Text>
              </View>
              <Switch
                value={settings.vibrationEnabled}
                onValueChange={(value) =>
                  updateSetting("vibrationEnabled", value)
                }
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.vibrationEnabled ? "#ffffff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Quyền riêng tư</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Chia sẻ vị trí</Text>
                <Text style={styles.settingSubtitle}>Giúp tìm thợ gần bạn</Text>
              </View>
              <Switch
                value={settings.shareLocation}
                onValueChange={(value) => updateSetting("shareLocation", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.shareLocation ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Cho phép đánh giá</Text>
                <Text style={styles.settingSubtitle}>
                  Thợ có thể xem đánh giá của bạn
                </Text>
              </View>
              <Switch
                value={settings.allowReviews}
                onValueChange={(value) => updateSetting("allowReviews", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.allowReviews ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Hiển thị hồ sơ</Text>
                <Text style={styles.settingSubtitle}>
                  Thợ có thể xem thông tin cơ bản
                </Text>
              </View>
              <Switch
                value={settings.showProfile}
                on
                ValueChange={(value) => updateSetting("showProfile", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.showProfile ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thu thập dữ liệu</Text>
                <Text style={styles.settingSubtitle}>
                  Cải thiện trải nghiệm dịch vụ
                </Text>
              </View>
              <Switch
                value={settings.dataCollection}
                onValueChange={(value) =>
                  updateSetting("dataCollection", value)
                }
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.dataCollection ? "#ffffff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* Service Preferences */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Tùy chọn dịch vụ</Text>

          <View style={styles.settingsGroup}>
            <Text style={styles.settingTitle}>Thời gian ưa thích</Text>
            <View style={styles.timePreferenceSelector}>
              {timePreferences.map((time) => (
                <TouchableOpacity
                  key={time.id}
                  style={[
                    styles.timePreferenceOption,
                    settings.preferredTime === time.id &&
                      styles.selectedTimePreference,
                  ]}
                  onPress={() => updateSetting("preferredTime", time.id)}
                >
                  <View style={styles.timePreferenceInfo}>
                    <Text
                      style={[
                        styles.timePreferenceLabel,
                        settings.preferredTime === time.id &&
                          styles.selectedTimePreferenceLabel,
                      ]}
                    >
                      {time.label}
                    </Text>
                    <Text style={styles.timePreferenceTime}>{time.time}</Text>
                  </View>
                  {settings.preferredTime === time.id && (
                    <Text style={styles.timePreferenceCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingsGroup}>
            <Text style={styles.settingTitle}>Khoảng cách tối đa (km)</Text>
            <View style={styles.distanceSelector}>
              {distanceOptions.map((distance) => (
                <TouchableOpacity
                  key={distance}
                  style={[
                    styles.distanceButton,
                    settings.maxDistance === distance &&
                      styles.selectedDistance,
                  ]}
                  onPress={() => updateSetting("maxDistance", distance)}
                >
                  <Text
                    style={[
                      styles.distanceText,
                      settings.maxDistance === distance &&
                        styles.selectedDistanceText,
                    ]}
                  >
                    {distance}km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingsGroup}>
            <Text style={styles.settingTitle}>Mức giá ưa thích</Text>
            <View style={styles.priceRangeSelector}>
              {priceRanges.map((price) => (
                <TouchableOpacity
                  key={price.id}
                  style={[
                    styles.priceRangeOption,
                    settings.priceRange === price.id &&
                      styles.selectedPriceRange,
                  ]}
                  onPress={() => updateSetting("priceRange", price.id)}
                >
                  <View style={styles.priceRangeInfo}>
                    <Text
                      style={[
                        styles.priceRangeLabel,
                        settings.priceRange === price.id &&
                          styles.selectedPriceRangeLabel,
                      ]}
                    >
                      {price.label}
                    </Text>
                    <Text style={styles.priceRangeRange}>{price.range}</Text>
                  </View>
                  {settings.priceRange === price.id && (
                    <Text style={styles.priceRangeCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Tự động đặt lịch</Text>
                <Text style={styles.settingSubtitle}>
                  Tự động đặt thợ phù hợp nhất
                </Text>
              </View>
              <Switch
                value={settings.autoBooking}
                onValueChange={(value) => updateSetting("autoBooking", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.autoBooking ? "#ffffff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Ứng dụng</Text>

          <TouchableOpacity style={styles.settingActionItem}>
            <Text style={styles.settingActionText}>Ngôn ngữ</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.settingValue}>Tiếng Việt</Text>
              <Text style={styles.settingActionArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingActionItem}>
            <Text style={styles.settingActionText}>Điều khoản sử dụng</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingActionItem}>
            <Text style={styles.settingActionText}>Chính sách bảo mật</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingActionItem}>
            <Text style={styles.settingActionText}>Liên hệ hỗ trợ</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.appInfoContainer}>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Phiên bản ứng dụng</Text>
              <Text style={styles.appInfoValue}>1.2.3</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Cập nhật cuối</Text>
              <TouchableOpacity>
                <Text style={styles.appInfoAction}>Kiểm tra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.settingsSection}>
          <TouchableOpacity
            style={styles.settingActionItem}
            onPress={handleLogout}
          >
            <Text style={styles.settingActionText}>Đăng xuất</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingActionItem}
            onPress={handleDeleteAccount}
          >
            <Text style={[styles.settingActionText, styles.dangerText]}>
              Xóa tài khoản
            </Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default CustomerSettingsScreen;
