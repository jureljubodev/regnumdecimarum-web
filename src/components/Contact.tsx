import React from 'react';
import styles from './Contact.module.css';

interface ContactProps {
  currentLang?: string;
}

const Contact: React.FC<ContactProps> = ({ currentLang = 'en' }) => {
  const content = {
    eyebrow: {
      en: 'Get in touch',
      hr: 'Kontaktirajte nas'
    },
    heading: {
      en: 'Ready to begin?',
      hr: 'Spremni za početak?'
    },
    description: {
      en: 'Reach out for tailored service packages, strategic collaborations, or a private consultation.',
      hr: 'Javite se za prilagođene pakete usluga, strateška partnerstva ili privatnu konzultaciju.'
    },
    labels: {
      name: { en: 'Name', hr: 'Ime' },
      email: { en: 'Email', hr: 'Email' },
      message: { en: 'Message', hr: 'Poruka' },
      send: { en: 'Send message', hr: 'Pošalji poruku' }
    },
    contact: {
      email: { en: 'Email:', hr: 'Email:' }
    }
  };

  const lang = currentLang as 'en' | 'hr';
  const thankYouPath = `${import.meta.env.BASE_URL}${lang === 'hr' ? 'hvala' : 'thank-you'}`;

  return (
    <section className={styles.section} id="contact">
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>{content.eyebrow[lang]}</p>
        <h2>{content.heading[lang]}</h2>
      </div>
      <div className={styles.contactGrid}>
        <div className={styles.contactCard}>
          <p className={styles.eyebrow}>{content.eyebrow[lang]}</p>
          <h3>{content.heading[lang]}</h3>
          <p>{content.description[lang]}</p>
          <div className={styles.contactList}>
            <div>
              <span>{content.contact.email[lang]}</span>
              <strong>info@regnumdecimarum.com</strong>
            </div>
          </div>
        </div>

        <div className={styles.contactCard}>
          <form
            className={styles.contactForm}
            name="contact"
            method="POST"
            action={thankYouPath}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="language" value={lang} />
            <label>
              <span>{content.labels.name[lang]}</span>
              <input type="text" name="name" placeholder="" required />
            </label>
            <label>
              <span>{content.labels.email[lang]}</span>
              <input type="email" name="email" placeholder="" required />
            </label>
            <label>
              <span>{content.labels.message[lang]}</span>
              <textarea name="message" rows={5} placeholder="" required></textarea>
            </label>
            <button className={styles.btnPrimary} type="submit">{content.labels.send[lang]}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;