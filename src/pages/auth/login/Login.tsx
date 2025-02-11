import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import ScreenWrapper from "@components/screen-wrapper";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values.email, values.password);
        console.log("Login successful");
      } catch (error) {
        setErrors({ email: "Invalid credentials" });
      }
      setSubmitting(false);
    },
  });

  return (
    <ScreenWrapper className="flex justify-center items-center min-h-screen bg-bg-secondary transition-all duration-300">
      <div className="w-full max-w-md">
        <div className="bg-bg-primary rounded-xl p-8 shadow-lg transition-all duration-300">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl font-bold text-text-primary transition-colors duration-300 mb-2">
              Welcome Back
            </h2>
            <p className="text-text-secondary transition-colors duration-300">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary transition-colors duration-300" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 bg-input-bg border border-input-border text-text-primary rounded-lg focus:ring-2 focus:ring-text-accent focus:border-transparent transition-all duration-300"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="flex items-center mt-2 text-error transition-colors duration-300">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{formik.errors.email}</span>
                </div>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 bg-input-bg border border-input-border text-text-primary rounded-lg focus:ring-2 focus:ring-text-accent focus:border-transparent transition-all duration-300"
                  {...formik.getFieldProps("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="flex items-center mt-2 text-error transition-colors duration-300">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{formik.errors.password}</span>
                </div>
              )}
            </div>

            {/* Rest of the component remains the same */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 bg-input-bg border-input-border rounded transition-colors duration-300"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-text-secondary transition-colors duration-300"
                >
                  Remember me
                </label>
              </div>
              <button className="text-sm font-medium text-text-accent hover:text-button-hover transition-all duration-300">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-button-primary hover:bg-button-hover text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              {formik.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="relative my-6">
              {/* <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-primary transition-colors duration-300" />
              </div> */}
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-bg-primary text-text-secondary transition-all duration-300">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              onClick={() => console.log("Google Sign-In clicked")}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary transition-colors duration-300">
            Don't have an account?{" "}
            <button className="font-medium text-text-accent hover:text-button-hover transition-all duration-300">
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default Login;
