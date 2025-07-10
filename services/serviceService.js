import FirebaseService from "./firebaseService"

class ServiceService {
  constructor() {
    this.basePath = "services"
  }

  async createService(serviceData) {
    try {
      const serviceId = await FirebaseService.create(this.basePath, serviceData)
      return serviceId
    } catch (error) {
      console.error("Error creating service:", error)
      throw error
    }
  }

  async getServiceById(serviceId) {
    try {
      const service = await FirebaseService.read(`${this.basePath}/${serviceId}`)
      return service
    } catch (error) {
      console.error("Error getting service:", error)
      throw error
    }
  }

  async getAllServices() {
    try {
      const services = await FirebaseService.readAll(this.basePath)
      return services
    } catch (error) {
      console.error("Error getting all services:", error)
      throw error
    }
  }

  async getActiveServices() {
    try {
      const services = await FirebaseService.queryByField(this.basePath, "status", "active")
      return services
    } catch (error) {
      console.error("Error getting active services:", error)
      throw error
    }
  }

  async updateService(serviceId, serviceData) {
    try {
      await FirebaseService.update(`${this.basePath}/${serviceId}`, serviceData)
      return true
    } catch (error) {
      console.error("Error updating service:", error)
      throw error
    }
  }

  async updateServiceStatus(serviceId, status) {
    try {
      await FirebaseService.update(`${this.basePath}/${serviceId}`, { status })
      return true
    } catch (error) {
      console.error("Error updating service status:", error)
      throw error
    }
  }

  async deleteService(serviceId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${serviceId}`)
      return true
    } catch (error) {
      console.error("Error deleting service:", error)
      throw error
    }
  }

  // Real-time listener for services
  listenToServices(callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const services = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
        callback(services)
      } else {
        callback([])
      }
    })
  }
}

export default new ServiceService()