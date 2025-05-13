
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  images: string[];
  features: string[];
  specs: {
    engine: string;
    transmission: string;
    fuelType: string;
    mileage: number;
    exteriorColor: string;
    interiorColor: string;
  };
  stock: number;
}

export type CartItem = {
  car: Car;
  quantity: number;
};
