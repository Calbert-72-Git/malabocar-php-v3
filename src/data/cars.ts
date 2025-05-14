import { Car } from '../types/car';
import { cars } from './mockData';

/**
 * Obtiene un coche por su ID
 * @param id El ID del coche a buscar
 * @returns El coche encontrado o undefined si no existe
 */
export const getCarById = (id: string): Car | undefined => {
  return cars.find(car => car.id === id);
};

/**
 * Obtiene una lista de coches filtrados
 * @param filters Filtros a aplicar a la lista de coches
 * @returns Lista de coches filtrados
 */
export const getFilteredCars = (filters: Record<string, any>): Car[] => {
  let filteredCars = [...cars];
  
  // Lógica de filtrado existente
  
  return filteredCars;
};

/**
 * Obtiene el ID del siguiente coche en la lista
 * @param currentId El ID del coche actual
 * @returns El ID del siguiente coche o undefined si es el último
 */
export const getNextCarId = (currentId: string): string | undefined => {
  const currentIndex = cars.findIndex(car => car.id === currentId);
  if (currentIndex < 0 || currentIndex >= cars.length - 1) {
    return undefined;
  }
  return cars[currentIndex + 1].id;
};

export const getAllCars = (): Car[] => {
  return cars;
};
