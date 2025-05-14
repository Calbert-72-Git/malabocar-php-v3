
import React from 'react';
import styles from './TestimonialsSection.module.css';

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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Lo que dicen nuestros clientes
          </h2>
          <p className={styles.description}>
            Descubra por qué nuestros clientes confían en nosotros.
          </p>
        </div>
        
        <div className={styles.testimonialGrid}>
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
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialText}>"{testimonial.text}"</p>
      <div className={styles.testimonialProfile}>
        <div className={styles.testimonialInitials}>
          {testimonial.initials}
        </div>
        <div className={styles.testimonialInfo}>
          <p className={styles.testimonialName}>{testimonial.name}</p>
          <p className={styles.testimonialLocation}>{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
