
<aside class="admin-sidebar">
    <div class="admin-brand">
        <h2>MalaboCar</h2>
        <p>Panel Admin</p>
    </div>
    <nav class="admin-nav">
        <ul>
            <li>
                <a href="dashboard.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'dashboard.php' ? 'active' : ''; ?>">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </a>
            </li>
            <li>
                <a href="vehicles.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'vehicles.php' || basename($_SERVER['PHP_SELF']) == 'edit_vehicle.php' || basename($_SERVER['PHP_SELF']) == 'add_vehicle.php' ? 'active' : ''; ?>">
                    <i class="fas fa-car"></i> Vehículos
                </a>
            </li>
            <li>
                <a href="orders.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'orders.php' || basename($_SERVER['PHP_SELF']) == 'view_order.php' ? 'active' : ''; ?>">
                    <i class="fas fa-shopping-cart"></i> Pedidos
                </a>
            </li>
            <li>
                <a href="customers.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'customers.php' ? 'active' : ''; ?>">
                    <i class="fas fa-users"></i> Clientes
                </a>
            </li>
            <li>
                <a href="settings.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'settings.php' ? 'active' : ''; ?>">
                    <i class="fas fa-cog"></i> Configuración
                </a>
            </li>
        </ul>
    </nav>
    <div class="admin-sidebar-footer">
        <a href="logout.php">
            <i class="fas fa-sign-out-alt"></i> Cerrar sesión
        </a>
    </div>
</aside>
