import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchVolunteers();
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

      toast.success(`Volunteer ${status}`);

      fetchVolunteers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const deleteVolunteer = async (id) => {
    if (!window.confirm("Delete this volunteer?")) return;

    try {
      await api.delete(`/admin/volunteers/${id}`);

      toast.success("Volunteer deleted");

      fetchVolunteers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((volunteer) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        volunteer.user?.name?.toLowerCase().includes(keyword) ||
        volunteer.user?.email?.toLowerCase().includes(keyword) ||
        volunteer.phone?.includes(keyword);

      const matchesStatus =
        statusFilter === "All" || volunteer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [volunteers, search, statusFilter]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Manage Volunteers</h1>

          <p className="text-gray-500 mt-2">
            View, search and manage all volunteer applications.
          </p>
        </div>

        {/* Search + Filter */}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-4 py-3"
            >
              <option>All</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">Name</th>

                <th className="text-left px-6 py-4">Email</th>

                <th className="text-left px-6 py-4">Phone</th>

                <th className="text-left px-6 py-4">Status</th>

                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : filteredVolunteers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No volunteers found.
                  </td>
                </tr>
              ) : (
                filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{volunteer.user?.name}</td>

                    <td className="px-6">{volunteer.user?.email}</td>

                    <td className="px-6">{volunteer.phone}</td>

                    <td className="px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          volunteer.status === "Approved"
                            ? "bg-green-600"
                            : volunteer.status === "Rejected"
                              ? "bg-red-600"
                              : "bg-orange-500"
                        }`}
                      >
                        {volunteer.status}
                      </span>
                    </td>

                    <td className="px-6">
                      <div className="flex justify-center gap-2">

                         {/* <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">
                          View
                        </button> */}


                        <button
                          disabled={volunteer.status === "Approved"}
                          onClick={() =>
                            updateStatus(volunteer._id, "Approved")
                          }
                          className={`px-3 py-2 rounded-lg text-white ${
                            volunteer.status === "Approved"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          Approve
                        </button>

                        <button
                          disabled={volunteer.status === "Rejected"}
                          onClick={() =>
                            updateStatus(volunteer._id, "Rejected")
                          }
                          className={`px-3 py-2 rounded-lg text-white ${
                            volunteer.status === "Rejected"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-yellow-500 hover:bg-yellow-600"
                          }`}
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => deleteVolunteer(volunteer._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
