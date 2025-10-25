export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Innovating the Future of Genomics
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Empowering scientists and clinicians to unlock the power of the genome
          with cutting-edge sequencing and analysis technologies.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-700 px-6 py-3 font-semibold rounded-lg hover:bg-gray-100">
            Learn More
          </button>
          <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700">
            View Products
          </button>
        </div>
      </div>
    </section>
  );
}
