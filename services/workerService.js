import FirebaseService from "./firebaseService"

class WorkerService {
  constructor() {
    this.basePath = "workers"
  }

  async createWorker(workerData) {
    try {
      const workerId = await FirebaseService.create(this.basePath, {
        ...workerData,
      })
      return workerId
    } catch (error) {
      console.error("Error creating worker:", error)
      throw error
    }
  }

  async getWorkerById(workerId) {
    try {
      const worker = await FirebaseService.read(`${this.basePath}/${workerId}`)
      return worker || null
    } catch (error) {
      console.error("Error getting worker:", error)
      throw error
    }
  }

  async getWorkerByUserId(userId) {
  try {
    const allWorkers = await FirebaseService.readAllWithKeys(this.basePath)
    const worker = allWorkers.find((w) => String(w.userId) === String(userId))
    return worker || null
  } catch (error) {
    console.error("Error getting worker by userId:", error)
    throw error
  }
}

  async getAllWorkers() {
    try {
      const allUsers = await FirebaseService.readAll(this.basePath)
      return allUsers
    } catch (error) {
      console.error("Error getting all workers:", error)
      throw error
    }
  }

  async getWorkersByStatus(status = "active") {
    try {
      const allWorkers = await this.getAllWorkers()
      return allWorkers.filter((w) => w.status === status)
    } catch (error) {
      console.error("Error filtering workers by status:", error)
      throw error
    }
  }

  async getWorkersByService(serviceId) {
    try {
      const allWorkers = await this.getAllWorkers()
      return allWorkers.filter(
        (worker) =>
          worker.status === true &&
          Array.isArray(worker.serviceId) &&
          worker.serviceId.includes(serviceId)
      )
    } catch (error) {
      console.error("Error getting workers by service:", error)
      throw error
    }
  }

  

  async updateWorker(innerId, workerData) {
    try {
      const allWorkers = await FirebaseService.readAllWithKeys(this.basePath)
      const target = allWorkers.find(w => String(w.id) === String(innerId))
      if (!target) throw new Error("Worker not found by id: " + innerId)
  
      await FirebaseService.update(`${this.basePath}/${target.firebaseKey}`, workerData)
      return true
    } catch (error) {
      console.error("❌ Error updating worker:", error)
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

  async filterWorkersBy(serviceId, sortBy = "rating") {
    try {
      let workers = await this.getWorkersByService(serviceId)

      switch (sortBy) {
        case "rating":
          workers.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case "price":
          workers.sort((a, b) => extractPrice(a.price) - extractPrice(b.price))
          break
        case "distance":
          workers.sort((a, b) => extractDistance(a.distance) - extractDistance(b.distance))
          break
      }

      return workers
    } catch (error) {
      console.error("Error filtering workers:", error)
      throw error
    }
  }

  listenToWorkers(callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const workers = Object.entries(data).map(([id, val]) => ({ id, ...val }))
        callback(workers)
      } else {
        callback([])
      }
    })
  }
}

// Helper functions
const extractPrice = (priceString) => {
  if (!priceString) return Infinity
  const numeric = priceString.replace(/[^\d]/g, "")
  return parseInt(numeric || "0")
}

const extractDistance = (distanceString) => {
  if (!distanceString) return Infinity
  const match = distanceString.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : Infinity
}

export default new WorkerService()
