import { auth } from "../config/firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import React, { useRef, useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function PhoneAuthScreen({ onNavigateToLogin }) {
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [otp, setOtp] = useState("");

  // Gửi OTP
  const sendOTP = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(
        "+84" + phone.slice(1), // Đầu số Việt Nam, bỏ số 0 đầu
        recaptchaVerifier.current
      );
      setVerificationId(id);
      alert("Đã gửi OTP!");
    } catch (err) {
      alert("Lỗi gửi OTP: " + err.message);
    }
  };

  // Xác thực OTP
  const verifyOTP = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      alert("Xác thực thành công!");
    } catch (err) {
      alert("OTP không đúng hoặc đã hết hạn!");
    }
  };

  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <TextInput placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Button title="Gửi OTP" onPress={sendOTP} />
      <TextInput placeholder="Nhập OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad" />
      <Button title="Xác thực OTP" onPress={verifyOTP} />
      <Button title="Quay lại đăng nhập" onPress={onNavigateToLogin} />
    </View>
  );
}