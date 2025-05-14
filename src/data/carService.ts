
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
