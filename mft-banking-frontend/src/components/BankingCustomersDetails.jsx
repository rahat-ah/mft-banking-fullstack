import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  CreditCard,
  ChevronDown,
  ArrowRightFromLine,
  StepForward,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import profilePicMaker from "../utils/profilePicMaker";
import PaymentPopup from "./PaymentPopup";
import getCurrentMonthDue from "../utils/getCurrentMonthDue";
import {
  getTotalDueAmount,
  getTotalPaymentAmount,
} from "../utils/getTotalAmount";
import { toast } from "react-toastify";
import SubmitLoder from "../utils/SubmitLoder";

export default function BankingCustomersDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({});
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
  const [loading,setLoading] = useState(false)

  const handlePaymentSuccess = (updatedCustomer) => {
    setCustomerData(updatedCustomer);
  };

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/user/customer/${id}`,{
            withCredentials:true
          }
        );

        if (response.data.success) {
          setCustomerData(response.data.customer);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };
    fetchCustomerDetails();
  }, [id]);

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    
    if (!id) {
      toast.error("Failed to delete customer");
      return;
    }
    try {
      setLoading(true)
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/delete-customer/${id}`,{
          withCredentials:true
        }
      );

      navigate("/banking-customers");
      setLoading(false)
      toast.success(response.data?.message);
      return;
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false)
      return;
    }
  };
  const handleUpdateCustomer = () => {};

  return (
    <>
      <SubmitLoder isOpen={loading} />
      <div className="min-h-screen w-full bg-linear-to-br from-blue-500 via-orange-500 to-indigo-600 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl rounded-2xl shadow-xl bg-white">
          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
              <div className="xs:relative xs:w-full md:w-auto xs:flex md:block xs:justify-center">
                {customerData.profilePhotoUrl ? (
                  <img
                    src={customerData.profilePhotoUrl}
                    alt="Profile"
                    className="w-36 h-36 rounded-2xl object-cover border-4 border-blue-400"
                  />
                ) : (
                  profilePicMaker(
                    customerData.firstName,
                    "w-36 h-36 rounded-2xl object-cover border-4 border-blue-400 text-white font-bold text-8xl flex items-center justify-center"
                  )
                )}
                <button
                  onClick={() => window.history.back()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full absolute right-0 top-0 w-12 h-12 md:hidden xs:block ml-2 shadow-md shadow-black cursor-pointer"
                >
                  <StepForward className="inline " color="blue" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-blue-700 capitalize">
                  {customerData.firstName} {customerData.lastName}
                </h1>
                <p className="text-gray-600 mt-1">
                  Customer ID:{" "}
                  <span className="font-medium">{customerData.id}</span>
                </p>
                <div className="flex gap-2 justify-center md:justify-start mt-3">
                  <button className="font-semibold tracking-wide rounded-full px-4 py-1 text-white bg-blue-600">
                    Active
                  </button>
                  <button className="font-semibold tracking-wide rounded-full px-4 py-1 text-white bg-orange-500 capitalize">
                    <span className="uppercase text-shadow-2xs text-shadow-black">
                      {customerData.customerStatus}
                    </span>{" "}
                    Loan Holder
                  </button>
                </div>
              </div>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full xs:hidden md:block cursor-pointer"
              >
                Back
                <ArrowRightFromLine className="inline ml-2" color="blue" />
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-blue-600">
                  Personal Information
                </h2>
                <p className="capitalize">
                  <span className="font-medium">Father's Name:</span>{" "}
                  {customerData.fatherFirstName} {customerData.fatherLastName}
                </p>
                <p className="capitalize">
                  <span className="font-medium">Guarantor Name:</span>{" "}
                  {customerData.guardianFirstName}{" "}
                  {customerData.guardianLastName}
                </p>
                <p className="capitalize">
                  <span className="font-medium">Village:</span>{" "}
                  {customerData.villageName}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className=" capitalize">
                    Full Address: {customerData.fullAddress}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>
                    Loan Date:{" "}
                    {new Date(customerData.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-orange-600">
                  Loan Details
                </h2>
                <p>
                  <span className="font-medium">Loan Amount:</span> ৳{" "}
                  {customerData.loanAmount}
                </p>
                <p>
                  <span className="font-medium">Monthly profit:</span> ৳{" "}
                  {Number((customerData.loanAmount * 0.1).toFixed(1))}
                </p>
                <div className="mb-5">
                  {getCurrentMonthDue(customerData).currentDue ? (
                    <>
                      <span className="font-medium">Month's due:</span>
                      <span>
                        ৳ {getCurrentMonthDue(customerData).currentDue}{" "}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Month's advance:</span>
                      <span>
                        ৳{" "}
                        {getCurrentMonthDue(customerData).currentMonthAdvances}{" "}
                      </span>
                    </>
                  )}

                  <span
                    onClick={() => setOpenPaymentPopup(true)}
                    className="cursor-pointer rounded-sm bg-green-800 p-2 text-white"
                  >
                    Payment <ChevronDown className=" inline" />{" "}
                  </span>
                  <PaymentPopup
                    isOpen={openPaymentPopup}
                    onClose={() => setOpenPaymentPopup(false)}
                    monthsProfitToPay={customerData.loanAmount * 0.1}
                    dueAmount={getCurrentMonthDue(customerData)}
                    customerName={customerData.firstName}
                    fatherName={customerData.fatherFirstName}
                    villageName={customerData.villageName}
                    id={customerData._id}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </div>
                <p>
                  <span className="font-medium">Total due:</span> ৳{" "}
                  {getTotalDueAmount(customerData)}{" "}
                  <span className="rounded-sm bg-green-800 p-2 text-white cursor-pointer">
                    Due Details <ChevronDown className=" inline" />{" "}
                  </span>
                </p>

                <p>
                  <span className="font-medium">Total payments:</span> ৳{" "}
                  {getTotalPaymentAmount(customerData)}{" "}
                  <span className="rounded-sm bg-green-800 p-2 text-white cursor-pointer">
                    Details <ChevronDown className=" inline" />{" "}
                  </span>
                </p>
              </div>
            </div>

            {/* Documents */}
            {(customerData.nidPhotoUrl || customerData.stampPaperPhotoUrl) && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">
                  Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customerData.nidPhotoUrl && (
                    <div
                      className="border rounded-xl p-4"
                      onClick={() =>
                        window.open(customerData.nidPhotoUrl, "_blank")
                      }
                    >
                      <p className="font-medium mb-2">NID Card</p>
                      <img
                        src={customerData.nidPhotoUrl}
                        alt="NID Front"
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  {customerData.stampPaperPhotoUrl && (
                    <div
                      className="border rounded-xl p-4"
                      onClick={() =>
                        window.open(customerData.stampPaperPhotoUrl, "_blank")
                      }
                    >
                      <p className="font-medium mb-2">Stamp Paper</p>
                      <img
                        src={customerData.stampPaperPhotoUrl}
                        alt="NID Back"
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
              {/* Update Button */}
              <button
                className="
                  px-6 py-2.5
                  rounded-xl
                  font-semibold
                  text-white
                  bg-blue-600
                  hover:bg-blue-700
                  active:scale-95
                  transition-all duration-200
                  shadow-md shadow-blue-300
                "
                onClick={handleUpdateCustomer}
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                className="
                  px-6 py-2.5
                  rounded-xl
                  font-semibold
                  text-white
                  bg-red-600
                  hover:bg-red-700
                  active:scale-95
                  transition-all duration-200
                  shadow-md shadow-red-300
                "
                onClick={() => handleDeleteCustomer(customerData._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
