export default function Testimonials() {

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Volunteer",
      text: "VolunteerHub helped me contribute to society while improving my leadership skills.",
    },
    {
      name: "Priya Das",
      role: "Teacher",
      text: "A wonderful platform connecting volunteers with meaningful causes.",
    },
    {
      name: "Amit Roy",
      role: "Student",
      text: "I participated in environmental campaigns and made many new friends.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          What Our Volunteers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8"
            >

              <p className="italic text-gray-600">
                "{item.text}"
              </p>

              <h3 className="mt-6 font-bold">
                {item.name}
              </h3>

              <p className="text-gray-500">
                {item.role}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}