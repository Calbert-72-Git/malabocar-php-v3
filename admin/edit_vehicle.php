<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

require_once '../includes/db_config.php';
require_once '../includes/upload_functions.php';

// Verificar si se ha proporcionado un ID de vehículo
if (!isset($_GET['id'])) {
    header("Location: vehicles.php");
    exit;
}

$car_id = mysqli_real_escape_string($conn, $_GET['id']);

// Obtener información del vehículo
$car_query = "SELECT * FROM cars WHERE id = '$car_id'";
$car_result = mysqli_query($conn, $car_query);

if (mysqli_num_rows($car_result) == 0) {
    // El vehículo no existe
    header("Location: vehicles.php");
    exit;
}

$car = mysqli_fetch_assoc($car_result);

// Obtener imágenes del vehículo
$images_query = "SELECT * FROM car_images WHERE car_id = '$car_id' ORDER BY position ASC";
$images_result = mysqli_query($conn, $images_query);
$car_images = [];

while ($image = mysqli_fetch_assoc($images_result)) {
    $car_images[] = $image;
}

// Obtener especificaciones del vehículo
$specs_query = "SELECT * FROM car_specs WHERE car_id = '$car_id'";
$specs_result = mysqli_query($conn, $specs_query);
$car_specs = mysqli_fetch_assoc($specs_result) ?: [];

// Obtener características del vehículo
$features_query = "SELECT feature_name FROM car_features WHERE car_id = '$car_id' ORDER BY id ASC";
$features_result = mysqli_query($conn, $features_query);
$car_features = [];

while ($feature = mysqli_fetch_assoc($features_result)) {
    $car_features[] = $feature['feature_name'];
}

// Procesar formulario de actualización
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update_vehicle'])) {
    // Recoger y validar datos del formulario
    $brand = mysqli_real_escape_string($conn, $_POST['brand']);
    $model = mysqli_real_escape_string($conn, $_POST['model']);
    $year = (int)$_POST['year'];
    $price = (float)$_POST['price'];
    $stock = (int)$_POST['stock'];
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    
    // Validación básica
    $errors = [];
    
    if (empty($brand)) $errors[] = "La marca es obligatoria.";
    if (empty($model)) $errors[] = "El modelo es obligatorio.";
    if ($year < 1900 || $year > 2100) $errors[] = "El año debe estar entre 1900 y 2100.";
    if ($price <= 0) $errors[] = "El precio debe ser mayor que cero.";
    if ($stock < 0) $errors[] = "El stock no puede ser negativo.";
    
    // Si no hay errores, actualizar el vehículo
    if (empty($errors)) {
        // Actualizar información básica del vehículo
        $update_query = "UPDATE cars SET 
                        brand = '$brand', 
                        model = '$model', 
                        year = $year, 
                        price = $price, 
                        stock = $stock, 
                        description = '$description', 
                        updated_at = NOW() 
                        WHERE id = '$car_id'";
        
        if (mysqli_query($conn, $update_query)) {
            // Actualizar especificaciones
            $engine = mysqli_real_escape_string($conn, $_POST['engine']);
            $transmission = mysqli_real_escape_string($conn, $_POST['transmission']);
            $fuel_type = mysqli_real_escape_string($conn, $_POST['fuel_type']);
            $mileage = (int)$_POST['mileage'];
            $exterior_color = mysqli_real_escape_string($conn, $_POST['exterior_color']);
            $interior_color = mysqli_real_escape_string($conn, $_POST['interior_color']);
            
            // Verificar si ya existen especificaciones para actualizar o insertar
            if (!empty($car_specs)) {
                $specs_update = "UPDATE car_specs SET 
                                engine = '$engine', 
                                transmission = '$transmission', 
                                fuel_type = '$fuel_type', 
                                mileage = $mileage, 
                                exterior_color = '$exterior_color', 
                                interior_color = '$interior_color' 
                                WHERE car_id = '$car_id'";
                mysqli_query($conn, $specs_update);
            } else {
                $specs_insert = "INSERT INTO car_specs (car_id, engine, transmission, fuel_type, mileage, exterior_color, interior_color) 
                                VALUES ('$car_id', '$engine', '$transmission', '$fuel_type', $mileage, '$exterior_color', '$interior_color')";
                mysqli_query($conn, $specs_insert);
            }
            
            // Actualizar características
            // Primero eliminar las anteriores
            $delete_features = "DELETE FROM car_features WHERE car_id = '$car_id'";
            mysqli_query($conn, $delete_features);
            
            // Insertar las nuevas características
            if (!empty($_POST['features'])) {
                $features = explode("\n", $_POST['features']);
                foreach ($features as $feature) {
                    $feature = trim($feature);
                    if (!empty($feature)) {
                        $feature = mysqli_real_escape_string($conn, $feature);
                        $feature_insert = "INSERT INTO car_features (car_id, feature_name) VALUES ('$car_id', '$feature')";
                        mysqli_query($conn, $feature_insert);
                    }
                }
            }
            
            $success_message = "¡Vehículo actualizado correctamente!";
            
            // Recargar datos después de la actualización
            $car_query = "SELECT * FROM cars WHERE id = '$car_id'";
            $car_result = mysqli_query($conn, $car_query);
            $car = mysqli_fetch_assoc($car_result);
            
            $specs_query = "SELECT * FROM car_specs WHERE car_id = '$car_id'";
            $specs_result = mysqli_query($conn, $specs_query);
            $car_specs = mysqli_fetch_assoc($specs_result) ?: [];
            
            $features_query = "SELECT feature_name FROM car_features WHERE car_id = '$car_id' ORDER BY id ASC";
            $features_result = mysqli_query($conn, $features_query);
            $car_features = [];
            
            while ($feature = mysqli_fetch_assoc($features_result)) {
                $car_features[] = $feature['feature_name'];
            }
        } else {
            $error_message = "Error al actualizar el vehículo: " . mysqli_error($conn);
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Vehículo - MalaboCar Admin</title>
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        .image-preview-container {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .image-preview-item {
            position: relative;
            width: 150px;
            height: 100px;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .image-preview-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .image-actions {
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgba(0,0,0,0.5);
            border-radius: 0 0 0 4px;
            padding: 5px;
        }
        
        .image-actions button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 2px;
            font-size: 12px;
        }
        
        .image-position {
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: rgba(0,0,0,0.5);
            color: white;
            padding: 2px 8px;
            font-size: 12px;
            border-radius: 0 4px 0 0;
        }
        
        .image-upload-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 2px dashed #ccc;
            border-radius: 4px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 15px;
        }
        
        .image-upload-box:hover {
            border-color: #007bff;
        }
        
        .image-upload-box i {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .hidden-input {
            display: none;
        }
    </style>
</head>
<body>
    <div class="admin-layout">
        <?php include 'includes/admin_sidebar.php'; ?>
        
        <main class="admin-main">
            <header class="admin-header">
                <h1>Editar Vehículo</h1>
                <div class="admin-actions">
                    <a href="vehicles.php" class="admin-btn secondary">
                        <i class="fas fa-arrow-left"></i> Volver al listado
                    </a>
                </div>
            </header>
            
            <div class="admin-content">
                <?php if (isset($success_message)): ?>
                    <div class="alert success">
                        <i class="fas fa-check-circle"></i> <?php echo $success_message; ?>
                    </div>
                <?php endif; ?>
                
                <?php if (isset($error_message)): ?>
                    <div class="alert error">
                        <i class="fas fa-exclamation-circle"></i> <?php echo $error_message; ?>
                    </div>
                <?php endif; ?>
                
                <?php if (!empty($errors)): ?>
                    <div class="alert error">
                        <ul>
                            <?php foreach ($errors as $error): ?>
                                <li><i class="fas fa-exclamation-circle"></i> <?php echo $error; ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>
                
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h2>Imágenes del vehículo</h2>
                    </div>
                    <div class="admin-card-body">
                        <div class="image-preview-container">
                            <?php for ($pos = 0; $pos < 3; $pos++): ?>
                                <?php 
                                $current_image = null;
                                foreach ($car_images as $image) {
                                    if ($image['position'] == $pos) {
                                        $current_image = $image;
                                        break;
                                    }
                                }
                                ?>
                                <div class="image-preview-item">
                                    <?php if ($current_image): ?>
                                        <img src="<?php echo $current_image['image_url']; ?>" alt="Imagen <?php echo $pos + 1; ?>" onerror="this.src='../assets/images/no-image.jpg';">
                                        <div class="image-position">
                                            Posición <?php echo $pos + 1; ?>
                                            <?php if ($pos == 0): ?> (Principal)<?php endif; ?>
                                        </div>
                                        <div class="image-actions">
                                            <button type="button" title="Eliminar" onclick="confirmDeleteImage(<?php echo $current_image['id']; ?>)">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    <?php else: ?>
                                        <div style="display:flex; justify-content:center; align-items:center; height:100%; background:#f5f5f5;">
                                            <i class="fas fa-image" style="font-size:24px; color:#ccc;"></i>
                                        </div>
                                        <div class="image-position">
                                            Posición <?php echo $pos + 1; ?>
                                            <?php if ($pos == 0): ?> (Principal)<?php endif; ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php endfor; ?>
                        </div>
                        
                        <div class="upload-section">
                            <h3>Subir nueva imagen</h3>
                            <p>Seleccione la posición y suba una imagen desde su dispositivo:</p>
                            
                            <form id="upload-form" action="upload_image.php" method="post" enctype="multipart/form-data">
                                <input type="hidden" name="car_id" value="<?php echo $car_id; ?>">
                                
                                <div class="form-group">
                                    <label for="position">Posición:</label>
                                    <select name="position" id="position" required>
                                        <option value="0">Posición 1 (Principal)</option>
                                        <option value="1">Posición 2</option>
                                        <option value="2">Posición 3</option>
                                    </select>
                                </div>
                                
                                <div class="image-upload-box" id="drop-area" onclick="document.getElementById('image').click()">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Haga clic aquí o arrastre una imagen</p>
                                    <input type="file" id="image" name="image" accept="image/*" class="hidden-input" onchange="handleFileSelect(this)">
                                </div>
                                
                                <div id="preview-container" style="display: none; margin-bottom: 15px;">
                                    <h4>Vista previa:</h4>
                                    <img id="image-preview" src="#" alt="Vista previa" style="max-width: 300px; max-height: 200px;">
                                    <button type="button" class="admin-btn secondary" onclick="clearImageSelection()">
                                        <i class="fas fa-times"></i> Cancelar
                                    </button>
                                </div>
                                
                                <button type="submit" class="admin-btn" id="upload-button" disabled>
                                    <i class="fas fa-upload"></i> Subir imagen
                                </button>
                            </form>
                            
                            <div id="upload-progress" style="display:none;">
                                <p>Subiendo imagen... <span id="progress-percent">0%</span></p>
                                <div class="progress-bar">
                                    <div id="progress-bar-fill" style="width: 0%;"></div>
                                </div>
                            </div>
                            
                            <div id="upload-result" style="display:none; margin-top: 15px;"></div>
                        </div>
                    </div>
                </div>
                
                <form method="post" action="">
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h2>Información básica</h2>
                        </div>
                        <div class="admin-card-body">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="brand">Marca:</label>
                                    <input type="text" id="brand" name="brand" value="<?php echo htmlspecialchars($car['brand']); ?>" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="model">Modelo:</label>
                                    <input type="text" id="model" name="model" value="<?php echo htmlspecialchars($car['model']); ?>" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="year">Año:</label>
                                    <input type="number" id="year" name="year" min="1900" max="2100" value="<?php echo $car['year']; ?>" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="price">Precio (€):</label>
                                    <input type="number" id="price" name="price" min="0" step="0.01" value="<?php echo $car['price']; ?>" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="stock">Stock:</label>
                                    <input type="number" id="stock" name="stock" min="0" value="<?php echo $car['stock']; ?>" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="description">Descripción:</label>
                                <textarea id="description" name="description" rows="5"><?php echo htmlspecialchars($car['description']); ?></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h2>Especificaciones técnicas</h2>
                        </div>
                        <div class="admin-card-body">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="engine">Motor:</label>
                                    <input type="text" id="engine" name="engine" value="<?php echo htmlspecialchars($car_specs['engine'] ?? ''); ?>">
                                </div>
                                
                                <div class="form-group">
                                    <label for="transmission">Transmisión:</label>
                                    <input type="text" id="transmission" name="transmission" value="<?php echo htmlspecialchars($car_specs['transmission'] ?? ''); ?>">
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="fuel_type">Tipo de combustible:</label>
                                    <input type="text" id="fuel_type" name="fuel_type" value="<?php echo htmlspecialchars($car_specs['fuel_type'] ?? ''); ?>">
                                </div>
                                
                                <div class="form-group">
                                    <label for="mileage">Kilometraje:</label>
                                    <input type="number" id="mileage" name="mileage" min="0" value="<?php echo $car_specs['mileage'] ?? 0; ?>">
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="exterior_color">Color exterior:</label>
                                    <input type="text" id="exterior_color" name="exterior_color" value="<?php echo htmlspecialchars($car_specs['exterior_color'] ?? ''); ?>">
                                </div>
                                
                                <div class="form-group">
                                    <label for="interior_color">Color interior:</label>
                                    <input type="text" id="interior_color" name="interior_color" value="<?php echo htmlspecialchars($car_specs['interior_color'] ?? ''); ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h2>Características</h2>
                        </div>
                        <div class="admin-card-body">
                            <div class="form-group">
                                <label for="features">Características (una por línea):</label>
                                <textarea id="features" name="features" rows="6"><?php echo htmlspecialchars(implode("\n", $car_features)); ?></textarea>
                                <p class="form-help">Ingrese cada característica en una línea separada.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <a href="vehicles.php" class="admin-btn secondary">Cancelar</a>
                        <button type="submit" name="update_vehicle" class="admin-btn">
                            <i class="fas fa-save"></i> Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
    
    <!-- Modal de confirmación para eliminar imagen -->
    <div id="delete-image-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Confirmar eliminación</h2>
                <span class="close" onclick="closeModal('delete-image-modal')">&times;</span>
            </div>
            <div class="modal-body">
                <p>¿Está seguro de que desea eliminar esta imagen?</p>
                <p>Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
                <form id="delete-image-form">
                    <input type="hidden" name="image_id" id="delete-image-id">
                    <button type="button" class="admin-btn secondary" onclick="closeModal('delete-image-modal')">Cancelar</button>
                    <button type="button" class="admin-btn danger" onclick="deleteImage()">Eliminar</button>
                </form>
            </div>
        </div>
    </div>
    
    <script>
        // Manejar selección de archivo
        function handleFileSelect(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    document.getElementById('image-preview').src = e.target.result;
                    document.getElementById('preview-container').style.display = 'block';
                    document.getElementById('upload-button').disabled = false;
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        // Limpiar selección de imagen
        function clearImageSelection() {
            document.getElementById('image').value = '';
            document.getElementById('preview-container').style.display = 'none';
            document.getElementById('upload-button').disabled = true;
        }
        
        // Configurar drag and drop para la subida de imágenes
        const dropArea = document.getElementById('drop-area');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropArea.style.borderColor = '#007bff';
            dropArea.style.backgroundColor = '#f8f9fa';
        }
        
        function unhighlight() {
            dropArea.style.borderColor = '#ccc';
            dropArea.style.backgroundColor = '';
        }
        
        dropArea.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                document.getElementById('image').files = files;
                handleFileSelect(document.getElementById('image'));
            }
        }
        
        // Subida de imágenes con AJAX para mostrar progreso
        document.getElementById('upload-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const xhr = new XMLHttpRequest();
            
            // Mostrar barra de progreso
            document.getElementById('upload-progress').style.display = 'block';
            document.getElementById('upload-button').disabled = true;
            
            xhr.upload.addEventListener('progress', function(e) {
                if (e.lengthComputable) {
                    const percentComplete = Math.round((e.loaded / e.total) * 100);
                    document.getElementById('progress-percent').textContent = percentComplete + '%';
                    document.getElementById('progress-bar-fill').style.width = percentComplete + '%';
                }
            });
            
            xhr.addEventListener('load', function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    
                    // Mostrar resultado
                    const resultDiv = document.getElementById('upload-result');
                    resultDiv.style.display = 'block';
                    
                    if (response.success) {
                        resultDiv.innerHTML = '<div class="alert success"><i class="fas fa-check-circle"></i> ' + response.message + '</div>';
                        
                        // Recargar la página para mostrar la nueva imagen
                        setTimeout(function() {
                            window.location.reload();
                        }, 1500);
                    } else {
                        resultDiv.innerHTML = '<div class="alert error"><i class="fas fa-exclamation-circle"></i> ' + response.message + '</div>';
                    }
                } else {
                    document.getElementById('upload-result').innerHTML = '<div class="alert error"><i class="fas fa-exclamation-circle"></i> Error en la comunicación con el servidor.</div>';
                    document.getElementById('upload-result').style.display = 'block';
                }
                
                // Ocultar barra de progreso
                document.getElementById('upload-progress').style.display = 'none';
                document.getElementById('upload-button').disabled = false;
            });
            
            xhr.addEventListener('error', function() {
                document.getElementById('upload-result').innerHTML = '<div class="alert error"><i class="fas fa-exclamation-circle"></i> Error en la comunicación con el servidor.</div>';
                document.getElementById('upload-result').style.display = 'block';
                document.getElementById('upload-progress').style.display = 'none';
                document.getElementById('upload-button').disabled = false;
            });
            
            xhr.open('POST', 'upload_image.php', true);
            xhr.send(formData);
        });
        
        // Confirmar eliminación de imagen
        function confirmDeleteImage(imageId) {
            document.getElementById('delete-image-id').value = imageId;
            document.getElementById('delete-image-modal').style.display = 'flex';
        }
        
        // Eliminar imagen con AJAX
        function deleteImage() {
            const imageId = document.getElementById('delete-image-id').value;
            const formData = new FormData();
            formData.append('image_id', imageId);
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'delete_image.php', true);
            
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            // Cerrar modal y recargar página
                            closeModal('delete-image-modal');
                            window.location.reload();
                        } else {
                            alert('Error al eliminar la imagen: ' + response.message);
                        }
                    } catch (e) {
                        alert('Error al procesar la respuesta del servidor');
                    }
                } else {
                    alert('Error en la comunicación con el servidor');
                }
            };
            
            xhr.send(formData);
        }
        
        // Cerrar modal
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }
        
        // Cerrar modal al hacer clic fuera
        window.onclick = function(event) {
            const modals = document.getElementsByClassName('modal');
            for (let i = 0; i < modals.length; i++) {
                if (event.target == modals[i]) {
                    modals[i].style.display = 'none';
                }
            }
        }
    </script>
</body>
</html>
