import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, UploadCloud } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ScreenWrapper from "@components/screen-wrapper";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .required("Username is required"),
  country: Yup.string().trim().required("Country is required"),
  bio: Yup.string().trim().required("Bio is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(0, "Invalid age"),
  avatar: Yup.mixed().required("Profile image is required"),
});

const AdditionalInfo: React.FC = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      country: "",
      bio: "",
      age: "",
      avatar: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      // Here you can send a request to your backend API to update the profile.
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      formik.setFieldValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <ScreenWrapper maxWidth="full" padding="p-0">
        <section className="pt-16 pb-20 px-6 text-center sm:text-left">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Complete Your Profile
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Add a profile picture and details to personalize your experience.
            </p>
            <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-6">
              <label className="flex justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="w-28 h-28 flex flex-col items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden shadow-lg">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <UploadCloud className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-xs text-gray-700 dark:text-gray-300">Upload</span>
                    </div>
                  )}
                </div>
              </label>
              {formik.touched.avatar && formik.errors.avatar && (
                <p className="text-red-500 text-sm">{formik.errors.avatar}</p>
              )}
              <input
                type="text"
                placeholder="Username"
                {...formik.getFieldProps("username")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
              <input
                type="text"
                placeholder="Country"
                {...formik.getFieldProps("country")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900"
              />
              {formik.touched.country && formik.errors.country && (
                <p className="text-red-500 text-sm">{formik.errors.country}</p>
              )}
              <input
                type="number"
                placeholder="Age"
                {...formik.getFieldProps("age")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900"
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-sm">{formik.errors.age}</p>
              )}
              <textarea
                placeholder="Bio"
                {...formik.getFieldProps("bio")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 resize-none h-24"
              />
              {formik.touched.bio && formik.errors.bio && (
                <p className="text-red-500 text-sm">{formik.errors.bio}</p>
              )}
              <button
                type="submit"
                className="bg-indigo-600 justify-center text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                Save & Continue <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </section>
      </ScreenWrapper>
    </>
  );
};

export default AdditionalInfo;
