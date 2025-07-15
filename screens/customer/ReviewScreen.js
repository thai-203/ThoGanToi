import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import reviewService from '../../services/reviewService';
import workerService from '../../services/workerService';

const ReviewScreen = ({ order, onBack }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      Alert.alert('Vui lòng nhập đầy đủ đánh giá và nội dung.');
      return;
    }

    const reviewData = {
      orderId: order.id,
      workerId: order.workerId,
      customerId: order.customerId,
      rating,
      comment,
      createdAt: Date.now(),
    };

  

    try {
      await reviewService.createReview(reviewData); // tạo đánh giá mới

      // 🚀 Sau khi tạo review, lấy tất cả review của worker đó
      const allReviews = await reviewService.getReviewsByWorker(order.workerId);
      const ratings = allReviews.map((r) => r.rating);
      const averageRating =
        ratings.reduce((sum, r) => sum + r, 0) / ratings.length;

      // 👉 Cập nhật vào Worker
      await workerService.updateWorker(order.workerId, {
        rating: parseFloat(averageRating.toFixed(1)), // vd: 4.6
        reviews: ratings.length,
        updatedAt: Date.now(),
      });

      Alert.alert('Thành công', 'Đánh giá đã được gửi.');
      onBack && onBack();
    } catch (err) {
      console.error('Lỗi đánh giá:', err);
      Alert.alert('Lỗi', 'Không thể gửi đánh giá.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 16,
          textAlign: 'center',
          color: '#111827',
        }}
      >
        Đánh giá dịch vụ
      </Text>

      <Rating
        startingValue={5}
        imageSize={32}
        onFinishRating={(value) => setRating(value)}
        style={{ alignSelf: 'center', marginBottom: 16 }}
      />

      <TextInput
        placeholder='Nhận xét về thợ...'
        value={comment}
        onChangeText={setComment}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 10,
          padding: 12,
          fontSize: 16,
          height: 100,
          textAlignVertical: 'top',
          marginBottom: 20,
        }}
        placeholderTextColor='#9ca3af'
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#2563eb',
          paddingVertical: 12,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Gửi đánh giá
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewScreen;
