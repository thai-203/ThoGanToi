import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore"
import { firebaseConfig } from "../config/firebase"

class FirebaseService {
  constructor() {
    this.app = null
    this.db = null
    this.initialized = false
  }

  async initialize() {
    try {
      if (!this.initialized) {
        this.app = initializeApp(firebaseConfig)
        this.db = getFirestore(this.app)
        this.initialized = true
      }
      return true
    } catch (error) {
      console.error("Firebase initialization error:", error)
      return false
    }
  }

  async checkConnection() {
    try {
      if (!this.initialized) {
        await this.initialize()
      }
      // Try to read from a collection to test connection
      const testCollection = collection(this.db, "test")
      await getDocs(testCollection)
      return true
    } catch (error) {
      console.error("Firebase connection error:", error)
      return false
    }
  }

  // Users
  async createUser(userData) {
    try {
      const docRef = await addDoc(collection(this.db, "users"), {
        ...userData,
        createdAt: new Date().toISOString(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  async getUsers() {
    try {
      const querySnapshot = await getDocs(collection(this.db, "users"))
      const users = []
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      return users
    } catch (error) {
      console.error("Error getting users:", error)
      throw error
    }
  }

  async updateUser(userId, userData) {
    try {
      const userRef = doc(this.db, "users", userId)
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString(),
      })
      return true
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  }

  async deleteUser(userId) {
    try {
      await deleteDoc(doc(this.db, "users", userId))
      return true
    } catch (error) {
      console.error("Error deleting user:", error)
      throw error
    }
  }

  // Workers
  async createWorker(workerData) {
    try {
      const docRef = await addDoc(collection(this.db, "workers"), {
        ...workerData,
        createdAt: new Date().toISOString(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating worker:", error)
      throw error
    }
  }

  async getWorkers() {
    try {
      const querySnapshot = await getDocs(collection(this.db, "workers"))
      const workers = []
      querySnapshot.forEach((doc) => {
        workers.push({ id: doc.id, ...doc.data() })
      })
      return workers
    } catch (error) {
      console.error("Error getting workers:", error)
      throw error
    }
  }

  async updateWorker(workerId, workerData) {
    try {
      const workerRef = doc(this.db, "workers", workerId)
      await updateDoc(workerRef, {
        ...workerData,
        updatedAt: new Date().toISOString(),
      })
      return true
    } catch (error) {
      console.error("Error updating worker:", error)
      throw error
    }
  }

  // Orders
  async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(this.db, "orders"), {
        ...orderData,
        createdAt: new Date().toISOString(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating order:", error)
      throw error
    }
  }

  async getOrders() {
    try {
      const querySnapshot = await getDocs(collection(this.db, "orders"))
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() })
      })
      return orders
    } catch (error) {
      console.error("Error getting orders:", error)
      throw error
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      const orderRef = doc(this.db, "orders", orderId)
      await updateDoc(orderRef, {
        ...orderData,
        updatedAt: new Date().toISOString(),
      })
      return true
    } catch (error) {
      console.error("Error updating order:", error)
      throw error
    }
  }

  // Services
  async createService(serviceData) {
    try {
      const docRef = await addDoc(collection(this.db, "services"), {
        ...serviceData,
        createdAt: new Date().toISOString(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating service:", error)
      throw error
    }
  }

  async getServices() {
    try {
      const querySnapshot = await getDocs(collection(this.db, "services"))
      const services = []
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() })
      })
      return services
    } catch (error) {
      console.error("Error getting services:", error)
      throw error
    }
  }

  // Generic query method
  async queryCollection(collectionName, field, operator, value) {
    try {
      const q = query(collection(this.db, collectionName), where(field, operator, value))
      const querySnapshot = await getDocs(q)
      const results = []
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })
      return results
    } catch (error) {
      console.error(`Error querying ${collectionName}:`, error)
      throw error
    }
  }
}

export default new FirebaseService()
