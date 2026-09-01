import IslandNav from "@/components/IslandNav";
import Hero from "@/components/Hero";
import Storyboard from "@/components/Storyboard";
import PainTaxonomy from "@/components/PainTaxonomy";
import Method from "@/components/Method";
import ProofTable from "@/components/ProofTable";
import OwnerHours from "@/components/OwnerHours";
import Deliverables from "@/components/Deliverables";
import WhenWeBuild from "@/components/WhenWeBuild";
import FamilyBento from "@/components/FamilyBento";
import WhoItsFor from "@/components/WhoItsFor";
import Operator from "@/components/Operator";
import OperatorFull from "@/components/OperatorFull";
import Guardrails from "@/components/Guardrails";
import DetailsTabs from "@/components/DetailsTabs";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div id="top">
      <IslandNav />
      <main id="main">
        <Hero />
        <Storyboard />
        <Operator />
        <DetailsTabs
          tabs={[
            {
              id: "work",
              label: "How we work",
              content: (
                <>
                  <Method />
                  <ProofTable />
                  <OwnerHours />
                </>
              ),
            },
            {
              id: "finding",
              label: "What we keep finding",
              content: (
                <>
                  <PainTaxonomy />
                  <WhoItsFor />
                </>
              ),
            },
            {
              id: "get",
              label: "What you get",
              content: (
                <>
                  <Deliverables />
                  <WhenWeBuild />
                </>
              ),
            },
            {
              id: "line",
              label: "How we hold the line",
              content: (
                <>
                  <Guardrails />
                  <OperatorFull />
                </>
              ),
            },
            {
              id: "live",
              label: "What is already live",
              content: <FamilyBento />,
            },
          ]}
        />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
