import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Settings() {
  const { user } = useAuth();

  const [organization, setOrganization] = useState({
    name: "VolunteerHub",
    email: "volunteerhub@gmail.com",
    phone: "+91 XXXXX XXXXX",
    address: "Brainware University, Kolkata",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOrganizationChange = (e) => {
    setOrganization({
      ...organization,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveOrganization = () => {
    toast.success("Organization details updated.");
  };

  const updatePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    toast.success("Password updated successfully.");

    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <AdminLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        {/* Admin Profile */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Admin Profile
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

        {/* Organization */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Organization Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              name="name"
              value={organization.name}
              onChange={handleOrganizationChange}
              placeholder="Organization Name"
              className="border rounded-lg p-3"
            />

            <input
              name="email"
              value={organization.email}
              onChange={handleOrganizationChange}
              placeholder="Organization Email"
              className="border rounded-lg p-3"
            />

            <input
              name="phone"
              value={organization.phone}
              onChange={handleOrganizationChange}
              placeholder="Phone"
              className="border rounded-lg p-3"
            />

            <input
              name="address"
              value={organization.address}
              onChange={handleOrganizationChange}
              placeholder="Address"
              className="border rounded-lg p-3"
            />

          </div>

          <button
            onClick={saveOrganization}
            className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
          >
            Save Changes
          </button>

        </div>

        {/* Password */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Change Password
          </h2>

          <div className="grid gap-4">

            <input
              type="password"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Current Password"
              className="border rounded-lg p-3"
            />

            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="border rounded-lg p-3"
            />

            <input
              type="password"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm Password"
              className="border rounded-lg p-3"
            />

          </div>

          <button
            onClick={updatePassword}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Update Password
          </button>

        </div>

        {/* System Info */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            System Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">

            <p>
              <strong>Project :</strong> VolunteerHub
            </p>

            <p>
              <strong>Version :</strong> 1.0.0
            </p>

            <p>
              <strong>Frontend :</strong> React + Tailwind CSS
            </p>

            <p>
              <strong>Backend :</strong> Node.js + Express
            </p>

            <p>
              <strong>Database :</strong> MongoDB
            </p>

            <p>
              <strong>Authentication :</strong> JWT
            </p>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}