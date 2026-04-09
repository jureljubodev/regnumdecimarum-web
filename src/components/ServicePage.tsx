import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ServicePage.module.css';
import digitalImg from '../assets/digital.jpg';
import hospitalityImg from '../assets/palachinqo.webp';
import interiorImg from '../assets/interior.jpeg';
import transportImg from '../assets/car.webp';
import acImg from '../assets/ac.jpeg';

interface ServicePageProps {
  currentLang?: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ currentLang = 'en' }) => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const homeContactHref = `${import.meta.env.BASE_URL}#contact`;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);
  
  const servicesData = {
    digital: {
      title: { en: 'Digital Marketing & Design', hr: 'Digitalni Marketing & Dizajn' },
      description: {
        en: 'Comprehensive digital solutions including web development, brand identity, marketing strategies, and growth systems to elevate your online presence.',
        hr: 'Sveobuhvatna digitalna rješenja uključujući web razvoj, brend identitet, marketinške strategije i sustave rasta za podizanje vaše online prisutnosti.'
      },
      fullDescription: {
        en: 'Our digital marketing and design services encompass the full spectrum of online presence building. From responsive web development to compelling brand identity creation, we craft digital experiences that resonate with your target audience and drive measurable growth.',
        hr: 'Naše usluge digitalnog marketinga i dizajna obuhvaćaju cijeli spektar stvaranja online prisutnosti. Od responzivnog web razvoja do stvaranja privlačnog brend identiteta, kreiramo digitalna iskustva koja odjekuju s vašom ciljnom publikom i pokažu izmjerljiv rast.'
      },
      features: {
        en: ['Web Development', 'Brand Identity', 'Marketing Strategy', 'Growth Systems', 'Digital Analytics', 'SEO Optimization'],
        hr: ['Web Razvoj', 'Brend Identitet', 'Marketinška Strategija', 'Sustavi Rasta', 'Digitalna Analitika', 'SEO Optimizacija']
      },
      image: digitalImg,
      website: 'https://jureljubodev.github.io/portfolio/',
      websiteLabel: {
        en: 'View Portfolio',
        hr: 'Pogledajte Portfolio'
      }
    },
    hospitality: {
      title: { en: 'PalachinqO', hr: 'PalachinqO' },
      description: {
        en: 'PalachinqO is a pancake restaurant in the heart of Zagreb, next to Mali plac - Britanac, created around warmth, simplicity, and flavors people already love.',
        hr: 'PalachinqO je palačinkarnica u srcu Zagreba, uz Mali plac - Britanac, nastala iz želje za toplinom, jednostavnošću i okusima koje ljudi već vole.'
      },
      fullDescription: {
        en: 'PalachinqO was built from the idea that pancakes are more than a quick meal. They are memory, tradition, and a small moment of comfort. The concept stays intentionally close to a proven homemade recipe, with no unnecessary complications and no trend-driven shortcuts. The result is a place that feels familiar, warm, and easy to return to, whether guests come for something sweet, a relaxed drink, or a casual stop in central Zagreb.',
        hr: 'PalachinqO je nastao iz ideje da palačinke nisu samo brz obrok. One su uspomena, tradicija i mali trenutak ugode. Koncept ostaje namjerno blizak provjerenoj domaćoj recepturi, bez nepotrebnog kompliciranja i bez trendovskih prečaca. Rezultat je mjesto koje djeluje poznato, toplo i lako za povratak, bilo da gosti dolaze na nešto slatko, opušteno piće ili kratko zaustavljanje u centru Zagreba.'
      },
      features: {
        en: ['Ilica 75, Zagreb', 'Near Britanac market', 'Homemade pancake recipe', 'Sweet menu selection', 'Drinks menu', 'Order via Wolt'],
        hr: ['Ilica 75, Zagreb', 'Uz Britanac', 'Domaća receptura palačinki', 'Ponuda slatkih palačinki', 'Ponuda pića', 'Narudžba preko Wolta']
      },
      image: hospitalityImg,
      website: 'https://www.palachinqo.com'
    },
    interior: {
      title: { en: 'Interior Finishing', hr: 'Završni Radovi Interijera' },
      description: {
        en: 'Expert interior finishing services including high-end ceramics, tiles, electrical work, and custom installations for residential and commercial spaces.',
        hr: 'Stručne usluge završnih radova u interijeru uključujući vrhunsku keramiku, pločice, električne radove i prilagođene instalacije za stambene i komercijalne prostore.'
      },
      fullDescription: {
        en: 'From elegant tile work to sophisticated electrical installations, our interior finishing services bring precision and artistry to every detail. We specialize in high-end ceramics and custom solutions that elevate both residential and commercial spaces.',
        hr: 'Od elegantnih radova s pločicama do sofisticiranih instalacija struje, naše usluge završnih radova u interijeru donose preciznost i umijeće svakom detalju. Specijalizirani smo za vrhunsku keramiku i prilagođena rješenja koja podižu stambene i komercijalne prostore.'
      },
      features: {
        en: ['Ceramic Tiles', 'Electrical Work', 'Custom Installation', 'Material Selection', 'Project Management', 'Quality Assurance'],
        hr: ['Keramičke Pločice', 'Električni Radovi', 'Prilagođena Instalacija', 'Izbor Materijala', 'Upravljanje Projektom', 'Jamstvo Kvalitete']
      },
      image: interiorImg
    },
    transport: {
      title: { en: 'Private Transport', hr: 'Privatni Prijevoz' },
      description: {
        en: 'Luxury private transportation services offering discreet, reliable, and elegant mobility solutions for individuals and businesses.',
        hr: 'Luksuzne usluge privatnog prijevoza koje nude diskretne, pouzdane i elegantne mobilne rješenja za pojedince i tvrtke.'
      },
      fullDescription: {
        en: 'Experience unparalleled comfort and reliability with our premium private transportation services. Our fleet of luxury vehicles and professionally trained drivers ensure seamless, discreet, and elegant mobility for every occasion.',
        hr: 'Iskusite neusporednu udobnost i pouzdanost s našim premium uslugama privatnog prijevoza. Naša flota luksuznih vozila i profesionalno obučeni vozači osiguravaju bezbrižan, diskretan i elegantan prijevoz za svaku prigodu.'
      },
      features: {
        en: ['Luxury Fleet', 'Professional Drivers', 'Discreet Service', 'Flexible Scheduling', '24/7 Availability', 'Route Planning'],
        hr: ['Luksuzna Flota', 'Profesionalni Vozači', 'Diskretna Usluga', 'Fleksibilno Raspored', '24/7 Dostupnost', 'Planiranje Rute']
      },
      image: transportImg
    },
    ac: {
      title: { en: 'AC Cleaning & Maintenance', hr: 'Čišćenje i Održavanje Klima Uređaja' },
      description: {
        en: 'Professional air conditioning cleaning and maintenance services to ensure optimal performance and indoor air quality.',
        hr: 'Profesionalne usluge čišćenja i održavanja klima uređaja za optimalne performanse i kvalitetu zraka u prostoru.'
      },
      fullDescription: {
        en: 'Maintain peak performance and air quality with our comprehensive air conditioning services. From regular maintenance to deep cleaning, we ensure your systems operate efficiently while providing the cleanest indoor air.',
        hr: 'Održavajte optimalnu performansu i kvalitetu zraka s našim sveobuhvatnim uslugama klima uređaja. Od redovnog održavanja do dubokog čišćenja, osiguravamo da vaši sustavi rade učinkovito i pružaju najčišći zrak u zatvorenim prostorima.'
      },
      features: {
        en: ['Regular Maintenance', 'Deep Cleaning', 'System Inspection', 'Filter Replacement', 'Performance Optimization', 'Emergency Service'],
        hr: ['Redovno Održavanje', 'Duboko Čišćenje', 'Pregled Sustava', 'Zamjena Filtera', 'Optimizacija Performansi', 'Hitna Usluga']
      },
      image: acImg
    }
  };

  const lang = currentLang as 'en' | 'hr';
  const service = servicesData[serviceId as keyof typeof servicesData];

  if (!service) {
    return (
      <section className={styles.servicePage}>
        <div className={styles.container}>
          <h1 className={styles.notFound}>{lang === 'en' ? 'Service not found' : 'Usluga nije pronađena'}</h1>
          <Link to="/" className={styles.backLink}>{lang === 'en' ? '← Back to Home' : '← Nazad na Početnu'}</Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.servicePage}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>{lang === 'en' ? '← Back to Home' : '← Nazad na Usluge'}</Link>
        
        <div className={styles.heroImage} style={{ backgroundImage: `url(${service.image})` }}>
          <div className={styles.heroOverlay}></div>
          <h1 className={styles.title}>{service.title[lang]}</h1>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>{service.description[lang]}</p>

          <div className={styles.cta}>
            {'website' in service && service.website ? (
              <a
                href={service.website}
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryCtaButton}
              >
                {'websiteLabel' in service && service.websiteLabel
                  ? service.websiteLabel[lang]
                  : (lang === 'en' ? 'Visit Website' : 'Posjetite Web Stranicu')}
              </a>
            ) : null}
            <a href={homeContactHref} className={styles.ctaButton}>{lang === 'en' ? 'Get in Touch' : 'Kontaktirajte Nas'}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
