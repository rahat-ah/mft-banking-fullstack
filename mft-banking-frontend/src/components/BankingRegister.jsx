import { useFormik } from "formik";
import { MdVerifiedUser } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../schemas/validationSchema";
import { UserContext } from "../contextApi/userContext";
import VerifyOtpPopup from "./VerifyOtpPopup";
import { toast } from "react-toastify";
import axios from "axios";

export default function BankingRegister() {
  const navigate = useNavigate();
  const {setLoginFormOpen} = useContext(UserContext);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [showOtpPopup,setShowOtpPopup] = useState(false)

  useEffect(()=>{
    setLoginFormOpen(true)
  },[])

  
  
  const { handleBlur, handleChange, handleSubmit, values,errors, touched, resetForm } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      role: "",
      secretCode: "",
    },
    validationSchema:registerValidationSchema,
    onSubmit: async(values) => {
      
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`,values,{
          withCredentials:true
        })

        if(!response.data.success){
          toast.error(response.data.message)
          return
        }
         
        toast.success(response.data.message)
        resetForm();
        navigate("/home"); 
        
      } catch (error) {
        console.log(error)
        toast.error(error.message)
        return
      }
    },
  });

  useEffect(()=>{
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setShowVerifyButton(emailPattern.test(values.email) && !isEmailVerified);
  },[values.email, isEmailVerified])

  const handleSendVerifyEmail = async (email)=>{

    if (!email) {
      toast.error("email not found")
      return 
    }
    setVerifyingEmail(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/send-verify-otp`,{email});
      
      if (!response.data.success) {
        toast.error(response.data.message)
        setVerifyingEmail(false)
        return
      }
      setShowOtpPopup(true)
      setVerifyingEmail(false)
      
    } catch (error) {
       toast.error(error.message)
       setVerifyingEmail(false)
       return
    }

    setVerifyingEmail(false)

   
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full xs:max-w-xs sm:max-w-md p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Officer Registration
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Full Name"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && touched.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          
          <div className="flex justify-between items-center gap-1">
            <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email Address"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          />
          {isEmailVerified && <span >
                <MdVerifiedUser className="text-green-500 text-center" size={24} />
            </span>}

          </div>
          
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
          
          {showVerifyButton && (
            <button
              type="button"
              onClick={()=>handleSendVerifyEmail(values.email)}
              disabled={verifyingEmail}
              className={`mt-2 px-4 py-2 rounded-lg font-medium text-white ${
                verifyingEmail ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {verifyingEmail ? "Sending OTP..." : "Send Verify OTP"}
            </button>
          )}

          {showOtpPopup && (
            <VerifyOtpPopup
              email={values.email}
              onClose={() => setShowOtpPopup(false)}
              setIsEmailVerified={setIsEmailVerified}
            />
          )}


          <input
            type="tel"
            name="mobileNumber"
            value={values.mobileNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="01XXXXXXXXX"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            {errors.mobileNumber && touched.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
            )}


          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="manager">Manager</option>
            <option value="loan_officer">Loan Officer</option>
            <option value="ceo">CEO</option>
          </select>
          {errors.role && touched.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}

          <input
            type="text"
            name="secretCode"
            value={values.secretCode}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Officer Secret Code"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.secretCode && touched.secretCode && (
              <p className="text-red-500 text-sm mt-1">{errors.secretCode}</p>
            )}

          <button
            type="submit"
            disabled={!isEmailVerified}
            className={`mt-4 px-6 py-3 rounded-xl  text-white bg-blue-600 ${
                !isEmailVerified ? "bg-gray-400 cursor-not-allowed" : " hover:bg-blue-700 " }font-medium transition`}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-gray-500 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/banking-login")}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
