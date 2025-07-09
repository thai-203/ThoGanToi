import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "../../styles/additional";
import { WorkerBottomNav } from "../../components/BottomNavigation";

const WorkerReviewsScreen = ({ onTabPress, onBack }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Tất cả", count: 127 },
    { id: "5star", label: "5 sao", count: 89 },
    { id: "4star", label: "4 sao", count: 25 },
    { id: "3star", label: "3 sao", count: 8 },
    { id: "recent", label: "Gần đây", count: 15 },
  ];

  const reviews = [
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      customerAvatar: "👤",
      rating: 5,
      date: "2 ngày trước",
      service: "Sửa chữa điện",
      comment:
        "Thợ làm việc rất chuyên nghiệp, nhanh chóng và sạch sẽ. Giá cả hợp lý, sẽ gọi lại lần sau.",
      orderId: "#DH001234",
      helpful: 3,
      hasImages: true,
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      customerAvatar: "👩",
      rating: 5,
      date: "5 ngày trước",
      service: "Lắp đặt thiết bị",
      comment:
        "Rất hài lòng với dịch vụ. Thợ đến đúng giờ, làm việc cẩn thận và tư vấn nhiệt tình.",
      orderId: "#DH001235",
      helpful: 5,
      hasImages: false,
    },
    {
      id: 3,
      customerName: "Lê Văn C",
      customerAvatar: "👨",
      rating: 4,
      date: "1 tuần trước",
      service: "Bảo trì hệ thống",
      comment:
        "Công việc được hoàn thành tốt, tuy nhiên thời gian hơi lâu so với dự kiến.",
      orderId: "#DH001236",
      helpful: 2,
      hasImages: true,
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ];

  const handleReply = (reviewId) => {
    Alert.alert(
      "Trả lời đánh giá",
      "Tính năng trả lời đánh giá đang được phát triển"
    );
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Đánh giá từ khách hàng</Text>
        <View style={styles.headerRight}>
          <Text style={styles.reviewCount}>127 đánh giá</Text>
        </View>
      </View>

      <ScrollView style={styles.reviewsContent}>
        {/* Overall Rating */}
        <View style={styles.overallRatingSection}>
          <Text style={styles.sectionTitle}>Tổng quan đánh giá</Text>
          <View style={styles.overallRatingCard}>
            <View style={styles.overallRatingLeft}>
              <Text style={styles.overallRatingNumber}>4.8</Text>
              <Text style={styles.overallRatingStars}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.overallRatingText}>127 đánh giá</Text>
            </View>
            <View style={styles.overallRatingRight}>
              {ratingDistribution.map((item) => (
                <View key={item.stars} style={styles.ratingDistributionRow}>
                  <Text style={styles.ratingDistributionStars}>
                    {item.stars}⭐
                  </Text>
                  <View style={styles.ratingDistributionBar}>
                    <View
                      style={[
                        styles.ratingDistributionFill,
                        { width: `${item.percentage}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.ratingDistributionCount}>
                    {item.count}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.reviewFilterTabs}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.reviewFilterTab,
                activeFilter === filter.id && styles.activeReviewFilterTab,
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text
                style={[
                  styles.reviewFilterTabText,
                  activeFilter === filter.id &&
                    styles.activeReviewFilterTabText,
                ]}
              >
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewCustomerInfo}>
                  <Text style={styles.reviewCustomerAvatar}>
                    {review.customerAvatar}
                  </Text>
                  <View style={styles.reviewCustomerDetails}>
                    <Text style={styles.reviewCustomerName}>
                      {review.customerName}
                    </Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.reviewMenuButton}>
                  <Text style={styles.reviewMenuIcon}>⋮</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.reviewRating}>
                <Text style={styles.reviewStars}>
                  {renderStars(review.rating)}
                </Text>
                <Text style={styles.reviewService}>• {review.service}</Text>
              </View>

              <Text style={styles.reviewComment}>{review.comment}</Text>

              {review.hasImages && (
                <View style={styles.reviewImages}>
                  <View style={styles.reviewImagePlaceholder}>
                    <Text style={styles.reviewImageIcon}>🖼️</Text>
                  </View>
                  <View style={styles.reviewImagePlaceholder}>
                    <Text style={styles.reviewImageIcon}>🖼️</Text>
                  </View>
                </View>
              )}

              <View style={styles.reviewFooter}>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewOrderId}>
                    Đơn hàng: {review.orderId}
                  </Text>
                  <Text style={styles.reviewHelpful}>
                    {review.helpful} người thấy hữu ích
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.replyButton}
                  onPress={() => handleReply(review.id)}
                >
                  <Text style={styles.replyButtonText}>Trả lời</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.reviewTipsSection}>
          <View style={styles.reviewTips}>
            <Text style={styles.reviewTipsTitle}>
              💡 Mẹo cải thiện đánh giá
            </Text>
            <Text style={styles.reviewTipsText}>
              • Luôn đến đúng giờ và thông báo trước nếu có thay đổi{"\n"}• Làm
              việc cẩn thận, sạch sẽ và chuyên nghiệp{"\n"}• Tư vấn và giải
              thích rõ ràng cho khách hàng{"\n"}• Trả lời đánh giá một cách lịch
              sự và chân thành
            </Text>
          </View>
        </View>
      </ScrollView>

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  );
};

export default WorkerReviewsScreen;
