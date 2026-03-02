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
import { Label } from "@/components/ui/label"
import { CheckCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "./api/api";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
      e.preventDefault()
      try {
        setIsLoading(true)
        const res = await api.post("/forgot-password", {email})
         if (res.data.success) {
             setTimeout(() => navigate(`/verify-otp/${email}`), 1000);
        toast.success(res.data.message, {
          className: "bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg",
        });
        setEmail("")
      }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", {
        className: "bg-red-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg",
      })
      }
      finally{
        setIsLoading(false)
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Reset your password
          </h1>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Enter your email address and we will send you instructions to reset your password.
          </p>
        </div>

        <Card className="shadow-2xl border border-gray-100 rounded-3xl px-6 py-8">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-gray-500 mt-1 text-sm">
              {isSubmitted
                ? "Please check your email address for reset instructions."
                : "Enter your email address to receive a password reset link."}
            </CardDescription>
          </CardHeader>

          <CardContent>

            {error && (
              <Alert className="mb-4 bg-red-50 border-red-200 text-red-700">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="w-14 h-14 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Check your inbox
                </h3>
                <p className="text-gray-500 text-sm">
                  We have sent a password reset link to{" "}
                  <span className="font-medium text-blue-900">{email}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  If you didn’t receive the email, check your spam folder or{" "}
                  <button
                    className="text-blue-900 font-medium hover:underline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try Again
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                  <Label className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <Input 
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-900 focus:ring focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
                >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="mt-6 justify-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to={"/login"} className="text-blue-900 font-medium hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
};

export default ForgotPassword;