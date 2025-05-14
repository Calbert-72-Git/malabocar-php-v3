
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAllCars } from '@/data/cars';
import { CarCard } from '@/components/cars/CarCard';
import styles from './FeaturedCarsSection.module.css';

const FeaturedCarsSection = () => {
  // Get 3 featured cars
  const featuredCars = getAllCars().slice(0, 3);
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Vehículos destacados
          </h2>
          <p className={styles.description}>
            Explore nuestra selección de vehículos más populares.
          </p>
        </div>
        
        <div className={styles.carGrid}>
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        <div className={styles.viewAllContainer}>
          <Button asChild size="lg" className="bg-automotive-600 hover:bg-automotive-700">
            <Link to="/cars">Ver todos los coches</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;
