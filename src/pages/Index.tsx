import React from "react";
import {
  ArrowUpRight,
  Instagram,
  Link as LinkIcon,
  Mail,
} from "lucide-react";
import { CloudyBackground } from '../components/CloudyBackground';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useRef, useEffect, useState } from "react";

const Index = () => {
  const questions = [
    "Who are you?",
    "Where would you go for dreams?",
    "Who do you want to be?",
    "What's your dream?",
    "Who do you care about?",
    "What's your story?",
    "What's your responsibility?",
    "If my answer had to be yes, what would it be?",
    "What is freedom to you?",
    "Have you ever been understood?",
    "What version of yourself do people not see?",
    "Why now?",
  ];

  // For focus logic
  const questionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [focusedIdx, setFocusedIdx] = useState(0);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = questionRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setFocusedIdx(index);
          }
        }
      });
    }, options);

    // Observe all question elements
    questionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Initial focus on first question
    if (questionRefs.current[0]) {
      observer.observe(questionRefs.current[0]);
    }

    return () => {
      questionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, [questions]); // Re-run if questions change

  // Add smooth scroll behavior on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0] relative flex flex-col overflow-y-auto snap-y snap-mandatory">
      {/* Background */}
      <CloudyBackground />
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -left-40 w-[32rem] h-[32rem] bg-white/60 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 w-[28rem] h-[28rem] bg-white/50 rounded-full blur-3xl" />
      </div>
      {/* Navbar */}
      <Navbar />
      {/* Main content - scrollable questions */}
      <main className="w-full pt-24 pb-16 px-6 mx-auto max-w-4xl font-subheading relative z-10 text-center">
        <ul className="flex flex-col items-center w-full">
          {questions.map((q, i) => (
            <li
              key={q}
              ref={el => (questionRefs.current[i] = el)}
              className={`snap-start transition-all duration-300 ease-in-out flex items-center justify-center w-full h-screen
  ${focusedIdx === i
    ? "text-[20px] leading-[120%] tracking-[-0.8px] font-normal text-[#9EA5AD] opacity-100 scale-105 z-10"
    : "text-[20px] leading-[120%] tracking-[-0.8px] font-normal text-[#9EA5AD] opacity-40 scale-95 blur-sm z-0"}
  `}

              style={{
                scrollSnapAlign: 'center',
              }}
            >
              {q}
            </li>
          ))}
        </ul>
      </main>
      {/* Tagline above Footer */}
      <section className="snap-start text-center py-32 z-10 select-none min-h-screen flex items-center justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#9EA5AD]">
          We take Branding <span className="italic text-[#3F4851]">Personally.</span>{" "}
          <ArrowUpRight className="inline-block w-5 h-5 mb-1" />
        </h2>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};


export default Index;
