
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Portfolio } from '../components/Portfolio';
import { JoinMovement } from '../components/JoinMovement';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Portfolio />
      <JoinMovement />
      <Footer />
    </div>
  );
};

export default Index;
