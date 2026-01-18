import { useContext , useRef , useEffect} from "react";
import { FaUsers, FaEnvelope, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contextApi/userContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const contactUsRef = useRef(null);
  const {setLoginFormOpen} = useContext(UserContext);

  useEffect(() => {
    setLoginFormOpen(false);
  }, []);

  return (
    <div className="font-sans">
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-50 via-orange-50 to-blue-100 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 leading-tight mb-4">
              Smart Loan & Customer <span className="text-orange-500">Management</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Easily manage customers, track loans, collect deposits and keep records organized
              in one secure dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                navigate("/banking-register")
                setLoginFormOpen(true)
              }}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Get Started
              </button>
              <button
                onClick={() => {
                    contactUsRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-xl border border-orange-400 text-orange-500 font-medium hover:bg-orange-50 transition"
              >
                Contact us
              </button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <img
              src="https://cdn.pixabay.com/photo/2017/08/30/07/56/money-2696229_1280.jpg"
              alt="Banking Illustration"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section 
      ref={contactUsRef}
      className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Have questions or need support? Reach out to us anytime, we are here to help.
            </p>
            <div className="flex flex-col gap-4 text-gray-700">
              <p className="flex items-center gap-3"><FaPhone className="text-blue-600"/> +8801816-479636</p>
              <p className="flex items-center gap-3"><FaEnvelope className="text-blue-600"/> mdrahatahmedboss@gmail.com</p>
            </div>
          </div>

          <form className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 MFT Banking. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
