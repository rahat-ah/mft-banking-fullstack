import { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes, FaHome, FaUsers, FaPlusCircle } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { RiLoginBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contextApi/userContext";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contextApi/authContext";
import profilePicMaker from "../utils/profilePicMaker";
import axios from "axios";
import logoImage from "../assets/mftLogo.png"

export default function Navbar() {
  const { hamMenuOpen, setHamMenuOpen, loginFormOpen, setLoginFormOpen } =
    useContext(UserContext);
  const { isAuth, officerId } = useContext(AuthContext);
  const [officer, setOfficer] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return;   
    if (!officerId) return;
    const fetchOfficer = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/auth/banking-officer/${officerId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setOfficer(res.data.officer);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfficer();
  }, [officerId]);

  return (
    <>
      {isAuth ? (
        <header className={`sticky top-0 z-50 bg-white shadow-md  `}>
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src={logoImage} alt="logo image"  className="w-10 h-10" />
              <h1 className="text-lg font-bold text-blue-700">
                MFT<span className="text-orange-500">Banking</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 font-medium text-gray-600">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "text-blue-600 font-bold" : ""}`
                  }
                >
                  <FaHome /> Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/banking-customers"
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "text-blue-600 font-bold" : ""}`
                  }
                >
                  <FaUsers /> Customers
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/banking-customer-add"
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "text-blue-600 font-bold" : ""}`
                  }
                >
                  <FaPlusCircle /> Add Customer
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/banking-officers"
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "text-blue-600 font-bold" : ""}`
                  }
                >
                  <IoMdPerson /> Officers
                </NavLink>
              </li>

              <li>
                {officer && (
                  <NavLink
                    to={`/banking-officer-details/${officerId}`}
                    className={({ isActive }) =>
                      `nav-item rounded-full  ${
                        isActive
                          ? "text-blue-600 font-bold ring-2 ring-orange-500"
                          : ""
                      }`
                    }
                  >
                    {officer.profileImageUrl ? (
                      <img />
                    ) : (
                      <div>
                        {profilePicMaker(
                          officer.fullName,
                          "w-8 h-8 flex items-center justify-center rounded-full text-white "
                        )}
                      </div>
                    )}
                  </NavLink>
                )}
              </li>
            </ul>

            {/* Mobile Button */}
            <div className="md:hidden text-2xl text-blue-600 cursor-pointer flex items-center gap-3">
              {officer && (
                <NavLink
                  to={`/banking-officer-details/${officerId}`}
                  className={({ isActive }) =>
                    `nav-item rounded-full  ${
                      isActive
                        ? "text-blue-600 font-bold ring-2 ring-orange-500"
                        : ""
                    }`
                  }
                >
                  {officer.profileImageUrl ? (
                    <img />
                  ) : (
                    <div>
                      {profilePicMaker(
                        officer.fullName,
                        "w-8 h-8 flex items-center justify-center rounded-full text-white "
                      )}
                    </div>
                  )}
                </NavLink>
              )}
              <button onClick={() => setHamMenuOpen(!hamMenuOpen)}>
                {hamMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {hamMenuOpen && (
            <div className="md:hidden bg-linear-to-b from-blue-50 to-orange-50 border-t z-50">
              <ul className="flex flex-col gap-4 px-6 py-5 text-gray-700 font-medium">
                <li className="mobile-item" onClick={() => navigate("/home")}>
                  <FaHome /> Home
                </li>
                <li
                  className="mobile-item"
                  onClick={() => navigate("/banking-customers")}
                >
                  <FaUsers /> Customers
                </li>
                <li
                  className="mobile-item"
                  onClick={() => navigate("/banking-customer-add")}
                >
                  <FaPlusCircle /> Add Customer
                </li>
                <li
                  className="mobile-item"
                  onClick={() => navigate("/banking-officers")}
                >
                  <IoMdPerson /> Officers
                </li>
              </ul>
            </div>
          )}

          {/* helpers */}
          <style>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          position: relative;
        }
        .nav-item::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 2px;
          background: linear-gradient(to right, #2563eb, #f97316);
          transition: width 0.3s ease;
        }
        .nav-item:hover::after {
          width: 100%;
        }
        .mobile-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
        }
        .mobile-item:hover {
          background: white;
          color: #2563eb;
        }
      `}</style>
        </header>
      ) : (
        <header className="bg-white shadow-md sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div
              onClick={() => {
                navigate("/");
                setLoginFormOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src={logoImage} alt="logo image" className="w-10 h-10" />
              <h1 className="text-xl font-bold text-blue-700">
                MFT<span className="text-orange-500">Banking</span>
              </h1>
            </div>
            {!loginFormOpen && (
              <button
                onClick={() => {
                  navigate("/banking-register");
                  setLoginFormOpen(true);
                }}
                className="px-5 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              >
                Register
              </button>
            )}
          </nav>
        </header>
      )}
    </>
  );
}
