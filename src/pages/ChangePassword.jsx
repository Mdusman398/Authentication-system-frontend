import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "./api/api";

const ChangePassword = () => {
  const { email } = useParams();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handeChangePassword = async (e) => {
    setError("");
    setSuccess("");
    if (!newPassword || !confirmPassword) {
      setError("please fill in fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not matched");
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.post(
        `/change-password/${email}`,
        {
          newPassword,
          confirmPassword,
        },
      );
      setSuccess(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Change Password
        </h2>
        <p className="mt-3 text-gray-500 text-sm sm:text-base">
          Set a new password for{" "}
          <span className="font-medium text-gray-700">{email}</span>
        </p>
      </div>

      <div className="bg-white shadow-2xl border border-gray-100 rounded-3xl px-6 py-8 space-y-6">

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 text-sm p-3 rounded-xl">
            {success}
          </p>
        )}

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="h-12 rounded-xl border-gray-300 focus:border-blue-900 focus:ring focus:ring-blue-200 transition-all duration-200"
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 rounded-xl border-gray-300 focus:border-blue-900 focus:ring focus:ring-blue-200 transition-all duration-200"
          />

          <Button
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
            disabled={isLoading}
            onClick={handeChangePassword}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Changing...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
              <p className="text-sm text-gray-600 text-center">
              Remember your password?{" "}
              <Link to={"/login"} className="text-blue-900 font-medium hover:underline">
                Login
              </Link>
            </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default ChangePassword;
