import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import MockupSection from "@/components/MockupSection";
import Comparison from "@/components/Comparison";
import Carousel from "@/components/Carousel";
import MascotChatbox from "@/components/MascotChatbox";
import FaqSection from "@/components/FaqSection";
import WaitlistModal from "@/components/WaitlistModal";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { FAQ, META } from "@/content/copy";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.categories.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Genie Hive Private Limited",
  url: META.url,
  email: "support@geniehive.in",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <MockupSection />
        <Comparison />
        <Carousel />
        <FaqSection />
        <CtaBand />
      </main>
      <Footer />
      <MascotChatbox watchId="features" />
      <WaitlistModal />
    </>
  );
}
