
<?php
include 'includes/car_functions.php';

// Obtener ID del coche
$id = isset($_GET['id']) ? $_GET['id'] : '';
$car = getCarById($id);

// Verificar si el coche existe
if (!$car) {
  // Redirigir a la página de coches si no existe
  header('Location: index.php?route=cars');
  exit;
}

// Procesamiento de formularios
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  include 'includes/cart_functions.php';
  
  if (isset($_POST['add_to_cart'])) {
    // Añadir al carrito
    addToCart($car['id']);
    header('Location: index.php?route=cart');
    exit;
  } elseif (isset($_POST['order'])) {
    // Hacer encargo (añadir al carrito y redirigir a la página de encargos)
    addToCart($car['id']);
    header('Location: index.php?route=orders');
    exit;
  }
}
?>

<div class="container" style="padding: 2rem 0;">
  <!-- Botón volver -->
  <a href="javascript:history.back()" class="btn btn-outline" style="margin-bottom: 2rem; display: inline-flex; align-items: center;">
    <i class="fas fa-chevron-left" style="margin-right: 0.5rem;"></i> Volver
  </a>
  
  <div class="car-detail-layout">
    <!-- Galería de imágenes -->
    <div>
      <div class="car-detail-gallery" style="height: 400px; margin-bottom: 1rem;">
        <img 
          id="mainCarImage" 
          src="<?php echo $car['images'][0]; ?>" 
          alt="<?php echo $car['brand'] . ' ' . $car['model']; ?>" 
          style="width: 100%; height: 100%; object-fit: cover;"
        >
      </div>
      
      <!-- Miniaturas -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
        <?php foreach ($car['images'] as $index => $image): ?>
          <div 
            class="thumbnail <?php echo $index === 0 ? 'active' : ''; ?>" 
            data-image="<?php echo $image; ?>" 
            style="height: 80px; cursor: pointer; border-radius: 0.25rem; overflow: hidden; <?php echo $index === 0 ? 'border: 2px solid #2563eb;' : ''; ?>"
          >
            <img 
              src="<?php echo $image; ?>" 
              alt="<?php echo $car['brand'] . ' ' . $car['model'] . ' - Vista ' . ($index + 1); ?>" 
              style="width: 100%; height: 100%; object-fit: cover;"
            >
          </div>
        <?php endforeach; ?>
      </div>
    </div>
    
    <!-- Detalles del coche -->
    <div class="car-detail-info">
      <h1><?php echo $car['brand'] . ' ' . $car['model'] . ' ' . $car['year']; ?></h1>
      
      <div class="car-detail-price-stock">
        <span class="car-price" style="font-size: 1.5rem;"><?php echo formatPrice($car['price']); ?></span>
        <span 
          class="<?php echo $car['stock'] > 0 ? 'stock-available' : 'stock-unavailable'; ?>" 
          style="padding: 0.25rem 1rem; border-radius: 9999px; font-size: 0.875rem; <?php echo $car['stock'] > 0 ? 'background-color: #d1fae5;' : 'background-color: #fee2e2;'; ?>"
        >
          <?php echo $car['stock'] > 0 ? $car['stock'] . ' disponibles' : 'No disponible'; ?>
        </span>
      </div>
      
      <div class="car-detail-description">
        <p><?php echo $car['description']; ?></p>
      </div>
      
      <!-- Especificaciones -->
      <div class="car-specs">
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Especificaciones</h2>
        <div class="specs-grid">
          <div class="spec-item">
            <label>Motor</label>
            <div><?php echo $car['specs']['engine']; ?></div>
          </div>
          <div class="spec-item">
            <label>Transmisión</label>
            <div><?php echo $car['specs']['transmission']; ?></div>
          </div>
          <div class="spec-item">
            <label>Combustible</label>
            <div><?php echo $car['specs']['fuelType']; ?></div>
          </div>
          <div class="spec-item">
            <label>Kilometraje</label>
            <div><?php echo number_format($car['specs']['mileage'], 0, ',', '.'); ?> km</div>
          </div>
          <div class="spec-item">
            <label>Color exterior</label>
            <div><?php echo $car['specs']['exteriorColor']; ?></div>
          </div>
          <div class="spec-item">
            <label>Color interior</label>
            <div><?php echo $car['specs']['interiorColor']; ?></div>
          </div>
        </div>
      </div>
      
      <!-- Características -->
      <div>
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Características</h2>
        <ul class="features-list">
          <?php foreach ($car['features'] as $feature): ?>
            <li class="feature-item">
              <i class="fas fa-check"></i> <?php echo $feature; ?>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
      
      <!-- Botones de acción -->
      <div style="display: flex; gap: 1rem;">
        <form method="post" style="flex: 1;">
          <input type="hidden" name="add_to_cart" value="1">
          <button 
            type="submit" 
            class="btn btn-primary" 
            style="width: 100%; display: flex; align-items: center; justify-content: center;" 
            <?php if ($car['stock'] <= 0) echo 'disabled'; ?>
          >
            <i class="fas fa-shopping-cart" style="margin-right: 0.5rem;"></i> Añadir al carrito
          </button>
        </form>
        
        <form method="post" style="flex: 1;">
          <input type="hidden" name="order" value="1">
          <button 
            type="submit" 
            class="btn btn-outline" 
            style="width: 100%;" 
            <?php if ($car['stock'] <= 0) echo 'disabled'; ?>
          >
            Hacer un encargo
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
