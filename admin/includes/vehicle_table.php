
<?php
function displayVehicleTable($result) {
    ?>
    <div class="admin-table-container">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (mysqli_num_rows($result) > 0): ?>
                    <?php while ($car = mysqli_fetch_assoc($result)): ?>
                        <tr>
                            <td class="car-image">
                                <?php if (!empty($car['main_image'])): ?>
                                    <img src="<?php echo $car['main_image']; ?>" alt="<?php echo htmlspecialchars($car['brand'] . ' ' . $car['model']); ?>">
                                <?php else: ?>
                                    <div class="no-image"><i class="fas fa-car"></i></div>
                                <?php endif; ?>
                            </td>
                            <td><?php echo $car['id']; ?></td>
                            <td><?php echo htmlspecialchars($car['brand']); ?></td>
                            <td><?php echo htmlspecialchars($car['model']); ?></td>
                            <td><?php echo $car['year']; ?></td>
                            <td><?php echo number_format($car['price'], 2, ',', '.') . ' €'; ?></td>
                            <td><?php echo $car['stock']; ?></td>
                            <td class="actions">
                                <a href="edit_vehicle.php?id=<?php echo $car['id']; ?>" class="icon-btn edit" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <button type="button" class="icon-btn delete" title="Eliminar" 
                                        onclick="confirmDelete('<?php echo $car['id']; ?>', '<?php echo htmlspecialchars($car['brand'] . ' ' . $car['model']); ?>')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="8" class="no-results">No se encontraron vehículos</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}
?>
