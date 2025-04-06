import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, User, Globe, Pencil } from "lucide-react";
import ScreenWrapper from "@components/screen-wrapper";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useApi } from "@hooks/useApi";
import { AUTH_API } from "@api/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/slices/auth.slice";
import GenderSelector from "@components/gender-selector/GenderSelector";
import CountrySelector from "@components/country-selector";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

const validationSchema = Yup.object({
  bio: Yup.string().required("Bio is required"),
  country: Yup.string().required("Please select your country"),
  gender: Yup.string().required("Please select your gender"),
});

const Onboarding = () => {
  const signupRequest = useApi(AUTH_API.signup, false, false);
  const { firebaseUser: user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLogin = async (values) => {
    if (!user) return;
    const userData = {
      uid: user.uid,
      name: user.displayName || "No Name",
      email: user.email || "No Email",
      profilePic: user.photoURL || "https://via.placeholder.com/150",
      bio: values.bio,
      gender: values.gender,
      country: values.country,
    };

    try {
      const response = await signupRequest.requestCall(userData);
      dispatch(setUser(response.user));
      console.log("User logged in:", response);
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <ScreenWrapper maxWidth="lg" padding="p-4 md:p-6">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`max-w-3xl mx-auto rounded-xl shadow-lg p-4 md:p-8 transition-colors ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 
              variants={itemVariants} 
              className="text-xl md:text-2xl font-bold"
            >
              Complete Your Profile
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className={`mt-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Let's personalize your experience
            </motion.p>
          </div>
          <motion.div 
            variants={itemVariants}
            className={`hidden md:flex h-12 w-12 rounded-full items-center justify-center ${
              isDark ? "bg-gray-700" : "bg-indigo-50"
            }`}
          >
            <User className={isDark ? "text-indigo-300" : "text-indigo-600"} size={24} />
          </motion.div>
        </div>

        <Formik
          initialValues={{ bio: "", country: "", gender: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, values, errors, touched }) => (
            <Form className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="relative">
                  <label className={`block text-sm font-medium mb-2 flex items-center ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}>
                    <Pencil size={16} className="mr-2" /> About You
                  </label>
                  <Field
                    name="bio"
                    as="textarea"
                    placeholder="Tell us a bit about yourself..."
                    className={`w-full p-3 rounded-lg text-sm transition-colors ${
                      isDark 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                    } ${errors.bio && touched.bio ? "border-red-500" : "border"}`}
                    rows={4}
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="relative">
                  <label className={`block text-sm font-medium mb-2 flex items-center ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}>
                    <Globe size={16} className="mr-2" /> Your Country
                  </label>
                  <Field name="country">
                    {({ field, form }) => (
                      <CountrySelector
                        value={field.value}
                        onChange={(value) => form.setFieldValue("country", value)}
                        className="text-sm"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="relative">
                  <label className={`block text-sm font-medium mb-2 flex items-center ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}>
                    <User size={16} className="mr-2" /> Gender
                  </label>
                  <Field name="gender">
                    {({ field, form }) => (
                      <GenderSelector
                        value={field.value}
                        onChange={(val) => form.setFieldValue("gender", val)}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="pt-4"
              >
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    isSubmitting 
                      ? "opacity-70 cursor-not-allowed" 
                      : "hover:shadow-lg transform hover:-translate-y-1"
                  } bg-indigo-600 text-white hover:bg-indigo-700`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Complete Profile 
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </ScreenWrapper>
  );
};

export default Onboarding;