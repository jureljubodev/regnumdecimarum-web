import React from "react";
import {
  AirVent,
  BriefcaseBusiness,
  CarFront,
  MonitorSmartphone,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Services.module.css";

interface ServicesProps {
  currentLang: string;
}

const Services: React.FC<ServicesProps> = ({ currentLang }) => {
  const serviceIcons = {
    digital: MonitorSmartphone,
    hospitality: UtensilsCrossed,
    interior: BriefcaseBusiness,
    transport: CarFront,
    ac: AirVent,
  };

  const content = {
    eyebrow: {
      en: "What we deliver",
      hr: "Što nudimo",
    },
    heading: {
      en: "Services tailored to your ambition",
      hr: "Usluge prilagođene vašim ambicijama",
    },
    readMore: {
      en: "Read More",
      hr: "Pročitaj Više",
    },
    services: {
      digital: {
        title: {
          en: "Digital Marketing & Design",
          hr: "Digitalni Marketing & Dizajn",
        },
        description: {
          en: "Comprehensive digital solutions including web development, brand identity, marketing strategies, and growth systems to elevate your online presence.",
          hr: "Sveobuhvatna digitalna rješenja uključujući web razvoj, brend identitet, marketinške strategije i sustave rasta za podizanje vaše online prisutnosti.",
        },
      },
      hospitality: {
        title: {
          en: "PalachinqO",
          hr: "PalachinqO",
        },
        description: {
          en: "A Zagreb pancake restaurant built around warm, familiar flavors, a house-made recipe, and a relaxed experience near Britanac.",
          hr: "Zagrebačka palačinkarnica izgrađena oko toplih, poznatih okusa, domaće recepture i opuštenog iskustva uz Britanac.",
        },
      },
      interior: {
        title: { en: "Interior Finishing", hr: "Završni Radovi Interijera" },
        description: {
          en: "Expert interior finishing services including high-end ceramics, tiles, electrical work, and custom installations for residential and commercial spaces.",
          hr: "Stručne usluge završnih radova u interijeru uključujući vrhunsku keramiku, pločice, električne radove i prilagođene instalacije za stambene i komercijalne prostore.",
        },
      },
      transport: {
        title: { en: "Private Transport", hr: "Privatni Prijevoz" },
        description: {
          en: "Luxury private transportation services offering discreet, reliable, and elegant mobility solutions for individuals and businesses.",
          hr: "Luksuzne usluge privatnog prijevoza koje nude diskretne, pouzdane i elegantne mobilne rješenja za pojedince i tvrtke.",
        },
      },
      ac: {
        title: {
          en: "AC Cleaning & Maintenance",
          hr: "Čišćenje i Održavanje Klima Uređaja",
        },
        description: {
          en: "Professional air conditioning cleaning and maintenance services to ensure optimal performance and indoor air quality.",
          hr: "Profesionalne usluge čišćenja i održavanja klima uređaja za optimalne performanse i kvalitetu zraka u prostoru.",
        },
      },
    },
  };

  const lang = currentLang as "en" | "hr";
  const serviceEntries = [
    { key: "digital", href: "/service/digital" },
    { key: "hospitality", href: "/service/hospitality" },
    { key: "interior", href: "/service/interior" },
    { key: "transport", href: "/service/transport" },
    { key: "ac", href: "/service/ac" },
  ] as const;

  return (
    <section className={styles.section} id="services">
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>{content.eyebrow[lang]}</p>
        <h2>{content.heading[lang]}</h2>
      </div>
      <div className={styles.serviceGrid}>
        {serviceEntries.map(({ key, href }) => {
          const Icon = serviceIcons[key];

          return (
            <article key={key} className={styles.serviceCard}>
              <div className={styles.serviceContent}>
                <div className={styles.iconShell} aria-hidden="true">
                  <Icon className={styles.serviceIcon} strokeWidth={1.6} />
                </div>
                <h3>{content.services[key].title[lang]}</h3>
                <Link to={href} className={styles.readMoreBtn}>
                  {content.readMore[lang]}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
