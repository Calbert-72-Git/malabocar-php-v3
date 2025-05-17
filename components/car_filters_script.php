
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
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
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
