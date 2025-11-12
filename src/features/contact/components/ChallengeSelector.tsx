import { useRef, useEffect } from "react";
import { CHALLENGE_OPTIONS } from "@lib/constants";
import uncheckedUrl from "@assets/unchecked.svg";
import checkedUrl from "@assets/checked.svg";

interface ChallengeSelectorProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedChallenges: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  width: number;
  invalid: boolean;
  isMobile?: boolean;
}

export function ChallengeSelector({
  isOpen,
  setIsOpen,
  selectedChallenges,
  onChange,
  onBlur,
  width,
  invalid,
  isMobile = false,
}: ChallengeSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideContainer = containerRef.current?.contains(target) ?? false;
      const insideDropdown = dropdownRef.current?.contains(target) ?? false;
      if (!insideContainer && !insideDropdown) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, [setIsOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={onBlur}
        className={`bg-transparent border-0 text-[#9EA5AD]/60 focus:outline-none px-1.5 ${
          isMobile ? "text-sm" : "text-base"
        } tracking-wide inline-block whitespace-nowrap appearance-none cursor-pointer font-body font-normal text-left`}
        style={{ width: `${width}px` }}
      >
        {selectedChallenges.length === 0
          ? "BIGGEST CHALLENGE"
          : `${selectedChallenges.length} SELECTED`}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute top-full left-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50 ${
            isMobile ? "min-w-[280px]" : "min-w-[320px]"
          } p-3`}
        >
          <div
            className={`flex flex-col gap-2 ${isMobile ? "text-sm" : "text-base"}`}
          >
            {CHALLENGE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="inline-flex items-center gap-3 cursor-pointer select-none hover:bg-white/10 p-2 rounded"
              >
                <input
                  className="sr-only"
                  type="checkbox"
                  name="biggestChallenges"
                  value={option.value}
                  onChange={onChange}
                  checked={selectedChallenges.includes(option.value)}
                />
                <img
                  src={
                    selectedChallenges.includes(option.value)
                      ? checkedUrl
                      : uncheckedUrl
                  }
                  alt=""
                  className="h-5 w-5"
                />
                <span className="text-[#9EA5AD]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

