
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { getAllCars } from '../data/cars';
import { CarCard } from '../components/cars/CarCard';

const Index = () => {
  // Get 3 featured cars
  const featuredCars = getAllCars().slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
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
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Ofrecemos los mejores servicios para nuestros clientes.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-automotive-100 text-automotive-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Garantía de calidad</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Todos nuestros vehículos pasan por rigurosas inspecciones de calidad antes de ser puestos a la venta.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-automotive-100 text-automotive-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Mejores precios</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Trabajamos con los mejores proveedores para ofrecerle los precios más competitivos del mercado.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-automotive-100 text-automotive-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Servicio postventa</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Ofrecemos un servicio postventa personalizado para asegurar su satisfacción a largo plazo.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cars Section */}
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
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Descubra por qué nuestros clientes confían en nosotros.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <p className="text-gray-600">
                "Excelente servicio, me ayudaron a encontrar el coche perfecto para mis necesidades y a un precio increíble."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-automotive-200 flex items-center justify-center text-automotive-600 font-semibold">
                    AM
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Ana Martínez</p>
                  <p className="text-sm text-gray-500">Madrid</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <p className="text-gray-600">
                "El proceso de compra fue rápido y sencillo. El equipo de ventas fue muy profesional y atento."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-automotive-200 flex items-center justify-center text-automotive-600 font-semibold">
                    JL
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Juan López</p>
                  <p className="text-sm text-gray-500">Barcelona</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <p className="text-gray-600">
                "Hice un encargo especial y cumplieron con todas mis expectativas. Definitivamente volveré a comprar con ellos."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-automotive-200 flex items-center justify-center text-automotive-600 font-semibold">
                    MG
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">María García</p>
                  <p className="text-sm text-gray-500">Valencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
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
    </Layout>
  );
};

export default Index;
