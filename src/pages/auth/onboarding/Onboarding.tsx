import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Upload, Info } from "lucide-react";
import ScreenWrapper from "@components/screen-wrapper";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useApi } from "@hooks/useApi";
import { AUTH_API } from "@api/auth.api";
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "cn", label: "China" },
];

const validationSchema = Yup.object({
  bio: Yup.string().required("Bio is required"),
  country: Yup.string().required("Please select your country"),
  gender: Yup.string().required("Please select your gender"),
});

const Onboarding = () => {
  const loginRequest = useApi(AUTH_API.signup, false, false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
      const response = await loginRequest.requestCall(userData);

      console.log("User logged in:", response.data);
      //   navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <ScreenWrapper maxWidth="lg" padding="p-6">
      <motion.div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
        <p className="text-gray-600 mb-8">Let's personalize your experience.</p>

        <Formik
          initialValues={{ bio: "", country: "", gender: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium">Bio</label>
                <Field name="bio" as="textarea" className="w-full border p-2 rounded" />
                <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Country</label>
                <Field as="select" name="country" className="w-full border p-2 rounded">
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Gender</label>
                <div className="flex gap-4">
                  {genderOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <Field type="radio" name="gender" value={option.value} />
                      {option.label}
                    </label>
                  ))}
                </div>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                Complete Profile <ArrowRight className="inline h-5 w-5" />
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </ScreenWrapper>
  );
};

export default Onboarding;
