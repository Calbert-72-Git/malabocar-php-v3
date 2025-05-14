
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            <span className="block">¿Listo para encontrar su coche ideal?</span>
          </h2>
          <div className={styles.buttonGroup}>
            <div className="inline-flex rounded-md shadow">
              <Button asChild size="lg" className={styles.primaryButton}>
                <Link to="/cars">Ver catálogo</Link>
              </Button>
            </div>
            <div className="ml-4 inline-flex rounded-md shadow">
              <Button asChild size="lg" variant="outline" className={styles.secondaryButton}>
                <Link to="/contact">Contactar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
