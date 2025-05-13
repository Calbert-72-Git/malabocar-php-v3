
import { cars } from "./mockData";

/**
 * Obtiene todas las marcas disponibles
 */
export const getAvailableBrands = (): string[] => {
  const brands = new Set(cars.map(car => car.brand));
  return Array.from(brands);
};
