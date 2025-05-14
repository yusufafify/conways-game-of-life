import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // ← default import, not named
import { ChevronDown } from "lucide-react";
import PixelTitleAnimation from "./PixelTitleAnimation";

gsap.registerPlugin(ScrollTrigger); // ← register once at module scope

export default function GameOfLifeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // gsap.context will scope selectors and allow automatic cleanup
    const ctx = gsap.context(() => {
      // timeline for heading + sub‐spans
      const tl = gsap.timeline();
      tl.from(titleRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });

      // grab each <span> for stagger
      const lines = gsap.utils.toArray<HTMLElement>(
        subtitleRef.current!.querySelectorAll("span")
      );
      tl.from(
        lines,
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // floating scroll‐hint
      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      });

      // parallax fade
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0.5,
        y: 200,
      });
    }, heroRef);

    // cleanup all animations & triggers on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <GameOfLifeCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
      </div>
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div ref={titleRef} className="w-full flex justify-center mb-6">
          <PixelTitleAnimation
            text="Conway's Game of Life"
            fontSize={70}
            fontFamily="'Inter', sans-serif"
            color="white"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          />
        </div>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
        >
          <span className="inline-block">
            Discover the fascinating world of cellular automata
          </span>{" "}
          <span className="inline-block">
            where simple rules create complex patterns
          </span>{" "}
          <span className="inline-block">and emergent behavior.</span>
        </p>
      </div>
      <div
        ref={scrollRef}
        className="absolute bottom-10 cursor-pointer"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          })
        }
      >
        <ChevronDown className="h-8 w-8 text-white/70" />
        <span className="sr-only">Scroll down</span>
      </div>
    </div>
  );
}

function GameOfLifeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // Game of Life parameters
    const cellSize = 20;
    const cols = Math.ceil(canvas.width / cellSize);
    const rows = Math.ceil(canvas.height / cellSize);

    // Create grid
    let grid = Array(cols)
      .fill(null)
      .map(() => Array(rows).fill(0));

    // Initialize with random cells (sparse)
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = Math.random() > 0.85 ? 1 : 0;
      }
    }

    // Game of Life rules
    const nextGeneration = () => {
      const next = Array(cols)
        .fill(null)
        .map(() => Array(rows).fill(0));

      // Calculate next generation based on Conway's rules
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const state = grid[i][j];

          // Count live neighbors (8 surrounding cells)
          let neighbors = 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (x === 0 && y === 0) continue;

              const col = (i + x + cols) % cols;
              const row = (j + y + rows) % rows;

              neighbors += grid[col][row];
            }
          }

          // Apply Conway's rules
          if (state === 0 && neighbors === 3) {
            next[i][j] = 1; // Birth
          } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0; // Death
          } else {
            next[i][j] = state; // Stasis
          }
        }
      }

      grid = next;
    };

    // Draw the grid
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellSize;
          const y = j * cellSize;

          if (grid[i][j] === 1) {
            // Create a glowing effect for live cells
            const gradient = ctx.createRadialGradient(
              x + cellSize / 2,
              y + cellSize / 2,
              0,
              x + cellSize / 2,
              y + cellSize / 2,
              cellSize
            );
            gradient.addColorStop(0, "rgba(180, 230, 255, 0.6)");
            gradient.addColorStop(1, "rgba(100, 180, 255, 0)");

            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, cellSize, cellSize);

            // Cell core
            ctx.fillStyle = "rgba(180, 230, 255, 0.6)";
            ctx.fillRect(
              x + cellSize / 4,
              y + cellSize / 4,
              cellSize / 2,
              cellSize / 2
            );
          }
        }
      }
    };

    // Animation loop
    let animationId: number;
    let lastUpdate = 0;
    const updateInterval = 150; // ms between generations

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);

      // Update at fixed intervals
      if (timestamp - lastUpdate > updateInterval) {
        nextGeneration();
        lastUpdate = timestamp;
      }

      draw();
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 bg-black"
      aria-hidden="true"
    />
  );
}
