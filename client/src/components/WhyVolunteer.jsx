import { FaHandsHelping, FaUsers, FaAward } from "react-icons/fa";

export default function WhyVolunteer() {
  const cards = [
    {
      icon: <FaHandsHelping className="text-5xl text-emerald-600" />,
      title: "Make a Difference",
      description:
        "Support meaningful causes and positively impact the lives of people in your community.",
    },
    {
      icon: <FaUsers className="text-5xl text-blue-600" />,
      title: "Build Connections",
      description:
        "Meet inspiring volunteers, expand your network, and work together for social change.",
    },
    {
      icon: <FaAward className="text-5xl text-orange-500" />,
      title: "Develop Skills",
      description:
        "Improve your leadership, teamwork, communication, and event management skills.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-800">
          Why Volunteer With Us?
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Together we create opportunities to make communities stronger.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              {card.icon}

              <h3 className="text-2xl font-semibold mt-6">
                {card.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}