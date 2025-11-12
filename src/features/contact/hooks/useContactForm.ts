import { useState, useEffect } from "react";
import { useToast } from "@components/ui/use-toast";
import { ContactFormValues, FieldErrors, TouchedFields } from "@lib/types";
import { CHAR_LIMITS, API_ENDPOINTS, FORM_SUBMIT_COOLDOWN } from "@lib/constants";
import { getFormErrors, normalizeProjectLink } from "../lib/validation";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  projectName: "",
  projectLink: "",
  stage: "",
  investmentLevel: "",
  whyNow: "",
  biggestChallenges: [],
};

const initialTouched: TouchedFields = {
  name: false,
  email: false,
  projectName: false,
  projectLink: false,
  stage: false,
  investmentLevel: false,
  whyNow: false,
  biggestChallenges: false,
};

export function useContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [touched, setTouched] = useState<TouchedFields>(initialTouched);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    setErrors(getFormErrors(values));
  }, [values]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "biggestChallenges") {
      const checkbox = e.target as HTMLInputElement;
      setValues((prev) => {
        const set = new Set(prev.biggestChallenges);
        if (checkbox.checked) set.add(checkbox.value);
        else set.delete(checkbox.value);
        return { ...prev, biggestChallenges: Array.from(set) };
      });
      setTouched((prev) => ({ ...prev, biggestChallenges: true }));
      return;
    }

    let limitedValue = value;
    if (name in CHAR_LIMITS) {
      const limit = CHAR_LIMITS[name as keyof typeof CHAR_LIMITS];
      if (value.length > limit) {
        limitedValue = value.slice(0, limit);
        toast({
          title: "Character limit reached",
          description: `Maximum ${limit} characters allowed for this field.`,
          variant: "destructive",
        });
      }
    }

    setValues((prev) => ({ ...prev, [name]: limitedValue }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    if (timeSinceLastSubmit < FORM_SUBMIT_COOLDOWN) {
      toast({
        title: "Please wait",
        description: "You're submitting too quickly. Please wait a moment.",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitting) return;

    const currentErrors = getFormErrors(values);
    const hasErrors = Object.keys(currentErrors).length > 0;
    if (hasErrors) {
      setErrors(currentErrors);
      setTouched({
        name: true,
        email: true,
        projectName: true,
        projectLink: true,
        stage: true,
        investmentLevel: true,
        whyNow: true,
        biggestChallenges: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_FORM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          projectName: values.projectName.trim(),
          projectLink: normalizeProjectLink(values.projectLink),
          stage: values.stage,
          biggestChallenges: values.biggestChallenges,
          investmentLevel: values.investmentLevel,
          whyNow: values.whyNow.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "✓ Submission successful!",
          description:
            "Thank you for reaching out! We'll review your information and get back to you soon.",
          duration: 5000,
        });
        setValues(initialValues);
        setTouched(initialTouched);
        setLastSubmitTime(now);
      } else {
        toast({
          title: "Submission failed",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Submission failed",
        description:
          "Unable to connect. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldInvalid = (field: keyof TouchedFields): boolean => {
    return Boolean(touched[field] && errors[field]);
  };

  const fieldError = (field: keyof TouchedFields): string | undefined => {
    return errors[field];
  };

  return {
    values,
    touched,
    errors,
    isSubmitting,
    handleInputChange,
    handleBlur,
    handleSubmit,
    fieldInvalid,
    fieldError,
  };
}

