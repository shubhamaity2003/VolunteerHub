import MainLayout from "../layouts/MainLayout";

import Hero from "../components/Hero";
import WhyVolunteer from "../components/WhyVolunteer";
import HowItWorks from "../components/HowItWorks";
import VolunteerCategories from "../components/VolunteerCategories";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero */}
      <Hero />

      {/* Impact Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">
              Our Impact
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Together with our volunteers, we have transformed thousands of
              lives through education, healthcare, environmental campaigns,
              and community development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center">
              <h3 className="text-5xl font-bold text-emerald-600">
                5000+
              </h3>

              <p className="mt-4 text-gray-600 text-lg">
                Active Volunteers
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center">
              <h3 className="text-5xl font-bold text-blue-600">
                150+
              </h3>

              <p className="mt-4 text-gray-600 text-lg">
                Campaigns Conducted
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center">
              <h3 className="text-5xl font-bold text-orange-500">
                30+
              </h3>

              <p className="mt-4 text-gray-600 text-lg">
                Cities Reached
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center">
              <h3 className="text-5xl font-bold text-red-500">
                25K+
              </h3>

              <p className="mt-4 text-gray-600 text-lg">
                Lives Impacted
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Sections */}
      <WhyVolunteer />

      <HowItWorks />

      <VolunteerCategories />

      <Testimonials />

      <FAQ />

      <ContactSection />

    </MainLayout>
  );
}