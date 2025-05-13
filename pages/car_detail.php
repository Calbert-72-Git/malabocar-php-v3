
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

// Función para construir el mensaje de WhatsApp
function buildWhatsAppMessage($car) {
  $price = number_format($car['price'], 0, ',', '.');
  return urlencode("Hola, estoy interesado en el vehículo {$car['brand']} {$car['model']} ({$car['year']}) con precio {$price}€. ¿Podría darme más información?");
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
      <div class="car-detail-gallery" style="height: 400px; margin-bottom: 1rem; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <img 
          id="mainCarImage" 
          src="<?php echo $car['images'][0]; ?>" 
          alt="<?php echo $car['brand'] . ' ' . $car['model']; ?>" 
          style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
          onmouseover="this.style.transform='scale(1.03)'" 
          onmouseout="this.style.transform='scale(1)'"
        >
      </div>
      
      <!-- Miniaturas -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
        <?php foreach ($car['images'] as $index => $image): ?>
          <div 
            class="thumbnail <?php echo $index === 0 ? 'active' : ''; ?>" 
            data-image="<?php echo $image; ?>" 
            style="height: 80px; cursor: pointer; border-radius: 0.25rem; overflow: hidden; transition: all 0.2s ease; <?php echo $index === 0 ? 'border: 2px solid #2563eb;' : ''; ?>"
            onmouseover="this.style.transform='scale(0.97)'" 
            onmouseout="this.style.transform='scale(1)'"
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
      <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;"><?php echo $car['brand'] . ' ' . $car['model'] . ' ' . $car['year']; ?></h1>
      
      <div class="car-detail-price-stock" style="margin-bottom: 1.5rem;">
        <span class="car-price" style="font-size: 1.5rem; font-weight: bold; color: #0284c7;"><?php echo formatPrice($car['price']); ?></span>
        <span 
          class="<?php echo $car['stock'] > 0 ? 'stock-available' : 'stock-unavailable'; ?>" 
          style="padding: 0.25rem 1rem; border-radius: 9999px; font-size: 0.875rem; <?php echo $car['stock'] > 0 ? 'background-color: #d1fae5;' : 'background-color: #fee2e2;'; ?>"
        >
          <?php echo $car['stock'] > 0 ? $car['stock'] . ' disponibles' : 'No disponible'; ?>
        </span>
      </div>
      
      <div class="car-detail-description" style="margin-bottom: 2rem;">
        <p><?php echo $car['description']; ?></p>
      </div>
      
      <!-- Especificaciones -->
      <div class="car-specs" style="background-color: #f8fafc; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem; font-weight: 600;">Especificaciones</h2>
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
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem; font-weight: 600;">Características</h2>
        <ul class="features-list">
          <?php foreach ($car['features'] as $feature): ?>
            <li class="feature-item">
              <i class="fas fa-check" style="color: #10b981;"></i> <?php echo $feature; ?>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
      
      <!-- Botones de acción -->
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem;">
          <form method="post" style="flex: 1;">
            <input type="hidden" name="add_to_cart" value="1">
            <button 
              type="submit" 
              class="btn btn-primary" 
              style="width: 100%; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);" 
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';" 
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0, 0, 0, 0.1)';"
              <?php if ($car['stock'] <= 0) echo 'disabled'; ?>
            >
              <i class="fas fa-shopping-cart" style="margin-right: 0.5rem;"></i> Añadir al carrito
            </button>
          </form>
          
          <a 
            href="https://wa.me/+34600000000?text=<?php echo buildWhatsAppMessage($car); ?>" 
            target="_blank" 
            class="btn" 
            style="flex: 1; background-color: #25D366; color: white; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';" 
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0, 0, 0, 0.1)';"
          >
            <i class="fab fa-whatsapp" style="margin-right: 0.5rem; font-size: 1.25rem;"></i> Contactar por WhatsApp
          </a>
        </div>
        
        <form method="post" style="width: 100%;">
          <input type="hidden" name="order" value="1">
          <button 
            type="submit" 
            class="btn btn-outline" 
            style="width: 100%; border-color: #0284c7; color: #0284c7; transition: background-color 0.3s ease;" 
            onmouseover="this.style.backgroundColor='#f0f9ff';" 
            onmouseout="this.style.backgroundColor='transparent';"
            <?php if ($car['stock'] <= 0) echo 'disabled'; ?>
          >
            Hacer un encargo
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
