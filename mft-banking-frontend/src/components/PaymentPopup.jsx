import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { paymentValidationSchema } from "../schemas/validationSchema";
import { toast } from "react-toastify";
import axios from "axios";
import SubmitLoder from "../utils/SubmitLoder";

function PaymentPopup({
  isOpen,
  onClose,
  monthsProfitToPay,
  dueAmount,
  customerName,
  fatherName,
  villageName,
  id,
  onPaymentSuccess
}) {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit , resetForm } =
    useFormik({
      initialValues: {
        paymentAmount: "",
        paymentDate: new Date().toISOString().split("T")[0], // default date
      },
      onSubmit: (values) => {
        customHandleSubmit(values);
      },
      validationSchema: paymentValidationSchema,
    });
  const [loding,setLoding] = useState(false)

  const customHandleSubmit = async (values) => {
    try {
      setLoding(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/add-payment`,{
        customerId:id,
        amount:values.paymentAmount,
        paymentDate:values.paymentDate
      },{
        withCredentials:true
      });
      onPaymentSuccess(response.data.updatedCustomer)
      toast.success(response.data.message)
      setLoding(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "payment failed");
      setLoding(false)
    }
    resetForm()
    onClose();
    setLoding(false)
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <SubmitLoder isOpen={loding}/>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-40"></div>

      {/* Popup Card */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border-t-4 border-orange-500">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Payment
          </h1>

          {/* Customer Info */}
          <div className="mb-4 space-y-1 text-sm bg-blue-50 rounded-lg p-3">
            <p className="flex justify-between">
              <span className="text-gray-600">Customer Name:</span>
              <span className="font-semibold text-blue-700">
                {customerName}
              </span>
            </p>

            <p className="flex justify-between">
              <span className="text-gray-600">Father’s Name:</span>
              <span className="font-semibold text-blue-700">{fatherName}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Village Name:</span>
              <span className="font-semibold text-blue-700">{villageName}</span>
            </p>
          </div>

          {/* Payment Info */}
          <div className="space-y-2 mb-4 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold text-blue-600">
                ৳ {monthsProfitToPay}
              </span>
            </p>
            {
              dueAmount.currentDue ?
              <p className="flex justify-between">
                <span className="text-gray-600">Payment Due:</span>
                <span className="font-semibold text-orange-500">
                  ৳ {dueAmount.currentDue}
                </span>
              </p> :
              <p className="flex justify-between">
                <span className="text-gray-600">Advenced Already:</span>
                <span className="font-semibold text-orange-500">
                  ৳ {dueAmount.currentMonthAdvances}
                </span>
              </p>
            }
            
          </div>

          {/* Payment Amount & Date */}
          <form onSubmit={handleSubmit}>
            {/* Payment Amount */}
            <input
              type="number"
              name="paymentAmount"
              value={values.paymentAmount}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter payment amount"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold tracking-wider"
            />
            {errors.paymentAmount && touched.paymentAmount && (
              <div className="text-red-500 text-sm mb-2">
                {errors.paymentAmount}
              </div>
            )}

            {/* Payment Date */}
            <input
              type="date"
              name="paymentDate"
              value={values.paymentDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
            {errors.paymentDate && touched.paymentDate && (
              <div className="text-red-500 text-sm mb-2">
                {errors.paymentDate}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Submit Payment
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PaymentPopup;
