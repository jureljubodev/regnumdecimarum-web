import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ServicePage from './components/ServicePage';
import './App.css';

const routerBasename = import.meta.env.BASE_URL === '/'
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, '');

function HomePage({ currentLang, handleLanguageChange, showLoader, loaded }: { 
  currentLang: string; 
  handleLanguageChange: (lang: string) => void;
  showLoader: boolean;
  loaded: boolean;
}) {
  return (
    <>
      {showLoader && (
        <div className={`page-loader ${loaded ? 'hide' : ''}`}>
          <div className="loader-ring"></div>
        </div>
      )}
      <div className={`page-shell ${loaded ? 'visible' : ''}`}>
        <Topbar onLanguageChange={handleLanguageChange} />
        <main>
          <Hero currentLang={currentLang} />
          <Services currentLang={currentLang} />
          <Contact currentLang={currentLang} />
        </main>
        <Footer currentLang={currentLang} />
        <CookieBanner />
      </div>
    </>
  );
}

function ServicePageWrapper({ currentLang, handleLanguageChange, showLoader, loaded }: { 
  currentLang: string; 
  handleLanguageChange: (lang: string) => void;
  showLoader: boolean;
  loaded: boolean;
}) {
  return (
    <>
      {showLoader && (
        <div className={`page-loader ${loaded ? 'hide' : ''}`}>
          <div className="loader-ring"></div>
        </div>
      )}
      <div className={`page-shell ${loaded ? 'visible' : ''}`}>
        <Topbar onLanguageChange={handleLanguageChange} />
        <main>
          <ServicePage currentLang={currentLang} />
        </main>
        <Footer currentLang={currentLang} />
        <CookieBanner />
      </div>
    </>
  );
}

function NotFoundPage({ currentLang, handleLanguageChange, showLoader, loaded }: {
  currentLang: string;
  handleLanguageChange: (lang: string) => void;
  showLoader: boolean;
  loaded: boolean;
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
    <>
      {showLoader && (
        <div className={`page-loader ${loaded ? 'hide' : ''}`}>
          <div className="loader-ring"></div>
        </div>
      )}
      <div className={`page-shell ${loaded ? 'visible' : ''}`}>
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
    </>
  );
}

function ThankYouPage({ currentLang, handleLanguageChange, showLoader, loaded, forcedLang }: {
  currentLang: string;
  handleLanguageChange: (lang: string) => void;
  showLoader: boolean;
  loaded: boolean;
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
    <>
      {showLoader && (
        <div className={`page-loader ${loaded ? 'hide' : ''}`}>
          <div className="loader-ring"></div>
        </div>
      )}
      <div className={`page-shell ${loaded ? 'visible' : ''}`}>
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
    </>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [currentLang, setCurrentLang] = useState(() => {
    // Initialize with saved language preference
    return localStorage.getItem('siteLanguage') || 'en';
  });

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setLoaded(true));
    const timeoutId = window.setTimeout(() => setShowLoader(false), 500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('siteLanguage', lang);
  };

  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<HomePage currentLang={currentLang} handleLanguageChange={handleLanguageChange} showLoader={showLoader} loaded={loaded} />} />
        <Route path="/service/:serviceId" element={<ServicePageWrapper currentLang={currentLang} handleLanguageChange={handleLanguageChange} showLoader={showLoader} loaded={loaded} />} />
        <Route path="/thank-you" element={<ThankYouPage currentLang={currentLang} handleLanguageChange={handleLanguageChange} showLoader={showLoader} loaded={loaded} forcedLang="en" />} />
        <Route path="/hvala" element={<ThankYouPage currentLang={currentLang} handleLanguageChange={handleLanguageChange} showLoader={showLoader} loaded={loaded} forcedLang="hr" />} />
        <Route path="*" element={<NotFoundPage currentLang={currentLang} handleLanguageChange={handleLanguageChange} showLoader={showLoader} loaded={loaded} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
