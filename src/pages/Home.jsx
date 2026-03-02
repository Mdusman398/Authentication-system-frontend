import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, Calendar, Tag } from "lucide-react";
import { getData } from "@/context/userContext";

const Home = () => {
    const {user} = getData()
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl sm:text-2xl font-bold text-gray-800 leading-tight">Wellcome, <span className="text-4xl text-gray-700">{user.username }</span></h1>
        {/* Heading */} 
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Organize Your Thoughts & Notes Effortlessly
        </h1>
        <p className="mt-4 text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto">
          Keep all your ideas, tasks, and notes in one place. Stay productive and never forget anything again.
        </p>

        {/* Get Started Button */}
        <div className="mt-8">
          <Button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg text-lg sm:text-xl transition-all duration-200">
            Get Started
          </Button>
        </div>

        {/* Features Icons */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-md mx-auto">
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <FileText className="w-10 h-10 text-blue-900 mb-2" />
            <span className="text-gray-700 font-medium">Create Notes</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <CheckSquare className="w-10 h-10 text-blue-900 mb-2" />
            <span className="text-gray-700 font-medium">Manage Tasks</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <Calendar className="w-10 h-10 text-blue-900 mb-2" />
            <span className="text-gray-700 font-medium">Organize Schedule</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <Tag className="w-10 h-10 text-blue-900 mb-2" />
            <span className="text-gray-700 font-medium">Categorize Notes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;