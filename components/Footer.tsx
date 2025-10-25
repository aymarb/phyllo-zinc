export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <h5 className="font-semibold mb-3 text-white">Company</h5>
          <ul className="space-y-2">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-white">Resources</h5>
          <ul className="space-y-2">
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Downloads</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-white">Legal</h5>
          <ul className="space-y-2">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-white">Stay Connected</h5>
          <p>Follow us on social media for the latest updates.</p>
        </div>
      </div>
      <div className="text-center mt-10 text-sm text-gray-500">
        © 2025 Illumina Clone. All rights reserved.
      </div>
    </footer>
  );
}
