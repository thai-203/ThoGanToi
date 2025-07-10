import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  // Common Styles
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  // Login Screen Styles
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  switchLabel: {
    fontSize: 16,
    color: "#1f2937",
  },
  loginButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    alignItems: "center",
    marginTop: 15,
  },
  registerButtonText: {
    color: "#2563eb",
    fontSize: 14,
  },
  // Thêm styles cho login info
  loginInfo: {
    backgroundColor: "#f0f9ff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    marginVertical: 10,
  },
  loginInfoText: {
    fontSize: 14,
    color: "#1e40af",
    marginBottom: 2,
  },

  // Forgot Password Styles
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 15,
    padding: 8, // Thêm padding để dễ nhấn hơn
    borderRadius: 4,
  },
  forgotPasswordText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline", // Thêm gạch chân để rõ ràng hơn
  },

  // OTP Input Styles
  otpInput: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 8,
  },

  // Resend OTP Styles
  resendContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  countdownText: {
    fontSize: 14,
    color: "#6b7280",
  },
  resendButton: {
    padding: 10,
  },
  resendButtonText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },

  // Home Screen Styles
  homeHeader: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  question: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchText: {
    color: "#9ca3af",
    fontSize: 16,
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 15,
  },
  servicesList: {
    gap: 10,
  },
  serviceCard: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    margin: 5,
    minHeight: 100,
    justifyContent: "center",
  },
  serviceIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
  },
  promoContainer: {
    padding: 20,
    marginTop: 20,
    marginBottom: 80,
  },
  promoCard: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  promoText: {
    fontSize: 14,
    color: "#bfdbfe",
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoButtonText: {
    color: "#2563eb",
    fontWeight: "600",
  },

  // Screen Header Styles
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    fontSize: 16,
    color: "#2563eb",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  filterButton: {
    fontSize: 20,
  },
  favoriteButton: {
    fontSize: 20,
  },

  // Filter Styles
  filterContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
  },
  filterChip: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  filterText: {
    fontSize: 14,
    color: "#6b7280",
  },
  // Thêm styles cho filter active state
  activeFilterChip: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  activeFilterText: {
    color: "white",
    fontWeight: "600",
  },

  // Worker List Styles
  workersList: {
    padding: 15,
    gap: 15,
    paddingBottom: 100,
  },
  workerCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  workerHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    fontSize: 40,
    marginRight: 15,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  experience: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rating: {
    fontSize: 14,
    color: "#f59e0b",
  },
  reviews: {
    fontSize: 12,
    color: "#9ca3af",
  },
  workerMeta: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 5,
  },
  distance: {
    fontSize: 12,
    color: "#6b7280",
  },
  workerFooter: {
    flexDirection: "row",
    gap: 10,
  },
  contactButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  contactButtonText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  bookButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },

  // Worker Detail Styles
  detailContent: {
    flex: 1,
    marginBottom: 140,
  },
  workerProfile: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  detailAvatar: {
    fontSize: 60,
    marginBottom: 10,
  },
  detailWorkerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  detailExperience: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 10,
  },
  detailRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  detailRating: {
    fontSize: 16,
    color: "#f59e0b",
  },
  detailReviews: {
    fontSize: 14,
    color: "#9ca3af",
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  serviceItem: {
    fontSize: 14,
    color: "#6b7280",
  },
  dateContainer: {
    flexDirection: "row",
    gap: 10,
  },
  dateButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  selectedDate: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  dateText: {
    fontSize: 14,
    color: "#6b7280",
  },
  selectedDateText: {
    color: "white",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  selectedTime: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  timeText: {
    fontSize: 14,
    color: "#6b7280",
  },
  selectedTimeText: {
    color: "white",
  },
  detailFooter: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 15,
  },
  callButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  callButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },

  // History Screen Styles
  historyHeader: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#2563eb",
  },
  tabText: {
    fontSize: 14,
    color: "#6b7280",
  },
  activeTabText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  bookingsList: {
    padding: 15,
    gap: 15,
    paddingBottom: 100,
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  bookingServiceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  bookingWorkerName: {
    fontSize: 14,
    color: "#6b7280",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailIcon: {
    fontSize: 14,
  },
  detailText: {
    fontSize: 14,
    color: "#6b7280",
    flex: 1,
  },
  bookingActions: {
    flexDirection: "row",
    gap: 10,
  },
  reviewButton: {
    flex: 1,
    backgroundColor: "#f59e0b",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  reviewButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  rebookButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  rebookButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Profile Screen Styles
  profileHeader: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  profileAvatar: {
    fontSize: 50,
    backgroundColor: "#f3f4f6",
    width: 70,
    height: 70,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 35,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: "#6b7280",
  },
  editButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  statsContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 20,
    marginTop: 10,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e5e7eb",
  },
  menuContainer: {
    backgroundColor: "white",
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuIcon: {
    fontSize: 20,
    width: 25,
    textAlign: "center",
  },
  menuTitle: {
    fontSize: 16,
    color: "#1f2937",
  },
  menuArrow: {
    fontSize: 18,
    color: "#9ca3af",
  },
  promoIcon: {
    fontSize: 30,
  },
  promoContent: {
    flex: 1,
  },
  logoutButton: {
    margin: 20,
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 100,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Worker Dashboard Styles
  workerHeader: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  workerAvatar: {
    fontSize: 50,
  },
  workerSpecialty: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 5,
  },
  workerRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  notificationButton: {
    position: "relative",
    padding: 10,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
    gap: 10,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActions: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },
  recentOrdersSection: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
    marginBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAllText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },
  recentOrdersList: {
    gap: 10,
  },
  recentOrderCard: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  recentOrderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recentOrderCustomer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  recentOrderService: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 5,
  },
  recentOrderTime: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 5,
  },
  recentOrderPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563eb",
  },

  // Worker Orders Styles
  ordersList: {
    padding: 15,
    gap: 15,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  customerAvatar: {
    fontSize: 40,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  orderService: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 5,
  },
  orderTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  orderDetails: {
    marginBottom: 15,
  },
  orderAddress: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  orderDescription: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 10,
    lineHeight: 20,
  },
  orderMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDuration: {
    fontSize: 14,
    color: "#6b7280",
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
  },
  orderActions: {
    gap: 10,
  },
  phoneButton: {
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  phoneButtonText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },
  pendingActions: {
    flexDirection: "row",
    gap: 10,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  rejectButtonText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "600",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  completeButton: {
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  completeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Worker Order Detail Styles
  orderDetailContent: {
    flex: 1,
    marginBottom: 160,
  },
  customerDetailInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  customerDetailAvatar: {
    fontSize: 50,
  },
  customerDetails: {
    flex: 1,
  },
  customerDetailName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  customerDetailPhone: {
    fontSize: 16,
    color: "#2563eb",
  },
  orderDetailInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "600",
    flex: 2,
    textAlign: "right",
  },
  priceValue: {
    color: "#2563eb",
    fontSize: 16,
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  addressIcon: {
    fontSize: 16,
  },
  addressText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
    lineHeight: 20,
  },
  orderDetailDescription: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  notesList: {
    gap: 8,
  },
  noteItem: {
    fontSize: 14,
    color: "#6b7280",
  },
  orderDetailFooter: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 10,
  },
  callActionButton: {
    backgroundColor: "#f0f9ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  callActionButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
  pendingActionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  rejectActionButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  rejectActionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  acceptActionButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  acceptActionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  completeActionButton: {
    backgroundColor: "#10b981",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  completeActionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Worker Profile Styles
  workerProfileHeader: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  workerProfileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  workerProfileAvatar: {
    fontSize: 50,
  },
  workerProfileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  workerProfilePhone: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  workerProfileSpecialty: {
    fontSize: 14,
    color: "#2563eb",
  },
  availabilityContainer: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  availabilityInfo: {
    flex: 1,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  availabilitySubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  workerStatsContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 20,
    marginTop: 10,
  },
  workerStatItem: {
    flex: 1,
    alignItems: "center",
  },
  workerStatNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 2,
  },
  workerStatLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  earningsContainer: {
    padding: 20,
    marginTop: 10,
  },
  earningsCard: {
    backgroundColor: "#2563eb",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  earningsIcon: {
    fontSize: 30,
  },
  earningsContent: {
    flex: 1,
  },
  earningsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
  },
  earningsAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
  },
  earningsSubtext: {
    fontSize: 12,
    color: "#bfdbfe",
  },
  earningsButton: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  earningsButtonText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },

  // Bottom Navigation Styles
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navText: {
    fontSize: 12,
    color: "#6b7280",
  },
  activeNavText: {
    color: "#2563eb",
    fontWeight: "600",
  },

  // Admin Styles
  adminHeader: {
    backgroundColor: "#7c3aed",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  adminTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  adminSubtitle: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
  },
  adminStatsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
    gap: 10,
  },
  adminStatCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminStatIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  adminStatNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 4,
  },
  adminStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  adminMenuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  adminMenuCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminMenuIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  adminMenuTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },
  adminMenuDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 5,
  },

  // Quick Stats
  quickStatsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    gap: 20,
  },
  quickStatItem: {
    flex: 1,
    alignItems: "center",
  },
  quickStatNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },

  // User Management Styles
  userCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    fontSize: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userRole: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  adminRole: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  customerRole: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
  },
  workerRole: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  userActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  editUserButton: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  editUserButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteUserButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteUserButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // Service Management Styles
  serviceManagementCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  serviceManagementIcon: {
    fontSize: 24,
  },
  serviceInfo: {
    flex: 1,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  serviceActions: {
    flexDirection: "row",
    gap: 10,
  },
  editServiceButton: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  editServiceButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  toggleServiceButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleServiceButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Review Management Styles
  reviewCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewCustomer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  reviewWorker: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  reviewService: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
  },
  ratingStars: {
    fontSize: 16,
  },
  ratingNumber: {
    fontSize: 14,
    color: "#6b7280",
  },
  reviewComment: {
    fontSize: 14,
    color: "#374151",
    fontStyle: "italic",
    marginBottom: 15,
    lineHeight: 20,
  },
  reviewActions: {
    flexDirection: "row",
    gap: 10,
  },
  warningButton: {
    flex: 1,
    backgroundColor: "#f59e0b",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  warningButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  approveButton: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  approveButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Payment Management Styles
  paymentStatsContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
  },
  paymentStatCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentStatIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  paymentStatNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
    textAlign: "center",
  },
  paymentStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  transactionCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  transactionCustomer: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  transactionWorker: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  transactionDetails: {
    marginBottom: 15,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  transactionCommission: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ef4444",
  },
  transactionWorkerReceived: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10b981",
  },
  transactionActions: {
    flexDirection: "row",
    gap: 10,
  },
  processButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  processButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Area Management Styles
  areaStatsContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
  },
  areaStatCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  areaStatNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
  },
  areaStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  areaCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  areaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  areaCity: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 5,
  },
  areaWorkerCount: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
  },
  areaActions: {
    flexDirection: "row",
    gap: 10,
  },
  assignButton: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  assignButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  toggleAreaButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleAreaButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Admin Account Management Styles
  adminAccountStatsContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
  },
  adminAccountStatCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminAccountStatIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  adminAccountStatNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 4,
  },
  adminAccountStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  adminAccountCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  adminAccountHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  adminAccountAvatar: {
    fontSize: 40,
    marginRight: 15,
  },
  adminAccountInfo: {
    flex: 1,
  },
  adminAccountName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  adminAccountPhone: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  adminAccountEmail: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  adminAccountRole: {
    fontSize: 14,
    color: "#7c3aed",
    fontWeight: "600",
    marginBottom: 2,
  },
  adminAccount2FA: {
    fontSize: 12,
    color: "#10b981",
  },
  adminAccountActions: {
    flexDirection: "row",
    gap: 10,
  },
  permissionButton: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  permissionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  securityButton: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  securityButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteAdminButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteAdminButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // System Settings Styles
  settingsContent: {
    flex: 1,
    marginBottom: 80,
  },
  settingsSection: {
    backgroundColor: "white",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 15,
  },
  settingsItem: {
    marginBottom: 15,
  },
  settingsLabel: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
    fontWeight: "600",
  },
  settingsInput: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
  },
  settingsButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  settingsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  settingsToggleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  settingsToggleInfo: {
    flex: 1,
  },
  settingsToggleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  settingsToggleSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  settingsMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  settingsMenuIcon: {
    fontSize: 20,
    width: 30,
    textAlign: "center",
    marginRight: 15,
  },
  settingsMenuInfo: {
    flex: 1,
  },
  settingsMenuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  settingsMenuSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  settingsMenuArrow: {
    fontSize: 18,
    color: "#9ca3af",
  },
  dangerButton: {
    backgroundColor: "#ef4444",
  },
  dangerButtonText: {
    color: "white",
  },

  // System Logs Styles
  logStatsContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
  },
  logStatCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logStatIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  logStatNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
  },
  logStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  logCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logHeader: {
    marginBottom: 10,
  },
  logInfo: {
    gap: 5,
  },
  logActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  logActionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  logAction: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logUser: {
    fontSize: 14,
    color: "#6b7280",
  },
  logTimestamp: {
    fontSize: 14,
    color: "#6b7280",
  },
  logIP: {
    fontSize: 12,
    color: "#9ca3af",
  },
  logDetails: {
    fontSize: 14,
    color: "#374151",
    fontStyle: "italic",
    lineHeight: 20,
  },
  // Register Screen Styles
  roleContainer: {
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 10,
  },
  roleButtons: {
    flexDirection: "row",
    gap: 10,
  },
  roleButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    backgroundColor: "white",
    alignItems: "center",
  },
  activeRoleButton: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  activeRoleButtonText: {
    color: "#2563eb",
  },
  workerFieldsContainer: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 15,
  },
  workerFieldsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 15,
    textAlign: "center",
  },
  workerNote: {
    backgroundColor: "#fef3c7",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fbbf24",
    marginTop: 10,
  },
  workerNoteText: {
    fontSize: 14,
    color: "#92400e",
    textAlign: "center",
    lineHeight: 20,
  },
  // Register Screen Styles - Fixed
  registerContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
})
