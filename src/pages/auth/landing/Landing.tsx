import React, { useEffect, useRef, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, Globe, Users, Lock, Sparkles, ArrowRight } from "lucide-react";
import Typed from "typed.js";
import ScreenWrapper from "@components/screen-wrapper";
import { landingPlaceholder, logo1, logo2, logo3, logo4 } from "@assets/img";
import "react-lazy-load-image-component/src/effects/blur.css";
import ImageContainer from "./LandingImageContainer";
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="p-6 md:p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer text-center sm:text-left">
    <div className="mx-auto sm:mx-0 rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center mb-4 sm:mb-6">
      <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
    </div>
    <h3 className="text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
      {description}
    </p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const typedElement = useRef(null);

  const handleMount = useCallback(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        'Connect with anyone, ^500 <span class="text-indigo-600 dark:text-indigo-400">anywhere</span>',
        'Connect with friends, ^500 <span class="text-indigo-600 dark:text-indigo-400">instantly</span>',
        'Connect with family, ^500 <span class="text-indigo-600 dark:text-indigo-400">securely</span>',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: "|",
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <ScreenWrapper maxWidth="full" padding="p-0" onMount={handleMount}>
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 text-center sm:text-left">
        <div className="max-w-6xl mx-auto flex flex-col-reverse sm:flex-row items-center gap-12">
          <div className="w-full sm:w-1/2 space-y-6">
            <h1 className="text-3xl h-32 sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              <span ref={typedElement}></span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience real-time messaging like never before. Secure, fast, and beautifully
              designed for seamless communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
              <button
                onClick={() => navigate("/signup")}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Get Started Free <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <img
              src={landingPlaceholder}
              alt="Chat Interface"
              className="rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need in a modern chat app
          </h2>
          <p className="sm:text-lg text-md text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Built with the latest technology to ensure the best messaging experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Real-time messaging with instant delivery.",
              },
              {
                icon: Shield,
                title: "Secure by Default",
                description: "Enterprise-grade encryption for privacy.",
              },
              { icon: Globe, title: "Global Reach", description: "Connect with people worldwide." },
              {
                icon: Users,
                title: "Group Chats",
                description: "Create and manage multiple group chats.",
              },
              {
                icon: Sparkles,
                title: "Rich Features",
                description: "Share files, images, and react with emojis.",
              },
              {
                icon: Lock,
                title: "Privacy First",
                description: "Your data is secure and never shared.",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-4 w-full bg-indigo-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Trusted by millions worldwide</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
            {[logo1, logo2, logo3, logo4].map((image, index) => (
              <ImageContainer key={index} image={image} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-4 sm:py-24">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Glowing Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 sm:opacity-30"></div>

          {/* CTA Content */}
          <div className="relative bg-gradient-to-r from-indigo-700 to-indigo-800 text-white rounded-3xl py-10 sm:py-12 px-6 sm:px-8 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-snug">
              Start chatting with ease
            </h2>
            <p className="text-base sm:text-lg text-indigo-200 max-w-lg sm:max-w-3xl mx-auto mb-6 sm:mb-8">
              Join millions of users who trust our platform for their communication needs. Get
              started for free and experience the difference today.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-indigo-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 text-base sm:text-lg cursor-pointer"
              >
                Get Started Free <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </ScreenWrapper>
  );
};

export default LandingPage;
