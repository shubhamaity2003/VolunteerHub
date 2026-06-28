import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center">

        <div>

          <h1 className="text-5xl font-extrabold leading-tight">

            Become a Volunteer
            <br />
            Change Someone's Life

          </h1>

          <p className="mt-6 text-lg text-gray-100">

            Join our community of passionate volunteers and help make
            education, healthcare, environment, and social services
            accessible to everyone.

          </p>

          <div className="mt-8 flex gap-5">

            <Link
              to="/register"
              className="bg-white text-emerald-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Register Now
            </Link>

            <Link
              to="/about"
              className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-emerald-700"
            >
              Learn More
            </Link>

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
            alt="Volunteer"
            className="rounded-2xl shadow-2xl"
          />

        </div>

      </div>

    </section>
  );
}