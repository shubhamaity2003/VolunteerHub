import {
  FaBook,
  FaLeaf,
  FaHeartbeat,
  FaHandsHelping,
} from "react-icons/fa";

export default function VolunteerCategories() {
  const categories = [
    {
      icon: <FaBook size={45} className="text-blue-600" />,
      title: "Education",
      desc: "Teach students and organize learning programs.",
    },
    {
      icon: <FaHeartbeat size={45} className="text-red-500" />,
      title: "Healthcare",
      desc: "Support health camps and awareness drives.",
    },
    {
      icon: <FaLeaf size={45} className="text-green-600" />,
      title: "Environment",
      desc: "Participate in tree plantation and clean-up drives.",
    },
    {
      icon: <FaHandsHelping size={45} className="text-orange-500" />,
      title: "Community",
      desc: "Help local communities through various activities.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Volunteer Categories
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mt-12">

          {categories.map((item, index) => (
            <div
              key={index}
              className="shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition"
            >
              <div className="flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mt-5">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}