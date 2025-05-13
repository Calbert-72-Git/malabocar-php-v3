
import { Car } from "../types/car";

export const cars: Car[] = [
  {
    id: "1",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 45000,
    description: "The Mercedes-Benz C-Class is a line of compact executive cars produced by Mercedes-Benz. Introduced in 1993 as a replacement for the 190 range, the C-Class has been available with a 'complex technology' option that includes innovations such as a navigation system.",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1227&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop"
    ],
    features: [
      "Leather Seats", 
      "Navigation System", 
      "Bluetooth", 
      "Backup Camera",
      "Sunroof",
      "Heated Seats"
    ],
    specs: {
      engine: "2.0L Turbocharged I4",
      transmission: "9-Speed Automatic",
      fuelType: "Gasoline",
      mileage: 0,
      exteriorColor: "Polar White",
      interiorColor: "Black"
    },
    stock: 5
  },
  {
    id: "2",
    brand: "BMW",
    model: "5 Series",
    year: 2023,
    price: 55000,
    description: "The BMW 5 Series is an executive car manufactured by BMW since 1972. It is the successor to the New Class Sedans and is currently in its seventh generation. The 5 Series has been produced in sedan and wagon configurations.",
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1228&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543796076-c3683f1cb243?q=80&w=1469&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523983254932-c7e93e12a4c4?q=80&w=1172&auto=format&fit=crop"
    ],
    features: [
      "Premium Leather", 
      "iDrive System", 
      "Harman Kardon Sound", 
      "Parking Assistant",
      "Digital Dashboard",
      "Wireless Charging"
    ],
    specs: {
      engine: "3.0L Turbocharged I6",
      transmission: "8-Speed Automatic",
      fuelType: "Gasoline",
      mileage: 0,
      exteriorColor: "Alpine White",
      interiorColor: "Cognac"
    },
    stock: 3
  },
  {
    id: "3",
    brand: "Audi",
    model: "A6",
    year: 2023,
    price: 58000,
    description: "The Audi A6 is an executive car made by the German automaker Audi. The A6 has been in production since 1994, and is now in its fifth generation. The A6 is available as a sedan and wagon.",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1169&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1171&auto=format&fit=crop"
    ],
    features: [
      "MMI Navigation", 
      "Bang & Olufsen Sound", 
      "Virtual Cockpit", 
      "Ambient Lighting",
      "Quattro All-Wheel Drive",
      "Adaptive Cruise Control"
    ],
    specs: {
      engine: "3.0L TFSI V6",
      transmission: "7-Speed S tronic",
      fuelType: "Gasoline",
      mileage: 0,
      exteriorColor: "Mythos Black",
      interiorColor: "Granite Gray"
    },
    stock: 2
  },
  {
    id: "4",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 47000,
    description: "The Tesla Model 3 is an all-electric four-door sedan developed by Tesla. The Model 3 Standard Range Plus version delivers 263 miles of range, while the Long Range delivers 353 miles.",
    images: [
      "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544558635-667480601430?q=80&w=1287&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562053689-a9b52cb48497?q=80&w=1188&auto=format&fit=crop"
    ],
    features: [
      "Autopilot", 
      "15-inch Touchscreen", 
      "Glass Roof", 
      "Minimalist Interior",
      "Supercharging Capability",
      "Over-the-Air Updates"
    ],
    specs: {
      engine: "Electric Motor",
      transmission: "Single-Speed",
      fuelType: "Electric",
      mileage: 0,
      exteriorColor: "Pearl White",
      interiorColor: "Black"
    },
    stock: 7
  },
  {
    id: "5",
    brand: "Lexus",
    model: "ES",
    year: 2023,
    price: 42000,
    description: "The Lexus ES is a series of compact, then mid-size, and later full-size luxury cars sold by Lexus, the luxury division of Toyota since 1989. The ES, which stands for 'Executive Sedan,' is now in its seventh generation.",
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1336&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533559662493-65ffce48cc6f?q=80&w=1170&auto=format&fit=crop"
    ],
    features: [
      "Leather Trimmed Seats", 
      "Mark Levinson Audio", 
      "Panoramic Roof", 
      "Head-Up Display",
      "Safety System+",
      "Climate Concierge"
    ],
    specs: {
      engine: "3.5L V6",
      transmission: "8-Speed Automatic",
      fuelType: "Gasoline",
      mileage: 0,
      exteriorColor: "Atomic Silver",
      interiorColor: "Flaxen"
    },
    stock: 4
  },
  {
    id: "6",
    brand: "Volkswagen",
    model: "Golf GTI",
    year: 2023,
    price: 36000,
    description: "The Volkswagen Golf GTI is a hot hatch version of the Volkswagen Golf that's been in production for more than 40 years. It combines the practicality of a hatchback with sporty performance, making it a popular choice for driving enthusiasts.",
    images: [
      "https://images.unsplash.com/photo-1617814065893-00757124d025?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=1287&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611607368853-31c6d82736a7?q=80&w=1476&auto=format&fit=crop"
    ],
    features: [
      "Sport Seats", 
      "LED Headlights", 
      "Digital Cockpit", 
      "Adaptive Chassis Control",
      "Fender Premium Audio",
      "Keyless Access"
    ],
    specs: {
      engine: "2.0L Turbocharged I4",
      transmission: "6-Speed Manual",
      fuelType: "Gasoline",
      mileage: 0,
      exteriorColor: "Tornado Red",
      interiorColor: "Titan Black"
    },
    stock: 6
  }
];
