import { database } from "../config/firebase"
import { ref, push, set, get, update, remove, onValue, query, orderByChild, equalTo, off } from "firebase/database"

class FirebaseService {
  // Generic CRUD operations
  async create(path, data) {
    try {
      const dataRef = ref(database, path)
      const newRef = push(dataRef)
      const newData = {
        ...data,
        id: newRef.key,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      await set(newRef, newData)
      return newRef.key
    } catch (error) {
      console.error("Error creating data:", error)
      throw error
    }
  }

  async createWithId(path, id, data) {
    try {
      const dataRef = ref(database, `${path}/${id}`)
      const newData = {
        ...data,
        id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      await set(dataRef, newData)
      return id
    } catch (error) {
      console.error("Error creating data with ID:", error)
      throw error
    }
  }

  async read(path) {
    try {
      const dataRef = ref(database, path)
      const snapshot = await get(dataRef)
      if (snapshot.exists()) {
        return snapshot.val()
      }
      return null
    } catch (error) {
      console.error("Error reading data:", error)
      throw error
    }
  }

  async readAll(path) {
    try {
      const dataRef = ref(database, path)
      const snapshot = await get(dataRef)
      if (snapshot.exists()) {
        const data = snapshot.val()
        return Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
      }
      return []
    } catch (error) {
      console.error("Error reading all data:", error)
      return [] // Return empty array instead of throwing
    }
  }

  async update(path, data) {
    try {
      const dataRef = ref(database, path)
      const updateData = {
        ...data,
        updatedAt: Date.now(),
      }
      await update(dataRef, updateData)
      return true
    } catch (error) {
      console.error("Error updating data:", error)
      throw error
    }
  }

  async delete(path) {
    try {
      const dataRef = ref(database, path)
      await remove(dataRef)
      return true
    } catch (error) {
      console.error("Error deleting data:", error)
      throw error
    }
  }

  // Real-time listeners
  listen(path, callback) {
    try {
      const dataRef = ref(database, path)
      const unsubscribe = onValue(dataRef, callback, (error) => {
        console.error("Firebase listener error:", error)
      })
      return unsubscribe
    } catch (error) {
      console.error("Error setting up listener:", error)
      return () => {} // Return empty function
    }
  }

  // Query operations
  async queryByField(path, field, value) {
    try {
      const dataRef = ref(database, path)
      const queryRef = query(dataRef, orderByChild(field), equalTo(value))
      const snapshot = await get(queryRef)

      if (snapshot.exists()) {
        const data = snapshot.val()
        return Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
      }
      return []
    } catch (error) {
      console.error("Error querying data:", error)
      return [] // Return empty array instead of throwing
    }
  }

  // Check if Firebase is connected
  async checkConnection(timeoutMs = 3000) {
    return new Promise((resolve) => {
      const connectedRef = ref(database, ".info/connected");
      const timeout = setTimeout(() => {
        resolve(false); // Hết thời gian chờ, vẫn chưa có kết nối
        off(connectedRef); // Bỏ lắng nghe
      }, timeoutMs);

      onValue(connectedRef, (snapshot) => {
        const isConnected = snapshot.val() === true;
        if (isConnected) {
          clearTimeout(timeout);
          resolve(true);
          off(connectedRef); // Bỏ lắng nghe sau khi có kết quả
        }
      });
    });
  }


  async queryByField(path, field, value) {
    if (!value || typeof value !== "string") {
      console.warn(`⚠️ Invalid query value for field ${field}:`, value)
      return []
    }
    try {
      const dataRef = ref(database, path)
      const queryRef = query(dataRef, orderByChild(field), equalTo(value))
      const snapshot = await get(queryRef)

      if (snapshot.exists()) {
        const data = snapshot.val()
        return Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
      }
      return []
    } catch (error) {
      console.error("Error querying data:", error)
      return []
    }
  }
}

export default new FirebaseService()