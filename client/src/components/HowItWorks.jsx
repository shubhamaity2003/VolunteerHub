const steps = [
  {
    number: "01",
    title: "Register",
    description: "Create your volunteer account in just a few minutes.",
  },
  {
    number: "02",
    title: "Complete Profile",
    description: "Fill in your skills, interests, and availability.",
  },
  {
    number: "03",
    title: "Get Approved",
    description: "Our team reviews your application and approves it.",
  },
  {
    number: "04",
    title: "Start Volunteering",
    description: "Participate in campaigns and make an impact.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mt-14">

          {steps.map((step) => (

            <div
              key={step.number}
              className="text-center bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition"
            >

              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold mt-6">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}