import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import Particles from "./Particles";

interface HeroProps {
  currentLang?: string;
}

const Hero: React.FC<HeroProps> = ({ currentLang = "en" }) => {
  const [particleCount, setParticleCount] = useState(25);
  const [connectionDistance, setConnectionDistance] = useState(140);

  useEffect(() => {
    const calculateParticleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setParticleCount(10); // Mobile: drastically reduced
        setConnectionDistance(100); // Smaller connection radius on mobile
      } else if (width < 1024) {
        setParticleCount(30); // Tablet: moderately reduced
        setConnectionDistance(120);
      } else {
        setParticleCount(30); // Desktop: full count
        setConnectionDistance(140);
      }
    };

    calculateParticleCount();
    window.addEventListener("resize", calculateParticleCount);
    return () => window.removeEventListener("resize", calculateParticleCount);
  }, []);

  const content = {
    eyebrow: {
      en: "More services. One standard of excellence.",
      hr: "Više usluga. Jedan standard izvrsnosti.",
    },
    title: {
      en: "REGNUM DECIMARUM",
      hr: "REGNUM DECIMARUM",
    },
    exploreBtn: {
      en: "Explore services",
      hr: "Istražite usluge",
    },
    consultationBtn: {
      en: "Book a consultation",
      hr: "Rezervirajte konzultacije",
    },
    tags: {
      en: ["Digital", "Hospitality", "Construction", "Transport", "AC Cleaning"],
      hr: ["Digitalno", "Ugostiteljstvo", "Završni radovi", "Prijevoz", "Čišćenje klima uređaja"],
    },
  };

  const lang = currentLang as "en" | "hr";

  return (
    <section className={styles.hero} id="home">
      <Particles
        particleCount={particleCount}
        particleSize={3}
        speed={0.2}
        mouseRadius={180}
        connectionDistance={connectionDistance}
      />
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{content.eyebrow[lang]}</p>
        <h1>{content.title[lang]}</h1>
        <div className={styles.heroActions}>
          <a className={styles.btnPrimary} href="#services">
            {content.exploreBtn[lang]}
          </a>
          <a className={styles.btnSecondary} href="#contact">
            {content.consultationBtn[lang]}
          </a>
        </div>
        <div className={styles.heroTags}>
          {content.tags[lang].map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
