
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Settings, Award, Heart, Shield, Wrench } from 'lucide-react';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in">
    <CardHeader className="pb-2">
      <div className="bg-automotive-100 w-12 h-12 rounded-lg flex items-center justify-center text-automotive-600 mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

const ServicesPage = () => {
  const services = [
    {
      icon: Clock,
      title: "Entregas rápidas",
      description: "Entrega personalizada de su vehículo en un plazo de 24 a 48 horas tras la confirmación de la compra."
    },
    {
      icon: Settings,
      title: "Mantenimiento completo",
      description: "Servicio de mantenimiento integral con técnicos especializados y uso de repuestos originales."
    },
    {
      icon: Award,
      title: "Garantía extendida",
      description: "Todos nuestros vehículos incluyen una garantía mínima de 2 años ampliable según el modelo."
    },
    {
      icon: Heart,
      title: "Cuidado personalizado",
      description: "Asesoramiento personalizado para el mantenimiento y cuidado específico de su vehículo."
    },
    {
      icon: Shield,
      title: "Seguro a medida",
      description: "Ofrecemos seguros personalizados con las mejores coberturas adaptadas a sus necesidades."
    },
    {
      icon: Wrench,
      title: "Talleres propios",
      description: "Red de talleres propios con tecnología avanzada para cualquier tipo de reparación o mantenimiento."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En AutoVenta ofrecemos una amplia gama de servicios para garantizar la mejor experiencia 
            con su vehículo antes, durante y después de la compra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
