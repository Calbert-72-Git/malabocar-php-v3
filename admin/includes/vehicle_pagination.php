
<?php
function displayVehiclePagination($total_pages, $page, $search = '') {
    if ($total_pages <= 1) return;
    
    $search_param = !empty($search) ? "&search=" . urlencode($search) : '';
    ?>
    <div class="admin-pagination">
        <?php if ($page > 1): ?>
            <a href="?page=<?php echo $page - 1; ?><?php echo $search_param; ?>" class="page-link">
                <i class="fas fa-chevron-left"></i> Anterior
            </a>
        <?php endif; ?>
        
        <?php for ($i = max(1, $page - 2); $i <= min($page + 2, $total_pages); $i++): ?>
            <a href="?page=<?php echo $i; ?><?php echo $search_param; ?>" 
               class="page-link <?php echo $i == $page ? 'active' : ''; ?>">
                <?php echo $i; ?>
            </a>
        <?php endfor; ?>
        
        <?php if ($page < $total_pages): ?>
            <a href="?page=<?php echo $page + 1; ?><?php echo $search_param; ?>" class="page-link">
                Siguiente <i class="fas fa-chevron-right"></i>
            </a>
        <?php endif; ?>
    </div>
    <?php
}
?>
