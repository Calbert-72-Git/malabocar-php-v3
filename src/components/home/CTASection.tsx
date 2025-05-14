
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-automotive-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para encontrar su coche ideal?</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button asChild size="lg" className="bg-white text-automotive-700 hover:text-automotive-800 hover:bg-gray-100 border-transparent">
                <Link to="/cars">Ver catálogo</Link>
              </Button>
            </div>
            <div className="ml-4 inline-flex rounded-md shadow">
              <Button asChild size="lg" variant="outline" className="bg-automotive-800 text-white border-white hover:bg-automotive-600">
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
