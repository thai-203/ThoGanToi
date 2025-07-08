import FirebaseService from "./firebaseService"

class OrderService {
  constructor() {
    this.basePath = "orders"
  }

  async createOrder(orderData) {
    try {
      const orderId = await FirebaseService.create(this.basePath, orderData)
      return orderId
    } catch (error) {
      console.error("Error creating order:", error)
      throw error
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await FirebaseService.read(`${this.basePath}/${orderId}`)
      return order
    } catch (error) {
      console.error("Error getting order:", error)
      throw error
    }
  }

  async getOrdersByCustomerId(customerId) {
    try {
      const allOrders = await FirebaseService.readAll(this.basePath)
      const orders = allOrders.filter((order) => order.customerId === customerId)
      return orders
    } catch (error) {
      console.error("Error getting orders by customerId:", error)
      throw error
    }
  }

  async getAllOrders() {
    try {
      const orders = await FirebaseService.readAll(this.basePath)
      return orders
    } catch (error) {
      console.error("Error getting all orders:", error)
      throw error
    }
  }

  async getOrdersByCustomer(customerId) {
    try {
      const orders = await FirebaseService.queryByField(this.basePath, "customerId", customerId)
      return orders
    } catch (error) {
      console.error("Error getting orders by customer:", error)
      throw error
    }
  }

  async getOrdersByWorker(workerId) {
    try {
      const orders = await FirebaseService.queryByField(this.basePath, "workerId", workerId)
      return orders
    } catch (error) {
      console.error("Error getting orders by worker:", error)
      throw error
    }
  }

  async getOrdersByStatus(status) {
    try {
      const orders = await FirebaseService.queryByField(this.basePath, "status", status)
      return orders
    } catch (error) {
      console.error("Error getting orders by status:", error)
      throw error
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      await FirebaseService.update(`${this.basePath}/${orderId}`, orderData)
      return true
    } catch (error) {
      console.error("Error updating order:", error)
      throw error
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      await FirebaseService.update(`${this.basePath}/${orderId}`, { status })
      return true
    } catch (error) {
      console.error("Error updating order status:", error)
      throw error
    }
  }

  async deleteOrder(orderId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${orderId}`)
      return true
    } catch (error) {
      console.error("Error deleting order:", error)
      throw error
    }
  }

  // Real-time listener for orders
  listenToOrders(callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const orders = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
        callback(orders)
      } else {
        callback([])
      }
    })
  }

  // Listen to orders by worker
  listenToWorkerOrders(workerId, callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const orders = Object.keys(data)
          .map((key) => ({ ...data[key], id: key }))
          .filter((order) => order.workerId === workerId)
        callback(orders)
      } else {
        callback([])
      }
    })
  }
}

export default new OrderService()
