
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div 
        className={styles.heroBackground}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop')",
        }}
      />
      <div className={styles.heroContent}>
        <h1 className={`${styles.heroTitle} animate-fade-in`}>
          Encuentre su coche perfecto
        </h1>
        <p className={`${styles.heroDescription} animate-fade-in`} style={{animationDelay: "0.2s"}}>
          Descubra nuestra amplia selección de vehículos de alta calidad con las mejores opciones de financiación y servicio postventa.
        </p>
        <div className={`${styles.heroButtons} animate-fade-in`} style={{animationDelay: "0.4s"}}>
          <Button asChild size="lg" className="bg-automotive-600 hover:bg-automotive-700">
            <Link to="/cars">Ver catálogo</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            <Link to="/orders">Hacer un encargo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
