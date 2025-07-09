import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native"
import { styles } from "../../styles/styles"
import { WorkerBottomNav } from "../../components/BottomNavigation"

const WorkerIncomeScreen = ({ onTabPress, onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [incomeData] = useState({
    today: {
      total: 450000,
      orders: 3,
      hours: 6,
    },
    week: {
      total: 2100000,
      orders: 12,
      hours: 28,
    },
    month: {
      total: 8900000,
      orders: 45,
      hours: 120,
    },
    year: {
      total: 89000000,
      orders: 456,
      hours: 1200,
    },
  })

  const [transactions] = useState([
    {
      id: "1",
      date: "18/01/2024",
      customer: "Nguyễn Văn A",
      service: "Sửa điện",
      amount: 300000,
      commission: 30000,
      netAmount: 270000,
      status: "completed",
    },
    {
      id: "2",
      date: "17/01/2024",
      customer: "Trần Thị B",
      service: "Lắp quạt trần",
      amount: 225000,
      commission: 22500,
      netAmount: 202500,
      status: "completed",
    },
    {
      id: "3",
      date: "16/01/2024",
      customer: "Lê Văn C",
      service: "Kiểm tra hệ thống",
      amount: 450000,
      commission: 45000,
      netAmount: 405000,
      status: "pending",
    },
    {
      id: "4",
      date: "15/01/2024",
      customer: "Phạm Thị D",
      service: "Thay bóng đèn",
      amount: 150000,
      commission: 15000,
      netAmount: 135000,
      status: "completed",
    },
  ])

  const periods = [
    { id: "today", name: "Hôm nay" },
    { id: "week", name: "Tuần này" },
    { id: "month", name: "Tháng này" },
    { id: "year", name: "Năm này" },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getCurrentData = () => incomeData[selectedPeriod]

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <Text style={styles.transactionCustomer}>{item.customer}</Text>
          <Text style={styles.transactionService}>{item.service}</Text>
        </View>
        <View style={styles.transactionAmounts}>
          <Text style={styles.transactionGrossAmount}>{formatCurrency(item.amount)}</Text>
          <Text style={styles.transactionCommission}>-{formatCurrency(item.commission)}</Text>
          <Text style={styles.transactionNetAmount}>{formatCurrency(item.netAmount)}</Text>
        </View>
      </View>
      <View style={styles.transactionFooter}>
        <View
          style={[
            styles.transactionStatus,
            {
              backgroundColor: item.status === "completed" ? "#d1fae5" : "#fef3c7",
            },
          ]}
        >
          <Text
            style={[
              styles.transactionStatusText,
              {
                color: item.status === "completed" ? "#065f46" : "#92400e",
              },
            ]}
          >
            {item.status === "completed" ? "Đã thanh toán" : "Chờ thanh toán"}
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Báo cáo thu nhập</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>📊</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.incomeContent} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[styles.periodButton, selectedPeriod === period.id && styles.selectedPeriodButton]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[styles.periodButtonText, selectedPeriod === period.id && styles.selectedPeriodButtonText]}>
                {period.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Income Summary */}
        <View style={styles.incomeSummary}>
          <View style={styles.incomeSummaryCard}>
            <Text style={styles.incomeSummaryTitle}>Tổng thu nhập</Text>
            <Text style={styles.incomeSummaryAmount}>{formatCurrency(getCurrentData().total)}</Text>
            <View style={styles.incomeSummaryDetails}>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>Đơn hàng</Text>
                <Text style={styles.incomeSummaryDetailValue}>{getCurrentData().orders}</Text>
              </View>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>Giờ làm</Text>
                <Text style={styles.incomeSummaryDetailValue}>{getCurrentData().hours}h</Text>
              </View>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>Trung bình/giờ</Text>
                <Text style={styles.incomeSummaryDetailValue}>
                  {formatCurrency(Math.round(getCurrentData().total / getCurrentData().hours))}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Income Breakdown */}
        <View style={styles.incomeBreakdown}>
          <Text style={styles.incomeBreakdownTitle}>Chi tiết thu nhập</Text>
          <View style={styles.incomeBreakdownCards}>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>💰</Text>
              <Text style={styles.incomeBreakdownLabel}>Tổng doanh thu</Text>
              <Text style={styles.incomeBreakdownAmount}>
                {formatCurrency(getCurrentData().total * 1.1)} {/* Assuming 10% commission */}
              </Text>
            </View>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>📊</Text>
              <Text style={styles.incomeBreakdownLabel}>Hoa hồng (10%)</Text>
              <Text style={styles.incomeBreakdownAmount}>-{formatCurrency(getCurrentData().total * 0.1)}</Text>
            </View>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>💵</Text>
              <Text style={styles.incomeBreakdownLabel}>Thực nhận</Text>
              <Text style={styles.incomeBreakdownAmount}>{formatCurrency(getCurrentData().total)}</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.recentTransactions}>
          <View style={styles.recentTransactionsHeader}>
            <Text style={styles.recentTransactionsTitle}>Giao dịch gần đây</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllTransactions}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={transactions.slice(0, 5)}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.transactionsList}
          />
        </View>

        {/* Withdrawal */}
        <View style={styles.withdrawalSection}>
          <View style={styles.withdrawalCard}>
            <Text style={styles.withdrawalTitle}>Rút tiền</Text>
            <Text style={styles.withdrawalBalance}>Số dư khả dụng: {formatCurrency(getCurrentData().total)}</Text>
            <TouchableOpacity style={styles.withdrawalButton}>
              <Text style={styles.withdrawalButtonText}>💳 Rút tiền</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <WorkerBottomNav onTabPress={onTabPress} activeTab="workerProfile" />
    </SafeAreaView>
  )
}

export default WorkerIncomeScreen
