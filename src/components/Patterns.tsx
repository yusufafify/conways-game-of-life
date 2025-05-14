"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, RotateCcw } from "lucide-react";
// Register ScrollTrigger once at module scope
gsap.registerPlugin(ScrollTrigger);

export default function Patterns() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const patternRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // Scope all GSAP animations & ScrollTriggers to this section
    const ctx = gsap.context(() => {
      // Animate section title
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

      // Animate each pattern card
      patternRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const patterns = [
    {
      name: "Blinker",
      description:
        "The simplest oscillator, alternating between horizontal and vertical states.",
      initialState: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
    },
    {
      name: "Glider",
      description:
        "A pattern that moves diagonally across the grid, one of the first patterns discovered.",
      initialState: [
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 1],
      ],
    },
    {
      name: "Toad",
      description: "A period 2 oscillator that appears to hop back and forth.",
      initialState: [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      name: "Beacon",
      description: "An oscillator where two blocks appear to flash on and off.",
      initialState: [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
      ],
    },
    {
      name: "Pulsar",
      description: "A complex period 3 oscillator with high symmetry.",
      initialState: [
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
      ],
    },
    {
      name: "Gosper Glider Gun",
      description:
        "A pattern that produces gliders indefinitely, the first known gun pattern.",
      initialState: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        ],
        [
          1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
          1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1,
          0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
          0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-800 to-gray-900"
      id="patterns"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Famous Patterns
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patterns.map((pattern, index) => (
            <div
              key={pattern.name}
              ref={(el) => {
                patternRefs.current[index] = el;
              }}
              className="bg-gray-800/70 rounded-2xl overflow-hidden shadow-lg border border-gray-700 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
            >
              <PatternSimulation
                name={pattern.name}
                initialState={pattern.initialState}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{pattern.name}</h3>
                <p className="text-gray-300">{pattern.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface PatternSimulationProps {
  name: string;
  initialState: number[][];
}

function PatternSimulation({ name, initialState }: PatternSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Calculate cell size based on the pattern dimensions and canvas size
    const patternWidth = initialState[0].length;
    const patternHeight = initialState.length;

    const cellSize = Math.min(
      Math.floor(canvas.width / (patternWidth + 4)),
      Math.floor(canvas.height / (patternHeight + 4))
    );

    // Calculate grid dimensions
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);

    // Create grid
    let grid = Array(cols)
      .fill(null)
      .map(() => Array(rows).fill(0));

    // Center the pattern in the grid
    const startX = Math.floor((cols - patternWidth) / 2);
    const startY = Math.floor((rows - patternHeight) / 2);

    // Initialize with the pattern
    for (let i = 0; i < patternHeight; i++) {
      for (let j = 0; j < patternWidth; j++) {
        if (startX + j < cols && startY + i < rows) {
          grid[startX + j][startY + i] = initialState[i][j];
        }
      }
    }

    // Function to reset the grid to initial state
    const resetGrid = () => {
      grid = Array(cols)
        .fill(null)
        .map(() => Array(rows).fill(0));

      for (let i = 0; i < patternHeight; i++) {
        for (let j = 0; j < patternWidth; j++) {
          if (startX + j < cols && startY + i < rows) {
            grid[startX + j][startY + i] = initialState[i][j];
          }
        }
      }
    };

    // Game of Life rules
    const nextGeneration = () => {
      const next = Array(cols)
        .fill(null)
        .map(() => Array(rows).fill(0));

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const state = grid[i][j];

          // Count live neighbors
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
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
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
              cellSize / 1.5
            );

            // Different colors for different patterns
            let color1, color2;
            switch (name) {
              case "Blinker":
                color1 = "rgba(255, 150, 150, 0.7)";
                color2 = "rgba(255, 150, 150, 0)";
                break;
              case "Glider":
                color1 = "rgba(150, 255, 150, 0.7)";
                color2 = "rgba(150, 255, 150, 0)";
                break;
              case "Toad":
                color1 = "rgba(150, 180, 255, 0.7)";
                color2 = "rgba(150, 180, 255, 0)";
                break;
              case "Beacon":
                color1 = "rgba(255, 255, 150, 0.7)";
                color2 = "rgba(255, 255, 150, 0)";
                break;
              case "Pulsar":
                color1 = "rgba(255, 150, 255, 0.7)";
                color2 = "rgba(255, 150, 255, 0)";
                break;
              default:
                color1 = "rgba(150, 255, 255, 0.7)";
                color2 = "rgba(150, 255, 255, 0)";
            }

            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);

            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, cellSize, cellSize);

            // Cell core
            ctx.fillStyle = color1;
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
    const updateInterval = 200; // ms between generations

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);

      // Update at fixed intervals if playing
      if (isPlaying && timestamp - lastUpdate > updateInterval) {
        nextGeneration();
        lastUpdate = timestamp;
      }

      draw();
    };

    animationId = requestAnimationFrame(animate);

    // Expose functions to window for button controls
    const windowWithControls = window as unknown as Window & {
      [key: string]: (() => void) | undefined;
    };
    windowWithControls[`reset${name.replace(/\s+/g, "")}`] = resetGrid;
    windowWithControls[`toggle${name.replace(/\s+/g, "")}`] = () => {
      setIsPlaying(!isPlaying);
    };

    return () => {
      cancelAnimationFrame(animationId);
      delete windowWithControls[`reset${name.replace(/\s+/g, "")}`];
      delete windowWithControls[`toggle${name.replace(/\s+/g, "")}`];
    };
  }, [initialState, name, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    const windowWithControls = window as unknown as Window & {
      [key: string]: (() => void) | undefined;
    };
    windowWithControls[`toggle${name.replace(/\s+/g, "")}`]?.();
  };

  const handleReset = () => {
    const windowWithControls = window as unknown as Window & {
      [key: string]: (() => void) | undefined;
    };
    windowWithControls[`reset${name.replace(/\s+/g, "")}`]?.();
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-48 bg-black"
        aria-label={`Simulation of the ${name} pattern in Conway's Game of Life`}
      />
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button
          onClick={handlePlayPause}
          className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={handleReset}
          className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          aria-label="Reset simulation"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
