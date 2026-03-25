import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { HowItWorks } from "@/sections/how-it-works";
import { Features } from "@/sections/features";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
      </main>
    </>
  );
}
