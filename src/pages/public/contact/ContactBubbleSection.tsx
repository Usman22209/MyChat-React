import React, { useEffect, useRef, useCallback, useState } from "react";
import { useTheme } from "@providers/theme-provider/ThemeProvider";
import "@styles/animation.css";

interface Bubble {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  color: string;
}

const ContactBubbleSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrameId = useRef<number>();
  const lastUpdate = useRef<number>(Date.now());
  const [initialized, setInitialized] = useState(false);
  const bubblesRef = useRef<Bubble[]>([]);
  const bubbleElementsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getBubbleColor = useCallback(
    (hue: number) =>
      theme === "light" ? `hsla(${hue}, 70%, 80%, 0.7)` : `hsla(${hue}, 70%, 30%, 0.7)`,
    [theme]
  );

  const spawnBubble = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sides = ["left", "right", "top", "bottom"];
    const side = sides[Math.floor(Math.random() * sides.length)];
    const size = 20 + Math.random() * 30;
    const speed = 3 + Math.random() * 2;
    const hue = Math.random() * 360;
    let x = 0,
      y = 0,
      vx = 0,
      vy = 0;
    switch (side) {
      case "left":
        x = -size;
        y = Math.random() * rect.height;
        vx = speed;
        vy = (Math.random() - 0.5) * speed;
        break;
      case "right":
        x = rect.width + size;
        y = Math.random() * rect.height;
        vx = -speed;
        vy = (Math.random() - 0.5) * speed;
        break;
      case "top":
        x = Math.random() * rect.width;
        y = -size;
        vx = (Math.random() - 0.5) * speed;
        vy = speed;
        break;
      case "bottom":
        x = Math.random() * rect.width;
        y = rect.height + size;
        vx = (Math.random() - 0.5) * speed;
        vy = -speed;
        break;
    }
    const newBubble: Bubble = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      vx,
      vy,
      size,
      hue,
      color: getBubbleColor(hue),
    };
    if (bubblesRef.current.length < 15) {
      bubblesRef.current.push(newBubble);
    }
  }, [getBubbleColor]);

  const updateBubbles = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const now = Date.now();
    const deltaTime = (now - lastUpdate.current) / 16;
    lastUpdate.current = now;
    bubblesRef.current.forEach((bubble) => {
      bubble.x += bubble.vx * deltaTime;
      bubble.y += bubble.vy * deltaTime;
      const bounds = {
        left: -bubble.size * 0.5,
        right: rect.width + bubble.size * 0.5,
        top: -bubble.size * 0.5,
        bottom: rect.height + bubble.size * 0.5,
      };
      if (bubble.x < bounds.left || bubble.x > bounds.right) {
        bubble.vx *= -0.85;
        bubble.x = bubble.x < bounds.left ? bounds.left : bounds.right;
      }
      if (bubble.y < bounds.top || bubble.y > bounds.bottom) {
        bubble.vy *= -0.85;
        bubble.y = bubble.y < bounds.top ? bounds.top : bounds.bottom;
      }
      const el = bubbleElementsRef.current[bubble.id];
      if (el) {
        el.style.transform = `translate(${bubble.x}px, ${bubble.y}px)`;
      }
    });
    animationFrameId.current = requestAnimationFrame(updateBubbles);
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      for (let i = 0; i < 15; i++) {
        spawnBubble();
      }
      setInitialized(true);
      animationFrameId.current = requestAnimationFrame(updateBubbles);
    }
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [spawnBubble, updateBubbles]);

  useEffect(() => {
    bubblesRef.current.forEach((bubble) => {
      bubble.color = getBubbleColor(bubble.hue);
      const el = bubbleElementsRef.current[bubble.id];
      if (el) {
        el.style.backgroundColor = bubble.color;
      }
    });
  }, [theme, getBubbleColor]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-700 to-red-900 opacity-10 animate-gradient-flow" />
      <div className="absolute inset-0">
        {initialized &&
          bubblesRef.current.map((bubble) => (
            <div
              key={bubble.id}
              ref={(el) => (bubbleElementsRef.current[bubble.id] = el)}
              className="absolute rounded-full opacity-70 shadow-lg"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                backgroundColor: bubble.color,
                transform: `translate(${bubble.x}px, ${bubble.y}px)`,
                transition: "transform 0.05s linear",
              }}
            />
          ))}
      </div>
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          We'd love to hear from you! Connect with us through any of the channels below or send us a
          message directly.
        </p>
      </div>
    </section>
  );
};

export default ContactBubbleSection;
