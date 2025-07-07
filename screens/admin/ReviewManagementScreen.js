import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, TextInput } from "react-native"
import { styles } from "../../styles/styles"
import { reviews } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"

const ReviewManagementScreen = ({ onTabPress, onBack }) => {
  const [reviewList, setReviewList] = useState(reviews)
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredReviews = reviewList.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      review.worker.toLowerCase().includes(searchText.toLowerCase()) ||
      review.service.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = filterStatus === "all" || review.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleApproveReview = (reviewId) => {
    Alert.alert("Duyệt đánh giá", "Bạn có chắc muốn duyệt đánh giá này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Duyệt",
        onPress: () => {
          setReviewList(
            reviewList.map((review) => (review.id === reviewId ? { ...review, status: "approved" } : review)),
          )
          Alert.alert("Thành công", "Đã duyệt đánh giá")
        },
      },
    ])
  }

  const handleRejectReview = (reviewId) => {
    Alert.alert("Từ chối đánh giá", "Bạn có chắc muốn từ chối đánh giá này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Từ chối",
        style: "destructive",
        onPress: () => {
          setReviewList(
            reviewList.map((review) => (review.id === reviewId ? { ...review, status: "rejected" } : review)),
          )
          Alert.alert("Đã từ chối", "Đánh giá đã bị từ chối")
        },
      },
    ])
  }

  const handleWarningWorker = (review) => {
    Alert.alert("Cảnh báo thợ", `Gửi cảnh báo đến ${review.worker} về vi phạm?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Gửi cảnh báo",
        onPress: () => {
          Alert.alert("Thành công", `Đã gửi cảnh báo đến ${review.worker}`)
        },
      },
    ])
  }

  const getRatingStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating)
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return { backgroundColor: "#d1fae5", color: "#065f46" }
      case "reported":
        return { backgroundColor: "#fee2e2", color: "#dc2626" }
      case "rejected":
        return { backgroundColor: "#f3f4f6", color: "#6b7280" }
      default:
        return { backgroundColor: "#fef3c7", color: "#92400e" }
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Đã duyệt"
      case "reported":
        return "Báo cáo vi phạm"
      case "rejected":
        return "Đã từ chối"
      default:
        return "Chờ duyệt"
    }
  }

  const renderReview = ({ item }) => {
    const statusStyle = getStatusStyle(item.status)

    return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewInfo}>
            <Text style={styles.reviewCustomer}>👤 {item.customer}</Text>
            <Text style={styles.reviewWorker}>👨‍🔧 {item.worker}</Text>
            <Text style={styles.reviewService}>🔧 {item.service}</Text>
            <Text style={styles.reviewDate}>📅 {item.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{getStatusText(item.status)}</Text>
          </View>
        </View>

        <View style={styles.reviewRating}>
          <Text style={styles.ratingStars}>{getRatingStars(item.rating)}</Text>
          <Text style={styles.ratingNumber}>({item.rating}/5)</Text>
        </View>

        <Text style={styles.reviewComment}>"{item.comment}"</Text>

        <View style={styles.reviewActions}>
          {item.status === "reported" && (
            <>
              <TouchableOpacity style={styles.warningButton} onPress={() => handleWarningWorker(item)}>
                <Text style={styles.warningButtonText}>Cảnh báo thợ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveButton} onPress={() => handleApproveReview(item.id)}>
                <Text style={styles.approveButtonText}>Duyệt</Text>
              </TouchableOpacity>
            </>
          )}
          {item.status === "pending" && (
            <>
              <TouchableOpacity style={styles.rejectButton} onPress={() => handleRejectReview(item.id)}>
                <Text style={styles.rejectButtonText}>Từ chối</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveButton} onPress={() => handleApproveReview(item.id)}>
                <Text style={styles.approveButtonText}>Duyệt</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Đánh giá & phản hồi</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>📊</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo khách hàng, thợ, dịch vụ..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "all" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("all")}
        >
          <Text style={[styles.filterText, filterStatus === "all" && styles.activeFilterText]}>
            Tất cả ({reviewList.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "reported" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("reported")}
        >
          <Text style={[styles.filterText, filterStatus === "reported" && styles.activeFilterText]}>
            Vi phạm ({reviewList.filter((r) => r.status === "reported").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "approved" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("approved")}
        >
          <Text style={[styles.filterText, filterStatus === "approved" && styles.activeFilterText]}>
            Đã duyệt ({reviewList.filter((r) => r.status === "approved").length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredReviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="reviewManagement" />
    </SafeAreaView>
  )
}

export default ReviewManagementScreen
