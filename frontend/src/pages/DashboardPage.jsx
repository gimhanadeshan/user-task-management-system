import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import ChangePasswordForm from "../components/auth/ChangePasswordForm";
import TaskList from "../components/tasks/TaskList";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; 

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("tasks");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userInitial = user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden p-2 rounded-md text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
              <div className="ml-4 md:ml-0">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  To-Do
                </h1>
                <p className="hidden md:block text-sm text-gray-600">
                  Stay organized, get things done
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:block text-sm text-gray-700">
                Welcome, <span className="font-medium">{user?.username}</span>
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 md:px-4 md:py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 pt-2 pb-4 space-y-1">
              <button
                onClick={() => {
                  setActiveTab("tasks");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                  activeTab === "tasks"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => {
                  setActiveTab("settings");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Account Settings
              </button>
              <div className="px-3 py-2 text-sm text-gray-700 md:hidden">
                Welcome, <span className="font-medium">{user?.email}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Navigation - Hidden on mobile when menu is open */}
      {!mobileMenuOpen && (
        <nav className="sticky top-16 md:top-20 z-10 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("tasks")}
                className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === "tasks"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === "settings"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Account Settings
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "tasks" ? (
          <TaskList />
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* User Profile Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-28">
                <div className="flex flex-col items-center">
                  {/* User Avatar Circle */}
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {userInitial}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {user?.username}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{user?.email}</p>

                  <div className="w-full border-t border-gray-200 pt-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Member since</span>
                        <span className="text-gray-900">
                          {new Date(user?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {/* Add more user stats here if needed */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4 space-y-6 ">
              {/* Password Change Form */}
              <ChangePasswordForm />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
