import React, { useState } from "react";
import { Navbar, Footer, Seo } from "@components";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is SKULPT?",
    answer: "SKULPT is a brand partner for early-stage founders who would rather be understood than positioned. We help reconnect founders, team members, and audiences to a long-lasting brand built with intention.",
  },
  {
    question: "Where are you located?",
    answer: "Our creative studio is based in Stockholm, Sweden, where we work with founders and teams globally.",
  },
  {
    question: "What services do you offer?",
    answer: "We offer brand strategy, internal alignment, visual identity development, brand messaging, and pitch deck design. Our process focuses on strategy first, ensuring every decision is grounded in your truth.",
  },
  {
    question: "How do I get started?",
    answer: "Fill out our contact form to tell us where you are on your journey and what you're building. We'll review your information and get back to you soon to see if we're a fit.",
  },
  {
    question: "What makes SKULPT different?",
    answer: "We begin at the root—asking the questions most founders skip. We surface your values, story, and belief system to set the foundation your brand stands on. Internal branding is our differential step and SKULPT's expertise.",
  },
  {
    question: "Do you work with companies outside of Sweden?",
    answer: "Yes, we work with founders and teams globally. While our studio is in Stockholm, we collaborate with clients worldwide.",
  },
  {
    question: "What is your investment level?",
    answer: "We work with founders at various stages—from just an idea to funded and scaling. Our investment levels range from light exploration to high commitment, depending on your needs and readiness.",
  },
  {
    question: "How long does the branding process take?",
    answer: "The timeline varies based on your project scope and needs. We work deep, intentional, and focused on longevity and growth. Contact us to discuss your specific timeline.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Seo
        title="Frequently Asked Questions | SKULPT"
        description="Common questions about SKULPT, our branding services, process, and how we work with founders and teams."
        path="/faq"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0] text-[#3F4851] flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 md:px-10 lg:px-20 py-16 md:py-24 mx-auto w-full max-w-4xl font-body">
          <h1 className="font-subheading pt-12 text-2xl sm:text-3xl md:text-4xl text-[#7A8289] tracking-tight mb-6">
            Frequently Asked Questions
          </h1>

          <p className="text-[#606A74] mb-12 max-w-3xl">
            Common questions about SKULPT, our process, and how we work with founders and teams.
          </p>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-[#D8DDE4] pb-4 last:border-b-0"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left flex items-start justify-between gap-4 py-4 hover:text-[#3F4851] transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h2 className="font-subheading text-lg md:text-xl text-[#7A8289] flex-1">
                    {faq.question}
                  </h2>
                  <span
                    className={`text-2xl text-[#9EA5AD] transition-transform duration-200 flex-shrink-0 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#606A74] pb-4 pl-0 md:pl-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#D8DDE4]">
            <p className="text-[#606A74] mb-4">
              Still have questions?{" "}
              <a
                href="/contact"
                className="font-subheading text-[#7A8289] hover:text-[#3F4851] transition-colors underline"
              >
                Get in touch
              </a>{" "}
              and we'll be happy to help.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

