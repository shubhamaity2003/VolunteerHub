import MainLayout from "../layouts/MainLayout";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/contact", formData);

    toast.success(res.data.message);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Failed to send message."
    );

  }
  };

  return (
    <MainLayout>

      {/* Hero Section */}
      <section className="bg-linear-to-r from-emerald-600 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Have a question, suggestion, or want to collaborate?
            We'd love to hear from you.
          </p>

        </div>
      </section>

      {/* Contact Info */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">

              <FaMapMarkerAlt className="text-5xl text-emerald-600 mx-auto mb-5"/>

              <h3 className="text-2xl font-bold">
                Address
              </h3>

              <p className="mt-4 text-gray-600">
                Brainware University
                <br />
                Kolkata, West Bengal
                <br />
                India
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">

              <FaPhoneAlt className="text-5xl text-blue-600 mx-auto mb-5"/>

              <h3 className="text-2xl font-bold">
                Phone
              </h3>

              <p className="mt-4 text-gray-600">
                +91 89186 56723
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">

              <FaEnvelope className="text-5xl text-red-500 mx-auto mb-5"/>

              <h3 className="text-2xl font-bold">
                Email
              </h3>

              <p className="mt-4 text-gray-600">
                shubhankarmaity2003@gmail.com
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Contact Form */}

      <section className="py-20">

        <div className="max-w-4xl mx-auto px-6">

          <div className="bg-white shadow-xl rounded-2xl p-10">

            <h2 className="text-4xl font-bold text-center mb-10">
              Send Us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-4"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-4"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-4"
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-4"
              />

              <button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg text-lg font-semibold"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Social Media */}

      <section className="bg-gray-100 py-16">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Connect With Me
          </h2>

          <p className="text-gray-600 mt-4">
            Let's connect and build something amazing together.
          </p>

          <div className="flex justify-center gap-8 mt-10">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-5xl hover:text-black transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-5xl text-blue-700 hover:scale-110 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-5xl text-pink-600 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-emerald-600 text-white py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Ready to Become a Volunteer?
          </h2>

          <p className="mt-6 text-lg">
            Join VolunteerHub today and help make a positive impact in your community.
          </p>

          <a
            href="/register"
            className="inline-block mt-8 bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Register Now
          </a>

        </div>

      </section>

    </MainLayout>
  );
}