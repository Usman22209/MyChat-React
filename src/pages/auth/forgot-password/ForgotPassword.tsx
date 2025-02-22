import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import ScreenWrapper from "@components/screen-wrapper";
import { Mail, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useAppNavigation } from "@utils/Navigation";

const ForgotPassword: React.FC = () => {
  const navigate = useAppNavigation();
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        await forgotPassword(values.email);
        toast.success("Password reset email sent!");
        navigate("/auth/login");
      } catch (error: any) {
        console.error("Forgot Password Error:", error);
        toast.error("Failed to send reset email. Try again.");
      }
      setLoading(false);
      setSubmitting(false);
    },
  });

  return (
    <ScreenWrapper className="py-12">
      <div className="w-full max-w-md px-0 md:px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-4">
            Reset Password
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
            Enter your email to receive a password reset link.
          </p>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="flex items-center mt-2 text-red-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{formik.errors.email}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium shadow-lg transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Remember your password?
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-600 font-medium ml-1 hover:text-indigo-500"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default ForgotPassword;
