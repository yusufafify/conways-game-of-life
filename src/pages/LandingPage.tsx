import Footer from "@/components/Footer";
import GameOfLifeHero from "@/components/GameOfLifeHero";
import Introduction from "@/components/Introduction";
import Patterns from "@/components/Patterns";
import Rules from "@/components/Rules";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LandingPage = () => {
    const { state } = useLocation() as { state?: { scrollTo?: string } };
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.scrollTo) {
      const el = document.getElementById(state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      // clear the state so repeated navigation doesn't re-fire
      navigate(".", { replace: true, state: {} });
    }
  }, [state, navigate]);
  return (
    <main className="min-h-screen">
      <GameOfLifeHero />

      <section className="section-transition">
        <Introduction />
      </section>

      <section className="section-transition">
        <Rules />
      </section>

      <section className="section-transition">
        <Patterns />
      </section>

      <Footer />
    </main>
  );
};

export default LandingPage;
