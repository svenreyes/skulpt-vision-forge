import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Seo } from "@components";
import ExIcon from "@assets/ex.svg";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  answerText: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is SKULPT's vision?",
    answer: "Our vision is to create positive change for the world by making good ideas greater. To do so, we partner with founders of good ideas by investing in their brand and transforming early potential into conscious growth.",
    answerText: "Our vision is to create positive change for the world by making good ideas greater. To do so, we partner with founders of good ideas by investing in their brand and transforming early potential into conscious growth.",
  },
  {
    question: "What is branding?",
    answer: (
      <>
        <p className="mb-4">
          We've found that branding and marketing are often intertwined. The truth is, they relate to each other, but they're very different. We like to say that marketing is asking someone out on a date, and branding is the reason they say yes. Branding is a gut feeling, an instinct that you get from someone or something that reveals the deeper parts of who they are. Everything and everyone has a brand, whether it's intentional or not.
        </p>
        <p>
          A way to understand branding is to personify it. For example, ask yourself: if Nike were a person, who would they be? What would they care about, and why? What music would they listen to? Would I be friends with them? If you're even remotely able to answer those questions, you already have a pretty good understanding of how branding works.
        </p>
      </>
    ),
    answerText: "We've found that branding and marketing are often intertwined. The truth is, they relate to each other, but they're very different. We like to say that marketing is asking someone out on a date, and branding is the reason they say yes. Branding is a gut feeling, an instinct that you get from someone or something that reveals the deeper parts of who they are. Everything and everyone has a brand, whether it's intentional or not. A way to understand branding is to personify it. For example, ask yourself: if Nike were a person, who would they be? What would they care about, and why? What music would they listen to? Would I be friends with them? If you're even remotely able to answer those questions, you already have a pretty good understanding of how branding works.",
  },
  {
    question: "Why is SKULPT based in Stockholm, Sweden?",
    answer: (
      <>
        <p className="mb-4">
          SKULPT is rooted in Sweden, a country recognized for its design legacy, progressive values, and commitment to sustainability and social good. Sweden is also one of the world's leading startup ecosystems. In 2023 alone, Swedish startups raised over €4.7 billion in venture capital, with 75% of that funding going to impact-focused companies.
        </p>
        <p>
          While our roots are Scandinavian, our goals remain global, as SKULPT works with founders around the world. Our team operates remotely and has supported startups across Europe and North America.
        </p>
      </>
    ),
    answerText: "SKULPT is rooted in Sweden, a country recognized for its design legacy, progressive values, and commitment to sustainability and social good. Sweden is also one of the world's leading startup ecosystems. In 2023 alone, Swedish startups raised over €4.7 billion in venture capital, with 75% of that funding going to impact-focused companies. While our roots are Scandinavian, our goals remain global, as SKULPT works with founders around the world. Our team operates remotely and has supported startups across Europe and North America.",
  },
  {
    question: "Who does SKULPT work with?",
    answer: "Most of our Partners are pre-Seed to Series A ventures. They know that building something meaningful goes beyond \"one-click branding\" and requires commitment to humanness.",
    answerText: "Most of our Partners are pre-Seed to Series A ventures. They know that building something meaningful goes beyond \"one-click branding\" and requires commitment to humanness.",
  },
  {
    question: "What is The Skulpting Process?",
    answer: (
      <>
        <p className="mb-4">
          The Skulpting Process is our 8-week system for creating a complete brand ready for market credibility, customer trust, and investor funding.
        </p>
        <p>
          It's built around three founder-centric workshops, where we take scattered ideas and transform them into an aligned identity. The result comes to life through our five deliverables: brand SWOT analysis, brand playbook, brand guidelines, pitch deck, and the Alignment Indicator Report. Each piece informs everything you need to know about differentiation, identity strategy, market and audience research, storytelling, values, and visuals. The outcome is a complete brand system built to grow and evolve with your early-stage business.
        </p>
      </>
    ),
    answerText: "The Skulpting Process is our 8-week system for creating a complete brand ready for market credibility, customer trust, and investor funding. It's built around three founder-centric workshops, where we take scattered ideas and transform them into an aligned identity. The result comes to life through our five deliverables: brand SWOT analysis, brand playbook, brand guidelines, pitch deck, and the Alignment Indicator Report. Each piece informs everything you need to know about differentiation, identity strategy, market and audience research, storytelling, values, and visuals. The outcome is a complete brand system built to grow and evolve with your early-stage business.",
  },
  {
    question: "What is sweat equity and why invest through it instead of cash?",
    answer: "In selected cases, SKULPT accepts equity in exchange for differentiation and identity strategy, industry research, and storytelling and visual system services. This model allows early-stage ideas to access high-level identity and design without committing to a big cash investment. We take part in the journey of entrepreneurship as real partners, with shared responsibility for risk and growth.",
    answerText: "In selected cases, SKULPT accepts equity in exchange for differentiation and identity strategy, industry research, and storytelling and visual system services. This model allows early-stage ideas to access high-level identity and design without committing to a big cash investment. We take part in the journey of entrepreneurship as real partners, with shared responsibility for risk and growth.",
  },
  {
    question: "Does SKULPT build websites and social media or only brands?",
    answer: "No, we don't build websites or manage social media. In order for a web designer or developer to build a website, they need to understand messaging, mission and vision, colors, logo, and typography, to name a few. Those are all parts of one's brand, the foundation that all social outreach is built on. In other words, branding informs what your website should say, how it should look, and why it matters in the first place.",
    answerText: "No, we don't build websites or manage social media. In order for a web designer or developer to build a website, they need to understand messaging, mission and vision, colors, logo, and typography, to name a few. Those are all parts of one's brand, the foundation that all social outreach is built on. In other words, branding informs what your website should say, how it should look, and why it matters in the first place.",
  },
  {
    question: "What is a brand partner and why is it SKULPT's choice?",
    answer: (
      <>
        <p className="mb-4">
          SKULPT is a brand partner for early-stage startups, not a traditional creative agency. We accompany founders acting as a long-term collaborator rather than as an external service provider, as we felt too many agencies stop at logos, standalone campaigns and transactional business. Instead, we co-build an authentic and intentional brand that lasts throughout all investing rounds, instead of needing constant rework.
        </p>
        <p className="mb-4">
          We are specialized in internal alignment and young audiences. When we believe in a venture, we sometimes work through sweat equity partnerships. We work best with B2B2YC (business-to-business-to-young-consumer) brands to help startups connect with the next generation. We are also set to work with companies doing good for the world and forwarding innovation.
        </p>
        <p>
          Culturally fluent and globally connected, SKULPT builds brands that reflect their time, stand for something real, and are built to last.
        </p>
      </>
    ),
    answerText: "SKULPT is a brand partner for early-stage startups, not a traditional creative agency. We accompany founders acting as a long-term collaborator rather than as an external service provider, as we felt too many agencies stop at logos, standalone campaigns and transactional business. Instead, we co-build an authentic and intentional brand that lasts throughout all investing rounds, instead of needing constant rework. We are specialized in internal alignment and young audiences. When we believe in a venture, we sometimes work through sweat equity partnerships. We work best with B2B2YC (business-to-business-to-young-consumer) brands to help startups connect with the next generation. We are also set to work with companies doing good for the world and forwarding innovation. Culturally fluent and globally connected, SKULPT builds brands that reflect their time, stand for something real, and are built to last.",
  },
  {
    question: "When is the right time to invest in branding?",
    answer: "As soon as you have validated your idea and market fit. But before any major milestones. It's a waste of resources to brand something that doesn't have the potential to succeed in the first place. Once you've proven traction and demand, build your brand. It's also a waste to rebrand after every round, product development, or hiring goal.",
    answerText: "As soon as you have validated your idea and market fit. But before any major milestones. It's a waste of resources to brand something that doesn't have the potential to succeed in the first place. Once you've proven traction and demand, build your brand. It's also a waste to rebrand after every round, product development, or hiring goal.",
  },
  {
    question: "How do I get in touch with you?",
    answer: (
      <>
        Please fill out the questionnaire in{" "}
        <Link to="/contact" className="underline hover:text-[#3F4851] transition-colors">
          [next]
        </Link>{" "}
        on our website. You can find this tab at the top right of our header. You can also drop us an email at{" "}
        <a href="mailto:contact@skulptbrand.com" className="underline hover:text-[#3F4851] transition-colors">
          contact@skulptbrand.com
        </a>{" "}
        for any other questions at any time.
      </>
    ),
    answerText: "Please fill out the questionnaire in [next] on our website. You can find this tab at the top right of our header. You can also drop us an email at contact@skulptbrand.com for any other questions at any time.",
  },
];

// Generate FAQ structured data for SEO (JSON-LD)
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answerText,
    },
  })),
};

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
      
      {/* FAQ Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
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
                  <img
                    src={ExIcon}
                    alt=""
                    aria-hidden="true"
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-out ${
                      openIndex === index ? "rotate-0" : "rotate-45"
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="text-[#606A74] pb-4 pl-0 md:pl-8">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#D8DDE4]">
            <p className="text-[#606A74] mb-4">
              Still have questions?{" "}
              <Link
                to="/contact"
                className="font-subheading text-[#7A8289] hover:text-[#3F4851] transition-colors underline"
              >
                Get in touch
              </Link>{" "}
              and we'll be happy to help.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
