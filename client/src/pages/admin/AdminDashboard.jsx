import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import VolunteerPieChart from "../../components/charts/VolunteerPieChart";
import VolunteerBarChart from "../../components/charts/VolunteerBarChart";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [analytics, setAnalytics] = useState({
    totalVolunteers: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    totalEvents: 0,
    totalRegistrations: 0,
  });
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/admin/analytics");

      setAnalytics(res.data.analytics);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEvents = async () => {
  try {
    const res = await api.get("/events");

    setEvents(res.data.events);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
  fetchVolunteers();
  fetchAnalytics();
  fetchEvents();
}, []);

  const fetchVolunteers = async () => {
    try {
      const res = await api.get("/admin/volunteers");
      setVolunteers(res.data.volunteers);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/volunteers/${id}`, {
        status,
      });

      fetchVolunteers();
    } catch (err) {
      console.log(err);
      alert("Failed to update volunteer status.");
    }
  };

  const deleteVolunteer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this volunteer?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/volunteers/${id}`);
      fetchVolunteers();
    } catch (err) {
      console.log(err);
      alert("Failed to delete volunteer.");
    }
  };

  const stats = useMemo(() => {
    return {
      total: volunteers.length,
      approved: volunteers.filter((v) => v.status === "Approved").length,
      pending: volunteers.filter((v) => v.status === "Pending").length,
      rejected: volunteers.filter((v) => v.status === "Rejected").length,
    };
  }, [volunteers]);

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const keyword = search.toLowerCase();

    return (
      volunteer.user?.name?.toLowerCase().includes(keyword) ||
      volunteer.user?.email?.toLowerCase().includes(keyword) ||
      volunteer.phone?.includes(keyword)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Statistics */}

        <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-6">
          <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">
            <p>Total Events</p>

            <h2 className="text-4xl font-bold mt-3">{analytics.totalEvents}</h2>
          </div>

          <div className="bg-cyan-600 text-white rounded-xl p-6 shadow-lg">
            <p>Total Registrations</p>

            <h2 className="text-4xl font-bold mt-3">
              {analytics.totalRegistrations}
            </h2>
          </div>
          <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
            <p>Total Volunteers</p>
            <h2 className="text-4xl font-bold mt-3">{stats.total}</h2>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
            <p>Approved</p>
            <h2 className="text-4xl font-bold mt-3">{stats.approved}</h2>
          </div>

          <div className="bg-orange-500 text-white rounded-xl p-6 shadow-lg">
            <p>Pending</p>
            <h2 className="text-4xl font-bold mt-3">{stats.pending}</h2>
          </div>

          <div className="bg-red-600 text-white rounded-xl p-6 shadow-lg">
            <p>Rejected</p>
            <h2 className="text-4xl font-bold mt-3">{stats.rejected}</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <VolunteerPieChart
            approved={analytics.approved}
            pending={analytics.pending}
            rejected={analytics.rejected}
          />

          <VolunteerBarChart analytics={analytics} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

  <h2 className="text-2xl font-bold mb-6">
    Recent Events
  </h2>

  <table className="min-w-full">

    <thead>

      <tr className="border-b">

        <th className="text-left py-3">Title</th>

        <th className="text-left py-3">Category</th>

        <th className="text-left py-3">Date</th>

        <th className="text-left py-3">Participants</th>

      </tr>

    </thead>

    <tbody>

      {events.slice(0, 5).map((event) => (

        <tr
          key={event._id}
          className="border-b"
        >

          <td className="py-3">
            {event.title}
          </td>

          <td>
            {event.category}
          </td>

          <td>
            {new Date(event.date).toLocaleDateString()}
          </td>

          <td>
            {event.registeredVolunteers.length}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>


        <div className="bg-white rounded-xl shadow-lg p-6">

  <h2 className="text-2xl font-bold mb-6">
    Quick Actions
  </h2>

 <div className="flex flex-wrap gap-4">

  <button
    onClick={() => navigate("/admin/events")}
    className="bg-emerald-600 text-white px-5 py-3 rounded-lg"
  >
    + Create Event
  </button>

  <button
    onClick={() => navigate("/admin/volunteers")}
    className="bg-blue-600 text-white px-5 py-3 rounded-lg"
  >
    Manage Volunteers
  </button>

  <button
    onClick={() => navigate("/admin/messages")}
    className="bg-orange-600 text-white px-5 py-3 rounded-lg"
  >
    Contact Messages
  </button>

</div>

</div>       
      </div>
    </AdminLayout>
  );
}
