import { Header } from '@/components/Header';
import { AI, Building, Contact, Experience, Footer, Hero, Lead, PrototypeSection, Tldr, Work } from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Tldr />
        <Experience />
        <Work />
        <PrototypeSection />
        <Lead />
        <AI />
        <Building />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
