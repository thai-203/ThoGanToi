import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native"
import { styles } from "../../styles/styles"
import { services } from "../../data/mockData"
import { CustomerBottomNav } from "../../components/BottomNavigation"

const HomeScreen = ({ onServicePress, onTabPress }) => {
  const renderService = ({ item }) => (
    <TouchableOpacity
      style={[styles.serviceCard, { backgroundColor: item.color + "20" }]}
      onPress={() => onServicePress(item)}
    >
      <Text style={styles.serviceIcon}>{item.icon}</Text>
      <Text style={styles.serviceName}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.homeHeader}>
          <Text style={styles.greeting}>Xin chào! 👋</Text>
          <Text style={styles.question}>Bạn cần dịch vụ gì hôm nay?</Text>
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchText}>Tìm kiếm dịch vụ...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Dịch vụ phổ biến</Text>
          <FlatList
            data={services}
            renderItem={renderService}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.servicesList}
          />
        </View>
        <View style={styles.promoContainer}>
          <View style={styles.promoCard}>
            <Text style={styles.promoTitle}>🎉 Ưu đãi đặc biệt</Text>
            <Text style={styles.promoText}>Giảm 20% cho lần đặt đầu tiên</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Sử dụng ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomerBottomNav onTabPress={onTabPress} activeTab="home" />
    </SafeAreaView>
  )
}

export default HomeScreen
