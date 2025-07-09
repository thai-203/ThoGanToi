import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { styles } from "../../styles/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import orderService from "../../services/orderService";

const PaymentManagementScreen = ({ onTabPress, onBack }) => {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [commissionRate, setCommissionRate] = useState(10);

  useEffect(() => {
    fetchData();
  }, [commissionRate]);

  const fetchData = async () => {
    const data = await orderService.getAllOrders();
    const transactions = data.map((order) => {
      const amount = parseInt(order.price.replace(/[^\d]/g, ""));
      const commission = Math.round((amount * commissionRate) / 100);
      const workerReceived = amount - commission;
      return {
        ...order,
        amount,
        commission,
        workerReceived,
        orderId: order.id,
      };
    });
    setOrders(transactions);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const getTotalRevenue = () => orders.reduce((sum, o) => sum + o.amount, 0);

  const getTotalCommission = () =>
    orders.reduce((sum, o) => sum + o.commission, 0);

  const handleUpdateCommission = () => {
    Alert.prompt(
      "Cập nhật hoa hồng",
      `Tỷ lệ hiện tại: ${commissionRate}%`,
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Cập nhật",
          onPress: (input) => {
            const rate = parseFloat(input);
            if (!isNaN(rate) && rate >= 0 && rate <= 50) {
              setCommissionRate(rate);
              Alert.alert("Thành công", `Đã cập nhật: ${rate}%`);
            } else {
              Alert.alert("Lỗi", "Vui lòng nhập số từ 0 đến 50");
            }
          },
        },
      ],
      "numeric",
      commissionRate.toString()
    );
  };

  const handleProcessWithdrawal = (order) => {
    Alert.alert("Xử lý rút tiền", `Xác nhận xử lý đơn ${order.orderId}?`, [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: async () => {
          await orderService.updateOrder(order.id, { status: "completed" });
          fetchData();
          Alert.alert("Thành công", "Đơn đã được cập nhật");
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View>
          <Text style={styles.transactionId}>#{item.orderId}</Text>
          <Text style={styles.transactionCustomer}>👤 {item.customer}</Text>
          <Text style={styles.transactionWorker}>
            👨‍🔧 Thợ ID: {item.workerId}
          </Text>
          <Text style={styles.transactionDate}>
            📅 {item.date} {item.time}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "completed" ? "#d1fae5" : "#fef3c7",
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
          <Text style={styles.transactionAmount}>
            {formatCurrency(item.amount)}
          </Text>
        </View>
        <View style={styles.transactionRow}>
          <Text style={styles.transactionLabel}>
            Hoa hồng ({commissionRate}%):
          </Text>
          <Text style={styles.transactionCommission}>
            {formatCurrency(item.commission)}
          </Text>
        </View>
        <View style={styles.transactionRow}>
          <Text style={styles.transactionLabel}>Thợ nhận:</Text>
          <Text style={styles.transactionWorkerReceived}>
            {formatCurrency(item.workerReceived)}
          </Text>
        </View>
      </View>

      {item.status === "pending" && (
        <View style={styles.transactionActions}>
          <TouchableOpacity
            style={styles.processButton}
            onPress={() => handleProcessWithdrawal(item)}
          >
            <Text style={styles.processButtonText}>Xử lý rút tiền</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thanh toán & Hoa hồng</Text>
        <TouchableOpacity onPress={handleUpdateCommission}>
          <Text style={styles.filterButton}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.paymentStatsContainer}>
        <View style={styles.paymentStatCard}>
          <Text style={styles.paymentStatIcon}>💰</Text>
          <Text style={styles.paymentStatNumber}>
            {formatCurrency(getTotalRevenue())}
          </Text>
          <Text style={styles.paymentStatLabel}>Tổng doanh thu</Text>
        </View>
        <View style={styles.paymentStatCard}>
          <Text style={styles.paymentStatIcon}>📊</Text>
          <Text style={styles.paymentStatNumber}>
            {formatCurrency(getTotalCommission())}
          </Text>
          <Text style={styles.paymentStatLabel}>Tổng hoa hồng</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo mã đơn, khách hàng..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        {["all", "completed", "pending"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterChip,
              filterStatus === status && styles.activeFilterChip,
            ]}
            onPress={() => setFilterStatus(status)}
          >
            <Text
              style={[
                styles.filterText,
                filterStatus === status && styles.activeFilterText,
              ]}
            >
              {status === "all"
                ? `Tất cả (${orders.length})`
                : `${status === "completed" ? "Hoàn thành" : "Chờ xử lý"} (${
                    orders.filter((o) => o.status === status).length
                  })`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="paymentManagement" />
    </SafeAreaView>
  );
};

export default PaymentManagementScreen;
