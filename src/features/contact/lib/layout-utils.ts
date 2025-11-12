// Dynamic width helpers so bracketed inputs align with Investment's bracket length
export const INVESTMENT_DEFAULT_CH = 23; // 'LEVEL OF INVESTMENT' (~21) + padding
export const MOBILE_CHAR_PX = 8.5;
export const DESKTOP_CHAR_PX = 9.5;
export const MOBILE_MAX_INPUT_PX = 300;
export const DESKTOP_MAX_INPUT_PX = 380;

// Unified bracket width so selects/buttons match text inputs
export const BRACKET_WIDTH_MOBILE_PX = Math.ceil(INVESTMENT_DEFAULT_CH * MOBILE_CHAR_PX);
export const BRACKET_WIDTH_DESKTOP_PX = Math.ceil(INVESTMENT_DEFAULT_CH * DESKTOP_CHAR_PX);

export const calcWidthPx = (
  value: string,
  placeholder: string,
  isDesktop: boolean
): number => {
  const charPx = isDesktop ? DESKTOP_CHAR_PX : MOBILE_CHAR_PX;
  const minCh = INVESTMENT_DEFAULT_CH;
  const contentCh = Math.max(
    minCh,
    (value?.length || 0) > 0 ? value.length + 2 : placeholder.length + 2
  );
  const px = Math.ceil(contentCh * charPx);
  const cap = isDesktop ? DESKTOP_MAX_INPUT_PX : MOBILE_MAX_INPUT_PX;
  return Math.min(cap, px);
};

export const createWidthCalculators = (isDesktop: boolean) => ({
  name: (v: string) => calcWidthPx(v, "NAME", isDesktop),
  email: (v: string) => calcWidthPx(v, "EMAIL", isDesktop),
  projectName: (v: string) => calcWidthPx(v, "PROJECT NAME", isDesktop),
  projectLink: (v: string) => calcWidthPx(v, "URL OR DOMAIN ", isDesktop),
});

