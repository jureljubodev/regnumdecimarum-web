import React from "react";
import styles from "./Hero.module.css";

interface HeroProps {
  currentLang?: string;
}

const Hero: React.FC<HeroProps> = ({ currentLang = "en" }) => {
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
