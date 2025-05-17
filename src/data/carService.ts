
import { Car } from "../types/car";
import { cars } from "./cars";

/**
 * Obtiene un coche por su ID
 */
export const getCarById = (id: string): Car | undefined => {
  return cars.find(car => car.id === id);
};

/**
 * Filtra coches según criterios
 * @param search Cadena de búsqueda para marca o modelo
 * @param minPrice Precio mínimo
 * @param maxPrice Precio máximo
 * @param brand Marca específica (opcional)
 * @returns Lista de coches filtrados
 */
export const getFilteredCars = (
  search: string = "", 
  minPrice: number = 0, 
  maxPrice: number = 1000000,
  brand: string = ""
): Car[] => {
  return cars.filter(car => {
    const matchesSearch = 
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase());
    
    const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
    
    const matchesBrand = brand === "" || car.brand === brand;
    
    return matchesSearch && matchesPrice && matchesBrand;
  });
};

/**
 * Actualiza un vehículo existente o agrega uno nuevo si no existe
 * @param car Objeto del coche a actualizar
 * @returns Booleano indicando si fue exitoso
 */
export const updateCar = (car: Car): boolean => {
  try {
    const index = cars.findIndex(c => c.id === car.id);
    if (index >= 0) {
      // Actualizar coche existente
      cars[index] = { ...car };
    } else {
      // Agregar nuevo coche
      cars.push(car);
    }
    return true;
  } catch (error) {
    console.error("Error al actualizar el vehículo:", error);
    return false;
  }
};

/**
 * Elimina un vehículo por su ID
 * @param id ID del vehículo a eliminar
 * @returns Booleano indicando si fue exitoso
 */
export const deleteCar = (id: string): boolean => {
  try {
    const index = cars.findIndex(car => car.id === id);
    if (index >= 0) {
      cars.splice(index, 1);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
    return false;
  }
};

/**
 * Genera un nuevo ID para un vehículo
 * @returns String con ID único
 */
export const generateCarId = (): string => {
  const lastId = Math.max(...cars.map(car => parseInt(car.id)), 0);
  return (lastId + 1).toString();
};

/**
 * Procesa y guarda una imagen (en un sistema real, esto subiría la imagen a un servidor)
 * @param imageData Datos de la imagen en formato base64 o URL
 * @returns URL de la imagen procesada
 */
export const processImageUpload = (imageData: string): string => {
  // Si no hay datos, devolver string vacío
  if (!imageData) return '';
  
  // Si es una URL válida, devolverla directamente
  if (imageData.startsWith('http') || imageData.startsWith('https')) {
    return imageData;
  }
  
  // Si es una imagen en base64, en una implementación real, aquí se enviaría a un servidor
  // y se devolvería la URL. Para esta demostración, simplemente devolvemos los datos base64.
  if (imageData.startsWith('data:image/')) {
    // En un entorno de producción, aquí procesaríamos la imagen y obtendríamos una URL
    return imageData;
  }
  
  // Si no es ninguno de los casos anteriores, devolver un placeholder
  return 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
};
