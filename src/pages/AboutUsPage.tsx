
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-gray-600">
              Conoce más sobre AutoVenta, nuestra historia y nuestro compromiso con nuestros clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-lg overflow-hidden animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1374&auto=format&fit=crop" 
                alt="Concesionario AutoVenta" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col justify-center animate-fade-in" style={{animationDelay: "0.2s"}}>
              <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
              <p className="mb-4">
                Fundada en 2010, AutoVenta nació con la misión de transformar la experiencia de compra de vehículos en España. 
                Comenzamos como un pequeño concesionario familiar y hemos crecido hasta convertirnos en uno de los 
                referentes del sector automovilístico.
              </p>
              <p>
                Nuestro compromiso con la calidad, la transparencia y el servicio personalizado nos ha permitido 
                expandirnos a más de 15 ciudades en todo el país, manteniendo siempre la filosofía de atención 
                cercana y profesional que nos caracteriza.
              </p>
            </div>
          </div>

          <div className="mb-12 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <h2 className="text-2xl font-bold mb-4 text-center">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="font-bold text-xl mb-2 text-automotive-600">Excelencia</h3>
                <p>Buscamos la máxima calidad en cada uno de nuestros vehículos y servicios.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="font-bold text-xl mb-2 text-automotive-600">Confianza</h3>
                <p>Construimos relaciones duraderas basadas en la honestidad y transparencia.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="font-bold text-xl mb-2 text-automotive-600">Innovación</h3>
                <p>Estamos siempre a la vanguardia de las últimas tendencias y tecnologías del sector.</p>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in" style={{animationDelay: "0.4s"}}>
            <h2 className="text-2xl font-bold mb-4">¿Listo para encontrar tu vehículo ideal?</h2>
            <Button asChild className="mt-4 bg-automotive-600 hover:bg-automotive-700">
              <Link to="/cars">Explorar Catálogo</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
