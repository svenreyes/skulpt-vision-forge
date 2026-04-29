// Form validation constants
export const CHAR_LIMITS = {
  name: 100,
  email: 150,
  projectName: 150,
  projectLink: 500,
  whyNow: 1000,
} as const;

export const VALID_CHAR_REGEX = /^[a-zA-Z0-9 .,'-]+$/;

// API endpoints
export const API_ENDPOINTS = {
  CONTACT_FORM: "/api/contact",
} as const;

// Rate limiting
export const FORM_SUBMIT_COOLDOWN = 10000; // 10 seconds

// Form field options
export const STAGE_OPTIONS = [
  { value: "idea", label: "Just an idea" },
  { value: "mvp", label: "MVP launched / early users" },
  { value: "funded", label: "Funded and growing / scaling" },
  { value: "pivoting", label: "Pivoting or repositioning" },
] as const;

export const INVESTMENT_LEVEL_OPTIONS = [
  { value: "high", label: "High: fully ready to invest" },
  { value: "moderate", label: "Moderate: committed but need more information" },
  { value: "light", label: "Light: comparing options before deciding" },
  { value: "later", label: "Later: Not ready to invest" },
] as const;

export const CHALLENGE_OPTIONS = [
  { value: "fundraising", label: "trouble fundraising" },
  { value: "marketing", label: "marketing efforts not paying off" },
  { value: "audience", label: "not connecting with audience" },
  { value: "strategy", label: "no clear strategy- every decision feels new" },
  { value: "identity", label: "outgrown our identity" },
  { value: "alignment", label: "team misalignment" },
] as const;

