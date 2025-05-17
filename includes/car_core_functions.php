
<?php
include_once 'db_config.php';
include_once 'car_data_functions.php';
include_once 'car_filter_functions.php';
include_once 'car_format_functions.php';

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
      // Construir el array del coche usando la función auxiliar
      $cars[] = buildCarObject($row);
    }
    
    return $cars;
  } else {
    // Si no hay datos en la BD, usar los datos estáticos
    return getStaticCars();
  }
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
    return buildCarObject($row);
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

// Función auxiliar para construir un objeto de coche con todos sus datos relacionados
function buildCarObject($row) {
  global $conn;
  
  $id = $row['id'];
  
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
?>
