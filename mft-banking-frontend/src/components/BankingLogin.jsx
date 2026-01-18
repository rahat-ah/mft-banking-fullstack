import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginValidationSchema } from "../schemas/validationSchema";
import { UserContext } from "../contextApi/userContext";
import { toast } from "react-toastify";
import axios from "axios";
import SubmitLoder from "../utils/SubmitLoder";
import api from "../utils/axiosRoute";
import { AuthContext } from "../contextApi/authContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setLoginFormOpen } = useContext(UserContext);
  const {setIsAuth} = useContext(AuthContext)
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  setLoginFormOpen(true);
  }, [setLoginFormOpen]);


  const formik = useFormik({
    initialValues: {
      email: "",
      mobile: "",
      password: "",
      secretCode: "",
      adminCode: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {

      if (isAdmin) {
        handleAdminLogin(values);
      } else {
        handleOfiicersLogin(values);
      }
      
    },
  });

  const handleOfiicersLogin = async (values) => {
    if (!values) {
      toast.error("all fields are required");
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        {
          email: values.email,
          mobileNumber: values.mobile,
          password: values.password,
          officerSecret: values.secretCode,
        },{withCredentials:true}
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false)
        return;
      }
      toast.success(response.data.message);
      const authCheck = await api.get("/auth/is-auth",{withCredentials:true})

      if(authCheck.data.success){
        setIsAuth(true) 
      }else{
        toast.error("Unable to verify login from server.");
      }
      navigate("/home");
      formik.resetForm();
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false)
      return;
    }
  };
  const handleAdminLogin = async (values) => {
    if (!values) {
      toast.error("all fields are required");
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/admin-signin`,
        {
          email: values.email,
          mobileNumber: values.mobile,
          password: values.password,
          officerSecret: values.secretCode,
          adminCode:values.adminCode
        },{withCredentials:true}
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false)
        return;
      }
      toast.success(response.data.message);
      const authCheck = await api.get("/auth/is-admin",{withCredentials:true})

      if(authCheck.data.success){
        setIsAuth(true) 
      }else{
        toast.error("Unable to verify login from server.");
      }
      navigate("/home");
      formik.resetForm();
      setLoading(false)
    } catch (error) {
      toast.error(error.message);
      setLoading(false)
      return;
    }
  };
  

  return (
    <>
      <SubmitLoder isOpen={loading} />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Officer Login
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                {...formik.getFieldProps("email")}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Mobile */}
            <div>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                {...formik.getFieldProps("mobile")}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.mobile}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Secret Code */}
            <div>
              <input
                type="text"
                name="secretCode"
                placeholder="Officer Secret Code"
                {...formik.getFieldProps("secretCode")}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {formik.touched.secretCode && formik.errors.secretCode && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.secretCode}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="adminToggle"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="adminToggle" className="text-gray-700">
                Admin
              </label>

              {/* Admin Code input appears beside checkbox if admin */}
              {isAdmin && (
                <input
                  type="text"
                  name="adminCode"
                  placeholder="Admin Code"
                  {...formik.getFieldProps("adminCode")}
                  className="border border-gray-300 rounded-lg px-3 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )}
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-500 text-sm text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/banking-register")}
              className="text-orange-500 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
