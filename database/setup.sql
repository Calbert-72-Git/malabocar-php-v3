
-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS malabocar;
USE malabocar;

-- Crear tabla de coches
CREATE TABLE IF NOT EXISTS cars (
  id VARCHAR(50) PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de imágenes de coches
CREATE TABLE IF NOT EXISTS car_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_id VARCHAR(50) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  position INT NOT NULL DEFAULT 0,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Crear tabla de características de coches
CREATE TABLE IF NOT EXISTS car_features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_id VARCHAR(50) NOT NULL,
  feature_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Crear tabla de especificaciones de coches
CREATE TABLE IF NOT EXISTS car_specs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_id VARCHAR(50) NOT NULL,
  engine VARCHAR(100) NOT NULL,
  transmission VARCHAR(100) NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  mileage INT NOT NULL DEFAULT 0,
  exterior_color VARCHAR(50) NOT NULL,
  interior_color VARCHAR(50) NOT NULL,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  comments TEXT,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de items de pedido
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  car_id VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo para la primera ejecución
-- Mercedes-Benz C-Class
INSERT IGNORE INTO cars (id, brand, model, year, price, description, stock) VALUES 
('1', 'Mercedes-Benz', 'C-Class', 2023, 45000, 'The Mercedes-Benz C-Class is a line of compact executive cars produced by Mercedes-Benz. Introduced in 1993 as a replacement for the 190 range, the C-Class has been available with a "complex technology" option that includes innovations such as a navigation system.', 5);

INSERT IGNORE INTO car_images (car_id, image_url, position) VALUES 
('1', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1170&auto=format&fit=crop', 0),
('1', 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1227&auto=format&fit=crop', 1),
('1', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop', 2);

INSERT IGNORE INTO car_features (car_id, feature_name) VALUES 
('1', 'Leather Seats'),
('1', 'Navigation System'),
('1', 'Bluetooth'),
('1', 'Backup Camera'),
('1', 'Sunroof'),
('1', 'Heated Seats');

INSERT IGNORE INTO car_specs (car_id, engine, transmission, fuel_type, mileage, exterior_color, interior_color) VALUES 
('1', '2.0L Turbocharged I4', '9-Speed Automatic', 'Gasoline', 0, 'Polar White', 'Black');

-- BMW 5 Series
INSERT IGNORE INTO cars (id, brand, model, year, price, description, stock) VALUES 
('2', 'BMW', '5 Series', 2023, 55000, 'The BMW 5 Series is an executive car manufactured by BMW since 1972. It is the successor to the New Class Sedans and is currently in its seventh generation. The 5 Series has been produced in sedan and wagon configurations.', 3);

INSERT IGNORE INTO car_images (car_id, image_url, position) VALUES 
('2', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1228&auto=format&fit=crop', 0),
('2', 'https://images.unsplash.com/photo-1543796076-c3683f1cb243?q=80&w=1469&auto=format&fit=crop', 1),
('2', 'https://images.unsplash.com/photo-1523983254932-c7e93e12a4c4?q=80&w=1172&auto=format&fit=crop', 2);

INSERT IGNORE INTO car_features (car_id, feature_name) VALUES 
('2', 'Premium Leather'),
('2', 'iDrive System'),
('2', 'Harman Kardon Sound'),
('2', 'Parking Assistant'),
('2', 'Digital Dashboard'),
('2', 'Wireless Charging');

INSERT IGNORE INTO car_specs (car_id, engine, transmission, fuel_type, mileage, exterior_color, interior_color) VALUES 
('2', '3.0L Turbocharged I6', '8-Speed Automatic', 'Gasoline', 0, 'Alpine White', 'Cognac');
