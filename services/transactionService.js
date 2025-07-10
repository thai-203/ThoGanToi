import FirebaseService from "./firebaseService"

class TransactionService {
  constructor() {
    this.basePath = "transactions"
  }

  // Lấy tất cả transactions
  async getAllTransactions() {
    try {
      return await FirebaseService.readAll(this.basePath)
    } catch (error) {
      console.error("❌ Error getting all transactions:", error)
      return []
    }
  }

  // Lấy giao dịch theo workerId
  async getTransactionsByWorkerId(workerId) {
    try {
      const raw = await FirebaseService.readAll(this.basePath)
      const allTransactions = Array.isArray(raw) ? raw : Object.values(raw || {})
  
      allTransactions.forEach(t => {
        console.log(`📝 Transaction id=${t.id}, workerId=${t.workerId}`)
      })
  
      const filtered = allTransactions.filter(
        t => String(t.workerId) === String(workerId)
      )
      console.log("🚀 Filtered transactions by workerId:", filtered)
      return filtered
    } catch (error) {
      console.error("❌ Error getting transactions by workerId:", error)
      return []
    }
  }
  

  // Có thể thêm các hàm mở rộng
  // Lấy giao dịch theo trạng thái
  async getTransactionsByStatus(status) {
    try {
      const allTransactions = await FirebaseService.readAll(this.basePath)
      return allTransactions.filter(tx => tx.status === status)
    } catch (error) {
      console.error("❌ Error getting transactions by status:", error)
      return []
    }
  }

  // Lấy giao dịch theo tháng & workerId
  async getTransactionsByWorkerAndMonth(workerId, month, year) {
    try {
      const allTransactions = await this.getTransactionsByWorkerId(workerId)
      return allTransactions.filter(tx => {
        if (!tx.date) return false
        const [day, m, y] = tx.date.split("/").map(x => parseInt(x))
        return m === month && y === year
      })
    } catch (error) {
      console.error("❌ Error filtering transactions by month:", error)
      return []
    }
  }
}

export default new TransactionService()
