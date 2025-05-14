"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

// Register ScrollTrigger once at module scope
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-12 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto flex flex-col items-center space-y-6 text-gray-300"
      >
        <h2 className="text-2xl font-bold text-white">
          Conway&apos;s Game of Life
        </h2>

        <p className="text-center max-w-2xl">
          The Game of Life is a cellular automaton devised by the British
          mathematician John Horton Conway in 1970. It is a zero-player game,
          meaning its evolution is determined solely by its initial state.
        </p>

        <nav className="flex gap-6">
          <a
            href="#introduction"
            className="hover:text-white transition-colors"
          >
            Introduction
          </a>
          <a href="#rules" className="hover:text-white transition-colors">
            Rules
          </a>
          <a href="#patterns" className="hover:text-white transition-colors">
            Patterns
          </a>
          <Link to="/simulation" className="hover:text-white transition-colors">
            Game
          </Link>
        </nav>

        <div className="flex gap-4">
          <a
            href="https://github.com/yusufafify"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/youssef-afify-aa458b2b2"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
