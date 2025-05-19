# ENTREGABLES DEL PROYECTO MALABO CAR FOR CALBERT 72

* Entidad: CALBERT 72 S.L
* SITE: www.calbert72.com
* Email: info@calbert72.com / cbt72info@gmail.com
* Dirección: Malabo, Guinea Ecuatorial
* Tel: +240222176082
______________________________________________________________________
______________________________________________________________________  

# What technologies are used for this project?

Tecnologías del proyecto o lenguajes de programación:

- PHP
- CSS
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

- IA de integración y de implementación: https://lovable.dev

## INFORMACION SOBRE LA IMPLEMENTACIÓN DE ESTE SITIO WEB DE VENTA Y COMPRA DE VEHICULOS:

Dado que el proyecto tiene una parte en PHP y otra en React, centrémonos en la conexión MySQL desde PHP, que es donde se maneja el backend (Información de registros de datos)

## CONECTAR A LA BASE DE DATOS:

He implementado la conexión a MySQL en tu proyecto de MalaboCar. Aquí está lo que he añadido:

Un archivo de configuración de la base de datos (includes/db_config.php) donde puedes configurar los parámetros de conexión a tu MySQL.

He actualizado las funciones de consulta de coches (includes/car_functions.php) para que obtengan los datos desde MySQL, manteniendo la compatibilidad con los datos estáticos en caso de que la conexión a la base de datos falle.

He creado un script SQL (database/setup.sql) con la estructura de la base de datos y datos de ejemplo que puedes importar en tu servidor MySQL.

He actualizado la página de pedidos para guardar los datos en la base de datos cuando un usuario completa un pedido.

Para que esto funcione, necesitas:

Instalar MySQL en tu servidor o usar un servicio de hosting con MySQL
Crear una base de datos llamada "malabocar" (o cambiar el nombre en db_config.php)
Importar el archivo setup.sql en tu base de datos
Actualizar las credenciales en db_config.php con tu usuario y contraseña de MySQL

### MEJORAS SOBRE LA RENDERIZACIÓN DE LA CONEXIÓN DE DATOS CUANDO SURJA ERROR EN ELLO:

Los problemas se han solucionado añadiendo la gestión de errores al archivo home.php. Estas son las principales correcciones:

Se ha añadido la verificación correcta de los datos devueltos por las funciones de la base de datos.
Se han añadido alternativas para cuando los datos no están disponibles o las matrices están vacías.
Se ha añadido la gestión correcta de errores para imágenes faltantes.
Se ha añadido información visual cuando no hay coches ni marcas disponibles.
Se ha actualizado la conexión a la base de datos para que falle correctamente cuando no esté disponible.
Estos cambios garantizan que, incluso si hay un problema de conexión a la base de datos o si faltan datos, la página se renderizará correctamente sin generar errores de PHP.




