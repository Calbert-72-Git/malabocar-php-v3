
<?php
function displayVehicleDeleteModal() {
    ?>
    <!-- Modal de confirmación -->
    <div id="delete-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Confirmar eliminación</h2>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <p>¿Está seguro de que desea eliminar el vehículo <span id="delete-car-name"></span>?</p>
                <p>Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
                <form method="post" id="delete-form">
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="car_id" id="delete-car-id">
                    <button type="button" class="admin-btn secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="admin-btn danger">Eliminar</button>
                </form>
            </div>
        </div>
    </div>
    
    <script>
        // Mostrar modal de confirmación
        function confirmDelete(carId, carName) {
            document.getElementById('delete-car-id').value = carId;
            document.getElementById('delete-car-name').textContent = carName;
            document.getElementById('delete-modal').style.display = 'flex';
        }
        
        // Cerrar modal
        function closeModal() {
            document.getElementById('delete-modal').style.display = 'none';
        }
        
        // Cerrar modal al hacer clic fuera de él
        window.onclick = function(event) {
            const modal = document.getElementById('delete-modal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    </script>
    <?php
}
?>
