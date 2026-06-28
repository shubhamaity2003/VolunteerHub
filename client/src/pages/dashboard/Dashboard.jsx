import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import api from "../../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      setData(res.data.volunteer);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h2 className="text-3xl font-semibold text-gray-600">
            Loading...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  // New User (No Volunteer Form Submitted)
  if (!data) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-xl shadow-lg p-10 text-center">

          <h2 className="text-4xl font-bold mb-4">
            Welcome to VolunteerHub 🎉
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Your volunteer profile has not been created yet.
            <br />
            Please complete the Volunteer Registration Form to
            access your dashboard.
          </p>

          <Link
            to="/volunteer"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition"
          >
            Complete Volunteer Form
          </Link>

        </div>
      </DashboardLayout>
    );
  }

  // Dashboard
  return (
    <DashboardLayout>

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard
          title="Status"
          value={data.status}
          color="bg-orange-500"
        />

        <StatCard
          title="Skills"
          value={data.skills?.length || 0}
          color="bg-blue-600"
        />

        <StatCard
          title="Interests"
          value={data.interests?.length || 0}
          color="bg-green-600"
        />

        <StatCard
          title="Experience"
          value={data.experience ? "Yes" : "No"}
          color="bg-purple-600"
        />

      </div>

      <div className="bg-white rounded-xl shadow-lg mt-8 p-8">

        <h2 className="text-3xl font-bold">
          Welcome {data.user?.name}
        </h2>

        <div className="mt-8 space-y-4">

          <p>
            <strong>Email:</strong>{" "}
            {data.user?.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {data.phone || "N/A"}
          </p>

          <p>
            <strong>Occupation:</strong>{" "}
            {data.occupation || "N/A"}
          </p>

          <p>
            <strong>Availability:</strong>{" "}
            {data.availability || "N/A"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                data.status === "Approved"
                  ? "text-green-600"
                  : data.status === "Rejected"
                  ? "text-red-600"
                  : "text-orange-500"
              }`}
            >
              {data.status}
            </span>
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}