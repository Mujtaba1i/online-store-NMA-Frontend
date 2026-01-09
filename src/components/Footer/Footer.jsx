import { useState } from 'react';
import styles from './Footer.module.css';

function Footer() {
  const [easterEgg, setEasterEgg] = useState(null);

  const handleLeftEasterEgg = () => {
    setEasterEgg('help');
    setTimeout(() => setEasterEgg(null), 2000);
  };

  const handleRightEasterEgg = () => {
    setEasterEgg('mamamia');
    setTimeout(() => setEasterEgg(null), 2000);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <div 
            className={styles.easterEggButton} >
            <p className={styles.easterEggText}>Help!</p>
          </div>
        </div>
        
        <div className={styles.footerSection}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} NMAZON copyright
          </div>
        </div>
        
        <div className={styles.footerSection}>
          <div className={styles.easterEggButton}>
            <p className={styles.easterEggText}>MAMAMIA!</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;