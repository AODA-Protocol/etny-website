import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { HowItWorks } from "@/sections/how-it-works";
import { Features } from "@/sections/features";
import { Security } from "@/sections/security";
import { Roadmap } from "@/sections/roadmap";
import { Footer } from "@/sections/footer";
import { WarpProvider } from "@/components/warp-transition";

export default function Home() {
  return (
    <WarpProvider>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Security />
        <Roadmap />
      </main>
      <Footer />
    </WarpProvider>
  );
}
