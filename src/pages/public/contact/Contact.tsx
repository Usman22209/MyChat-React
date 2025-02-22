import React, { useState } from "react";
import ScreenWrapper from "@components/screen-wrapper";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  XCircle,
  Navigation2,
  Plus,
  Minus,
} from "lucide-react";
import toast from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { location } from "@utils/URL";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

import ContactBubbleSection from "./ContactBubbleSection";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useTheme();
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [showLocationDetails, setShowLocationDetails] = useState<boolean>(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mrgndnbn", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully!", {
          icon: <CheckCircle className="h-5 w-5 text-white" />,
          style: {
            borderRadius: "8px",
            background: "#4caf50",
            color: "#fff",
          },
        });
        resetForm();
      } else {
        toast.error("Error sending message. Please try again.", {
          icon: <XCircle className="h-5 w-5 text-white" />,
          style: {
            borderRadius: "8px",
            background: "#f44336",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.", {
        icon: "⚠️",
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const LocationCard = () => (
    <div className="absolute bottom-8 left-8 w-72 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 z-10 dark:bg-gray-800/90">
      <div className="p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
          <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          The Paradise Academy
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Lahore, Punjab, Pakistan</p>
        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>• 5 minutes from Metro Station</p>
          <p>• Near City Center Mall</p>
          <p>• 24/7 Accessible</p>
        </div>
        <button
          onClick={() => window.open(location, "_blank")}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
        >
          <Navigation2 className="h-4 w-4" />
          Get Directions
        </button>
      </div>
    </div>
  );

  return (
    <ScreenWrapper maxWidth="full" padding="p-0">
      {/* Hero Section */}
      <ContactBubbleSection />

      {/* Contact Cards */}
      <section className="py-12 w-full px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Mail,
              title: "Email Us",
              desc: "usman39e@gmail.com",
              link: "mailto:usman39e@gmail.com",
              gradient: "from-indigo-500 to-indigo-700",
            },
            {
              icon: Phone,
              title: "Call Us",
              desc: "+92 3039027501",
              link: "tel:+923039027501",
              gradient: "from-indigo-600 to-purple-600",
            },
            {
              icon: MapPin,
              title: "Visit Us",
              desc: "Lahore, Punjab Pakistan",
              link: location,
              gradient: "from-purple-500 to-indigo-600",
            },
          ].map(({ icon: Icon, title, desc, link, gradient }, i) => (
            <div
              key={i}
              className="group relative h-48 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open(link, "_blank")}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity`}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <Icon className="h-12 w-12 mb-4 transform group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm opacity-90">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full relative my-12 px-6">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-xl opacity-20" />

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={() => setMapZoom((prev) => Math.min(prev + 0.2, 2))}
              className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Plus className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </button>
            <button
              onClick={() => setMapZoom((prev) => Math.max(prev - 0.2, 1))}
              className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Minus className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </button>
          </div>

          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={() => setShowLocationDetails(!showLocationDetails)}
              className="px-4 py-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-900 dark:text-white">Location Details</span>
            </button>
          </div>

          {showLocationDetails && <LocationCard />}

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6812.840565765681!2d74.3610729302026!3d31.37497296732904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919a9dafbaed517%3A0x27f99406ca72130!2sThe%20Paradise%20Academy!5e0!3m2!1sen!2s!4v1740226785713!5m2!1sen!2s"
            className="w-full h-[450px] rounded-xl shadow-2xl transform transition-all duration-300"
            style={{
              border: 0,
              transform: `scale(${mapZoom})`,
              transition: "transform 0.3s ease-in-out",
              filter: theme === "dark" ? "brightness(0.9) contrast(1.25)" : undefined,
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 sm:py-24 min-w-[98vw] sm:min-w-[40vw]">
        <div className="w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20" />
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Send Us a Message
            </h2>
            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {(["name", "email", "message"] as const).map((field, i) => (
                    <div key={i} className="flex flex-col">
                      <label className="font-medium mb-2 capitalize text-gray-900 dark:text-white">
                        Your {field}*
                      </label>
                      <Field
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        as={field === "message" ? "textarea" : "input"}
                        rows={field === "message" ? 5 : undefined}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <ErrorMessage name={field} component="div" className="text-red-600 mt-1" />
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"} <Send className="h-5 w-5" />
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </ScreenWrapper>
  );
};

export default ContactPage;
