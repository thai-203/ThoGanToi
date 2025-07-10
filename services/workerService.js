import FirebaseService from "./firebaseService"

class WorkerService {
  constructor() {
    this.basePath = "workers"
  }

  async createWorker(workerData) {
    try {
      const workerId = await FirebaseService.create(this.basePath, workerData)
      return workerId
    } catch (error) {
      console.error("Error creating worker:", error)
      throw error
    }
  }

  async getWorkerById(workerId) {
    try {
      const worker = await FirebaseService.read(`${this.basePath}/${workerId}`)
      return worker
    } catch (error) {
      console.error("Error getting worker:", error)
      throw error
    }
  }

  async getWorkerByUserId(userId) {
    try {
      const workers = await FirebaseService.queryByField(this.basePath, "userId", userId)
      return workers.length > 0 ? workers[0] : null
    } catch (error) {
      console.error("Error getting worker by userId:", error)
      throw error
    }
  }

  async getAllWorkers() {
    try {
      const workers = await FirebaseService.readAll(this.basePath)
      return workers
    } catch (error) {
      console.error("Error getting all workers:", error)
      throw error
    }
  }

  async getWorkersByStatus(status) {
    try {
      const workers = await FirebaseService.queryByField(this.basePath, "status", status)
      return workers
    } catch (error) {
      console.error("Error getting workers by status:", error)
      throw error
    }
  }

  async getActiveWorkers() {
    try {
      const workers = await FirebaseService.queryByField(this.basePath, "status", "active")
      return workers
    } catch (error) {
      console.error("Error getting active workers:", error)
      throw error
    }
  }

  async getPendingWorkers() {
    try {
      const workers = await FirebaseService.queryByField(this.basePath, "status", "pending")
      return workers
    } catch (error) {
      console.error("Error getting pending workers:", error)
      throw error
    }
  }

  async updateWorker(workerId, workerData) {
    try {
      await FirebaseService.update(`${this.basePath}/${workerId}`, workerData)
      return true
    } catch (error) {
      console.error("Error updating worker:", error)
      throw error
    }
  }

  async updateWorkerStatus(workerId, status) {
    try {
      await FirebaseService.update(`${this.basePath}/${workerId}`, { status })
      return true
    } catch (error) {
      console.error("Error updating worker status:", error)
      throw error
    }
  }

  async approveWorker(workerId) {
    try {
      await this.updateWorkerStatus(workerId, "active")
      return true
    } catch (error) {
      console.error("Error approving worker:", error)
      throw error
    }
  }

  async rejectWorker(workerId) {
    try {
      await this.updateWorkerStatus(workerId, "rejected")
      return true
    } catch (error) {
      console.error("Error rejecting worker:", error)
      throw error
    }
  }

  async deleteWorker(workerId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${workerId}`)
      return true
    } catch (error) {
      console.error("Error deleting worker:", error)
      throw error
    }
  }

  // Real-time listener for workers
  listenToWorkers(callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const workers = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
        callback(workers)
      } else {
        callback([])
      }
    })
  }

  // Listen to pending workers for admin approval
  listenToPendingWorkers(callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const pendingWorkers = Object.keys(data)
          .map((key) => ({ ...data[key], id: key }))
          .filter((worker) => worker.status === "pending")
        callback(pendingWorkers)
      } else {
        callback([])
      }
    })
  }
}

export default new WorkerService()
