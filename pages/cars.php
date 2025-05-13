
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

  <!-- Botón para mostrar/ocultar filtros en móvil -->
  <button 
    id="toggleFilters" 
    class="btn btn-outline md:hidden w-full mb-4"
    style="display: flex; align-items: center; justify-content: center;"
  >
    <i class="fas fa-filter" style="margin-right: 0.5rem;"></i> Mostrar filtros
  </button>

  <div class="cars-layout">
    <!-- Filtros -->
    <div id="filtersContainer" class="filters" style="display: none; transition: all 0.3s ease;">
      <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        Filtros
        <button id="closeFilters" class="md:hidden" style="background: none; border: none; font-size: 1.25rem;">
          <i class="fas fa-times"></i>
        </button>
      </h2>
      
      <form method="get" action="">
        <input type="hidden" name="route" value="cars">
        
        <!-- Búsqueda -->
        <div class="filter-group">
          <label for="search" class="filter-label">Buscar</label>
          <div style="position: relative;">
            <i class="fas fa-search" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #9ca3af;"></i>
            <input 
              type="text" 
              id="search" 
              name="search" 
              class="filter-input" 
              placeholder="Marca o modelo..." 
              value="<?php echo htmlspecialchars($search); ?>"
              style="padding-left: 35px;"
            >
          </div>
        </div>
        
        <!-- Marca -->
        <div class="filter-group">
          <label for="brand" class="filter-label">Marca</label>
          <select id="brand" name="brand" class="filter-input">
            <option value="">Todas las marcas</option>
            <?php foreach ($brands as $brand): ?>
              <option value="<?php echo $brand; ?>" <?php if ($selectedBrand === $brand) echo 'selected'; ?>>
                <?php echo $brand; ?>
              </option>
            <?php endforeach; ?>
          </select>
        </div>
        
        <!-- Año -->
        <div class="filter-group">
          <label for="year" class="filter-label">Año</label>
          <select id="year" name="year" class="filter-input">
            <option value="">Todos los años</option>
            <?php foreach ($years as $year): ?>
              <option value="<?php echo $year; ?>" <?php if ($selectedYear == $year) echo 'selected'; ?>>
                <?php echo $year; ?>
              </option>
            <?php endforeach; ?>
          </select>
        </div>
        
        <!-- Tipo de combustible -->
        <div class="filter-group">
          <label for="fuel_type" class="filter-label">Combustible</label>
          <select id="fuel_type" name="fuel_type" class="filter-input">
            <option value="">Todos los combustibles</option>
            <?php foreach ($fuelTypes as $fuelType): ?>
              <option value="<?php echo $fuelType; ?>" <?php if ($selectedFuelType === $fuelType) echo 'selected'; ?>>
                <?php echo $fuelType; ?>
              </option>
            <?php endforeach; ?>
          </select>
        </div>
        
        <!-- Rango de precio -->
        <div class="filter-group">
          <label class="filter-label">Rango de precio</label>
          <div style="display: flex; align-items: center; gap: 8px;">
            <input 
              type="range" 
              min="0" 
              max="100000" 
              step="1000" 
              id="price_range" 
              value="<?php echo $maxPrice; ?>"
              oninput="updatePriceRange()"
              style="flex-grow: 1; accent-color: #0284c7;"
            >
          </div>
          <div class="price-range" style="margin-top: 8px;">
            <span id="min_price_display"><?php echo formatPrice($minPrice); ?></span>
            <span id="max_price_display"><?php echo formatPrice($maxPrice); ?></span>
          </div>
          <input type="hidden" name="min_price" id="min_price_input" value="<?php echo $minPrice; ?>">
          <input type="hidden" name="max_price" id="max_price_input" value="<?php echo $maxPrice; ?>">
        </div>
        
        <!-- Ordenar por -->
        <div class="filter-group">
          <label for="sort" class="filter-label">Ordenar por</label>
          <select id="sort" name="sort" class="filter-input">
            <option value="newest">Más recientes</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
            <option value="mileage">Kilometraje</option>
          </select>
        </div>
        
        <!-- Botones -->
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <button type="submit" class="btn btn-primary" style="flex: 1; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-filter" style="margin-right: 0.5rem;"></i> Aplicar filtros
          </button>
          <a href="?route=cars" class="btn btn-outline" style="flex: 1; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-redo" style="margin-right: 0.5rem;"></i> Reiniciar
          </a>
        </div>
      </form>
    </div>
    
    <!-- Listado de coches -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <p style="color: #6b7280;"><?php echo count($filteredCars); ?> vehículos encontrados</p>
      </div>
      
      <?php if (count($filteredCars) > 0): ?>
        <div class="car-grid">
          <?php foreach ($filteredCars as $car): ?>
            <div class="car-card" style="animation: fadeIn 0.5s ease-out;">
              <div class="car-image-container">
                <img 
                  src="<?php echo $car['images'][0]; ?>" 
                  alt="<?php echo $car['brand'] . ' ' . $car['model']; ?>"
                  loading="lazy"
                >
              </div>
              <div class="car-info">
                <h3 class="car-title"><?php echo $car['brand'] . ' ' . $car['model']; ?></h3>
                <p class="car-year"><?php echo $car['year']; ?> · <?php echo $car['specs']['fuelType']; ?></p>
                <div class="car-price-stock">
                  <span class="car-price"><?php echo formatPrice($car['price']); ?></span>
                  <span class="<?php echo $car['stock'] > 0 ? 'stock-available' : 'stock-unavailable'; ?>">
                    <?php echo $car['stock'] > 0 ? $car['stock'] . ' disponibles' : 'No disponible'; ?>
                  </span>
                </div>
                <div class="car-actions">
                  <a href="?route=car&id=<?php echo $car['id']; ?>" class="btn btn-outline" style="flex: 1;">Ver detalles</a>
                  <?php if ($car['stock'] > 0): ?>
                  <form method="post" action="?route=cart&action=add" style="flex: 1;">
                    <input type="hidden" name="car_id" value="<?php echo $car['id']; ?>">
                    <button type="submit" class="btn btn-primary" style="width: 100%;">
                      <i class="fas fa-shopping-cart"></i> Añadir
                    </button>
                  </form>
                  <?php else: ?>
                  <button class="btn btn-primary btn-disabled" style="flex: 1;" disabled>
                    <i class="fas fa-shopping-cart"></i> Añadir
                  </button>
                  <?php endif; ?>
                </div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <div style="text-align: center; padding: 3rem 0; background-color: #f8fafc; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">No se encontraron vehículos</h3>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">Intente con otros filtros o reinicie la búsqueda.</p>
          <a href="?route=cars" class="btn btn-primary">Reiniciar filtros</a>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<script>
function updatePriceRange() {
  const range = document.getElementById('price_range');
  const maxPrice = parseInt(range.value);
  const minPrice = 0; // Simplificado para este ejemplo
  
  document.getElementById('min_price_input').value = minPrice;
  document.getElementById('max_price_input').value = maxPrice;
  document.getElementById('min_price_display').textContent = formatPrice(minPrice);
  document.getElementById('max_price_display').textContent = formatPrice(maxPrice);
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(price);
}

// Manejo de filtros para dispositivos móviles
document.addEventListener('DOMContentLoaded', function() {
  const toggleFiltersBtn = document.getElementById('toggleFilters');
  const closeFiltersBtn = document.getElementById('closeFilters');
  const filtersContainer = document.getElementById('filtersContainer');
  
  // En escritorio, mostrar los filtros por defecto
  if (window.innerWidth >= 768) {
    filtersContainer.style.display = 'block';
  }
  
  // Botón para mostrar filtros
  if (toggleFiltersBtn) {
    toggleFiltersBtn.addEventListener('click', function() {
      if (filtersContainer.style.display === 'none' || filtersContainer.style.display === '') {
        filtersContainer.style.display = 'block';
        toggleFiltersBtn.innerHTML = '<i class="fas fa-times" style="margin-right: 0.5rem;"></i> Ocultar filtros';
      } else {
        filtersContainer.style.display = 'none';
        toggleFiltersBtn.innerHTML = '<i class="fas fa-filter" style="margin-right: 0.5rem;"></i> Mostrar filtros';
      }
    });
  }
  
  // Botón para cerrar filtros
  if (closeFiltersBtn) {
    closeFiltersBtn.addEventListener('click', function() {
      filtersContainer.style.display = 'none';
      toggleFiltersBtn.innerHTML = '<i class="fas fa-filter" style="margin-right: 0.5rem;"></i> Mostrar filtros';
    });
  }
  
  // Ajustar visualización de filtros según el tamaño de la ventana
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      filtersContainer.style.display = 'block';
    } else if (!toggleFiltersBtn.textContent.includes('Ocultar')) {
      filtersContainer.style.display = 'none';
    }
  });
});
</script>
