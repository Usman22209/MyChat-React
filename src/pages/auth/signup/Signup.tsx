import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import ScreenWrapper from "@components/screen-wrapper";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAppNavigation } from "@utils/Navigation";
import { useApi } from "@hooks/useApi";
import { USER_API } from "@api/user.api";
import toast from "react-hot-toast";

const Signup: React.FC = () => {
  const navigate = useAppNavigation();
  const otherUserRequest = useApi(USER_API.getOtherUser, false, false);
  const { signUp, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await signUp(values.email, values.password);
        toast.success("Signup successful! Please verify your email.");
        navigate("/auth/onboarding");
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleGoogleSignUp = async () => {
    try {
      const user = await signInWithGoogle();
      otherUserRequest
        .requestCall(user?.uid)
        .then((res) => {
          toast.error("user already Exist");
        })
        .catch((err) => {
          navigate("/auth/onboarding");
        });
    } catch (error) {
      console.error("Google Signup Error:", error);
    }
  };
  return (
    <ScreenWrapper className="py-12">
      <div className="w-full max-w-md px-0 md:px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-8 shadow-xl dark:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90">
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Join us today</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="flex items-center mt-2 text-red-500">
                  <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  <span className="text-xs md:text-sm">{formik.errors.email}</span>
                </div>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-9 md:pl-10 pr-10 md:pr-12 py-2.5 md:py-3 text-sm md:text-base bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  {...formik.getFieldProps("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="flex items-center mt-2 text-red-500">
                  <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  <span className="text-xs md:text-sm">{formik.errors.password}</span>
                </div>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full pl-9 md:pl-10 pr-10 md:pr-12 py-2.5 md:py-3 text-sm md:text-base bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="flex items-center mt-2 text-red-500">
                  <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  <span className="text-xs md:text-sm">{formik.errors.confirmPassword}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white py-2.5 md:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg text-sm md:text-base"
            >
              {formik.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Creating account...</span>
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="relative my-4 md:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs md:text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 py-2.5 md:py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 text-sm md:text-base"
              onClick={handleGoogleSignUp}
            >
              <svg
                className="h-4 w-4 md:h-5 md:w-5 text-red-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          <p className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <button
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              onClick={() => navigate("/auth/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default Signup;
