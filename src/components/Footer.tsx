import { useState, useEffect } from 'react';
import styles from './Footer.module.css';

type PolicyKey = 'privacy' | 'terms' | 'cookies';

interface FooterProps {
  currentLang?: string;
}

const Footer: React.FC<FooterProps> = ({ currentLang = 'en' }) => {
  const policyContent: Record<PolicyKey, Record<'en' | 'hr', { label: string; title: string; paragraphs: string[] }>> = {
    privacy: {
      en: {
        label: 'Privacy',
        title: 'Privacy Policy',
        paragraphs: [
          '<strong>Information Collection:</strong> Regnum Decimarum respects your privacy and collects only the <em>minimum data</em> required to provide this site experience. We do not sell your personal information.',
          '<strong>Data Usage:</strong> Information is collected through contact forms and cookies needed to support functional site behavior. All form submissions are used <em>only</em> to respond to inquiries and manage service requests.',
          '<strong>Your Rights:</strong> You can request removal of your contact information at any time by emailing <strong>hello@regnumdecimarum.com</strong>.',
        ],
      },
      hr: {
        label: 'Privatnost',
        title: 'Politika Privatnosti',
        paragraphs: [
          '<strong>Prikupljanje Informacija:</strong> Regnum Decimarum poštuje vašu privatnost i prikuplja samo <em>minimalne podatke</em> potrebne za pružanje iskustva ove stranice. Ne prodajemo vaše osobne podatke.',
          '<strong>Korištenje Podataka:</strong> Informacije se prikupljaju putem kontaktnih obrazaca i kolačića potrebnih za podršku funkcionalnom ponašanju stranice. Sve predaje obrazaca koriste se <em>isključivo</em> za odgovaranje na upite i upravljanje zahtjevima za usluge.',
          '<strong>Vaša Prava:</strong> Možete zatražiti uklanjanje svojih kontaktnih podataka u bilo kojem trenutku slanjem e-pošte na <strong>hello@regnumdecimarum.com</strong>.',
        ],
      }
    },
    terms: {
      en: {
        label: 'Terms',
        title: 'Terms of Use',
        paragraphs: [
          '<strong>Website Purpose:</strong> This website is provided for <em>informational purposes only</em>. Use of the site does not create a client relationship, nor does it constitute an offer to provide services.',
          '<strong>Content Disclaimer:</strong> Content is provided <em>as-is</em> and may be updated without notice. Regnum Decimarum is not responsible for third-party content or for decisions made based on information found on this site.',
          '<strong>User Agreement:</strong> By using this site, you agree to use it <em>responsibly</em> and to contact the team directly for any contractual or service-specific arrangements.',
        ],
      },
      hr: {
        label: 'Uvjeti',
        title: 'Uvjeti Korištenja',
        paragraphs: [
          '<strong>Svrha Web Stranice:</strong> Ova web stranica je pružena <em>isključivo u informativne svrhe</em>. Korištenje stranice ne stvara odnos s klijentom, niti predstavlja ponudu za pružanje usluga.',
          '<strong>Izjava o Sadržaju:</strong> Sadržaj se pruža <em>takav kakav jest</em> i može se ažurirati bez prethodne obavijesti. Regnum Decimarum nije odgovoran za sadržaj trećih strana ili za odluke donesene na temelju informacija pronađenih na ovoj stranici.',
          '<strong>Korisnički Ugovor:</strong> Korištenjem ove stranice slažete se da je koristite <em>odgovorno</em> i da izravno kontaktirate tim za bilo kakve ugovorne ili specifične aranžmane vezane uz usluge.',
        ],
      }
    },
    cookies: {
      en: {
        label: 'Cookies',
        title: 'Cookie Policy',
        paragraphs: [
          '<strong>Cookie Usage:</strong> This site uses cookies for <em>basic functionality</em>, analytics, and user experience improvements. Cookies help maintain session state and keep the interface responsive.',
          '<strong>Privacy Assurance:</strong> Only <em>essential and minimal</em> cookies are used. No third-party tracking cookies are deployed without explicit consent, and cookies are not used to build user profiles.',
          '<strong>User Control:</strong> If you prefer not to allow cookies, you can manage your browser settings accordingly. The site will still function, but some features may be <em>limited</em>.',
        ],
      },
      hr: {
        label: 'Kolačići',
        title: 'Politika Kolačića',
        paragraphs: [
          '<strong>Korištenje Kolačića:</strong> Ova stranica koristi kolačiće za <em>osnovnu funkcionalnost</em>, analitiku i poboljšanja korisničkog iskustva. Kolačići pomažu održavati stanje sesije i održavati sučelje responzivnim.',
          '<strong>Jamstvo Privatnosti:</strong> Koriste se samo <em>bitni i minimalni</em> kolačići. Ne implementiraju se kolačići za praćenje trećih strana bez izričitog pristanka, a kolačići se ne koriste za izgradnju korisničkih profila.',
          '<strong>Korisnička Kontrola:</strong> Ako preferirate da ne dopustite kolačiće, možete upravljati postavkama svog preglednika u skladu s tim. Stranica će i dalje funkcionirati, ali neke značajke mogu biti <em>ograničene</em>.',
        ],
      }
    },
  };

  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  const lang = currentLang as 'en' | 'hr';

  const openPolicy = (policy: PolicyKey) => {
    setActivePolicy(policy);
    window.scrollTo({ top: 1150, left: 0, behavior: 'instant' });
  // DON'T TOUCH TOP scrolll postition, it is perfect like this
  };
  const closePolicy = () => setActivePolicy(null);

  useEffect(() => {
    if (activePolicy) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closePolicy();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activePolicy]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePolicy();
    }
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerCopy}>
          <p>&copy; {new Date().getFullYear()} Regnum Decimarum. Luxury service portfolio with a sharp, modern edge.</p>
        </div>
        <div className={styles.footerLinks}>
          {(['privacy', 'terms', 'cookies'] as PolicyKey[]).map((policy) => (
            <button
              key={policy}
              type="button"
              className={styles.linkButton}
              onClick={() => openPolicy(policy)}
            >
              {policyContent[policy][lang].label}
            </button>
          ))}
        </div>
      </footer>

      {activePolicy && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="policy-title" onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 id="policy-title">{policyContent[activePolicy][lang].title}</h2>
              <button type="button" className={styles.modalClose} onClick={closePolicy} aria-label="Close">
                ×
              </button>
            </div>
            <div className={styles.policyBody}>
              {policyContent[activePolicy][lang].paragraphs.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;