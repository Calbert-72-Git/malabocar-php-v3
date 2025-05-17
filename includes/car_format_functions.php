
<?php
// Formatear precio
function formatPrice($price) {
  return number_format($price, 0, ',', '.') . ' FCFA';
}
?>
