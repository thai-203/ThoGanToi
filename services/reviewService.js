
import FirebaseService from "./firebaseService"

class ReviewService {
  constructor() {
    this.basePath = "reviews"
  }

  async createReview(reviewData) {
    try {
      const reviewId = await FirebaseService.create(this.basePath, reviewData)
      return reviewId
    } catch (error) {
      console.error("Error creating review:", error)
      throw error
    }
  }

  async getReviewById(reviewId) {
    try {
      const review = await FirebaseService.read(`${this.basePath}/${reviewId}`)
      return review
    } catch (error) {
      console.error("Error getting review:", error)
      throw error
    }
  }

  async getAllReviews() {
    try {
      const reviews = await FirebaseService.readAll(this.basePath)
      return reviews
    } catch (error) {
      console.error("Error getting all reviews:", error)
      throw error
    }
  }

  async getReviewsByWorker(workerId) {
    try {
      const reviews = await FirebaseService.queryByField(this.basePath, "workerId", workerId)
      return reviews
    } catch (error) {
      console.error("Error getting reviews by worker:", error)
      throw error
    }
  }

  async getReviewsByCustomer(customerId) {
    try {
      const reviews = await FirebaseService.queryByField(this.basePath, "customerId", customerId)
      return reviews
    } catch (error) {
      console.error("Error getting reviews by customer:", error)
      throw error
    }
  }

  async getReviewsByStatus(status) {
    try {
      const reviews = await FirebaseService.queryByField(this.basePath, "status", status)
      return reviews
    } catch (error) {
      console.error("Error getting reviews by status:", error)
      throw error
    }
  }

  async updateReview(reviewId, reviewData) {
    try {
      await FirebaseService.update(`${this.basePath}/${reviewId}`, reviewData)
      return true
    } catch (error) {
      console.error("Error updating review:", error)
      throw error
    }
  }

  async updateReviewStatus(reviewId, status) {
    try {
      await FirebaseService.update(`${this.basePath}/${reviewId}`, { status })
      return true
    } catch (error) {
      console.error("Error updating review status:", error)
      throw error
    }
  }

  async deleteReview(reviewId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${reviewId}`)
      return true
    } catch (error) {
      console.error("Error deleting review:", error)
      throw error
    }
  }

  // Real-time listener for reviews
  listenToReviews(callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const reviews = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
        callback(reviews)
      } else {
        callback([])
      }
    })
  }
}

export default new ReviewService()
