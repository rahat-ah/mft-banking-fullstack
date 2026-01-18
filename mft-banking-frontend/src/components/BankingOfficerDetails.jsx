import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import profilePicMaker from "../utils/profilePicMaker";
import {StepForward } from "lucide-react";
import {toast} from "react-toastify"

export default function BankingOfficerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [officer, setOfficer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfficer = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/banking-officer/${id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setOfficer(res.data.officer);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOfficer();
  }, []);


  const handleLogout = async () => {
    if (!confirm("Are you sure you want to Logout?")) return;

    try {
      setLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,{},{
        withCredentials:true
      })
      toast.success(res.data.message)
      setLoading(false)
      navigate('/')
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message)
    }

  };

  const handleSwitchAccount = () => {
    console.log("acc switch btn");
  };

  const handleEditProfile = () => {
    console.log("edit profile");
  };

  const handleDeleteProfile = async () => {
    // if (!confirm("Are you sure you want to delete this account?")) return;

    // await axios.delete("/api/officer/delete", { withCredentials: true });
    // navigate("/");
    console.log("delete profile");
  };


  /* 🔹 UI states */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!officer) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
          {officer.profileImageUrl ? (
            <img
              src={officer.image}
              alt="Officer"
              className="w-28 h-28 rounded-full border-4 border-blue-600 object-cover "
            />
          ) : (
            <div>
              {profilePicMaker(
                officer.fullName,
                "w-28 h-28 text-6xl font-bold flex items-center justify-center rounded-full text-white "
              )}
            </div>
          )}
            <button
                onClick={() => window.history.back()}
                className=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full absolute right-0 top-0 w-12 h-12 ml-2 shadow-md shadow-black cursor-pointer bg-gray-200"
            >
                <StepForward className="inline " color="blue" />
            </button>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{officer.fullName}</h2>
            <p className="text-sm text-gray-500">{officer.email}</p>

            <div className="mt-2 flex gap-2 justify-center sm:justify-start">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 capitalize">
                {officer.role}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  "Active" === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {"Active"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* Profile Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <ProfileItem label="Mobile Number" value={officer.mobileNumber} />
          <ProfileItem label="Department" value={officer.department} />
          <ProfileItem label="Branch" value={officer.branch} />
          <ProfileItem label="Joined At" value={officer.joinedAt} />
        </div>

        {/* Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleEditProfile}
            className="py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={handleSwitchAccount}
            className="py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Switch Account
          </button>

          <button
            onClick={handleLogout}
            className="py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-black transition"
          >
            Logout
          </button>

          <button
            onClick={handleDeleteProfile}
            className="py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
}


function ProfileItem({ label, value }) {
  return (
    <div className="bg-gray-100 rounded-lg p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}
