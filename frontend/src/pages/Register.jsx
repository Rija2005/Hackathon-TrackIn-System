import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

import { 
  FaUser, FaEnvelope, FaLock, FaUserPlus, FaArrowRight 
} from "react-icons/fa";
import { 
  IoMdPersonAdd 
} from "react-icons/io";
import { RiLoginBoxLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Minimum 3 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Must contain uppercase, lowercase, number and special character"
        )
        .required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        const res = await dispatch(registerUser(values)).unwrap();
        toast.success(res.message);
        navigate("/login");
      } catch (err) {
        toast.error(err.message || "Registration failed");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-50 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
            <div className="flex justify-center mb-2">
              <IoMdPersonAdd className="text-4xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-blue-100 mt-1">Join our community today</p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
            {[
              {
                field: "username",
                icon: <FaUser className="text-gray-400" />,
                type: "text",
                placeholder: "JohnDoe"
              },
              {
                field: "email",
                icon: <FaEnvelope className="text-gray-400" />,
                type: "email",
                placeholder: "john@example.com"
              },
              {
                field: "password",
                icon: <FaLock className="text-gray-400" />,
                type: "password",
                placeholder: "••••••••"
              }
            ].map((item, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {item.field.charAt(0).toUpperCase() + item.field.slice(1)}
                </label>
                <div className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 ${
                  formik.errors[item.field] && formik.touched[item.field] 
                    ? "border-red-500 focus-within:border-red-500" 
                    : "border-gray-300 focus-within:border-blue-500"
                }`}>
                  <span className="mr-2">{item.icon}</span>
                  <input
                    type={item.type}
                    name={item.field}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[item.field]}
                    placeholder={item.placeholder}
                    className="outline-none w-full bg-transparent"
                  />
                </div>
                {formik.errors[item.field] && formik.touched[item.field] && (
                  <p className="text-pink-400 text-xs mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {formik.errors[item.field]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-300 shadow-md"
            >
              <FaUserPlus />
              <span>{isLoading ? "Registering..." : "Register Now"}</span>
            </button>
          </form>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button 
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center space-x-1 mx-auto"
              >
                <span>Login here</span>
                <RiLoginBoxLine />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
