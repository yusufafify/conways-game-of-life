// src/components/Rules.tsx
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // default import

gsap.registerPlugin(ScrollTrigger); // register once at module scope

export default function Rules() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ruleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    // scope all GSAP animations to this section
    const ctx = gsap.context(() => {
      // animate the section title
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

      // animate each rule card in with a stagger
      ruleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 0.8,
          delay: i * 0.2,
          ease: "back.out(1.7)",
        });
      });
    }, sectionRef);

    // set up canvas animation
    let animationId: number;
    let lastUpdate = 0;
    const updateInterval = 300;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx2 = canvas.getContext("2d");
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      const cellSize = 20;
      const cols = Math.floor(canvas.width / cellSize);
      const rows = Math.floor(canvas.height / cellSize);

      // initialize glider in center
      let grid = Array(cols)
        .fill(0)
        .map(() => Array(rows).fill(0));
      const glider = [
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 1],
      ];
      const cx = Math.floor(cols / 2) - 1;
      const cy = Math.floor(rows / 2) - 1;
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) grid[cx + i][cy + j] = glider[i][j];

      const nextGen = () => {
        const next = Array(cols)
          .fill(0)
          .map(() => Array(rows).fill(0));
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const state = grid[i][j];
            let neighbors = 0;
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue;
                const col = (i + x + cols) % cols;
                const row = (j + y + rows) % rows;
                neighbors += grid[col][row];
              }
            }
            if (state === 0 && neighbors === 3) next[i][j] = 1;
            else if (state === 1 && (neighbors < 2 || neighbors > 3))
              next[i][j] = 0;
            else next[i][j] = state;
          }
        }
        grid = next;
      };

      const draw = () => {
        if (!ctx2) return;
        ctx2.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx2.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (grid[i][j] === 1) {
              const x = i * cellSize;
              const y = j * cellSize;
              const grad = ctx2.createRadialGradient(
                x + cellSize / 2,
                y + cellSize / 2,
                0,
                x + cellSize / 2,
                y + cellSize / 2,
                cellSize
              );
              grad.addColorStop(0, "rgba(100, 255, 150, 0.7)");
              grad.addColorStop(1, "rgba(100, 255, 150, 0)");
              ctx2.fillStyle = grad;
              ctx2.fillRect(x, y, cellSize, cellSize);
              ctx2.fillStyle = "rgba(100, 255, 150, 0.7)";
              ctx2.fillRect(
                x + cellSize / 4,
                y + cellSize / 4,
                cellSize / 2,
                cellSize / 2
              );
            }
          }
        }
      };

      const animate = (ts: number) => {
        animationId = requestAnimationFrame(animate);
        if (ts - lastUpdate > updateInterval) {
          nextGen();
          lastUpdate = ts;
        }
        draw();
      };
      animationId = requestAnimationFrame(animate);
    }

    // cleanup on unmount
    return () => {
      ctx.revert(); // kills all GSAP tweens & ScrollTriggers in this section
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rules"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          The Rules of Life
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              title: "Birth",
              color: "text-green-400",
              body: (
                <>
                  A dead cell with exactly <strong>three</strong> live neighbors
                  becomes alive.
                </>
              ),
            },
            {
              title: "Death by Underpopulation",
              color: "text-red-400",
              body: (
                <>
                  A live cell with fewer than <strong>two</strong> live
                  neighbors dies.
                </>
              ),
            },
            {
              title: "Death by Overpopulation",
              color: "text-red-400",
              body: (
                <>
                  A live cell with more than <strong>three</strong> live
                  neighbors dies.
                </>
              ),
            },
            {
              title: "Survival",
              color: "text-blue-400",
              body: (
                <>
                  A live cell with <strong>two or three</strong> live neighbors
                  survives.
                </>
              ),
            },
          ].map((rule, i) => (
            <div
              key={i}
              ref={(el) => {
                ruleRefs.current[i] = el;
              }}
              className="bg-gray-800/80 p-6 shadow-lg border border-gray-700 rounded-2xl backdrop-blur-sm"
            >
              <h3 className={`text-xl font-semibold mb-4 ${rule.color}`}>
                {rule.title}
              </h3>
              <p className="text-gray-300">{rule.body}</p>
            </div>
          ))}
        </div>
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
          <canvas
            ref={canvasRef}
            className="w-full h-full bg-black"
            aria-label="Visualization of Conway's Game of Life rules in action"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <p className="text-center text-sm text-gray-400">
              Watch as patterns evolve according to Conway&apos;s rules
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
