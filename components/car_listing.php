
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

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
