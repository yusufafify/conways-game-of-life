"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
}

export default function Select({
  options,
  value,
  onChange,
  label,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate open/close of dropdown
    if (open) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10, height: 0 },
        { opacity: 1, y: 0, height: "auto", duration: 0.3, ease: "power2.out" }
      );
      gsap.to(arrowRef.current, {
        rotate: 180,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        height: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(arrowRef.current, {
        rotate: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label || label;

  return (
    <div className="relative inline-block w-full sm:w-40">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={label}
        className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-xl flex justify-between items-center hover:bg-gray-600 transition text-sm md:text-base"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          ref={arrowRef}
          size={20}
          className="text-gray-200 transition"
        />
      </button>

      <div
        ref={dropdownRef}
        className="absolute left-0 right-0 mt-1 bg-gray-800 rounded-xl shadow-lg overflow-hidden z-10"
        style={{ height: 0, opacity: 0, pointerEvents: open ? "auto" : "none" }}
      >
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setOpen(false);
            }}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-700 transition ${
              option.value === value ? "bg-gray-700" : ""
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
