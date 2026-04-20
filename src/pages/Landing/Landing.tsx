import {
  Header,
  HeroContent,
  Features,
  LandingStats,
  HowItWorks,
  TrustWidget,
  CTA,
  Footer,
} from "../../widgets/LandingWidgets";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#060e1e] text-white overflow-x-hidden">
      <Header />
      <HeroContent />
      <LandingStats />
      <TrustWidget />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};
