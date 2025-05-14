
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAllCars } from '@/data/cars';
import { CarCard } from '@/components/cars/CarCard';

const FeaturedCarsSection = () => {
  // Get 3 featured cars
  const featuredCars = getAllCars().slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Vehículos destacados
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Explore nuestra selección de vehículos más populares.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-automotive-600 hover:bg-automotive-700">
            <Link to="/cars">Ver todos los coches</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;
