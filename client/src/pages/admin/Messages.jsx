import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/contact");

      setMessages(res.data.messages);

    } catch (err) {

      toast.error("Failed to load messages");

    } finally {

      setLoading(false);

    }
  };

  const deleteMessage = async (id) => {

    if (!window.confirm("Delete this message?")) return;

    try {

      await api.delete(`/contact/${id}`);

      toast.success("Message deleted");

      fetchMessages();

    } catch (err) {

      toast.error("Delete failed");

    }
  };

  return (
    <AdminLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Contact Messages
        </h1>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4 text-left">Name</th>

                <th className="px-6 py-4 text-left">Email</th>

                <th className="px-6 py-4 text-left">Subject</th>

                <th className="px-6 py-4 text-left">Message</th>

                <th className="px-6 py-4 text-left">Date</th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >
                    Loading...
                  </td>

                </tr>

              ) : messages.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >
                    No messages found.
                  </td>

                </tr>

              ) : (

                messages.map((msg) => (

                  <tr
                    key={msg._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      {msg.name}
                    </td>

                    <td className="px-6">
                      {msg.email}
                    </td>

                    <td className="px-6">
                      {msg.subject}
                    </td>

                    <td className="px-6 max-w-sm">
                      {msg.message}
                    </td>

                    <td className="px-6">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 text-center">

                      <button
                        onClick={() =>
                          deleteMessage(msg._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

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