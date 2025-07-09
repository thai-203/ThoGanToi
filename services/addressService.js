import FirebaseService from "./firebaseService"

class AddressService {
  constructor() {
    this.basePath = "address"
  }

  async createAddress(addressData) {
    try {
      const addressId = await FirebaseService.create(this.basePath, addressData)
      return addressId
    } catch (error) {
      console.error("Error creating address:", error)
      throw error
    }
  }

  async getAddressById(addressId) {
    try {
      const address = await FirebaseService.read(`${this.basePath}/${addressId}`)
      return address
    } catch (error) {
      console.error("Error getting address:", error)
      throw error
    }
  }

  async getAllAddresses() {
    try {
      const addresses = await FirebaseService.readAll(this.basePath)
      return addresses
    } catch (error) {
      console.error("Error getting all addresses:", error)
      throw error
    }
  }

  async getAddressesByUserId(userId) {
    try {
      const snapshot = await FirebaseService.queryByField(this.basePath, 'userId', userId);
      const data = snapshot.val();

      const addressList = data
        ? Object.entries(data).map(([id, address]) => ({ id, ...address }))
        : [];

      return addressList;
    } catch (error) {
      console.error('Error getting addresses by userId:', error);
      throw error;
    }
  }

  async updateAddress(addressId, addressData) {
    try {
      const pathToUpdate = `${this.basePath}/${addressId}`;
      console.log("✅ Updating path:", pathToUpdate);
      console.log("📦 New data:", addressData);

      await FirebaseService.update(pathToUpdate, addressData);
      return true;
    } catch (error) {
      console.error("❌ Error updating address:", error);
      throw error;
    }
  }

  async setDefaultAddress(userId, addressId) {
    try {
      const allAddresses = await FirebaseService.readAll(this.basePath);
      if (!allAddresses) throw new Error("Không có dữ liệu địa chỉ");
      const updates = {};

      Object.entries(allAddresses).forEach(([key, address]) => {
        if (address.userId === userId) {
          console.log(address)
          updates[`${address.id}/isDefault`] = address.id === addressId;
        }
      });
      await FirebaseService.update(this.basePath, updates);
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật địa chỉ mặc định:", error);
      throw error;
    }
  }



  async deleteAddress(addressId) {
    try {
      console.log(addressId)
      await FirebaseService.delete(`${this.basePath}/${addressId}`)
      return true
    } catch (error) {
      console.error("Error deleting address:", error)
      throw error
    }
  }

  // Real-time listener for all addresses
  listenToAddresses(callback) {
    return FirebaseService.listen(this.basePath, (addressesArray) => {
      callback(Array.isArray(addressesArray) ? addressesArray : []);
    });
  }

  listenToAddressesByUserId(userId, callback) {
    return FirebaseService.listen(this.basePath, (addressesObj) => {
      if (!addressesObj) {
        callback([]);
        return;
      }

      const addressesArray = Object.entries(addressesObj).map(([id, item]) => ({ id, ...item }));
      const filtered = addressesArray.filter((item) => item.userId === userId);
      callback(filtered);
    });
  }

}

export default new AddressService()
