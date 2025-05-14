"use client";

import { useEffect, useRef } from "react";
import { useWindowSize } from "@/hooks/use-window-size";

interface PixelTitleAnimationProps {
  text: string;
  className?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  onAnimationComplete?: () => void;
}

export default function PixelTitleAnimation({
  text,
  className = "",
  fontSize = 60,
  fontFamily = "sans-serif",
  color = "white",
  backgroundColor = "transparent",
  onAnimationComplete,
}: PixelTitleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();
  const pixelSize = 2; // Size of each "pixel" in our animation
  const animationSpeed = 2000; // Pixels to process per second

  // Responsive font size calculation
  const calculateFontSize = () => {
    if (!windowSize.width) return fontSize;

    if (windowSize.width < 430) {
      return fontSize * 0.4; // Mobile
    } else if (windowSize.width < 640) {
      return fontSize * 0.5; // Mobile
    } else if (windowSize.width < 1024) {
      return fontSize * 0.75; // Tablet
    }
    return fontSize; // Desktop
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !windowSize.width) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas dimensions based on window size
    const responsiveFontSize = calculateFontSize();
    const canvasWidth = Math.min(windowSize.width * 0.9, 1200);
    const canvasHeight = responsiveFontSize * 1.5;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text to get pixel data
    ctx.fillStyle = color;
    ctx.font = `bold ${responsiveFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Measure text to center it
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // Draw text (invisible initially)
    ctx.fillText(text, x, y);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Clear canvas again for animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create array of pixel positions where text exists
    const textPixels: { x: number; y: number; alpha: number }[] = [];

    for (let y = 0; y < canvas.height; y += pixelSize) {
      for (let x = 0; x < canvas.width; x += pixelSize) {
        const index = (y * canvas.width + x) * 4;
        const alpha = pixels[index + 3]; // Alpha channel

        if (alpha > 0) {
          textPixels.push({ x, y, alpha });
        }
      }
    }

    // Shuffle array for more organic animation
    textPixels.sort(() => Math.random() - 0.5);

    // Animation variables
    let pixelsDrawn = 0;
    let lastTimestamp = 0;
    const totalPixels = textPixels.length;

    // Animation function
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Calculate how many pixels to draw in this frame
      const pixelsToDrawThisFrame = Math.ceil(
        (animationSpeed * elapsed) / 1000
      );
      let newPixelsDrawn = 0;

      // Draw new pixels
      ctx.fillStyle = color;

      for (
        let i = 0;
        i < pixelsToDrawThisFrame && pixelsDrawn + i < totalPixels;
        i++
      ) {
        const pixel = textPixels[pixelsDrawn + i];
        const alpha = pixel.alpha / 255;

        ctx.globalAlpha = alpha;
        ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
        newPixelsDrawn++;
      }

      pixelsDrawn += newPixelsDrawn;

      // Continue animation if not complete
      if (pixelsDrawn < totalPixels) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        onAnimationComplete?.();

        // Redraw the text clearly at the end for crisp appearance
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = color;
        ctx.font = `bold ${responsiveFontSize}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x, y);
      }
    };

    // Start animation
    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      // Nothing to clean up for this animation
    };
  }, [
    text,
    fontSize,
    fontFamily,
    color,
    backgroundColor,
    windowSize,
    onAnimationComplete,
    pixelSize,
    animationSpeed,
  ]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="mx-auto" aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
