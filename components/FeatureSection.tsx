export default function FeatureSection() {
  const features = [
    {
      title: "Next-Generation Sequencing",
      desc: "Leading NGS platforms that redefine speed, accuracy, and accessibility.",
    },
    {
      title: "Clinical Applications",
      desc: "Empowering precision medicine with reliable sequencing data.",
    },
    {
      title: "Research Solutions",
      desc: "Supporting global scientific discovery from cancer genomics to agriculture.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-12">
          Transforming Science Through Innovation
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition"
            >
              <h4 className="text-xl font-semibold text-blue-700 mb-3">
                {f.title}
              </h4>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
