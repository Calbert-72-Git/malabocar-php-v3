
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
