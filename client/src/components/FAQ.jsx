export default function FAQ() {

  const faqs = [
    {
      q: "Who can become a volunteer?",
      a: "Anyone above 18 years with a passion for helping society.",
    },
    {
      q: "Is volunteering free?",
      a: "Yes. Volunteering is completely free.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes. Active volunteers receive certificates after campaigns.",
    },
  ];

  return (
    <section className="py-20">

      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 mb-5"
          >

            <h3 className="font-bold text-lg">
              {faq.q}
            </h3>

            <p className="text-gray-600 mt-3">
              {faq.a}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}