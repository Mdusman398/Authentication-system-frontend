import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, Loader2, RotateCcw } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "./api/api";

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = async (index, value) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      if (digits.length === 0) return;
      const updatedOtp = ["", "", "", "", "", ""];
      digits.forEach((d, i) => {
        updatedOtp[i] = d;
      });
      setOtp(updatedOtp);
      inputRefs.current[Math.min(digits.length - 1, 5)]?.focus();
      return;
    }
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setError("please enter all digits");
    }

    try {
      setIsLoading(true);
      const res = await api.post(
        `/verify-otp/${email}`,
        {
          otp: finalOtp,
        },
      );
      setSuccessMessage(res.data.message);
      setTimeout(() => {
        navigate(`/change-password/${email}`);
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Verify OTP
          </h1>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            We have sent a 6-digit code to{" "}
            <span className="font-medium text-gray-700">{email}</span>
          </p>
        </div>

        <Card className="shadow-2xl border border-gray-100 rounded-3xl px-6 py-8">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Enter verification code
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              {isVerified
                ? "Code verified successfully! Redirecting..."
                : "Enter the 6-digit verification code"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="rounded-xl">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <p className="text-green-600 text-sm font-medium">
                {successMessage}
              </p>
            )}

            {isVerified ? (
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Verified Successfully
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Your email has been verified. Redirecting to reset
                    password...
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Redirecting</span>
                </div>
              </div>
            ) : (
              <>
                {/* OTP Inputs */}
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pasted = e.clipboardData
                          .getData("text")
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        const digits = pasted.split("");
                        const updatedOtp = ["", "", "", "", "", ""];
                        digits.forEach((d, i) => (updatedOtp[i] = d));
                        setOtp(updatedOtp);
                        inputRefs.current[
                          Math.min(digits.length - 1, 5)
                        ]?.focus();
                      }}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg font-semibold rounded-xl border border-gray-300 focus:border-blue-900 focus:ring focus:ring-blue-200 transition-all duration-200"
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleVerify}
                    disabled={isLoading || otp.some((digit) => digit === "")}
                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>

                  <Button
                    onClick={clearOtp}
                    variant="outline"
                    disabled={isLoading || isVerified}
                    className="flex-1 rounded-xl py-3 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                  </Button>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="pt-6 flex justify-center border-t border-gray-100 mt-6">
            <p className="text-sm text-gray-500">
              Wrong email?{" "}
              <Link
                to={"/forgotPassword"}
                className="text-blue-900 font-medium hover:underline transition-all duration-200"
              >
                Go back
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOTP;
