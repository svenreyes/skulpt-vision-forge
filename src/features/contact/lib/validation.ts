import { ContactFormValues, FieldErrors } from "@lib/types";
import { VALID_CHAR_REGEX } from "@lib/constants";

export const validateNameLike = (text: string): string | undefined => {
  if (!text) return "Required";
  if (!VALID_CHAR_REGEX.test(text)) return "Only letters, numbers, spaces, and .,'-";
  return undefined;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateProjectLink = (link: string): string | undefined => {
  if (!link) return "Required";
  const domainRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}([:/][^\s]*)?$/i;
  if (!domainRegex.test(link.trim())) {
    return "Enter a valid domain or URL (e.g., example.com)";
  }
  return undefined;
};

export const getFormErrors = (values: ContactFormValues): FieldErrors => {
  const errors: FieldErrors = {};

  const nameErr = validateNameLike(values.name);
  if (nameErr) errors.name = nameErr;

  if (!values.email) {
    errors.email = "Required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Enter a valid email address";
  }

  const projectNameErr = validateNameLike(values.projectName);
  if (projectNameErr) errors.projectName = projectNameErr;

  const projectLinkErr = validateProjectLink(values.projectLink);
  if (projectLinkErr) errors.projectLink = projectLinkErr;

  if (!values.stage) errors.stage = "Required";
  if (!values.investmentLevel) errors.investmentLevel = "Required";
  if (!values.whyNow) errors.whyNow = "Required";
  if (values.biggestChallenges.length === 0) {
    errors.biggestChallenges = "Select at least one challenge";
  }

  return errors;
};

export const normalizeProjectLink = (link: string): string => {
  const trimmed = link.trim();
  return /^(https?:\/\/)/i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

