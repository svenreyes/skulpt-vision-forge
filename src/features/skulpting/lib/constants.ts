import freyaImg from "@assets/skulpting/freya 1.png";
import jaclynImg from "@assets/skulpting/jaclyn 1.png";
import luciaImg from "@assets/skulpting/lucia 1.png";
import svenImg from "@assets/skulpting/sven 1.png";

export const team = [
  { name: "JACLYN PHAM", src: jaclynImg },
  { name: "FREYA LINDQVIST", src: freyaImg },
  { name: "SVEN REYES", src: svenImg },
  { name: "LUCIA JUEGUEN", src: luciaImg },
];

export const axisOrder: ("strategy" | "alignment" | "external" | "internal")[] = [
  "strategy",
  "external",
  "alignment",
  "internal",
];

export type AxisType = "strategy" | "alignment" | "external" | "internal";

export const axisCopy: Record<AxisType, string> = {
  strategy:
    "We begin at the root. <span class='font-semibold text-white'>Who are you, really?</span><br />Asking the questions most founders skip; we surface your values, story, and belief system to set the foundation your brand stands on",
  internal:
    "Through guided, immersive workshops, we <span class='font-bold text-white'> shape how you show up,</span> and ensure your clients, community, investors, and mom get it.<br />Internal branding is our differential step and SKULPT's expertise",
  alignment:
    "From tone to visual identity, we translate strategy into tangible elements the world can see and feel. Nothing is arbitrary.<br />Every decision is <span class='font-bold text-white'>grounded in your truth</span>",
  external:
    "We bring your company into complete focus. This is where <span class='font-bold text-white'> alignment happens </span>, connecting purpose with people. Voice with vision. We work deep, intentional, and focused on longevity and growth",
};

