import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");

      setEvents(res.data.events);
    } catch (err) {
      console.log(err);
    }
  };

  const joinEvent = async (id) => {
    try {
      const res = await api.post(`/events/${id}/join`);

      toast.success(res.data.message);

      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to join event");
    }
  };

  const leaveEvent = async (id) => {
    try {
      const res = await api.delete(`/events/${id}/leave`);

      toast.success(res.data.message);

      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to leave event");
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || event.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // const hasJoined =
  // event.registeredVolunteers?.some(
  //   (volunteer) =>
  //     volunteer === user?._id ||
  //     volunteer?._id === user?._id
  // ) || false;

  // const isFull =
  // (event.registeredVolunteers?.length || 0) >=
  // event.maxParticipants;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option>All</option>
            <option>Education</option>
            <option>Healthcare</option>
            <option>Environment</option>
            <option>Community Service</option>
            <option>Women Empowerment</option>
            <option>Technology</option>
            <option>Other</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const hasJoined =
              event.registeredVolunteers?.some(
                (volunteer) =>
                  volunteer === user?._id || volunteer?._id === user?._id,
              ) || false;

            const isFull =
              (event.registeredVolunteers?.length || 0) >=
              event.maxParticipants;

            return (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-bold">{event.title}</h2>

                <p className="text-gray-600 mt-3">{event.description}</p>

                <div className="mt-6 space-y-2">
                  <p>📍 {event.location}</p>

                  <p>📅 {new Date(event.date).toLocaleDateString()}</p>

                  <p>🕙 {event.time}</p>

                  <p>Category : {event.category}</p>

                  <p>
                    👥 {event.registeredVolunteers?.length || 0} /{" "}
                    {event.maxParticipants}
                  </p>

                  {event.registeredVolunteers?.length >=
                    event.maxParticipants && (
                    <p className="text-red-600 font-semibold">Event Full</p>
                  )}
                </div>

                {hasJoined ? (
                  <button
                    onClick={() => leaveEvent(event._id)}
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
                  >
                    Leave Event
                  </button>
                ) : isFull ? (
                  <button
                    disabled
                    className="w-full mt-6 bg-gray-500 text-white py-3 rounded-lg cursor-not-allowed"
                  >
                    Event Full
                  </button>
                ) : (
                  <button
                    onClick={() => joinEvent(event._id)}
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg"
                  >
                    Join Event
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
