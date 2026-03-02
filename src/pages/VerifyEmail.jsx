import React, { useEffect } from "react";
import { MailCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";

const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/me");
        if (res.data.user?.isVerified) {
          clearInterval(interval);
          navigate("/Login");
        }
      } catch (error) {}
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="bg-white shadow-2xl border border-gray-100 rounded-3xl px-6 sm:px-10 py-10 text-center transition-all duration-300">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <MailCheck className="text-blue-900 w-10 h-10" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Check Your Email
          </h2>
          <p className="text-gray-500 mt-4 text-sm sm:text-base leading-relaxed">
            We have sent you a verification email. Please check your inbox and click on the verification link to activate your account.
          </p>
          <div className="mt-6">
            <p className="text-gray-400 text-xs sm:text-sm">
              Didn't receive the email? Please check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;