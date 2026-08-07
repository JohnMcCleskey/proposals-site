import IslandNav from "@/components/IslandNav";
import Hero from "@/components/Hero";
import Storyboard from "@/components/Storyboard";
import PainTaxonomy from "@/components/PainTaxonomy";
import Method from "@/components/Method";
import ProofTable from "@/components/ProofTable";
import Deliverables from "@/components/Deliverables";
import FamilyBento from "@/components/FamilyBento";
import WhoItsFor from "@/components/WhoItsFor";
import Guardrails from "@/components/Guardrails";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div id="top">
      <IslandNav />
      <main id="main">
        <Hero />
        <Storyboard />
        <PainTaxonomy />
        <Method />
        <ProofTable />
        <Deliverables />
        <FamilyBento />
        <WhoItsFor />
        <Guardrails />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
