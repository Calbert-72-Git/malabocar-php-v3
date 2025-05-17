
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
