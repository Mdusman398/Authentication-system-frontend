
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import api from "./api/api";

const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token)
  const [status, setStatus] = useState("Verifying...");
  const [type, setType] = useState("loading"); // loading | success | error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
  
        const res = await api.get(
          `/api/verify/${token}`
        );
          

        if (res.data.success) {
          setStatus("Email verified successfully");
          setType("success");

          toast.success(res.data.message, {
            className:
              "bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg",
          });

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setStatus("Invalid or Expired Token");
          setType("error");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Email Verification Failed",
          {
            className:
              "bg-red-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg",
          }
        );
        setStatus("Verification Failed");
        setType("error");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">

        <div className="bg-white shadow-2xl border border-gray-100 rounded-3xl px-6 sm:px-10 py-10 text-center transition-all duration-300">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            {type === "loading" && (
              <div className="bg-blue-100 p-4 rounded-full">
                <Loader2 className="text-blue-900 w-10 h-10 animate-spin" />
              </div>
            )}

            {type === "success" && (
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="text-green-600 w-10 h-10" />
              </div>
            )}

            {type === "error" && (
              <div className="bg-red-100 p-4 rounded-full">
                <XCircle className="text-red-600 w-10 h-10" />
              </div>
            )}
          </div>

          {/* Status Text */}
          <h2
            className={`text-2xl sm:text-3xl font-bold ${
              type === "success"
                ? "text-green-600"
                : type === "error"
                ? "text-red-600"
                : "text-blue-900"
            }`}
          >
            {status}
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 mt-4 text-sm sm:text-base">
            {type === "loading" &&
              "Please wait while we verify your email address."}

            {type === "success" &&
              "Your account has been successfully verified. Redirecting to login..."}

            {type === "error" &&
              "The verification link may be invalid or expired."}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Verify;