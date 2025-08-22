import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        url?: string;
        events?: boolean | "true" | "false";
        "loading-anim"?: boolean | "true" | "false";
        class?: string;
      };
    }
  }
}

export {};
