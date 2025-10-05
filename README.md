Requisitos:
PHP 8.4 Node 22 + actualizado

Instalacion:
1-Descargar Repositorio 2-Colocar Carpeta en Visual Studio/PhpStorn

Opcion B... Clonar el repositorio
git clone [URL_DEL_REPOSITORIO] cd [NOMBRE_DEL_PROYECTO]

Ejecucion de Comandos en Consola o Terminal Visual Studio Code
2. Instalar dependencias de PHP
composer install

3. Configurar el archivo de entorno
cp .env.example .env (habilitar Apache y Mysql con XAMPP y crear base de datos "colocarle un nombre" tambien colocarlo en el .env)

4. Generar la clave de la aplicación
php artisan key:generate

5. Configurar la base de datos en .env y ejecutar migraciones
php artisan migrate --seed

6. Instalar dependencias de JavaScript
npm install

7. Compilar assets
npm run build

8. Correr Sistema
composer run dev
