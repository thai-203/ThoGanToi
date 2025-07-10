import FirebaseService from "./firebaseService"

class WorkerService {
  constructor() {
    this.workers = [
      {
        id: "1",
        userId: "3",
        name: "Trần Văn B",
        phone: "0444444444",
        email: "worker@test.com",
        specialty: "Thợ điện",
        experience: "5 năm kinh nghiệm",
        certificate: "Chứng chỉ điện công nghiệp",
        area: "Quận 3, TP.HCM",
        status: "active",
        rating: 4.8,
        completedOrders: 156,
        price: "200,000đ/giờ",
        avatar: "👨‍🔧",
        reviews: 89,
      },
    ]
  }

  async createWorker(workerData) {
    try {
      const newWorker = {
        ...workerData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }

      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        const firebaseId = await FirebaseService.create("workers", newWorker)
        newWorker.firebaseId = firebaseId
      }

      // Always add to local storage as backup
      this.workers.push(newWorker)
      return newWorker.id
    } catch (error) {
      console.error("Create worker error:", error)
      // Fallback to local only
      const newWorker = {
        ...workerData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      this.workers.push(newWorker)
      return newWorker.id
    }
  }

  async getAllWorkers() {
    try {
      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        const firebaseWorkers = await FirebaseService.readAll("workers")
        return [...firebaseWorkers, ...this.workers]
      }

      return this.workers
    } catch (error) {
      console.error("Get all workers error:", error)
      return this.workers
    }
  }

  async getActiveWorkers() {
    try {
      const allWorkers = await this.getAllWorkers()
      return allWorkers.filter((worker) => worker.status === "active")
    } catch (error) {
      console.error("Get active workers error:", error)
      return this.workers.filter((worker) => worker.status === "active")
    }
  }

  async updateWorkerStatus(workerId, status) {
    try {
      // Try Firebase first
      if (FirebaseService.isFirebaseConnected()) {
        await FirebaseService.update(`workers/${workerId}`, { status })
      }

      // Update local data
      const workerIndex = this.workers.findIndex((w) => w.id === workerId)
      if (workerIndex !== -1) {
        this.workers[workerIndex].status = status
        return true
      }
      return false
    } catch (error) {
      console.error("Update worker status error:", error)
      // Fallback to local data only
      const workerIndex = this.workers.findIndex((w) => w.id === workerId)
      if (workerIndex !== -1) {
        this.workers[workerIndex].status = status
        return true
      }
      return false
    }
  }
}

export default new WorkerService()
