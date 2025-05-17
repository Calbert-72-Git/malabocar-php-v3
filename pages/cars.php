
<?php
include 'includes/car_functions.php';

// Parámetros del filtro
$search = isset($_GET['search']) ? $_GET['search'] : '';
$minPrice = isset($_GET['min_price']) ? (int)$_GET['min_price'] : 0;
$maxPrice = isset($_GET['max_price']) ? (int)$_GET['max_price'] : 100000;
$selectedBrand = isset($_GET['brand']) ? $_GET['brand'] : '';
$selectedYear = isset($_GET['year']) ? $_GET['year'] : '';
$selectedFuelType = isset($_GET['fuel_type']) ? $_GET['fuel_type'] : '';

// Obtener coches filtrados
$filteredCars = getFilteredCars($search, $minPrice, $maxPrice, $selectedBrand, $selectedYear, $selectedFuelType);
$brands = getAvailableBrands();

// Obtener años y tipos de combustible disponibles
$allCars = getFilteredCars('', 0, 1000000, '');
$years = [];
$fuelTypes = [];

foreach ($allCars as $car) {
  if (!in_array($car['year'], $years)) {
    $years[] = $car['year'];
  }
  if (!in_array($car['specs']['fuelType'], $fuelTypes)) {
    $fuelTypes[] = $car['specs']['fuelType'];
  }
}

// Ordenar los años de mayor a menor
rsort($years);
sort($fuelTypes);
?>

<div class="container" style="padding: 2rem 0;">
  <div class="mb-6">
    <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">Catálogo de vehículos</h1>
    <p style="color: #6b7280;">Encuentra tu coche ideal entre nuestra selección de vehículos premium</p>
  </div>

  <?php include 'components/car_filters_toggle.php'; ?>

  <div class="cars-layout">
    <?php include 'components/car_filters.php'; ?>
    <?php include 'components/car_listing.php'; ?>
  </div>
</div>

<?php include 'components/car_filters_script.php'; ?>
