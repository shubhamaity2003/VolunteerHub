import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function Settings() {
  const { user, logout } = useAuth();

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
  });

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = () => {
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      return toast.error("Please fill all password fields.");
    }

    if (password.newPassword !== password.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    toast.success("Password update feature coming soon.");

    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const toggleNotifications = () => {
    setPreferences({
      ...preferences,
      notifications: !preferences.notifications,
    });

    toast.success("Preference updated.");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        {/* Profile */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            My Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold">
                Name
              </label>

              <input
                value={user?.name || ""}
                disabled
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
                value={user?.email || ""}
                disabled
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">
                Role
              </label>

              <input
                value={user?.role || ""}
                disabled
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

          </div>

        </div>

        {/* Change Password */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Change Password
          </h2>

          <div className="grid gap-4">

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={password.currentPassword}
              onChange={handlePasswordChange}
              className="border rounded-lg p-3"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={password.newPassword}
              onChange={handlePasswordChange}
              className="border rounded-lg p-3"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
              className="border rounded-lg p-3"
            />

          </div>

          <button
            onClick={handleUpdatePassword}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Update Password
          </button>

        </div>

        {/* Preferences */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Preferences
          </h2>

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-semibold">
                Email Notifications
              </h3>

              <p className="text-gray-500 text-sm">
                Receive updates about your volunteer activities.
              </p>

            </div>

            <button
              onClick={toggleNotifications}
              className={`px-5 py-2 rounded-lg text-white ${
                preferences.notifications
                  ? "bg-emerald-600"
                  : "bg-gray-500"
              }`}
            >
              {preferences.notifications ? "Enabled" : "Disabled"}
            </button>

          </div>

        </div>

        {/* Account */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6 text-red-600">
            Account
          </h2>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}