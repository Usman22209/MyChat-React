import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Globe, Pencil, User } from "lucide-react";
import ScreenWrapper from "@components/screen-wrapper";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useApi } from "@hooks/useApi";
import { AUTH_API } from "@api/auth.api";
import { UPLOAD_API } from "@api/upload.api";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/slices/auth.slice";
import GenderSelector from "@components/gender-selector/GenderSelector";
import CountrySelector from "@components/country-selector";
import { useTheme } from "@providers/theme-provider/ThemeProvider";
import { getAvatarUrl } from "@helper/image.helper";

interface FormValues {
  firstName: string;
  lastName: string;
  bio: string;
  country: string;
  gender: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  bio: Yup.string().required("Bio is required"),
  country: Yup.string().required("Please select your country"),
  gender: Yup.string().required("Please select your gender"),
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Onboarding: React.FC = () => {
  const signupRequest = useApi(AUTH_API.signup, false, false);
  const uploadFileRequest = useApi(UPLOAD_API.uploadFile, false, false);
  const { firebaseUser: user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [profilePic, setProfilePic] = useState<string>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      const previewUrl = URL.createObjectURL(file);
      setProfilePic(previewUrl);

      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await uploadFileRequest.requestCall(formData);

      if (uploadResponse.url) {
        setProfilePic(uploadResponse.url);
      }
    } catch (error: any) {
      console.error("Upload failed:", error.response?.data || error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    if (!user) return;

    try {
      const fullName = `${values.firstName} ${values.lastName}`.trim();

      const userData = {
        uid: user.uid,
        name: fullName,
        email: user.email || "No Email",
        profilePic: profilePic || getAvatarUrl(fullName),
        bio: values.bio,
        gender: values.gender,
        country: values.country,
      };

      const signupResponse = await signupRequest.requestCall(userData);
      dispatch(setUser(signupResponse.user));
      navigate("/auth/login");
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getPlaceholderName = () => {
    if (user?.displayName) {
      const nameParts = user.displayName.split(" ");
      if (nameParts.length > 1) {
        return {
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" "),
        };
      }
      return { firstName: nameParts[0], lastName: "" };
    }
    return { firstName: "", lastName: "" };
  };

  const { firstName, lastName } = getPlaceholderName();

  return (
    <ScreenWrapper maxWidth="lg" padding="p-0 md:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`w-full max-w-3xl mx-auto rounded-none md:rounded-xl shadow-lg p-4 md:p-8 transition-colors ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 gap-4">
          <div>
            <motion.h1
              variants={itemVariants}
              className="text-xl md:text-2xl font-bold text-center sm:text-left"
            >
              Complete Your Profile
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className={`mt-1 text-center sm:text-left ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Let's personalize your experience
            </motion.p>
          </div>
          <motion.div
            variants={itemVariants}
            className="cursor-pointer relative"
            onClick={handleAvatarClick}
          >
            <div className="relative">
              <img
                src={profilePic || getAvatarUrl(`${firstName} ${lastName}`)}  
                alt="User Avatar"
                className="h-16 w-16 sm:h-12 sm:w-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-1">
                <Pencil size={12} className="text-white" />
              </div>
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </motion.div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <Formik<FormValues>
          initialValues={{
            firstName: firstName,
            lastName: lastName,
            bio: "",
            country: "",
            gender: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors, setFieldValue }) => (
            <Form className="space-y-6 w-full">
              <motion.div variants={itemVariants} className="space-y-6 w-full">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="relative w-full">
                    <label
                      className={` text-sm font-medium mb-2 flex items-center ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <User size={16} className="mr-2" /> First Name
                    </label>
                    <Field
                      name="firstName"
                      placeholder="Your first name"
                      className={`w-full p-3 rounded-lg text-sm transition-colors ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border border-gray-300 text-gray-800 placeholder-gray-400"
                      }`}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label
                      className={` text-sm font-medium mb-2 flex items-center ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <User size={16} className="mr-2" /> Last Name
                    </label>
                    <Field
                      name="lastName"
                      placeholder="Your last name"
                      className={`w-full p-3 rounded-lg text-sm transition-colors ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border border-gray-300 text-gray-800 placeholder-gray-400"
                      }`}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="relative w-full">
                  <label
                    className={` text-sm font-medium mb-2 flex items-center ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <Pencil size={16} className="mr-2" /> About You
                  </label>
                  <Field
                    name="bio"
                    as="textarea"
                    placeholder="Tell us a bit about yourself..."
                    className={`w-full p-3 rounded-lg text-sm transition-colors ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border border-gray-300 text-gray-800 placeholder-gray-400"
                    }`}
                    rows={3}
                  />
                  {touched.bio && errors.bio && (
                    <div className="text-red-500 text-sm mt-1">{errors.bio}</div>
                  )}
                </div>

                {/* Country */}
                <div className="relative w-full">
                  <label
                    className={`block text-sm font-medium mb-2 flex items-center ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <Globe size={16} className="mr-2" /> Your Country
                  </label>
                  <Field
                    name="country"
                    render={({ field }: any) => (
                      <CountrySelector
                        value={field.value}
                        onChange={(value: string | null) => setFieldValue("country", value || "")}
                        className="text-sm"
                      />
                    )}
                  />
                  {touched.country && errors.country && (
                    <div className="text-red-500 text-sm mt-1">{errors.country}</div>
                  )}
                </div>

                {/* Gender */}
                <div className="relative w-full">
                  <label
                    className={`block text-sm font-medium mb-2 flex items-center ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Gender
                  </label>
                  <Field name="gender">
                    {({ field, form }: any) => (
                      <GenderSelector
                        value={field.value}
                        onChange={(value: string) => setFieldValue("gender", value)}
                      />
                    )}
                  </Field>
                  {touched.gender && errors.gender && (
                    <div className="text-red-500 text-sm mt-1">{errors.gender}</div>
                  )}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2 w-full">
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    isSubmitting || uploading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:shadow-lg transform hover:-translate-y-1"
                  } bg-indigo-600 text-white hover:bg-indigo-700`}
                >
                  {isSubmitting || uploading ? (
                    <span className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </span>
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
