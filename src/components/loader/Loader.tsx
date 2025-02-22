import React from "react";
import { motion, useCycle } from "framer-motion";
import { twMerge } from "tailwind-merge";

const Loader = () => {
  const [animation, cycleAnimation] = useCycle("animation1", "animation2", "animation3");

  const particleVariants = {
    animation1: {
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      },
    },
    animation2: {
      rotate: -360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
    animation3: {
      scale: [1, 1.2, 1],
      rotate: 180,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const coreVariants = {
    animation1: {
      scale: [1, 1.2, 1],
      rotate: 360,
      background: [
        "conic-gradient(#6366f1, #8b5cf6, #ec4899)",
        "conic-gradient(#ec4899, #6366f1, #8b5cf6)",
        "conic-gradient(#8b5cf6, #ec4899, #6366f1)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    animation2: {
      scale: [1, 0.8, 1],
      borderRadius: ["50%", "30%", "50%"],
      background: [
        "radial-gradient(circle, #6366f1, #8b5cf6, #ec4899)",
        "radial-gradient(circle, #ec4899, #6366f1, #8b5cf6)",
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "anticipate",
      },
    },
    animation3: {
      scale: [1, 1.5, 1],
      rotate: [-180, 0, 180],
      background: [
        "linear-gradient(45deg, #6366f1, #ec4899)",
        "linear-gradient(135deg, #8b5cf6, #6366f1)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "backInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center gap-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50">
      <motion.div
        className="relative w-48 h-48 flex justify-center items-center cursor-pointer"
        onClick={() => cycleAnimation()}
      >
        {/* Central Core */}
        <motion.div
          variants={coreVariants}
          animate={animation}
          className={twMerge(
            "w-24 h-24 rounded-full bg-gradient-conic from-indigo-500 via-purple-500 to-pink-500",
            "shadow-2xl shadow-purple-500/30 dark:shadow-purple-500/20"
          )}
        />

        {/* Orbital Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg"
            style={{
              top: `${Math.sin((i * Math.PI) / 3) * 60}px`,
              left: `${Math.cos((i * Math.PI) / 3) * 60}px`,
            }}
            variants={particleVariants}
            animate={animation}
            custom={i}
          />
        ))}

        {/* Nano Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-indigo-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.2, 1, 0.2],
                transition: {
                  duration: 1.5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                },
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Animated Text */}
      <motion.div
        className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [0.95, 1.05, 0.95],
          textShadow: [
            "0 0 10px rgba(99, 102, 241, 0)",
            "0 0 10px rgba(99, 102, 241, 0.3)",
            "0 0 10px rgba(99, 102, 241, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        Assembling Magic...
      </motion.div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.3, 0],
              transition: {
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
