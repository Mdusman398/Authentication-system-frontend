import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";
import api from "./api/api";

const Login = () => {
    const {setUser} = getData()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await api.post("/api/login", formData);
      if (res.data.success) {
        setUser(res.data.user)
        toast.success(res.data.message, {
          className: "bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg",
        });
        setTimeout(() => navigate("/"), 500);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        className: "bg-red-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 px-2 sm:px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Login to Your Account</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Welcome Back</p>
        </div>

        {/* Card */}
        <Card className="shadow-2xl border border-gray-100 rounded-3xl px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">Login</CardTitle>
            <CardDescription className="text-gray-500 mt-1 text-sm sm:text-base">
              Login to your Note App
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium text-sm sm:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handChange}
                  placeholder="Enter your email"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-900 focus:ring focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Label htmlFor="password" className="text-gray-700 font-medium text-sm sm:text-base">
                  Password
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handChange}
                  placeholder="Enter your password"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:border-blue-900 focus:ring focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base"
                />

                {/* Eye icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>

                {/* Forgot Password link */}
                <div className="text-right mt-1">
                  <Link
                    to={"/forgotPassword"}
                    className="text-sm text-gray-700 hover:text-blue-900 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <CardFooter className="mt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg text-sm sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Logging...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
                <p className="text-sm text-gray-500 text-center">don't have an account? <Link to={"/signup"} className="text-blue-900 font-medium hover:underline transition-all duration-200">register</Link></p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;