// src/components/Introduction.tsx
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // default import

gsap.registerPlugin(ScrollTrigger); // once at module scope

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    // scope all GSAP calls to this section and auto-cleanup
    const ctx = gsap.context(() => {
      // title fade-up on scroll
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      });

      // paragraphs stagger in
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className="py-10 px-4 md:px-8 max-w-4xl mx-auto bg-gradient-to-b from-black to-gray-900"
    >
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-white"
      >
        What is Conway&apos;s Game of Life?
      </h2>
      <div className="space-y-6 text-lg text-gray-200">
        <p
          ref={(el) => {
            textRefs.current[0] = el;
          }}
        >
          The Game of Life is a cellular automaton devised by mathematician John
          Conway in 1970. Despite its simplicity, it demonstrates how complex
          patterns can emerge from very simple rules.
        </p>
        <p
          ref={(el) => {
            textRefs.current[1] = el;
          }}
        >
          It takes place on an infinite two-dimensional grid of cells, where
          each cell can be either alive or dead. The game evolves in discrete
          time steps, where the state of each cell changes based on its
          neighboring cells.
        </p>
        <p
          ref={(el) => {
            textRefs.current[2] = el;
          }}
        >
          What makes the Game of Life fascinating is that it is Turing complete,
          meaning it can simulate any computer algorithm. From simple patterns
          like "blinkers" and "gliders" to complex structures like "glider guns"
          and "spaceships," the Game of Life demonstrates how complexity can
          emerge from simplicity.
        </p>
      </div>
    </section>
  );
}
