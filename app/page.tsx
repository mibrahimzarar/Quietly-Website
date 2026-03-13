import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import Features from "@/components/Features";
import IDEInterface from "@/components/IDEInterface";
import Privacy from "@/components/Privacy";
import Installation from "@/components/Installation";
import SystemRequirements from "@/components/SystemRequirements";
import CTA from "@/components/CTA";
import IntelliBud from "@/components/IntelliBud";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <ProductDemo />
      <Features />
      <IDEInterface />
      <Privacy />
      <Installation />
      <SystemRequirements />
      <CTA />
      <IntelliBud />
      <Footer />
    </main>
  );
}
