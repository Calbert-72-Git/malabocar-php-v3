
<?php
include_once 'db_config.php';

// Obtener todos los coches desde la base de datos
function getAllCars() {
  global $conn;
  
  // Si no hay conexión a la base de datos, devolver datos en memoria
  if (!$conn) {
    return getStaticCars();
  }
  
  $cars = [];
  $sql = "SELECT * FROM cars";
  $result = mysqli_query($conn, $sql);
  
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
      // Obtener imágenes
      $imagesSql = "SELECT image_url FROM car_images WHERE car_id = ?";
      $imagesStmt = mysqli_prepare($conn, $imagesSql);
      mysqli_stmt_bind_param($imagesStmt, "i", $row['id']);
      mysqli_stmt_execute($imagesStmt);
      $imagesResult = mysqli_stmt_get_result($imagesStmt);
      $images = [];
      while($imageRow = mysqli_fetch_assoc($imagesResult)) {
        $images[] = $imageRow['image_url'];
      }
      
      // Obtener características
      $featuresSql = "SELECT feature_name FROM car_features WHERE car_id = ?";
      $featuresStmt = mysqli_prepare($conn, $featuresSql);
      mysqli_stmt_bind_param($featuresStmt, "i", $row['id']);
      mysqli_stmt_execute($featuresStmt);
      $featuresResult = mysqli_stmt_get_result($featuresStmt);
      $features = [];
      while($featureRow = mysqli_fetch_assoc($featuresResult)) {
        $features[] = $featureRow['feature_name'];
      }
      
      // Obtener especificaciones
      $specsSql = "SELECT * FROM car_specs WHERE car_id = ?";
      $specsStmt = mysqli_prepare($conn, $specsSql);
      mysqli_stmt_bind_param($specsStmt, "i", $row['id']);
      mysqli_stmt_execute($specsStmt);
      $specsResult = mysqli_stmt_get_result($specsStmt);
      $specs = mysqli_fetch_assoc($specsResult);
      
      // Construir el array del coche
      $cars[] = [
        'id' => $row['id'],
        'brand' => $row['brand'],
        'model' => $row['model'],
        'year' => $row['year'],
        'price' => $row['price'],
        'description' => $row['description'],
        'images' => $images,
        'features' => $features,
        'specs' => [
          'engine' => $specs['engine'],
          'transmission' => $specs['transmission'],
          'fuelType' => $specs['fuel_type'],
          'mileage' => $specs['mileage'],
          'exteriorColor' => $specs['exterior_color'],
          'interiorColor' => $specs['interior_color']
        ],
        'stock' => $row['stock']
      ];
    }
    
    return $cars;
  } else {
    // Si no hay datos en la BD, usar los datos estáticos
    return getStaticCars();
  }
}

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

// Obtener coche por ID
function getCarById($id) {
  global $conn;
  
  // Si no hay conexión a la BD, usar datos estáticos
  if (!$conn) {
    $cars = getStaticCars();
    foreach ($cars as $car) {
      if ($car['id'] === $id) {
        return $car;
      }
    }
    return null;
  }
  
  // Consulta con prepared statement
  $sql = "SELECT * FROM cars WHERE id = ?";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, "s", $id);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    
    // Obtener imágenes
    $imagesSql = "SELECT image_url FROM car_images WHERE car_id = ?";
    $imagesStmt = mysqli_prepare($conn, $imagesSql);
    mysqli_stmt_bind_param($imagesStmt, "s", $id);
    mysqli_stmt_execute($imagesStmt);
    $imagesResult = mysqli_stmt_get_result($imagesStmt);
    $images = [];
    while($imageRow = mysqli_fetch_assoc($imagesResult)) {
      $images[] = $imageRow['image_url'];
    }
    
    // Obtener características
    $featuresSql = "SELECT feature_name FROM car_features WHERE car_id = ?";
    $featuresStmt = mysqli_prepare($conn, $featuresSql);
    mysqli_stmt_bind_param($featuresStmt, "s", $id);
    mysqli_stmt_execute($featuresStmt);
    $featuresResult = mysqli_stmt_get_result($featuresStmt);
    $features = [];
    while($featureRow = mysqli_fetch_assoc($featuresResult)) {
      $features[] = $featureRow['feature_name'];
    }
    
    // Obtener especificaciones
    $specsSql = "SELECT * FROM car_specs WHERE car_id = ?";
    $specsStmt = mysqli_prepare($conn, $specsSql);
    mysqli_stmt_bind_param($specsStmt, "s", $id);
    mysqli_stmt_execute($specsStmt);
    $specsResult = mysqli_stmt_get_result($specsStmt);
    $specs = mysqli_fetch_assoc($specsResult);
    
    return [
      'id' => $row['id'],
      'brand' => $row['brand'],
      'model' => $row['model'],
      'year' => $row['year'],
      'price' => $row['price'],
      'description' => $row['description'],
      'images' => $images,
      'features' => $features,
      'specs' => [
        'engine' => $specs['engine'],
        'transmission' => $specs['transmission'],
        'fuelType' => $specs['fuel_type'],
        'mileage' => $specs['mileage'],
        'exteriorColor' => $specs['exterior_color'],
        'interiorColor' => $specs['interior_color']
      ],
      'stock' => $row['stock']
    ];
  }
  
  // Si no se encuentra en la BD, buscar en datos estáticos
  $staticCars = getStaticCars();
  foreach ($staticCars as $car) {
    if ($car['id'] === $id) {
      return $car;
    }
  }
  
  return null;
}

// Filtrar coches por criterios
function getFilteredCars($search = "", $minPrice = 0, $maxPrice = 1000000, $brand = "", $year = "", $fuelType = "") {
  global $conn;
  
  // Si no hay conexión a la BD, usar datos estáticos
  if (!$conn) {
    $cars = getStaticCars();
    $filtered = [];
    
    foreach ($cars as $car) {
      $matchesSearch = empty($search) || 
        stripos($car['brand'], $search) !== false || 
        stripos($car['model'], $search) !== false;
      
      $matchesPrice = $car['price'] >= $minPrice && $car['price'] <= $maxPrice;
      
      $matchesBrand = empty($brand) || $car['brand'] === $brand;
      
      $matchesYear = empty($year) || $car['year'] == $year;
      
      $matchesFuelType = empty($fuelType) || $car['specs']['fuelType'] === $fuelType;
      
      if ($matchesSearch && $matchesPrice && $matchesBrand && $matchesYear && $matchesFuelType) {
        $filtered[] = $car;
      }
    }
    
    return $filtered;
  }
  
  // Construir la consulta SQL con filtros
  $sql = "SELECT DISTINCT c.* FROM cars c 
          LEFT JOIN car_specs s ON c.id = s.car_id 
          WHERE 1=1";
  $params = [];
  $types = "";
  
  if (!empty($search)) {
    $searchParam = "%" . $search . "%";
    $sql .= " AND (c.brand LIKE ? OR c.model LIKE ?)";
    $types .= "ss";
    $params[] = $searchParam;
    $params[] = $searchParam;
  }
  
  if ($minPrice > 0) {
    $sql .= " AND c.price >= ?";
    $types .= "d";
    $params[] = $minPrice;
  }
  
  if ($maxPrice < 1000000) {
    $sql .= " AND c.price <= ?";
    $types .= "d";
    $params[] = $maxPrice;
  }
  
  if (!empty($brand)) {
    $sql .= " AND c.brand = ?";
    $types .= "s";
    $params[] = $brand;
  }
  
  if (!empty($year)) {
    $sql .= " AND c.year = ?";
    $types .= "i";
    $params[] = $year;
  }
  
  if (!empty($fuelType)) {
    $sql .= " AND s.fuel_type = ?";
    $types .= "s";
    $params[] = $fuelType;
  }
  
  // Preparar y ejecutar la consulta
  $stmt = mysqli_prepare($conn, $sql);
  if (!empty($params)) {
    mysqli_stmt_bind_param($stmt, $types, ...$params);
  }
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  
  $filteredCars = [];
  
  while($row = mysqli_fetch_assoc($result)) {
    $filteredCars[] = getCarById($row['id']);
  }
  
  return $filteredCars;
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

// Formatear precio
function formatPrice($price) {
  return number_format($price, 0, ',', '.') . ' €';
}

?>
