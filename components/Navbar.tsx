export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Illumina</h1>
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>
            <a href="#" className="hover:text-blue-700">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-700">
              Applications
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-700">
              Resources
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-700">
              Company
            </a>
          </li>
        </ul>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
          Contact Sales
        </button>
      </div>
    </nav>
  );
}
