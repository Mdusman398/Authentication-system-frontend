import React, { useState } from "react";
import { BookOpen, User, FileText, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";
import { toast } from "sonner";
import api from "./api/api";

const Navbar = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleLogout = async () => {
    try {
      await api.post(
        "/api/logout" );
      setUser({});
      toast.success(res.data.message, {
          className:
          "bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg",
        });
      
      navigate("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-900" />
            <h1 className="text-xl font-semibold text-gray-900 tracking-wide">
              NOTES
            </h1>
          </div>

          {/* Center Links */}
          <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            <li className=" cursor-pointer hover:text-red-500">Feature</li>
            <li className=" cursor-pointer hover:text-red-500">Pricing</li>
            <li className="hover:text-red-500 cursor-pointer">About</li>
          </ul>

          {/* Right Side */}
          <div className="relative">
            {!user && (
              <Link to="/login">
                <button className="bg-blue-900 hover:bg-blue-800  text-white rounded-xl px-4 py-2 shadow-md transition-all duration-200">
                  Login
                </button>
              </Link>
            )}

            {user && (
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl py-2 z-50">
                    <button
                      className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-gray-100 hover:text-red-500"
                      onClick={() => alert("Profile")}
                    >
                      <User className="w-4 h-4 hover:text-red-500" /> Profile
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 w-full hover:text-red-500 text-gray-700 hover:bg-gray-100"
                      onClick={() => alert("Notes")}
                    >
                      <FileText className="w-4 h-4 hover:text-red-500" /> Notes
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-gray-100 hover:text-red-500"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
