
<?php
include 'includes/car_functions.php';

// Parámetros del filtro
$search = isset($_GET['search']) ? $_GET['search'] : '';
$minPrice = isset($_GET['min_price']) ? (int)$_GET['min_price'] : 0;
$maxPrice = isset($_GET['max_price']) ? (int)$_GET['max_price'] : 100000;
$selectedBrand = isset($_GET['brand']) ? $_GET['brand'] : '';

// Obtener coches filtrados
$filteredCars = getFilteredCars($search, $minPrice, $maxPrice, $selectedBrand);
$brands = getAvailableBrands();
?>

<div class="container" style="padding: 2rem 0;">
  <div class="cars-layout">
    <!-- Filtros -->
    <div class="filters">
      <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Filtros</h2>
      
      <form method="get" action="">
        <input type="hidden" name="route" value="cars">
        
        <!-- Búsqueda -->
        <div class="filter-group">
          <label for="search" class="filter-label">Buscar</label>
          <input 
            type="text" 
            id="search" 
            name="search" 
            class="filter-input" 
            placeholder="Marca o modelo..." 
            value="<?php echo htmlspecialchars($search); ?>"
          >
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
        
        <!-- Rango de precio -->
        <div class="filter-group">
          <label class="filter-label">Rango de precio</label>
          <input 
            type="range" 
            min="0" 
            max="100000" 
            step="1000" 
            id="price_range" 
            value="<?php echo $maxPrice; ?>"
            oninput="updatePriceRange()"
          >
          <div class="price-range">
            <span id="min_price_display"><?php echo formatPrice($minPrice); ?></span>
            <span id="max_price_display"><?php echo formatPrice($maxPrice); ?></span>
          </div>
          <input type="hidden" name="min_price" id="min_price_input" value="<?php echo $minPrice; ?>">
          <input type="hidden" name="max_price" id="max_price_input" value="<?php echo $maxPrice; ?>">
        </div>
        
        <!-- Botones -->
        <div style="display: flex; gap: 1rem;">
          <button type="submit" class="btn btn-primary" style="flex: 1;">Aplicar filtros</button>
          <a href="?route=cars" class="btn btn-outline" style="flex: 1;">Reiniciar</a>
        </div>
      </form>
    </div>
    
    <!-- Listado de coches -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.5rem; font-weight: bold;">Coches disponibles</h1>
        <p style="color: #6b7280;"><?php echo count($filteredCars); ?> vehículos encontrados</p>
      </div>
      
      <?php if (count($filteredCars) > 0): ?>
        <div class="car-grid">
          <?php foreach ($filteredCars as $car): ?>
            <div class="car-card">
              <div class="car-image-container">
                <img src="<?php echo $car['images'][0]; ?>" alt="<?php echo $car['brand'] . ' ' . $car['model']; ?>">
              </div>
              <div class="car-info">
                <h3 class="car-title"><?php echo $car['brand'] . ' ' . $car['model']; ?></h3>
                <p class="car-year"><?php echo $car['year']; ?></p>
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
        <div style="text-align: center; padding: 3rem 0;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">No se encontraron vehículos</h3>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">Intente con otros filtros o reinicie la búsqueda.</p>
          <a href="?route=cars" class="btn btn-primary">Reiniciar filtros</a>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>

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
</script>
