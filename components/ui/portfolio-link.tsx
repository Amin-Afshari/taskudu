"use client";

import { useRef, useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-geist-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});
type PortfolioLinkProps = {
  name?: string;
  className?: string;
  href?: string;
};

const PortfolioLink: React.FC<PortfolioLinkProps> = ({
  name = "Amin Afshari",
  className = "",
  href = "https://aminafshari.vercel.app/",
}) => {
  const [displayText, setDisplayText] = useState<string[]>(name.split(""));
  const intervalsRef = useRef<(NodeJS.Timeout | null)[]>([]);
  const hoverCooldownRef = useRef<Record<number, boolean>>({});

  const alphabets =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const getRandomChar = () =>
    alphabets[Math.floor(Math.random() * alphabets.length)];

  const animateChar = (index: number, finalChar: string) => {
    // clear any previous interval for this index
    if (intervalsRef.current[index]) clearInterval(intervalsRef.current[index]);
    const iterationsLimit = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
    let iterations = 0;
    const interval = setInterval(() => {
      if (iterations < iterationsLimit) {
        setDisplayText((prev) => {
          const chars = [...prev];
          chars[index] = getRandomChar();
          return chars;
        });
        iterations++;
      } else {
        clearInterval(interval);
        setDisplayText((prev) => {
          const chars = [...prev];
          chars[index] = finalChar;
          return chars;
        });
      }
    }, 150);

    intervalsRef.current[index] = interval;
  };

  const handleHover = (index: number, finalChar: string) => {
    // Prevent repeated triggers within 500ms
    if (hoverCooldownRef.current[index]) return;

    hoverCooldownRef.current[index] = true;
    animateChar(index, finalChar);

    // Reset cooldown after delay
    setTimeout(() => {
      hoverCooldownRef.current[index] = false;
    }, 500);
  };

  useEffect(() => {
    const autoInterval = setInterval(() => {
      const total = name.length;
      const count = Math.floor(Math.random() * (8 - 3 + 1)) + 3; // 3 or 4
      const indices = new Set<number>();
      while (indices.size < count) {
        indices.add(Math.floor(Math.random() * total));
      }
      Array.from(indices).forEach((idx, i) => {
        setTimeout(() => {
          animateChar(idx, name[idx]);
        }, i * 150); // stagger delay: 100ms between each
      });
    }, 8000);

    return () => clearInterval(autoInterval);
  }, [name]);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <div
        dir="ltr"
        className={cn(
          inter.className,
          className,
          "cursor-pointer text-foreground font-medium flex items-center"
        )}
      >
        <span className="inline-block text-center ">
          {displayText.map((char, index) => {
            const finalChar = name[index];
            return (
              <span
                key={index}
                onMouseEnter={() => handleHover(index, finalChar)}
                className="character inline-block w-2.5 text-center"
              >
                {char}
              </span>
            );
          })}
        </span>
      </div>
    </a>
  );
};

export default PortfolioLink;
