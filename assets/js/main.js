
document.addEventListener('DOMContentLoaded', function() {
  // Menú móvil
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });
  }
  
  // Galerías de imágenes
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainCarImage');
  
  if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        mainImage.src = this.dataset.image;
        
        // Eliminar la clase activa de todas las miniaturas
        thumbnails.forEach(thumb => {
          thumb.classList.remove('active');
        });
        
        // Añadir la clase activa a la miniatura seleccionada
        this.classList.add('active');
      });
    });
  }
  
  // Controles de cantidad en el carrito
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  
  if (quantityBtns.length > 0) {
    quantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.parentNode.querySelector('.quantity-input');
        const currentValue = parseInt(input.value);
        const action = this.dataset.action;
        const maxStock = parseInt(input.dataset.max);
        
        if (action === 'decrease' && currentValue > 1) {
          input.value = currentValue - 1;
        } else if (action === 'increase' && currentValue < maxStock) {
          input.value = currentValue + 1;
        }
        
        // Autoenviar formulario si existe
        const form = this.closest('form');
        if (form && form.dataset.autosubmit === 'true') {
          form.submit();
        }
      });
    });
  }
});
