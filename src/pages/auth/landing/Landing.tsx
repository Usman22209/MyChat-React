import React, { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageSquare, Send, Smile, Paperclip, Image, User } from "lucide-react";
import Typed from "typed.js";
import ScreenWrapper from "@components/screen-wrapper";
import { landingPlaceholder, logo1, logo2, logo3, logo4 } from "@assets/img";
import "react-lazy-load-image-component/src/effects/blur.css";
import FeatureCard from "@components/feature-card";
import { LandingFeatures } from "@constants/Landing.constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HoverButton from "@components/hover-button/HoverButton";
import HoverbuttonPrimary from "@components/hover-button/HoverButtonPrimary";
import { sampleMessages } from "@constants/chat.constant";


const LandingPage: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };
  const arrowRef = useRef(null);
  const isInView = useInView(arrowRef, { once: true, margin: "-100px" });
  const typedElement = useRef<HTMLSpanElement>(null);
  const [message, setMessage] = useState("");
  const [demoMessages, setDemoMessages] = useState(sampleMessages);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: demoMessages.length + 1,
      sender: "You",
      content: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    };

    setDemoMessages([...demoMessages, newMessage]);
    setMessage("");

    // Simulate response after a delay
    setTimeout(() => {
      const responseMessage = {
        id: demoMessages.length + 2,
        sender: "Sarah",
        content: "That sounds great! Can't wait to see you!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isUser: false,
      };
      setDemoMessages((prev) => [...prev, responseMessage]);

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 1000);
  };

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

      {/* Interactive Chat Demo Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Experience the Chat in Action
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Try our interactive demo and see how our chat app works in real-time. Type a message
              and watch the magic happen.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Chat Demo Interface */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-md mx-auto">
                {/* Chat Header */}
                <div className="bg-indigo-600 dark:bg-indigo-700 p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center mr-3">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Sarah Johnson</h3>
                    <p className="text-indigo-200 text-sm">Online</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div
                  ref={chatContainerRef}
                  className="p-4 h-80 overflow-y-auto bg-gray-50 dark:bg-gray-900"
                >
                  {demoMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-3/4 rounded-2xl p-3 ${
                          msg.isUser
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${msg.isUser ? "text-indigo-200" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center">
                  <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Smile size={20} />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Paperclip size={20} />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Image size={20} />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 mx-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Feature Description */}
            <motion.div
              className="w-full lg:w-1/2 space-y-6 text-left mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Rich, intuitive messaging experience
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our chat interface is designed with usability in mind, making it easy to stay
                connected with friends, family, and colleagues.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                      Real-time messaging
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Messages are delivered instantly with typing indicators and read receipts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                    <Paperclip className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                      Rich media sharing
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Share photos, videos, documents, and more with just a few clicks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                    <Smile className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                      Expressive communication
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Express yourself with emojis, reactions, and GIFs that bring conversations to
                      life.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <HoverbuttonPrimary text="Try It Now" onClick={handleSignup} />
              </div>
            </motion.div>
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
                <span className="flex items-center mx-auto gap-2">
                  Get Started Free
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
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
