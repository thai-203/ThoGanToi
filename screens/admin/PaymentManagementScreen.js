import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, TextInput } from "react-native"
import { styles } from "../../styles/styles"
import { transactions } from "../../data/mockData"
import { AdminBottomNav } from "../../components/BottomNavigation"

const PaymentManagementScreen = ({ onTabPress, onBack }) => {
  const [transactionList, setTransactionList] = useState(transactions)
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [commissionRate, setCommissionRate] = useState(10) // 10%

  const filteredTransactions = transactionList.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.worker.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleUpdateCommission = () => {
    Alert.prompt(
      "Cập nhật hoa hồng",
      `Tỷ lệ hoa hồng hiện tại: ${commissionRate}%`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Cập nhật",
          onPress: (newRate) => {
            const rate = Number.parseFloat(newRate)
            if (rate && rate >= 0 && rate <= 50) {
              setCommissionRate(rate)
              Alert.alert("Thành công", `Đã cập nhật tỷ lệ hoa hồng thành ${rate}%`)
            } else {
              Alert.alert("Lỗi", "Vui lòng nhập tỷ lệ từ 0-50%")
            }
          },
        },
      ],
      "numeric",
      commissionRate.toString(),
    )
  }

  const handleProcessWithdrawal = (transaction) => {
    Alert.alert("Xử lý rút tiền", `Xử lý yêu cầu rút tiền cho ${transaction.worker}?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xử lý",
        onPress: () => {
          Alert.alert("Thành công", "Đã xử lý yêu cầu rút tiền")
        },
      },
    ])
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getTotalRevenue = () => {
    return transactionList.reduce((total, transaction) => total + transaction.amount, 0)
  }

  const getTotalCommission = () => {
    return transactionList.reduce((total, transaction) => total + transaction.commission, 0)
  }

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionId}>#{item.orderId}</Text>
          <Text style={styles.transactionCustomer}>👤 {item.customer}</Text>
          <Text style={styles.transactionWorker}>👨‍🔧 {item.worker}</Text>
          <Text style={styles.transactionDate}>📅 {item.date}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: item.status === "completed" ? "#d1fae5" : "#fef3c7",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: item.status === "completed" ? "#065f46" : "#92400e",
              },
            ]}
          >
            {item.status === "completed" ? "Hoàn thành" : "Chờ xử lý"}
          </Text>
        </View>
      </View>

      <View style={styles.transactionDetails}>
        <View style={styles.transactionRow}>
          <Text style={styles.transactionLabel}>Tổng tiền:</Text>
          <Text style={styles.transactionAmount}>{formatCurrency(item.amount)}</Text>
        </View>
        <View style={styles.transactionRow}>
          <Text style={styles.transactionLabel}>Hoa hồng ({commissionRate}%):</Text>
          <Text style={styles.transactionCommission}>{formatCurrency(item.commission)}</Text>
        </View>
        <View style={styles.transactionRow}>
          <Text style={styles.transactionLabel}>Thợ nhận:</Text>
          <Text style={styles.transactionWorkerReceived}>{formatCurrency(item.workerReceived)}</Text>
        </View>
      </View>

      {item.status === "pending" && (
        <View style={styles.transactionActions}>
          <TouchableOpacity style={styles.processButton} onPress={() => handleProcessWithdrawal(item)}>
            <Text style={styles.processButtonText}>Xử lý rút tiền</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thanh toán & hoa hồng</Text>
        <TouchableOpacity onPress={handleUpdateCommission}>
          <Text style={styles.filterButton}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.paymentStatsContainer}>
        <View style={styles.paymentStatCard}>
          <Text style={styles.paymentStatIcon}>💰</Text>
          <Text style={styles.paymentStatNumber}>{formatCurrency(getTotalRevenue())}</Text>
          <Text style={styles.paymentStatLabel}>Tổng doanh thu</Text>
        </View>
        <View style={styles.paymentStatCard}>
          <Text style={styles.paymentStatIcon}>📊</Text>
          <Text style={styles.paymentStatNumber}>{formatCurrency(getTotalCommission())}</Text>
          <Text style={styles.paymentStatLabel}>Tổng hoa hồng</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo mã đơn, khách hàng, thợ..."
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
            Tất cả ({transactionList.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "completed" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("completed")}
        >
          <Text style={[styles.filterText, filterStatus === "completed" && styles.activeFilterText]}>
            Hoàn thành ({transactionList.filter((t) => t.status === "completed").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === "pending" && styles.activeFilterChip]}
          onPress={() => setFilterStatus("pending")}
        >
          <Text style={[styles.filterText, filterStatus === "pending" && styles.activeFilterText]}>
            Chờ xử lý ({transactionList.filter((t) => t.status === "pending").length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="paymentManagement" />
    </SafeAreaView>
  )
}

export default PaymentManagementScreen
