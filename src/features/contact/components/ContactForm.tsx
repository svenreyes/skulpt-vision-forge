import { useState } from "react";
import { CHAR_LIMITS, STAGE_OPTIONS, INVESTMENT_LEVEL_OPTIONS } from "@lib/constants";
import { useContactForm } from "../hooks";
import { BRACKET_WIDTH_MOBILE_PX, BRACKET_WIDTH_DESKTOP_PX, createWidthCalculators } from "../lib";
import { FormField, BracketInput, BracketSelect } from "./FormField";
import { ChallengeSelector } from "./ChallengeSelector";

interface ContactFormProps {
  isMobile?: boolean;
}

export function ContactForm({ isMobile = false }: ContactFormProps) {
  const {
    values,
    isSubmitting,
    handleInputChange,
    handleBlur,
    handleSubmit,
    fieldInvalid,
    fieldError,
  } = useContactForm();

  const [isChallengesOpen, setIsChallengesOpen] = useState(false);

  const widthCalc = createWidthCalculators(!isMobile);
  const bracketWidth = isMobile ? BRACKET_WIDTH_MOBILE_PX : BRACKET_WIDTH_DESKTOP_PX;

  return (
    <form
      id="contactForm"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full max-w-md md:max-w-[420px]"
    >
      {/* NAME */}
      <FormField invalid={fieldInvalid("name")} error={fieldError("name")}>
        <BracketInput
          id="name"
          name="name"
          type="text"
          placeholder="NAME"
          value={values.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          maxLength={CHAR_LIMITS.name}
          width={widthCalc.name(values.name)}
          invalid={fieldInvalid("name")}
          isMobile={isMobile}
        />
      </FormField>

      {/* EMAIL */}
      <FormField invalid={fieldInvalid("email")} error={fieldError("email")}>
        <BracketInput
          id="email"
          name="email"
          type="email"
          placeholder="EMAIL"
          value={values.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          maxLength={CHAR_LIMITS.email}
          width={widthCalc.email(values.email)}
          invalid={fieldInvalid("email")}
          isMobile={isMobile}
        />
      </FormField>

      {/* PROJECT NAME */}
      <FormField invalid={fieldInvalid("projectName")} error={fieldError("projectName")}>
        <BracketInput
          id="projectName"
          name="projectName"
          type="text"
          placeholder="PROJECT NAME"
          value={values.projectName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          maxLength={CHAR_LIMITS.projectName}
          width={widthCalc.projectName(values.projectName)}
          invalid={fieldInvalid("projectName")}
          isMobile={isMobile}
        />
      </FormField>

      {/* PROJECT LINK */}
      <FormField invalid={fieldInvalid("projectLink")} error={fieldError("projectLink")}>
        <BracketInput
          id="projectLink"
          name="projectLink"
          type="text"
          placeholder="URL OR DOMAIN "
          value={values.projectLink}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          maxLength={CHAR_LIMITS.projectLink}
          width={widthCalc.projectLink(values.projectLink)}
          invalid={fieldInvalid("projectLink")}
          isMobile={isMobile}
        />
      </FormField>

      {/* STAGE */}
      <FormField invalid={fieldInvalid("stage")} error={fieldError("stage")}>
        <BracketSelect
          id="stage"
          name="stage"
          value={values.stage}
          onChange={handleInputChange}
          onBlur={handleBlur}
          width={bracketWidth}
          invalid={fieldInvalid("stage")}
          isMobile={isMobile}
        >
          <option value="" className="bg-black">
            STAGE
          </option>
          {STAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-black">
              {opt.label}
            </option>
          ))}
        </BracketSelect>
      </FormField>

      {/* BIGGEST CHALLENGE */}
      <FormField
        invalid={fieldInvalid("biggestChallenges")}
        error={fieldError("biggestChallenges")}
      >
        <div className="group inline-flex items-center max-w-full">
          <span
            className={`${
              fieldInvalid("biggestChallenges")
                ? "text-red-500"
                : "text-[#9EA5AD]/90 group-hover:text-white"
            } transition-colors text-2xl`}
          >
            [
          </span>
          <ChallengeSelector
            isOpen={isChallengesOpen}
            setIsOpen={setIsChallengesOpen}
            selectedChallenges={values.biggestChallenges}
            onChange={handleInputChange}
            onBlur={() => handleBlur({ target: { name: "biggestChallenges" } } as React.FocusEvent<HTMLInputElement>)}
            width={bracketWidth}
            invalid={fieldInvalid("biggestChallenges")}
            isMobile={isMobile}
          />
          <span
            className={`${
              fieldInvalid("biggestChallenges")
                ? "text-red-500"
                : "text-[#9EA5AD]/90 group-hover:text-white"
            } transition-colors text-2xl`}
          >
            ]
          </span>
        </div>
      </FormField>

      {/* LEVEL OF INVESTMENT */}
      <FormField
        invalid={fieldInvalid("investmentLevel")}
        error={fieldError("investmentLevel")}
      >
        <BracketSelect
          id="investmentLevel"
          name="investmentLevel"
          value={values.investmentLevel}
          onChange={handleInputChange}
          onBlur={handleBlur}
          width={bracketWidth}
          invalid={fieldInvalid("investmentLevel")}
          isMobile={isMobile}
        >
          <option value="" className="bg-black">
            LEVEL OF INVESTMENT
          </option>
          {INVESTMENT_LEVEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-black">
              {opt.label}
            </option>
          ))}
        </BracketSelect>
      </FormField>

      {/* WHY NOW? */}
      <FormField invalid={fieldInvalid("whyNow")} error={fieldError("whyNow")}>
        <div className={`w-full ${isMobile ? "max-w-xs" : "max-w-sm"}`}>
          <div
            className={`rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-md ${
              isMobile ? "px-3 py-3 min-h-[100px]" : "px-4 py-4 min-h-[120px]"
            }`}
          >
            <textarea
              id="whyNow"
              name="whyNow"
              placeholder="WHY NOW?"
              rows={isMobile ? 5 : 6}
              className={`w-full h-full bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none ${
                isMobile ? "text-xs" : "text-sm"
              } tracking-wide resize-none leading-relaxed`}
              value={values.whyNow}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              maxLength={CHAR_LIMITS.whyNow}
              style={{ textTransform: "none" }}
            />
          </div>
        </div>
      </FormField>

      {/* SUBMIT BUTTON */}
      <div className={isMobile ? "mt-4 mb-6" : "mt-5 mb-8"}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group relative ${
            isMobile ? "text-lg" : "text-xl"
          } font-light text-[#B8C1CB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span className="text-[#A0A9B4]">
            {isSubmitting ? "submitting..." : "submit to see if we're a fit"}
          </span>
          <span
            className="block h-[1.5px] bg-[#B8C1CB] mt-1 w-full origin-left transform transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:scale-x-0"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
}

