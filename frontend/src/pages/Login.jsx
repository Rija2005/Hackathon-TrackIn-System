import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaSignInAlt,
  FaArrowRight,
  FaUserPlus
} from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.post("/auth/login", values);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);  // store userRole for AdminRoute
        toast.success(res.data.message || "Login successful");
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
            <div className="flex justify-center mb-2">
              <IoMdLock className="text-4xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-blue-100 mt-1">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 ${
                formik.errors.email && formik.touched.email 
                  ? "border-red-500 focus-within:border-red-500" 
                  : "border-gray-300 focus-within:border-blue-500"
              }`}>
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="your@email.com"
                  className="outline-none w-full bg-transparent"
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 ${
                formik.errors.password && formik.touched.password 
                  ? "border-red-500 focus-within:border-red-500" 
                  : "border-gray-300 focus-within:border-blue-500"
              }`}>
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="••••••••"
                  className="outline-none w-full bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 ml-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-300 shadow-md"
            >
              <FaSignInAlt />
              <span>Sign In</span>
              <FaArrowRight className="ml-1" />
            </button>
          </form>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center space-x-1 mx-auto"
              >
                <span>Register now</span>
                <FaUserPlus />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;