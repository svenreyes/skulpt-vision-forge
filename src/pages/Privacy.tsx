import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0] text-[#3F4851] flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 md:px-10 lg:px-20 py-16 md:py-24 mx-auto w-full max-w-4xl font-body">
        <h1 className="font-subheading pt-12 text-2xl sm:text-3xl md:text-4xl text-[#7A8289] tracking-tight mb-6">
          Privacy Policy
        </h1>

        <p className="text-[#75808B] mb-6">Last updated: {new Date().getFullYear()}</p>

        <section className="space-y-4 text-[#606A74]">
          <p>
            This Privacy Policy explains how SKULPT (the “Company”, “we”, “us”) collects,
            uses, and protects your information. We primarily serve users in the EU and the United States,
            including Sweden.
          </p>
          <p>
            We only collect the data you provide through our contact form and any
            related correspondence. We do <span className="font-subheading">not</span> sell your data.
          </p>
        </section>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Data Controller</h2>
        <p className="text-[#606A74]">SKULPT. Contact: <span className="font-subheading">contact@skulpt.com</span></p>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-[#606A74]">
          <li>Contact details: name and email address</li>
          <li>Project information: project name, stage, primary need (what), message</li>
          <li>Technical: basic, aggregated analytics (no precise location or sensitive categories)</li>
        </ul>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-[#606A74]">
          <li>Respond to your inquiry and communicate with you</li>
          <li>Improve our services and website experience</li>
          <li>Ensure site security and prevent abuse</li>
        </ul>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Legal Bases (GDPR)</h2>
        <ul className="list-disc list-inside space-y-2 text-[#606A74]">
          <li>Consent: when you submit the contact form</li>
          <li>Legitimate interests: improving and securing our services</li>
          <li>Legal obligation: when required by applicable law</li>
        </ul>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Retention</h2>
        <p className="text-[#606A74]">
          We retain contact submissions for up to 12 months unless a longer period is required to
          address your inquiry or comply with legal obligations. You may request deletion at any time.
        </p>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Sharing and Processors</h2>
        <p className="text-[#606A74]">
          We share data only with trusted service providers who process it on our behalf. In particular, we
          use <span className="font-subheading">Make.com</span> to receive form submissions via a secure webhook, strictly for the
          purpose of routing and handling your inquiry. We may also share data if required by law.
        </p>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">International Transfers</h2>
        <p className="text-[#606A74]">
          Your information may be processed in countries outside of your own. Where applicable, we rely on
          appropriate safeguards (such as Standard Contractual Clauses) to protect your data.
        </p>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Your Rights</h2>
        <ul className="list-disc list-inside space-y-2 text-[#606A74]">
          <li>Access, rectify, delete, or restrict processing of your personal data</li>
          <li>Object to processing where we rely on legitimate interests</li>
          <li>Withdraw consent at any time (without affecting prior lawful processing)</li>
          <li>Data portability (where applicable)</li>
          <li>EU users: complain to your local supervisory authority</li>
          <li>US/California users: request access/deletion where applicable under law</li>
        </ul>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Cookies and Analytics</h2>
        <p className="text-[#606A74]">
          We currently use only basic, aggregated analytics. If we adopt cookies or similar technologies in the
          future, we will update this policy and provide appropriate notices/choices.
        </p>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Security</h2>
        <p className="text-[#606A74]">
          We use reasonable administrative, technical, and organizational safeguards to protect your data.
          No method of transmission or storage is 100% secure.
        </p>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Contact</h2>
        <p className="text-[#606A74]">
          Email: <span className="font-subheading">contact@skulpt.com</span>
        </p>

        <h2 className="font-subheading text-xl md:text-2xl text-[#7A8289] mt-10 mb-3">Changes</h2>
        <p className="text-[#606A74]">
          We may update this policy from time to time. We will revise the “Last updated” date above when we do.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
