import React, { useState } from "react";
import ScreenWrapper from "@components/screen-wrapper";
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { location } from "@utils/URL";

// Define TypeScript types
interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      toast.error("An error occurred. Please try again.", {
        icon: "⚠️",
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <ScreenWrapper maxWidth="full" padding="p-0">
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-xl mt-4">We’d love to hear from you!</p>
      </section>

      <section className="py-12 w-full px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Mail,
              title: "Email Us",
              desc: "usman39e@gmail.com",
              link: "mailto:usman39e@gmail.com",
            },
            { icon: Phone, title: "Call Us", desc: "+92 3039027501", link: "tel:+923039027501" },
            {
              icon: MapPin,
              title: "Visit Us",
              desc: "Lahore, Punjab Pakistan",
              link: location,
            },
          ].map(({ icon: Icon, title, desc, link }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-indigo-500 transition-all hover:shadow-lg block text-center hover:scale-105"
            >
              <Icon className="h-8 w-8 text-indigo-600 mx-auto" />
              <h3 className="text-xl font-semibold mt-3">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 w-full">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center">Send Us a Message</h2>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {(["name", "email", "message"] as const).map((field, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="font-medium mb-2 capitalize">Your {field}*</label>
                    <Field
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      as={field === "message" ? "textarea" : "input"}
                      rows={field === "message" ? 5 : undefined}
                      className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <ErrorMessage name={field} component="div" className="text-red-600 mt-1" />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer bg-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="h-5 w-5" />
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </ScreenWrapper>
  );
};

export default ContactPage;
