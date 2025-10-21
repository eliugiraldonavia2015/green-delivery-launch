import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import AboutUs from "@/components/AboutUs";
import Join from "@/components/Join";
import Contact from "@/components/Contact";
import More from "@/components/More";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AboutUs />
      <Join />
      <Contact />
      <More />
      <Footer />
    </div>
  );
};

export default Index;
