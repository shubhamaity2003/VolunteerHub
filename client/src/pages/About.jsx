import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import profileImage from "../assets/images/shubhankar.jpg";
import {
  FaBullseye,
  FaEye,
  FaHeart,
  FaUsers,
  FaHandsHelping,
  FaGlobe,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss } from "react-icons/si";


export default function About() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-emerald-600 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">About VolunteerHub</h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto">
            VolunteerHub is a modern volunteer management platform designed to
            connect passionate volunteers with meaningful community service
            opportunities.
          </p>
        </div>
      </section>

      {/* Mission Vision Values */}

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <FaBullseye className="text-emerald-600 text-5xl mx-auto mb-5" />

              <h2 className="text-2xl font-bold">Our Mission</h2>

              <p className="mt-4 text-gray-600">
                Empower volunteers and organizations by providing a simple and
                secure platform for community service.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <FaEye className="text-blue-600 text-5xl mx-auto mb-5" />

              <h2 className="text-2xl font-bold">Our Vision</h2>

              <p className="mt-4 text-gray-600">
                Build stronger communities through collaboration, innovation and
                volunteer engagement.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <FaHeart className="text-red-500 text-5xl mx-auto mb-5" />

              <h2 className="text-2xl font-bold">Our Values</h2>

              <p className="mt-4 text-gray-600">
                Compassion, integrity, teamwork and dedication towards creating
                social impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">Our Impact</h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white shadow-lg rounded-xl p-8 text-center">
              <FaUsers className="text-5xl text-emerald-600 mx-auto" />
              <h3 className="text-4xl font-bold mt-4">5000+</h3>
              <p>Active Volunteers</p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-8 text-center">
              <FaHandsHelping className="text-5xl text-blue-600 mx-auto" />
              <h3 className="text-4xl font-bold mt-4">150+</h3>
              <p>Events Organized</p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-8 text-center">
              <FaGlobe className="text-5xl text-orange-500 mx-auto" />
              <h3 className="text-4xl font-bold mt-4">30+</h3>
              <p>Cities Covered</p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-8 text-center">
              <FaHeart className="text-5xl text-red-500 mx-auto" />
              <h3 className="text-4xl font-bold mt-4">25K+</h3>
              <p>Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">Technology Stack</h2>

          <div className="grid md:grid-cols-5 gap-8 mt-12">
            <div className="text-center">
              <FaReact className="text-6xl text-sky-500 mx-auto" />
              <p className="mt-4 font-semibold">React</p>
            </div>

            <div className="text-center">
              <FaNodeJs className="text-6xl text-green-600 mx-auto" />
              <p className="mt-4 font-semibold">Node.js</p>
            </div>

            <div className="text-center">
              <SiExpress className="text-6xl mx-auto" />
              <p className="mt-4 font-semibold">Express</p>
            </div>

            <div className="text-center">
              <SiMongodb className="text-6xl text-green-700 mx-auto" />
              <p className="mt-4 font-semibold">MongoDB</p>
            </div>

            <div className="text-center">
              <SiTailwindcss className="text-6xl text-sky-400 mx-auto" />
              <p className="mt-4 font-semibold">Tailwind CSS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer */}

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
         <img
  src={profileImage}
  alt="Shubhankar Maity"
  className="w-44 h-44 rounded-full object-cover mx-auto shadow-xl border-4 border-emerald-500"
/>

          <h2 className="text-4xl font-bold mt-8">Developed By</h2>

          <h3 className="text-2xl font-semibold text-emerald-600 mt-4">
            Shubhankar Maity
          </h3>

          <p className="mt-4 text-gray-600">
            B.Tech Computer Science Engineering
            <br />
            Brainware University
          </p>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-emerald-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Ready to Make a Difference?</h2>

          <p className="mt-6 text-lg">
            Join our volunteer community and help create positive change.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100"
          >
            Become a Volunteer
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
