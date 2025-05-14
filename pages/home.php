
<?php
// Incluir funciones necesarias
include_once 'includes/car_functions.php';

// Obtener algunos coches destacados
// Verificar si getAllCars() devuelve un array
$allCars = getAllCars();
$featuredCars = is_array($allCars) ? array_slice($allCars, 0, 3) : [];

// Verificar si getAvailableBrands() devuelve un array
$brandsResult = getAvailableBrands();
$brands = is_array($brandsResult) ? $brandsResult : [];
?>

<div class="hero" style="background-image: url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1470&auto=format&fit=crop'); background-size: cover; background-position: center; padding: 4rem 0;">
  <div class="container">
    <div class="hero-content" style="max-width: 600px; background-color: rgba(255, 255, 255, 0.9); padding: 2rem; border-radius: 0.5rem;">
      <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Encuentra tu coche ideal</h1>
      <p style="font-size: 1.125rem; margin-bottom: 2rem;">Descubre nuestra selección de vehículos de alta gama y últimos modelos.</p>
      <a href="?route=cars" class="btn btn-primary">Ver catálogo</a>
    </div>
  </div>
</div>

<section class="featured-cars container" style="padding: 4rem 0;">
  <h2 class="section-title" style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">Vehículos destacados</h2>
  
  <div class="car-grid">
    <?php if (empty($featuredCars)): ?>
    <div class="empty-state" style="text-align: center; padding: 2rem; width: 100%;">
      <p>No hay vehículos disponibles en este momento.</p>
    </div>
    <?php else: ?>
    <?php foreach ($featuredCars as $car): ?>
    <div class="car-card">
      <div class="car-image-container">
        <?php if (!empty($car['images']) && is_array($car['images']) && isset($car['images'][0])): ?>
        <img src="<?php echo $car['images'][0]; ?>" alt="<?php echo $car['brand'] . ' ' . $car['model']; ?>">
        <?php else: ?>
        <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1470&auto=format&fit=crop" alt="Imagen no disponible">
        <?php endif; ?>
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
    <?php endif; ?>
  </div>
  
  <div style="text-align: center; margin-top: 2rem;">
    <a href="?route=cars" class="btn btn-outline">Ver todos los vehículos</a>
  </div>
</section>

<section class="brands-section" style="background-color: #f3f4f6; padding: 4rem 0;">
  <div class="container">
    <h2 class="section-title" style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">Nuestras marcas</h2>
    
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">
      <?php if (empty($brands)): ?>
      <div style="text-align: center; padding: 1rem;">
        <p>No hay marcas disponibles en este momento.</p>
      </div>
      <?php else: ?>
      <?php foreach ($brands as $brand): ?>
      <div style="text-align: center; padding: 1rem;">
        <div style="font-weight: bold; font-size: 1.25rem;"><?php echo $brand; ?></div>
      </div>
      <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>
</section>

<section class="why-section container" style="padding: 4rem 0;">
  <h2 class="section-title" style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">¿Por qué elegirnos?</h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
    <div style="text-align: center; padding: 1.5rem;">
      <div style="font-size: 3rem; margin-bottom: 1rem; color: #2563eb;">
        <i class="fas fa-car"></i>
      </div>
      <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Amplia selección</h3>
      <p>Disponemos de una gran variedad de vehículos de diferentes marcas y modelos.</p>
    </div>
    
    <div style="text-align: center; padding: 1.5rem;">
      <div style="font-size: 3rem; margin-bottom: 1rem; color: #2563eb;">
        <i class="fas fa-tag"></i>
      </div>
      <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Precios competitivos</h3>
      <p>Ofrecemos los mejores precios del mercado con financiación a medida.</p>
    </div>
    
    <div style="text-align: center; padding: 1.5rem;">
      <div style="font-size: 3rem; margin-bottom: 1rem; color: #2563eb;">
        <i class="fas fa-award"></i>
      </div>
      <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Calidad garantizada</h3>
      <p>Todos nuestros vehículos pasan rigurosos controles de calidad.</p>
    </div>
  </div>
</section>
