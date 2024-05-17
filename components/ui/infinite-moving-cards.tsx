import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  shadowOnHover = true,
  className,
}: {
  items: { avatar: string; name: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  shadowOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const fadeOverlayLeftRef = useRef<HTMLDivElement>(null);
  const fadeOverlayRightRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
    const handleResize = () => addAnimation();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      let duration = 30; // Adjusted for smoother animation
      if (speed === "fast") duration = 20;
      else if (speed === "slow") duration = 40;
      containerRef.current.style.setProperty(
        "--animation-duration",
        `${duration}s`
      );
    }
  };

  const handleScroll = () => {
    // Adjust fade overlay opacity based on scroll position
    if (
      fadeOverlayLeftRef.current &&
      fadeOverlayRightRef.current &&
      scrollerRef.current
    ) {
      const scrollWidth = scrollerRef.current.scrollWidth;
      const scrollLeft = scrollerRef.current.scrollLeft;
      const containerWidth = scrollerRef.current.clientWidth;

      const opacityLeft = Math.min(1, scrollLeft / (containerWidth * 0.2)); // Adjust fade start position
      const opacityRight = Math.min(
        1,
        (scrollWidth - scrollLeft - containerWidth) / (containerWidth * 0.2)
      ); // Adjust fade end position

      fadeOverlayLeftRef.current.style.opacity = `${opacityLeft}`;
      fadeOverlayRightRef.current.style.opacity = `${opacityRight}`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "infinite-moving-cards relative overflow-hidden",
        className
      )}
    >
      <div ref={fadeOverlayLeftRef} className="fade-overlay left" />
      <div ref={fadeOverlayRightRef} className="fade-overlay right" />
      <ul
        ref={scrollerRef}
        className={cn(
          "card-list flex gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "pause-on-hover"
        )}
        onScroll={handleScroll}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "card relative rounded-lg overflow-hidden flex-shrink-0 transition duration-300 ease-in-out transform",
              shadowOnHover && "hover:shadow-lg", // Add shadow on hover if enabled
              pauseOnHover && "hover:scale-105", // Pause animation on hover if enabled
              "border border-gray-200",
              "", // Add a background color
              "", // Change background color on hover
              "hover:rotate-3" // Rotate the card slightly on hover
            )}
            key={item.name}
          >
            <div className="card-content p-4">
              <div className="avatar-container w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-md mx-auto mb-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="avatar w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <div className="gradient-overlay absolute inset-0 rounded-full pointer-events-none"></div>
              </div>
              <span className="text-lg font-semibold text-center">
                {item.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
