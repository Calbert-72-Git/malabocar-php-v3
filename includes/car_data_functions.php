
<?php
// Datos estáticos de coches (fallback si la BD no está disponible)
function getStaticCars() {
  return [
    [
      'id' => '1',
      'brand' => 'Mercedes-Benz',
      'model' => 'C-Class',
      'year' => 2023,
      'price' => 45000,
      'description' => 'The Mercedes-Benz C-Class is a line of compact executive cars produced by Mercedes-Benz. Introduced in 1993 as a replacement for the 190 range, the C-Class has been available with a "complex technology" option that includes innovations such as a navigation system.',
      'images' => [
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1170&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1227&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop'
      ],
      'features' => [
        'Leather Seats', 
        'Navigation System', 
        'Bluetooth', 
        'Backup Camera',
        'Sunroof',
        'Heated Seats'
      ],
      'specs' => [
        'engine' => '2.0L Turbocharged I4',
        'transmission' => '9-Speed Automatic',
        'fuelType' => 'Gasoline',
        'mileage' => 0,
        'exteriorColor' => 'Polar White',
        'interiorColor' => 'Black'
      ],
      'stock' => 5
    ],
    [
      'id' => '2',
      'brand' => 'BMW',
      'model' => '5 Series',
      'year' => 2023,
      'price' => 55000,
      'description' => 'The BMW 5 Series is an executive car manufactured by BMW since 1972. It is the successor to the New Class Sedans and is currently in its seventh generation. The 5 Series has been produced in sedan and wagon configurations.',
      'images' => [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1228&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1543796076-c3683f1cb243?q=80&w=1469&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523983254932-c7e93e12a4c4?q=80&w=1172&auto=format&fit=crop'
      ],
      'features' => [
        'Premium Leather', 
        'iDrive System', 
        'Harman Kardon Sound', 
        'Parking Assistant',
        'Digital Dashboard',
        'Wireless Charging'
      ],
      'specs' => [
        'engine' => '3.0L Turbocharged I6',
        'transmission' => '8-Speed Automatic',
        'fuelType' => 'Gasoline',
        'mileage' => 0,
        'exteriorColor' => 'Alpine White',
        'interiorColor' => 'Cognac'
      ],
      'stock' => 3
    ],
    // Añade más coches aquí siguiendo el mismo formato
  ];
}

// Obtener marcas disponibles
function getAvailableBrands() {
  global $conn;
  
  // Si no hay conexión a la BD, usar datos estáticos
  if (!$conn) {
    $cars = getStaticCars();
    $brands = [];
    
    foreach ($cars as $car) {
      if (!in_array($car['brand'], $brands)) {
        $brands[] = $car['brand'];
      }
    }
    
    return $brands;
  }
  
  $sql = "SELECT DISTINCT brand FROM cars ORDER BY brand";
  $result = mysqli_query($conn, $sql);
  
  $brands = [];
  while($row = mysqli_fetch_assoc($result)) {
    $brands[] = $row['brand'];
  }
  
  return $brands;
}
?>
