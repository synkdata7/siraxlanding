import { Navbar } from "@/components/sirax/Navbar";
import { Hero } from "@/components/sirax/Hero";
import { ArchitectureSection } from "@/components/sirax/ArchitectureSection";
import { IdentityAndGovernmentSection } from "@/components/sirax/IdentityAndGovernmentSection";
import { ComplianceAndDigitalSection } from "@/components/sirax/ComplianceAndDigitalSection";
import { KnowledgeGraphSection } from "@/components/sirax/KnowledgeGraphSection";
import { RiskEngineSection } from "@/components/sirax/RiskEngineSection";
import { AIInvestigationSection } from "@/components/sirax/AIInvestigationSection";
import { AnalyticsSection } from "@/components/sirax/AnalyticsSection";
import { ApiSection } from "@/components/sirax/ApiSection";
import { CTASection } from "@/components/sirax/CTASection";
import { Footer } from "@/components/sirax/Footer";

export default function Home() {
  return (
    <div className="sirax-app-shell relative">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-cyan-500/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-emerald-500/[0.04] rounded-full blur-[140px]" />
      </div>

      <Navbar />
      <main className="sirax-app-main">
        <Hero />
        <ArchitectureSection />
        <IdentityAndGovernmentSection />
        <ComplianceAndDigitalSection />
        <KnowledgeGraphSection />
        <RiskEngineSection />
        <AIInvestigationSection />
        <AnalyticsSection />
        <ApiSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
