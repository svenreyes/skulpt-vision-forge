import React, { useState } from "react";
import { Navbar, Footer, Seo } from "@components";
import { EufolioLogo, FinexaLogo } from "@features/skulpted";
import ridelinkImg from "@assets/ridelinklogo.png";
import eufolioPdf from "@assets/Eufolio_Case.pdf";
import finexaPdf from "@assets/Finexa Case Study- SKULPT.pdf";
import ridelinkPdf from "@assets/RideLink_Case.pdf";
import arrowSvg from "@assets/arrow.svg";
import exSvg from "@assets/ex.svg";

/* ─── Reusable tag pill ─────────────────────────────────────── */
const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex px-[10px] py-[5px] rounded-[4px] bg-[#CBD1D6]/35 font-subheading text-[9px] sm:text-[10px] tracking-[0.06em] uppercase text-[#8A9AA8]">
    {label}
  </span>
);

/* ─── Case study arrow CTA ──────────────────────────────────── */
const CaseCta: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group inline-flex items-center gap-[6px] text-[#B0BDC5] hover:text-[#8A9AA8] transition-colors duration-300 w-fit"
  >
    <span className="font-subheading text-[12px] sm:text-[13px] tracking-[0.04em]">
      Case Study
    </span>
    <img
      src={arrowSvg}
      alt="→"
      className="-rotate-45 w-[14px] h-[14px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </button>
);

/* ─── Page ──────────────────────────────────────────────────── */
const Skulpted: React.FC = () => {
  const [finexaHovered, setFinexaHovered] = useState(false);
  const [eufolioHovered, setEufolioHovered] = useState(false);
  const [ridelinkHovered, setRidelinkHovered] = useState(false);

  return (
    <>
      <Seo
        title="Our Portfolio | Skulpted"
        description="Explore SKULPT's selected work: brand strategy, visual identity, messaging, and tools that turn alignment into momentum."
        path="/skulpted"
        type="website"
      />

      <div className="relative min-h-screen w-full bg-[#E6EBEE] overflow-x-hidden">

        {/* ── Background blobs ── */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-10 -left-10 w-[60vw] h-[60vw] rounded-full"
            style={{ background: "#FFFFFF", opacity: 0.4, filter: "blur(80px)" }}
          />
          <div
            className="absolute bottom-0 right-[-8vw] w-[65vw] h-[35vw] rounded-full"
            style={{ background: "#C1CFD4", opacity: 0.3, filter: "blur(90px)" }}
          />
          <img
            src={exSvg}
            alt=""
            aria-hidden="true"
            className="absolute top-[-6vh] right-[-6vw] w-[40vw] max-w-[380px] opacity-[0.18] select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* ── Navbar ── */}
        <div className="relative z-50">
          <Navbar flat />
        </div>

        {/* ── Main content ── */}
        <main className="relative z-10 mx-auto max-w-[960px] px-6 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-28">

          {/* Page header */}
          <header className="mb-14 sm:mb-20">
            <p className="font-eyebrow text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#C0CBD3] mb-3">
              Portfolio
            </p>
            <h1 className="font-display text-[38px] sm:text-[56px] text-[#9EA5AD] tracking-[-0.025em] leading-none">
              Skulpted.
            </h1>
          </header>

          {/* ── Case study cards ── */}
          <div className="flex flex-col gap-5 sm:gap-6">

            {/* ── Finexa ── */}
            <article className="overflow-hidden rounded-[28px] bg-white/22 backdrop-blur-sm border border-white/35 shadow-[0_2px_24px_rgba(0,0,0,0.055)] grid grid-cols-1 sm:grid-cols-[1fr_360px] hover:shadow-[0_6px_36px_rgba(0,0,0,0.09)] transition-shadow duration-300">
              <div className="p-8 sm:p-10 flex flex-col justify-between gap-8 min-h-[260px] sm:min-h-[300px]">
                <div className="flex flex-col gap-4">
                  <p className="font-eyebrow text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#C0CBD3]">
                    2026 · Yucatan, Mexico
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="Growth" />
                    <Tag label="Fintech" />
                  </div>
                  <h2 className="font-display text-[36px] sm:text-[52px] text-[#9EA5AD] tracking-[-0.025em] leading-none">
                    Finexa
                  </h2>
                  <p className="font-body text-[12px] sm:text-[13px] text-[#C0CBD3] leading-relaxed tracking-[0.01em]">
                    Playbook &nbsp;·&nbsp; Style Guide &nbsp;·&nbsp; Pitch Deck
                  </p>
                </div>
                <CaseCta onClick={() => window.open(finexaPdf, "_blank")} />
              </div>
              {/* Visual – gold logo on dark, PDF preview on hover */}
              <div
                className="relative overflow-hidden min-h-[200px] sm:min-h-0 cursor-pointer bg-[#111B27]"
                onMouseEnter={() => setFinexaHovered(true)}
                onMouseLeave={() => setFinexaHovered(false)}
              >
                <div className={`absolute inset-0 flex items-center justify-center p-10 transition-opacity duration-500 ${finexaHovered ? "opacity-0" : "opacity-100"}`}>
                  <FinexaLogo style={{ width: "100%", maxWidth: "210px", color: "#B0A52E" }} />
                </div>
                <iframe
                  src={`${finexaPdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title="Finexa Case Study Preview"
                  className={`absolute inset-0 w-full h-full border-0 bg-white transition-opacity duration-500 ${finexaHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                />
              </div>
            </article>

            {/* ── Eufolio ── */}
            <article className="overflow-hidden rounded-[28px] bg-white/22 backdrop-blur-sm border border-white/35 shadow-[0_2px_24px_rgba(0,0,0,0.055)] grid grid-cols-1 sm:grid-cols-[360px_1fr] hover:shadow-[0_6px_36px_rgba(0,0,0,0.09)] transition-shadow duration-300">
              {/* Visual – navy logo on misty bg, PDF preview on hover */}
              <div
                className="order-last sm:order-first relative overflow-hidden min-h-[200px] sm:min-h-0 cursor-pointer bg-[#D4DCE4]"
                onMouseEnter={() => setEufolioHovered(true)}
                onMouseLeave={() => setEufolioHovered(false)}
              >
                <div className={`absolute inset-0 flex items-center justify-center p-10 transition-opacity duration-500 ${eufolioHovered ? "opacity-0" : "opacity-100"}`}>
                  <EufolioLogo style={{ width: "100%", maxWidth: "210px", color: "#00205B" }} />
                </div>
                <iframe
                  src={`${eufolioPdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title="Eufolio Case Study Preview"
                  className={`absolute inset-0 w-full h-full border-0 bg-white transition-opacity duration-500 ${eufolioHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-between gap-8 min-h-[260px] sm:min-h-[300px]">
                <div className="flex flex-col gap-4">
                  <p className="font-eyebrow text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#C0CBD3]">
                    2026 · Stockholm, Sweden
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="Pre-Seed" />
                    <Tag label="Capital Markets" />
                    <Tag label="Investment Management" />
                  </div>
                  <h2 className="font-display text-[36px] sm:text-[52px] text-[#9EA5AD] tracking-[-0.025em] leading-none">
                    Eufolio
                  </h2>
                  <p className="font-body text-[12px] sm:text-[13px] text-[#C0CBD3] leading-relaxed tracking-[0.01em]">
                    Playbook &nbsp;·&nbsp; Style Guide &nbsp;·&nbsp; Custom Design
                  </p>
                </div>
                <CaseCta onClick={() => window.open(eufolioPdf, "_blank")} />
              </div>
            </article>

            {/* ── Ride-Link ── */}
            <article className="overflow-hidden rounded-[28px] bg-white/22 backdrop-blur-sm border border-white/35 shadow-[0_2px_24px_rgba(0,0,0,0.055)] grid grid-cols-1 sm:grid-cols-[1fr_380px] hover:shadow-[0_6px_36px_rgba(0,0,0,0.09)] transition-shadow duration-300">
              <div className="p-8 sm:p-10 flex flex-col justify-between gap-8 min-h-[260px] sm:min-h-[300px]">
                <div className="flex flex-col gap-4">
                  <p className="font-eyebrow text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#C0CBD3]">
                    2024 · NC, USA
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="Pre-Seed" />
                    <Tag label="Transportation" />
                    <Tag label="Tech" />
                  </div>
                  <h2 className="font-display text-[36px] sm:text-[52px] text-[#9EA5AD] tracking-[-0.025em] leading-none">
                    Ride-Link
                  </h2>
                  <p className="font-body text-[12px] sm:text-[13px] text-[#C0CBD3] leading-relaxed tracking-[0.01em]">
                    Playbook &nbsp;·&nbsp; Style Guide &nbsp;·&nbsp; Pitch Deck
                  </p>
                </div>
                <CaseCta onClick={() => window.open(ridelinkPdf, "_blank")} />
              </div>

              {/* Visual – photo with PDF preview on hover */}
              <div
                className="relative overflow-hidden min-h-[260px] sm:min-h-0 cursor-pointer bg-[#D4DCE4]"
                onMouseEnter={() => setRidelinkHovered(true)}
                onMouseLeave={() => setRidelinkHovered(false)}
              >
                {/* Logo — fades out on hover */}
                <div className={`absolute inset-0 flex items-center justify-center p-10 transition-opacity duration-500 ${ridelinkHovered ? "opacity-0" : "opacity-100"}`}>
                  <img
                    src={ridelinkImg}
                    alt="Ride-Link"
                    className="w-full max-w-[210px] object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* PDF preview — fades in on hover (always mounted so it preloads) */}
                <iframe
                  src={`${ridelinkPdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title="Ride-Link Case Study Preview"
                  className={`absolute inset-0 w-full h-full border-0 bg-white transition-opacity duration-500 ${ridelinkHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                />

              </div>
            </article>

          </div>
        </main>

        {/* ── Footer ── */}
        <Footer />

      </div>
    </>
  );
};

export default Skulpted;
