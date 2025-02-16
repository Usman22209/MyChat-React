import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, Globe, Users, Lock, Sparkles, ArrowRight } from "lucide-react";
import Typed from "typed.js";
import ScreenWrapper from "@components/screen-wrapper";
import { landingPlaceholder } from "@assets/img";
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center mb-6">
      <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const typedElement = useRef(null);

  useEffect(() => {
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
    <ScreenWrapper maxWidth="full" padding="p-0">
      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="flex flex-col items-start h-36">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  <span ref={typedElement}></span>
                </h1>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Experience real-time messaging like never before. Secure, fast, and beautifully
                designed for seamless communication in today's connected world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Started Free <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 px-8 py-4 rounded-xl font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl transform rotate-2 blur-xl opacity-20"></div>
                <img
                  src={landingPlaceholder}
                  alt="Chat Interface"
                  className="relative rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 w-full bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need in a modern chat app
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with the latest technology to ensure you get the best messaging experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Real-time messaging with instant delivery and response times measured in milliseconds.",
              },
              {
                icon: Shield,
                title: "Secure by Default",
                description:
                  "Enterprise-grade encryption ensures your conversations remain private and protected.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "Connect with people from anywhere in the world with automatic language translation.",
              },
              {
                icon: Users,
                title: "Group Chats",
                description:
                  "Create and manage multiple group conversations with advanced admin controls.",
              },
              {
                icon: Sparkles,
                title: "Rich Features",
                description:
                  "Share files, images, and react with emojis. Support for voice and video calls.",
              },
              {
                icon: Lock,
                title: "Privacy First",
                description:
                  "Your data is yours. We never share or sell it. Complete control over your privacy.",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-4 w-full bg-indigo-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Trusted by millions worldwide</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                <img
                  src={`/logo${index + 1}.jpg`}
                  alt={`Company ${index + 1}`}
                  className="w-full h-12 object-contain filter brightness-0 invert opacity-70"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl transform -rotate-1 blur-xl opacity-20"></div>
            <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl font-bold mb-6">Start chatting today</h2>
              <p className="text-xl mb-8 text-indigo-100 max-w-2xl">
                Join millions of users who trust our platform for their communication needs. Get
                started for free and experience the difference.
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-medium hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-2"
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

export default LandingPage;
