import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Education",
    location: "",
    date: "",
    time: "",
    maxParticipants: 100,
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.events);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load events");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Education",
      location: "",
      date: "",
      time: "",
      maxParticipants: 100,
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, formData);
        toast.success("Event Updated");
      } else {
        await api.post("/events", formData);
        toast.success("Event Created");
      }

      resetForm();
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const editEvent = (event) => {
    setEditingId(event._id);

    setFormData({
      title: event.title,
      description: event.description,
      category: event.category,
      location: event.location,
      date: event.date.slice(0, 10),
      time: event.time,
      maxParticipants: event.maxParticipants,
    });
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      toast.success("Event Deleted");
      fetchEvents();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  const filteredEvents = events.filter((event) => {
  const matchesSearch = event.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    event.category === categoryFilter;

  return matchesSearch && matchesCategory;
});

  return (
    <AdminLayout>
      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Manage Events
        </h1>

        {/* Event Form */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >

          <input
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option>Education</option>
              <option>Healthcare</option>
              <option>Environment</option>
              <option>Community Service</option>
              <option>Women Empowerment</option>
              <option>Technology</option>
              <option>Other</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="time"
              placeholder="10:00 AM"
              value={formData.time}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
          >
            {editingId ? "Update Event" : "Create Event"}
          </button>

        </form>

        <div className="flex flex-col md:flex-row gap-4 mb-6">

  <input
    type="text"
    placeholder="Search Event..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-3 flex-1"
  />

  <select
    value={categoryFilter}
    onChange={(e) =>
      setCategoryFilter(e.target.value)
    }
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

        {/* Event List */}

        <div className="grid md:grid-cols-2 gap-6">

          {filteredEvents.map((event) => (

            <div
              key={event._id}
              className="bg-white rounded-xl shadow p-6"
            >

              <h2 className="text-2xl font-bold">
                {event.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {event.description}
              </p>

              <div className="mt-4 space-y-1">

                <p><strong>Location:</strong> {event.location}</p>

                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

                <p><strong>Time:</strong> {event.time}</p>

                <p><strong>Category:</strong> {event.category}</p>

                <p>
                  <strong>Participants:</strong>{" "}
                  {event.registeredVolunteers.length} / {event.maxParticipants}
                </p>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => editEvent(event)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEvent(event._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </AdminLayout>
  );
}