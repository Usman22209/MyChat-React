import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Typed from "typed.js";
import ScreenWrapper from "@components/screen-wrapper";
import { landingPlaceholder, logo1, logo2, logo3, logo4 } from "@assets/img";
import "react-lazy-load-image-component/src/effects/blur.css";
import ImageContainer from "./LandingImageContainer";
import FeatureCard from "@components/feature-card";
import { LandingFeatures } from "@constants/Landing.constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HoverButton from "@components/hover-button/HoverButton";
import { getAvatarUrl } from "@helper/image.helper";
import HoverbuttonPrimary from "@components/hover-button/HoverButtonPrimary";
const logos = [logo1, logo2, logo3, logo4];

const LandingPage: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };
  const arrowRef = useRef(null);
  const isInView = useInView(arrowRef, { once: true, margin: "-100px" });
  const typedElement = useRef<HTMLSpanElement>(null);

  const handleMount = useCallback(() => {
    if (!typedElement.current) return;
    const typed = new Typed(typedElement.current, {
      strings: [
        'Connect with<br/> anyone, ^500 <span class="text-indigo-600 dark:text-indigo-400">anywhere</span>',
        'Connect with <br/>friends, ^500 <span class="text-indigo-600 dark:text-indigo-400">instantly</span>',
        'Connect with <br/> family, ^500 <span class="text-indigo-600 dark:text-indigo-400">securely</span>',
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

  const handleSignup = useCallback(() => navigate("/auth/signup"), [navigate]);
  const handleLearnMore = useCallback(() => navigate("/about"), [navigate]);

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
              <HoverbuttonPrimary text="Get Started" onClick={handleSignup} />
              <HoverButton onClick={handleLearnMore} text="Learn More" />
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <LazyLoadImage
              src={landingPlaceholder}
              effect="blur"
              alt="Chat Interface"
              className="rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 w-full bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need in a modern chat app
          </h2>
          <p className="sm:text-lg text-md text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Built with the latest technology to ensure the best messaging experience.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={featureVariants}
          >
            {LandingFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted Logos Section */}
      <section className="py-24 px-4 w-full bg-indigo-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Trusted by millions worldwide</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
            {logos.map((image, index) => (
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
                onClick={handleSignup}
                className="bg-white flex w-full sm:w-auto justify-center text-indigo-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 items-center gap-2 text-base sm:text-lg cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  Get Started Free
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }} // Ensures animation runs only once per scroll
                  >
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </ScreenWrapper>
  );
});

export default LandingPage;
