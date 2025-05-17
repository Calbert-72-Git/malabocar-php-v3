
<?php
function getVehiclesList($conn, $search = '', $page = 1, $limit = 10) {
    $where_clause = "";
    if (!empty($search)) {
        $search = mysqli_real_escape_string($conn, $search);
        $where_clause = "WHERE brand LIKE '%$search%' OR model LIKE '%$search%' OR description LIKE '%$search%'";
    }

    $offset = ($page - 1) * $limit;

    $count_query = "SELECT COUNT(*) as total FROM cars $where_clause";
    $count_result = mysqli_query($conn, $count_query);
    $total_rows = mysqli_fetch_assoc($count_result)['total'];
    $total_pages = ceil($total_rows / $limit);

    $query = "SELECT c.*, 
             (SELECT image_url FROM car_images WHERE car_id = c.id ORDER BY position ASC LIMIT 1) as main_image 
             FROM cars c 
             $where_clause 
             ORDER BY c.updated_at DESC 
             LIMIT $offset, $limit";
    $result = mysqli_query($conn, $query);
    
    return [
        'result' => $result,
        'total_pages' => $total_pages,
        'current_page' => $page
    ];
}
?>
