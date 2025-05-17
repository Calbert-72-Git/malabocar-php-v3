
<?php
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
?>
