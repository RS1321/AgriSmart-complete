import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CropPredictionForm from "@/components/CropPredictionForm";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <CropPredictionForm />
        <AIAssistant />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
