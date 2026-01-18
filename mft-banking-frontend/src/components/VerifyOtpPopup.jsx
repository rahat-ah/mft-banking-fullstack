import { useState, useEffect } from "react";
import formatTime from "../utils/countdownTimeFormater";
import { toast } from "react-toastify";
import axios from "axios";

export default function VerifyOtpPopup({ email, onClose , setIsEmailVerified }) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [verifying, setVerifying] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);


  const handleVerifyClick = async () => {
    if (!otp){
        toast.error("OTP not given")
        return
    }
    setVerifying(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-otp`,{email,givenOtp:otp});
      
      if(!response.data.success){
        setIsEmailVerified(false);
        toast.error(response.data.message)
        return;
      }
      setIsEmailVerified(true);
      toast.success(response.data.message)
      onClose()
    } catch (err) {
      console.log(err);
      toast.error(err.message)
      return
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed z-50 flex items-center justify-center inset-0">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-transparent bg-opacity-80 backdrop-blur-sm"
        onClick={onClose} // close popup if click outside
      ></div>

      {/* Popup Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 md:p-8 z-10 animate-fadeIn shadow-black">
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Verify Email with OTP
        </h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          OTP expires in:{" "}
          <span className="font-medium text-orange-500">{formatTime(timeLeft)}</span>
        </p>

        <p className="text-sm text-gray-600 mb-4 text-left">
          Email: <span className="font-medium text-orange-500">{email}</span>
        </p>

        {/* OTP Input */}
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Countdown */}
        
        {/* Verify Button */}
        <button
          onClick={handleVerifyClick}
          disabled={verifying}
          className={`w-full px-4 py-2 rounded-xl text-white font-medium transition ${
            verifying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {verifying ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Close Link */}
        <p
          className="text-sm text-center mt-4 text-orange-500 cursor-pointer hover:underline"
          onClick={onClose}
        >
          Cancel
        </p>
      </div>
    </div>
  );
}
