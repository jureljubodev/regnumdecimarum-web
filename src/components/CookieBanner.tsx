import React, { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookiesAccepted')) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.cookieBanner}>
      <p>We use minimal cookies to keep this experience seamless and elegant. <a href="#cookies">Learn more</a></p>
      <button onClick={acceptCookies}>Accept</button>
    </div>
  );
};

export default CookieBanner;