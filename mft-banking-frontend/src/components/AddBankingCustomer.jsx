import {
  FaUser,
  FaUserCheck,
  FaPhone,
  FaImage,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { validationSchema } from "../schemas/validationSchema";
import { uploadImage } from "../utils/cloudinary-image";
import SubmitLoder from "../utils/SubmitLoder";

export default function AddBankingCustomer() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    resetForm,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      fatherFirstName: "",
      fatherLastName: "",
      guardianFirstName: "",
      guardianLastName: "",
      date: new Date().toISOString().split("T")[0],
      villageName: "",
      fullAddress: "",
      loanAmount: "",
      earlierDueAmount:"",
      customerStatus: "new",
      mobileNumber: "",
      loanAuditor:"",
      profilePhotoUrl: null,
      nidPhotoUrl: null,
      stampPaperPhotoUrl: null,
    },
    onSubmit: (values) => handleCustomSubmit(values),
    validationSchema: validationSchema,
  });

  const handleCustomSubmit = async (values) => {
    setSubmitLoading(true);
    try {
      
      const profileUpload = await uploadImage(values.profilePhotoUrl);
      const nidUpload = await uploadImage(values.nidPhotoUrl);
      const stampPaperUpload = await uploadImage(values.stampPaperPhotoUrl);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/add-customer`,
        {...values,
          profilePhotoUrl: profileUpload?.secure_url || "",
          nidPhotoUrl: nidUpload?.secure_url || "",
          stampPaperPhotoUrl: stampPaperUpload?.secure_url || "",
        },{
          withCredentials:true
        }
      );

      response.data.success && toast.success(
        <div className={` flex flex-col gap-2`}>
          <p className="text-sm font-medium">{response.data.message}</p>

          <button
            onClick={() => {
              navigate(`/banking-customer-details/${response.data.customer._id}`)
            }}
            className="mt-1 rounded-md bg-blue-600 px-3 py-1.5
                 text-sm font-semibold text-white
                 hover:bg-blue-700
                 transition duration-200"
          >
            Customer Details
          </button>
        </div>
      );

      resetForm();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error(error.response?.data?.message || "Failed to add customer");
      setSubmitLoading(false);
    }
  };
  return (
    <>
    <SubmitLoder isOpen={submitLoading} />
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Add Customer
        </h2>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Customer Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Customer First Name*
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-blue-400" />
              <input
                type="text"
                className="input"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
            </div>
            {errors.firstName && touched.firstName && (
              <div className="text-red-500 text-sm mt-1 lowercase">
                {errors.firstName}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Customer Last Name
            </label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
          </div>

          {/* Father Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Father's First Name*
            </label>
            <input
              type="text"
              className="input"
              placeholder="Father First Name"
              name="fatherFirstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fatherFirstName}
            />
            {errors.fatherFirstName && touched.fatherFirstName && (
              <div className="text-red-500 text-sm mt-1 lowercase">
                {errors.fatherFirstName}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Father's Last Name
            </label>
            <input
              type="text"
              className="input"
              placeholder="Father Last Name"
              name="fatherLastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fatherLastName}
            />
          </div>

          {/* Guardian */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Guardian / Guarantor First Name
            </label>
            <input
              type="text"
              className="input"
              placeholder="Guardian First Name"
              name="guardianFirstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guardianFirstName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Guardian / Guarantor Last Name
            </label>
            <input
              type="text"
              className="input"
              placeholder="Guardian Last Name"
              name="guardianLastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guardianLastName}
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-gray-600">Date*</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-blue-400" />
              <input
                type="date"
                className="input pl-10"
                name="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
              />
              {errors.date && touched.date && (
                <div className="text-red-500 text-sm mt-1 lowercase">
                  {errors.date}
                </div>
              )}
            </div>
          </div>

          {/* Village */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Village Name*
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-orange-400" />
              <input
                type="text"
                className="input pl-10"
                placeholder="Village"
                name="villageName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.villageName}
              />
              {errors.villageName && touched.villageName && (
                <div className="text-red-500 text-sm mt-1 lowercase">
                  {errors.villageName}
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Full Address
            </label>
            <textarea
              rows="3"
              className="input"
              placeholder="Full Address"
              name="fullAddress"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullAddress}
            ></textarea>
          </div>

          {/* Loan */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Total Loan Amount*
            </label>
            <div className="relative flex items-center">
              <FaMoneyBillWave className="absolute left-3 top-3 text-green-500" />
              <input
                type="number"
                className="input pl-10"
                placeholder="Loan Amount"
                name="loanAmount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.loanAmount}
              />
            </div>
            {errors.loanAmount && touched.loanAmount && (
              <div className="text-red-500 text-sm mt-1 lowercase">
                {errors.loanAmount}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Earlier due Amount (if exist)
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                className="input pl-10"
                placeholder="Earlier Due Amount"
                name="earlierDueAmount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.earlierDueAmount}
              />
            </div>
            {errors.loanAmount && touched.loanAmount && (
              <div className="text-red-500 text-sm mt-1 lowercase">
                {errors.loanAmount}
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Customer Status
            </label>
            <select
              className="input"
              name="customerStatus"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.customerStatus}
            >
              <option value="new">New</option>
              <option value="old">Old</option>
            </select>
          </div>

          {/* Mobile */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <div className="relative flex items-center">
              <FaPhone className="absolute left-3 top-3 text-blue-400" />
              <input
                type="string"
                className="input pl-10"
                placeholder="01XXXXXXXXX"
                name="mobileNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobileNumber}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Audited By*
            </label>
            <div className="relative flex items-center gap-3">
              <FaUserCheck className="absolute left-3 top-3 text-blue-400 mr-3" />
              <select name="loanAuditor"
                className="input pl-10 appearance-none"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.loanAuditor}
                >
                <option value="">Select auditor</option>
                <option value="khalek">Khalek</option>
                <option value="rana">Rana</option>
                <option value="naim">Naim</option>
              </select>
            </div>
            {touched.loanAuditor && errors.loanAuditor && (
              <p className="text-red-500 text-xs mt-1">
                {errors.loanAuditor}
              </p>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Profile Photo (Optional)
            </label>
            <div className="file-box">
              <FaImage />
              <input
                type="file"
                name="profile"
                id="profile"
                className="w-full"
                accept="image/*"
                onChange={(e)=>{
                  setFieldValue('profilePhotoUrl', e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              NID Card Image (Optional)
            </label>
            <div className="file-box">
              <FaImage />
              <input
                type="file"
                name="nid-card"
                id="nid-card"
                className="w-full"
                accept="image/*"
                onChange={(e)=>{
                  setFieldValue('nidPhotoUrl', e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div className="">
            <label className="text-sm font-medium text-gray-600">
              Stamp Paper Image (Optional)
            </label>
            <div className="file-box">
              <FaImage />
              <input
                type="file"
                name="stamp-paper"
                id="stamp-paper"
                className="w-full"
                accept="image/*"
                onChange={(e)=>{
                  setFieldValue('stampPaperPhotoUrl', e.target.files[0]);
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-orange-500 text-white font-semibold text-lg hover:opacity-90 transition"
              type="submit"
            >
              Submit Customer
            </button>
          </div>
        </form>
      </div>

      {/* Tailwind helpers */}
      <style >{`
        .input {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          outline: none;
          padding-left: 30px;
        }
        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        .file-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px dashed #f59e0b;
          border-radius: 0.75rem;
          color: #f59e0b;
          cursor: pointer;
        }
        .file-box:hover {
          background: #fff7ed;
        }
      `}</style>
    </div>
    </>
  );
}
