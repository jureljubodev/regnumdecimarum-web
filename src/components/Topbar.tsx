import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Topbar.module.css';

interface TopbarProps {
  onLanguageChange: (lang: string) => void;
}

const Topbar: React.FC<TopbarProps> = ({ onLanguageChange }) => {
  const [currentLang, setCurrentLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('siteLanguage') || 'en';
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    onLanguageChange(lang);
    setDropdownOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const languageMeta = {
    en: { label: 'EN', flag: '🇬🇧' },
    hr: { label: 'HR', flag: '🇭🇷' }
  };

  const navContent = {
    en: { home: 'Home', services: 'Services', contact: 'Contact' },
    hr: { home: 'Početna', services: 'Usluge', contact: 'Kontakt' }
  };

  const meta = languageMeta[currentLang as keyof typeof languageMeta] || languageMeta.en;
  const navLabels = navContent[currentLang as keyof typeof navContent] || navContent.en;
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <header className={styles.topbar}>
      <Link to="/" className={styles.brandLink} onClick={closeMenu}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>RD</span>
          <p className={styles.brandTitle}>Regnum Decimarum</p>
        </div>
      </Link>

      <div className={styles.topbarActions}>
        <nav className={`${styles.navbar} ${menuOpen ? styles.open : ''}`}>
          <a href={`${baseUrl}#home`} onClick={closeMenu}>{navLabels.home}</a>
          <a href={`${baseUrl}#services`} onClick={closeMenu}>{navLabels.services}</a>
          <a href={`${baseUrl}#contact`} onClick={closeMenu}>{navLabels.contact}</a>
        </nav>

        <div className={styles.langDropdownWrapper}>
          <button
            className={styles.langCurrent}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
          >
            <span className={styles.flag}>{meta.flag}</span>
            <span className={styles.langLabel}>{meta.label}</span>
            <span className={styles.dropdownArrow}>▾</span>
          </button>
          <div className={`${styles.langDropdown} ${dropdownOpen ? styles.open : ''}`} role="listbox">
            <button className={`${styles.langOption} ${currentLang === 'en' ? styles.active : ''}`} onClick={() => handleLanguageChange('en')} role="option">
              <span className={styles.flag}>🇬🇧</span> English
            </button>
            <button className={`${styles.langOption} ${currentLang === 'hr' ? styles.active : ''}`} onClick={() => handleLanguageChange('hr')} role="option">
              <span className={styles.flag}>🇭🇷</span> Hrvatski
            </button>
          </div>
        </div>

        <button className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;