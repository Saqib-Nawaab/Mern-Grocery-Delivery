import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = useRef([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  const sendResetOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    const loadingToast = toast.loading("Proceeding... Please wait");

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/send-rest-otp`, {
        email,
      });

      toast.dismiss(loadingToast);
      data.success ? (toast.success(data.message), setStep(2)) : toast.error(data.message);
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      return toast.error("Please enter the complete OTP");
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email,
        otp: otp.join(""),
      });

      data.success ? (toast.success(data.message), setStep(3)) : toast.error(data.message);
    } catch {
      toast.error("Failed to verify OTP");
    }
  };

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/[^0-9]/g, "");
    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    const digits = paste.split("").filter((char) => /\d/.test(char));
    const updatedOtp = [...otp];
    digits.forEach((digit, i) => {
      if (i < 6) updatedOtp[i] = digit;
    });
    setOtp(updatedOtp);
    setTimeout(() => {
      inputRefs.current[digits.length]?.focus();
    }, 10);
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (!newPassword) return toast.error("Please enter a new password");

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
        email,
        otp: otp.join(""),
        newPassword,
      });

      data.success ? (toast.success(data.message), navigate("/")) : toast.error(data.message);
    } catch {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div
      onClick={() => navigate("/")}
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
    >
      <form
        onSubmit={
          step === 1
            ? sendResetOtp
            : step === 2
            ? handleOtpSubmit
            : resetPasswordHandler
        }
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 items-start p-8 py-10 w-80 sm:w-[360px] rounded-2xl shadow-2xl border border-gray-100 bg-white"
      >
        <h2 className="text-2xl font-bold text-center w-full text-gray-800">
          <span className="text-primary">Reset</span> Password
        </h2>

        <p className="text-sm text-gray-500 text-center w-full leading-tight">
          {step === 1
            ? "Enter your email to receive a reset OTP."
            : step === 2
            ? "Enter the 6-digit OTP sent to your email."
            : "Enter your new password to complete reset."}
        </p>

        {step === 1 && (
          <div className="w-full">
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="border border-gray-300 rounded-md w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {step === 2 && (
          <div
            onPaste={handlePaste}
            className="flex justify-between w-full gap-2"
          >
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary transition"
              />
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="w-full">
            <label className="text-sm text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="border border-gray-300 rounded-md w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull transition text-white w-full py-2.5 mt-2 rounded-md font-medium"
        >
          {step === 1
            ? "Send OTP"
            : step === 2
            ? "Verify OTP"
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
