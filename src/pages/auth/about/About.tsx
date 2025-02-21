import React, { useState, useEffect } from "react";
import { Shield, Globe, Users, Zap, Info, Lock, ArrowRight, MessageSquare } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ScreenWrapper from "@components/screen-wrapper";
import { aboutPlaceholder, user1, user2, user3 } from "@assets/img";
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
    <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const AboutPage = () => {
 

  return (
    <ScreenWrapper maxWidth="full" padding="p-0">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                About ChatHub
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                ChatHub is a powerful messaging platform that connects people from all over the
                world. Whether you're talking to friends, family, or coworkers, ChatHub ensures your
                communication is secure, fast, and always reliable.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl transform rotate-2 blur-xl opacity-20"></div>
                <LazyLoadImage
                  src={aboutPlaceholder}
                  alt="ChatHub Overview"
                  effect="blur"
                  className="relative rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Our mission at ChatHub is to revolutionize the way people connect. With a focus on
            speed, security, and user experience, we are dedicated to creating a space where
            individuals and groups can share, collaborate, and communicate without limitations.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Shield, text: "Security First" },
              { icon: Globe, text: "Global Reach" },
              { icon: Users, text: "Community Focused" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 flex-col sm:flex-row">
                <item.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="font-semibold text-xl text-gray-900 dark:text-white">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12">
            Key Features of ChatHub
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "End-to-End Encryption",
                description:
                  "Your conversations are protected with strong encryption to ensure complete privacy.",
              },
              {
                icon: Globe,
                title: "Global Communication",
                description: "Connect with people around the world instantly and securely.",
              },
              {
                icon: Users,
                title: "Group Collaboration",
                description: "Manage and organize multiple group chats with ease.",
              },
              {
                icon: Zap,
                title: "Lightning Fast Messaging",
                description: "Enjoy real-time messaging with no delays, wherever you are.",
              },
              {
                icon: Info,
                title: "Rich Communication",
                description:
                  "Share files, images, and even video clips in a seamless chat experience.",
              },
              {
                icon: Lock,
                title: "Data Privacy",
                description:
                  "We prioritize your data privacy and never share your personal information.",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white w-full dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[user1, user2, user3].map((user, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {/* Image Wrapper with Fixed Size */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-600 dark:border-indigo-400">
                  <LazyLoadImage
                    src={user}
                    alt={`Team Member ${index}`}
                    effect="blur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">John Doe</h3>
                <p className="text-gray-600 dark:text-gray-300">CEO & Founder</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative bg-gradient-to-r from-indigo-700 to-indigo-800 text-white rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Join Us?</h2>
              <p className="text-xl mb-8 text-indigo-200">
                Start communicating securely and instantly. Join millions of users already
                experiencing the power of ChatHub.
              </p>
              <button
                onClick={() => (window.location.href = "/signup")}
                className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2 text-lg"
              >
                Get Started Free <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </ScreenWrapper>
  );
};

export default AboutPage;
