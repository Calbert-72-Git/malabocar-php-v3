
import React from 'react';

interface Testimonial {
  text: string;
  initials: string;
  name: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Excelente servicio, me ayudaron a encontrar el coche perfecto para mis necesidades y a un precio increíble.",
    initials: "AM",
    name: "Ana Martínez",
    location: "Madrid"
  },
  {
    text: "El proceso de compra fue rápido y sencillo. El equipo de ventas fue muy profesional y atento.",
    initials: "JL",
    name: "Juan López",
    location: "Barcelona"
  },
  {
    text: "Hice un encargo especial y cumplieron con todas mis expectativas. Definitivamente volveré a comprar con ellos.",
    initials: "MG",
    name: "María García",
    location: "Valencia"
  }
];

const TestimonialsSection = () => {
  return (
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
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
      <p className="text-gray-600">"{testimonial.text}"</p>
      <div className="mt-4 flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-automotive-200 flex items-center justify-center text-automotive-600 font-semibold">
            {testimonial.initials}
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
