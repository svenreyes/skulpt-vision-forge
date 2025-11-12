import { ReactNode } from "react";

interface FormFieldProps {
  invalid: boolean;
  error?: string;
  children: ReactNode;
}

export function FormField({ invalid, error, children }: FormFieldProps) {
  return (
    <div className="w-full">
      {children}
      {invalid && error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface BracketInputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  maxLength?: number;
  width: number;
  invalid: boolean;
  isMobile?: boolean;
}

export function BracketInput({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  maxLength,
  width,
  invalid,
  isMobile = false,
}: BracketInputProps) {
  return (
    <div className="group inline-flex items-center max-w-full">
      <span
        className={`${
          invalid
            ? "text-red-500"
            : "text-[#9EA5AD]/90 group-hover:text-white"
        } transition-colors text-2xl`}
      >
        [
      </span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 ${
          isMobile ? "text-sm" : "text-base"
        } tracking-wide inline-block`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        maxLength={maxLength}
        style={{ textTransform: "none", width: `${width}px`, maxWidth: "100%" }}
      />
      <span
        className={`${
          invalid
            ? "text-red-500"
            : "text-[#9EA5AD]/90 group-hover:text-white"
        } transition-colors text-2xl`}
      >
        ]
      </span>
    </div>
  );
}

interface BracketSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  width: number;
  invalid: boolean;
  isMobile?: boolean;
  children: ReactNode;
}

export function BracketSelect({
  id,
  name,
  value,
  onChange,
  onBlur,
  width,
  invalid,
  isMobile = false,
  children,
}: BracketSelectProps) {
  return (
    <div className="group inline-flex items-center max-w-full">
      <span
        className={`${
          invalid
            ? "text-red-500"
            : "text-[#9EA5AD]/90 group-hover:text-white"
        } transition-colors text-2xl`}
      >
        [
      </span>
      <select
        id={id}
        name={name}
        className={`bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 ${
          isMobile ? "text-sm" : "text-base"
        } tracking-wide inline-block whitespace-nowrap appearance-none font-normal`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ width: `${width}px`, fontWeight: 400 }}
        required
      >
        {children}
      </select>
      <span
        className={`${
          invalid
            ? "text-red-500"
            : "text-[#9EA5AD]/90 group-hover:text-white"
        } transition-colors text-2xl`}
      >
        ]
      </span>
    </div>
  );
}

