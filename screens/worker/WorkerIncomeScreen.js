import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native"
import { styles } from "../../styles/styles"
import { WorkerBottomNav } from "../../components/BottomNavigation"
import TransactionService from "../../services/transactionService"
import WorkerService from "../../services/workerService"

const WorkerIncomeScreen = ({ onTabPress, onBack, currentUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [transactions, setTransactions] = useState([])
  const [incomeData, setIncomeData] = useState({
    total: 0,
    orders: 0,
    hours: 0,
  })
  const [worker, setWorker] = useState(null)

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

  const filterTransactionsByPeriod = (transactions, period) => {
    const now = new Date()
    const nowDateStr = now.toISOString().slice(0,10)

    return transactions.filter(tx => {
      if (!tx.date) return false
      const [day, month, year] = tx.date.split("/").map(x => parseInt(x))
      const txDate = new Date(year, month - 1, day)
      const txDateStr = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`

      switch (period) {
        case "today":
          return txDateStr === nowDateStr
        case "week":
          const startOfWeek = new Date(now)
          startOfWeek.setDate(now.getDate() - now.getDay())
          startOfWeek.setHours(0,0,0,0)
          const endOfWeek = new Date(startOfWeek)
          endOfWeek.setDate(startOfWeek.getDate() + 6)
          endOfWeek.setHours(23,59,59,999)
          return txDate >= startOfWeek && txDate <= endOfWeek
        case "month":
          return year === now.getFullYear() && month === (now.getMonth() + 1)
        case "year":
          return year === now.getFullYear()
        default:
          return false
      }
    })
  }

  // 🔍 Debug current user
  useEffect(() => {
  }, [currentUser])

  // 🔥 Load worker theo userId
  useEffect(() => {
    const loadWorker = async () => {
      if (!currentUser) return
      const allWorkers = await WorkerService.getAllWorkers()
      const matched = allWorkers.find(w => String(w.userId) === String(currentUser.id))
      setWorker(matched)
    }
    loadWorker()
  }, [currentUser])

  // 🔥 Load transactions cho worker
  useEffect(() => {
    const loadIncomeData = async () => {
      if (!worker) {
        return
      }
      const allTransactions = await TransactionService.getTransactionsByWorkerId(worker.id)

      const filtered = filterTransactionsByPeriod(allTransactions, selectedPeriod)

      const total = filtered.reduce((sum, t) => sum + (t.workerReceived || 0), 0)
      const orders = filtered.length
      const hours = filtered.reduce((sum, t) => sum + (t.estimatedHours || 2), 0)

      setIncomeData({ total, orders, hours })
      setTransactions(filtered)
    }

    loadIncomeData()
  }, [worker, selectedPeriod])

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <Text style={styles.transactionCustomer}>{item.customer}</Text>
          <Text style={styles.transactionService}>{item.service}</Text>
        </View>
        <View style={styles.transactionAmounts}>
          <Text style={styles.transactionGrossAmount}>
            {formatCurrency(item.amount)}
          </Text>
          <Text style={styles.transactionCommission}>
            -{formatCurrency(item.commission)}
          </Text>
          <Text style={styles.transactionNetAmount}>
            {formatCurrency(item.workerReceived)}
          </Text>
        </View>
      </View>
      <View style={styles.transactionFooter}>
        <View
          style={[
            styles.transactionStatus,
            {
              backgroundColor:
                item.status === "completed" ? "#d1fae5" : "#fef3c7",
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

      <ScrollView
        style={styles.incomeContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.selectedPeriodButton,
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period.id && styles.selectedPeriodButtonText,
                ]}
              >
                {period.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.incomeSummary}>
          <View style={styles.incomeSummaryCard}>
            <Text style={styles.incomeSummaryTitle}>Tổng thu nhập</Text>
            <Text style={styles.incomeSummaryAmount}>
              {formatCurrency(incomeData.total)}
            </Text>
            <View style={styles.incomeSummaryDetails}>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>Đơn hàng</Text>
                <Text style={styles.incomeSummaryDetailValue}>
                  {incomeData.orders}
                </Text>
              </View>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>Giờ làm</Text>
                <Text style={styles.incomeSummaryDetailValue}>
                  {incomeData.hours}h
                </Text>
              </View>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>
                  Trung bình/giờ
                </Text>
                <Text style={styles.incomeSummaryDetailValue}>
                  {incomeData.hours > 0
                    ? formatCurrency(Math.round(incomeData.total / incomeData.hours))
                    : "0đ"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.incomeBreakdown}>
          <Text style={styles.incomeBreakdownTitle}>Chi tiết thu nhập</Text>
          <View style={styles.incomeBreakdownCards}>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>💰</Text>
              <Text style={styles.incomeBreakdownLabel}>Tổng doanh thu</Text>
              <Text style={styles.incomeBreakdownAmount}>
                {formatCurrency(incomeData.total * 1.1)}
              </Text>
            </View>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>📊</Text>
              <Text style={styles.incomeBreakdownLabel}>Hoa hồng (10%)</Text>
              <Text style={styles.incomeBreakdownAmount}>
                -{formatCurrency(incomeData.total * 0.1)}
              </Text>
            </View>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>💵</Text>
              <Text style={styles.incomeBreakdownLabel}>Thực nhận</Text>
              <Text style={styles.incomeBreakdownAmount}>
                {formatCurrency(incomeData.total)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recentTransactions}>
          <View style={styles.recentTransactionsHeader}>
            <Text style={styles.recentTransactionsTitle}>
              Giao dịch gần đây
            </Text>
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

        <View style={styles.withdrawalSection}>
          <View style={styles.withdrawalCard}>
            <Text style={styles.withdrawalTitle}>Rút tiền</Text>
            <Text style={styles.withdrawalBalance}>
              Số dư khả dụng: {formatCurrency(incomeData.total)}
            </Text>
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
