import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { styles } from "../../styles/styles";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const PaymentMethodScreen = ({ onTabPress, onBack }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "card",
      title: "Thẻ Visa",
      number: "**** **** **** 1234",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "momo",
      title: "Ví MoMo",
      number: "0123456789",
      isDefault: false,
    },
    {
      id: "3",
      type: "cash",
      title: "Tiền mặt",
      number: "Thanh toán khi hoàn thành",
      isDefault: false,
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState("card");
  const [formData, setFormData] = useState({
    title: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const paymentTypes = [
    { id: "card", name: "Thẻ tín dụng", icon: "💳" },
    { id: "momo", name: "Ví MoMo", icon: "📱" },
    { id: "zalopay", name: "ZaloPay", icon: "💰" },
    { id: "banking", name: "Internet Banking", icon: "🏦" },
  ];

  const handleAddPayment = () => {
    setFormData({ title: "", number: "", expiry: "", cvv: "" });
    setSelectedType("card");
    setShowAddModal(true);
  };

  const handleSavePayment = () => {
    if (!formData.title || !formData.number) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newPayment = {
      id: Date.now().toString(),
      type: selectedType,
      title: formData.title,
      number:
        selectedType === "card"
          ? `**** **** **** ${formData.number.slice(-4)}`
          : formData.number,
      expiry: formData.expiry,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newPayment]);
    setShowAddModal(false);
    Alert.alert("Thành công", "Đã thêm phương thức thanh toán");
  };

  const handleDeletePayment = (paymentId) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc muốn xóa phương thức thanh toán này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            setPaymentMethods(
              paymentMethods.filter((payment) => payment.id !== paymentId)
            );
            Alert.alert("Thành công", "Đã xóa phương thức thanh toán");
          },
        },
      ]
    );
  };

  const handleSetDefault = (paymentId) => {
    setPaymentMethods(
      paymentMethods.map((payment) => ({
        ...payment,
        isDefault: payment.id === paymentId,
      }))
    );
    Alert.alert("Thành công", "Đã đặt làm phương thức mặc định");
  };

  const getPaymentIcon = (type) => {
    switch (type) {
      case "card":
        return "💳";
      case "momo":
        return "📱";
      case "zalopay":
        return "💰";
      case "banking":
        return "🏦";
      case "cash":
        return "💵";
      default:
        return "💳";
    }
  };

  const renderPayment = ({ item }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentIcon}>{getPaymentIcon(item.type)}</Text>
          <View style={styles.paymentDetails}>
            <View style={styles.paymentTitleContainer}>
              <Text style={styles.paymentTitle}>{item.title}</Text>
              {item.isDefault && (
                <Text style={styles.defaultBadge}>Mặc định</Text>
              )}
            </View>
            <Text style={styles.paymentNumber}>{item.number}</Text>
            {item.expiry && (
              <Text style={styles.paymentExpiry}>Hết hạn: {item.expiry}</Text>
            )}
          </View>
        </View>
        {item.type !== "cash" && (
          <TouchableOpacity onPress={() => handleDeletePayment(item.id)}>
            <Text style={styles.deletePaymentButton}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
      {!item.isDefault && (
        <TouchableOpacity
          style={styles.setDefaultPaymentButton}
          onPress={() => handleSetDefault(item.id)}
        >
          <Text style={styles.setDefaultPaymentButtonText}>
            Đặt làm mặc định
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Phương thức thanh toán</Text>
        <TouchableOpacity onPress={handleAddPayment}>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={paymentMethods}
        renderItem={renderPayment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.paymentList}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Payment Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Thêm phương thức thanh toán</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Loại thanh toán</Text>
                <View style={styles.paymentTypeContainer}>
                  {paymentTypes.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.paymentTypeButton,
                        selectedType === type.id && styles.selectedPaymentType,
                      ]}
                      onPress={() => setSelectedType(type.id)}
                    >
                      <Text style={styles.paymentTypeIcon}>{type.icon}</Text>
                      <Text
                        style={[
                          styles.paymentTypeName,
                          selectedType === type.id &&
                            styles.selectedPaymentTypeName,
                        ]}
                      >
                        {type.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tên hiển thị</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="VD: Thẻ Visa chính"
                  value={formData.title}
                  onChangeText={(text) =>
                    setFormData({ ...formData, title: text })
                  }
                />
              </View>

              {selectedType === "card" ? (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Số thẻ</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="1234 5678 9012 3456"
                      value={formData.number}
                      onChangeText={(text) =>
                        setFormData({ ...formData, number: text })
                      }
                      keyboardType="numeric"
                      maxLength={19}
                    />
                  </View>
                  <View style={styles.formRow}>
                    <View
                      style={[styles.formGroup, { flex: 1, marginRight: 10 }]}
                    >
                      <Text style={styles.formLabel}>Ngày hết hạn</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChangeText={(text) =>
                          setFormData({ ...formData, expiry: text })
                        }
                        keyboardType="numeric"
                        maxLength={5}
                      />
                    </View>
                    <View
                      style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}
                    >
                      <Text style={styles.formLabel}>CVV</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="123"
                        value={formData.cvv}
                        onChangeText={(text) =>
                          setFormData({ ...formData, cvv: text })
                        }
                        keyboardType="numeric"
                        maxLength={4}
                        secureTextEntry
                      />
                    </View>
                  </View>
                </>
              ) : (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    {selectedType === "momo" || selectedType === "zalopay"
                      ? "Số điện thoại"
                      : "Số tài khoản"}
                  </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={
                      selectedType === "momo" || selectedType === "zalopay"
                        ? "0123456789"
                        : "Nhập số tài khoản"
                    }
                    value={formData.number}
                    onChangeText={(text) =>
                      setFormData({ ...formData, number: text })
                    }
                    keyboardType="numeric"
                  />
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSavePayment}
                >
                  <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default PaymentMethodScreen;
