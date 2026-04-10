import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import './App.css';

const ServicePage = lazy(() => import('./components/ServicePage'));

const routerBasename = import.meta.env.BASE_URL === '/'
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, '');

function HomePage({ currentLang, handleLanguageChange }: {
  currentLang: string; 
  handleLanguageChange: (lang: string) => void;
}) {
  return (
    <div className="page-shell visible">
      <Topbar onLanguageChange={handleLanguageChange} />
      <main>
        <Hero currentLang={currentLang} />
        <Services currentLang={currentLang} />
        <Contact currentLang={currentLang} />
      </main>
      <Footer currentLang={currentLang} />
      <CookieBanner />
    </div>
  );
}

function ServicePageWrapper({ currentLang, handleLanguageChange }: {
  currentLang: string; 
  handleLanguageChange: (lang: string) => void;
}) {
  return (
    <div className="page-shell visible">
      <Topbar onLanguageChange={handleLanguageChange} />
      <main>
        <Suspense fallback={null}>
          <ServicePage currentLang={currentLang} />
        </Suspense>
      </main>
      <Footer currentLang={currentLang} />
      <CookieBanner />
    </div>
  );
}

function NotFoundPage({ currentLang, handleLanguageChange }: {
  currentLang: string;
  handleLanguageChange: (lang: string) => void;
}) {
  const lang = currentLang as 'en' | 'hr';
  const content = {
    en: {
      title: '404',
      subtitle: 'Page not found',
      text: 'The page you are looking for does not exist or has been moved.',
      cta: 'Back to Home'
    },
    hr: {
      title: '404',
      subtitle: 'Stranica nije pronađena',
      text: 'Stranica koju tražite ne postoji ili je premještena.',
      cta: 'Natrag na početnu'
    }
  };

  return (
    <div className="page-shell visible">
      <Topbar onLanguageChange={handleLanguageChange} />
      <main className="notFoundWrap">
        <section className="notFoundCard">
          <p className="notFoundCode">{content[lang].title}</p>
          <h1>{content[lang].subtitle}</h1>
          <p>{content[lang].text}</p>
          <Link to="/" className="notFoundButton">{content[lang].cta}</Link>
        </section>
      </main>
      <Footer currentLang={currentLang} />
      <CookieBanner />
    </div>
  );
}

function ThankYouPage({ currentLang, handleLanguageChange, forcedLang }: {
  currentLang: string;
  handleLanguageChange: (lang: string) => void;
  forcedLang?: 'en' | 'hr';
}) {
  const lang = forcedLang ?? (currentLang as 'en' | 'hr');
  const content = {
    en: {
      title: 'Thank You',
      subtitle: 'Your message has been sent.',
      text: 'We appreciate your inquiry and will get back to you shortly.',
      cta: 'Back to Home'
    },
    hr: {
      title: 'Hvala',
      subtitle: 'Vaša poruka je uspješno poslana.',
      text: 'Hvala na upitu. Javit ćemo vam se u najkraćem mogućem roku.',
      cta: 'Natrag na početnu'
    }
  };

  return (
    <div className="page-shell visible">
      <Topbar onLanguageChange={handleLanguageChange} />
      <main className="notFoundWrap">
        <section className="notFoundCard">
          <p className="notFoundCode">✓</p>
          <h1>{content[lang].title}</h1>
          <p><strong>{content[lang].subtitle}</strong></p>
          <p>{content[lang].text}</p>
          <Link to="/" className="notFoundButton">{content[lang].cta}</Link>
        </section>
      </main>
      <Footer currentLang={currentLang} />
      <CookieBanner />
    </div>
  );
}

function App() {
  const [currentLang, setCurrentLang] = useState(() => {
    // Initialize with saved language preference
    return localStorage.getItem('siteLanguage') || 'en';
  });

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('siteLanguage', lang);
  };

  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<HomePage currentLang={currentLang} handleLanguageChange={handleLanguageChange} />} />
        <Route path="/service/:serviceId" element={<ServicePageWrapper currentLang={currentLang} handleLanguageChange={handleLanguageChange} />} />
        <Route path="/thank-you" element={<ThankYouPage currentLang={currentLang} handleLanguageChange={handleLanguageChange} forcedLang="en" />} />
        <Route path="/hvala" element={<ThankYouPage currentLang={currentLang} handleLanguageChange={handleLanguageChange} forcedLang="hr" />} />
        <Route path="*" element={<NotFoundPage currentLang={currentLang} handleLanguageChange={handleLanguageChange} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
