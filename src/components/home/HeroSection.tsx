
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-start justify-center min-h-[70vh]">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in">
          Encuentre su coche perfecto
        </h1>
        <p className="max-w-xl mt-6 text-xl animate-fade-in" style={{animationDelay: "0.2s"}}>
          Descubra nuestra amplia selección de vehículos de alta calidad con las mejores opciones de financiación y servicio postventa.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
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
