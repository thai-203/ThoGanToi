import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { styles } from "../../styles/styles";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const HelpSupportScreen = ({ onTabPress, onBack }) => {
  const [selectedTab, setSelectedTab] = useState("faq");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqData = [
    {
      id: "1",
      question: "Làm thế nào để đặt dịch vụ?",
      answer:
        "Bạn có thể đặt dịch vụ bằng cách: 1) Chọn loại dịch vụ trên trang chủ, 2) Chọn thợ phù hợp, 3) Chọn thời gian và xác nhận đặt.",
    },
    {
      id: "2",
      question: "Tôi có thể hủy đơn hàng không?",
      answer:
        "Bạn có thể hủy đơn hàng miễn phí trước 2 giờ so với thời gian hẹn. Sau thời gian này sẽ có phí hủy 20% giá trị đơn hàng.",
    },
    {
      id: "3",
      question: "Làm sao để thanh toán?",
      answer:
        "Chúng tôi hỗ trợ thanh toán qua: Tiền mặt, chuyển khoản, ví điện tử (MoMo, ZaloPay), thẻ tín dụng/ghi nợ.",
    },
    {
      id: "4",
      question: "Nếu không hài lòng với dịch vụ thì sao?",
      answer:
        "Bạn có thể khiếu nại trong vòng 24h sau khi hoàn thành. Chúng tôi sẽ xử lý và hoàn tiền nếu lỗi từ thợ.",
    },
    {
      id: "5",
      question: "Thời gian phản hồi của thợ là bao lâu?",
      answer:
        "Thợ sẽ phản hồi yêu cầu trong vòng 15-30 phút. Trong giờ cao điểm có thể mất đến 1 tiếng.",
    },
  ];

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleSubmitContact = () => {
    if (
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.subject ||
      !contactForm.message
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    Alert.alert(
      "Thành công",
      "Yêu cầu hỗ trợ đã được gửi. Chúng tôi sẽ phản hồi trong vòng 24h."
    );
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleCall = () => {
    Linking.openURL("tel:1900123456");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@serviceapp.com");
  };

  const renderFAQ = () => (
    <View style={styles.faqContainer}>
      {faqData.map((item) => (
        <View key={item.id} style={styles.faqItem}>
          <TouchableOpacity
            style={styles.faqQuestion}
            onPress={() =>
              setExpandedFAQ(expandedFAQ === item.id ? null : item.id)
            }
          >
            <Text style={styles.faqQuestionText}>{item.question}</Text>
            <Text style={styles.faqArrow}>
              {expandedFAQ === item.id ? "−" : "+"}
            </Text>
          </TouchableOpacity>
          {expandedFAQ === item.id && (
            <View style={styles.faqAnswer}>
              <Text style={styles.faqAnswerText}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderContact = () => (
    <View style={styles.contactContainer}>
      {/* Quick Contact */}
      <View style={styles.quickContactSection}>
        <Text style={styles.quickContactTitle}>Liên hệ nhanh</Text>
        <View style={styles.quickContactButtons}>
          <TouchableOpacity
            style={styles.quickContactButton}
            onPress={handleCall}
          >
            <Text style={styles.quickContactIcon}>📞</Text>
            <Text style={styles.quickContactText}>Gọi điện</Text>
            <Text style={styles.quickContactSubtext}>1900 123 456</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickContactButton}
            onPress={handleEmail}
          >
            <Text style={styles.quickContactIcon}>✉️</Text>
            <Text style={styles.quickContactText}>Email</Text>
            <Text style={styles.quickContactSubtext}>
              support@serviceapp.com
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.contactFormSection}>
        <Text style={styles.contactFormTitle}>Gửi yêu cầu hỗ trợ</Text>
        <View style={styles.contactForm}>
          <TextInput
            style={styles.contactInput}
            placeholder="Họ và tên"
            value={contactForm.name}
            onChangeText={(text) =>
              setContactForm({ ...contactForm, name: text })
            }
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Email"
            value={contactForm.email}
            onChangeText={(text) =>
              setContactForm({ ...contactForm, email: text })
            }
            keyboardType="email-address"
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Chủ đề"
            value={contactForm.subject}
            onChangeText={(text) =>
              setContactForm({ ...contactForm, subject: text })
            }
          />
          <TextInput
            style={[styles.contactInput, styles.contactTextArea]}
            placeholder="Mô tả vấn đề..."
            value={contactForm.message}
            onChangeText={(text) =>
              setContactForm({ ...contactForm, message: text })
            }
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={styles.submitContactButton}
            onPress={handleSubmitContact}
          >
            <Text style={styles.submitContactButtonText}>Gửi yêu cầu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Hỗ trợ</Text>
        <View />
      </View>

      {/* Tabs */}
      <View style={styles.helpTabContainer}>
        <TouchableOpacity
          style={[
            styles.helpTab,
            selectedTab === "faq" && styles.activeHelpTab,
          ]}
          onPress={() => setSelectedTab("faq")}
        >
          <Text
            style={[
              styles.helpTabText,
              selectedTab === "faq" && styles.activeHelpTabText,
            ]}
          >
            Câu hỏi thường gặp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.helpTab,
            selectedTab === "contact" && styles.activeHelpTab,
          ]}
          onPress={() => setSelectedTab("contact")}
        >
          <Text
            style={[
              styles.helpTabText,
              selectedTab === "contact" && styles.activeHelpTabText,
            ]}
          >
            Liên hệ
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.helpContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === "faq" ? renderFAQ() : renderContact()}
      </ScrollView>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default HelpSupportScreen;
