# Memoria del proyecto Pole Dance

> Documento de trabajo. Se irá completando durante el desarrollo.

## 1. Descripción de la API

Pole Dance es una API de backend que permite consultar un catálogo común
de figuras de pole dance y registrar el progreso personal de cada usuaria.

La aplicación organiza la información en tres entidades: usuarias, figuras
y progresos. Cada usuaria puede indicar si está practicando una figura o
si ya la ha logrado. Las administradoras pueden gestionar el catálogo.

## 2. Base de datos

El proyecto utiliza MongoDB con Mongoose y organiza los datos en tres
colecciones: usuarias, figuras y progresos.

Los pasos de una figura están embebidos dentro de su documento, porque
forman parte de esa figura y se consultan junto a ella.

Los progresos se guardan en una colección separada. Cada progreso
referencia a una usuaria y a una figura. Así, varias usuarias pueden tener un progreso diferente para la misma figura sin duplicar los datos del catálogo.

Mongoose define los modelos y algunas validaciones, como los campos
obligatorios y los niveles permitidos para las figuras.

MongoDB encaja en este proyecto porque permite guardar los pasos de una
figura dentro del mismo documento y consultarlos junto con sus datos.

Con una base de datos SQL, podría organizar la información en tablas
para usuarias, figuras, pasos y progresos. Los pasos se relacionarían
con su figura y los progresos con la usuaria y la figura mediante claves
foráneas. Para reunir la información se podrían utilizar consultas JOIN.

## 3. Arquitectura

La API está desarrollada con Node.js y Express. El código se organiza
en carpetas según la función de cada archivo:

- `config`: prepara la conexión de la aplicación con MongoDB.
- `routes`: define los métodos y las direcciones de la API.
- `controllers`: recibe las peticiones, comprueba los datos y permisos
  que correspondan, llama a los servicios y prepara las respuestas.
- `services`: contiene funciones para realizar operaciones de la
  aplicación y trabajar con los modelos.
- `models`: define las estructuras y validaciones de los datos con
  Mongoose.
- `middlewares`: comprueba la autenticación y los permisos de
  administradora, y gestiona los errores.

La aplicación se configura en `src/app.js`, arranca desde `src/index.js`
y se conecta a la base de datos mediante `src/config/db.js`.
La API y MongoDB se ejecutan mediante Docker Compose. 
MongoDB Compass permite consultar los datos de forma visual.

## 4. Seguridad

La API dispone de registro e inicio de sesión. Al registrar una cuenta,
la contraseña se transforma en un hash mediante bcrypt antes de guardarse.
Al iniciar sesión, bcrypt comprueba la contraseña y la API devuelve un
token JWT.

Las rutas protegidas reciben el token en la cabecera Authorization.
El middleware verifica el token y comprueba que la cuenta siga existiendo.
Si la cuenta se ha eliminado, su token deja de dar acceso.

Hay dos roles: `user` y `admin`. El registro público crea cuentas con
rol `user`; las rutas para crear, editar o eliminar figuras están
reservadas a administradoras.

Cada usuaria puede gestionar sus propios progresos y modificar su estado;
una administradora puede actualizar progresos de cualquier usuaria.
Además, una usuaria puede eliminar su propia cuenta y una administradora
puede eliminar cualquier cuenta.

## 5. Endpoints

| Método y ruta | Quién puede usarla | Respuesta correcta |
| --- | --- | --- |
| `POST /auth/registro` | Público | `201` y datos de la cuenta creada, sin contraseña |
| `POST /auth/login` | Público | `200`, datos de la usuaria y token |
| `GET /figuras` | Público | `200` y lista de figuras |
| `POST /figuras` | Administradora | `201` y figura creada |
| `PATCH /figuras/:figuraId` | Administradora | `200` y figura actualizada |
| `DELETE /figuras/:figuraId` | Administradora | `200` y figura eliminada |
| `GET /progresos` | Usuaria autenticada | `200` y sus progresos |
| `POST /progresos` | Usuaria autenticada | `201` y progreso creado |
| `PATCH /progresos/:progresoId` | Propietaria o administradora | `200` y progreso actualizado |
| `DELETE /usuarias/:usuariaId` | Propietaria o administradora | `200` y mensaje de confirmación |

Cuando una petición no puede completarse, la API devuelve un código y
un mensaje de error. Por ejemplo, puede responder con `400` si los datos
no son válidos, `401` si falta un token válido, `403` si la usuaria no
tiene permiso o `404` si no se encuentra el recurso.

Si se intenta eliminar una figura con progresos asociados, la API
responde con `409` y no elimina la figura. También devuelve `409` si
se intenta registrar un email que ya existe o duplicar el progreso de
una usuaria para la misma figura.

## 6. Testing

El proyecto utiliza Jest para las pruebas unitarias. Se ejecutan con
`npm test` y no necesitan una conexión a MongoDB; cuando es necesario,
se utilizan modelos y funciones simuladas.

Entre los casos comprobados están las validaciones de los modelos, el
registro y el inicio de sesión, el middleware de autorización, la
gestión de errores y algunas operaciones de los servicios.

Por ejemplo, se comprueba que una usuaria sin rol de administradora no
pueda acceder a una función reservada a administradoras y que se rechace
el token de una cuenta que ya no existe. También se comprueba que el
servicio solicite eliminar los progresos al eliminar una cuenta.

Para algunas validaciones del modelo de figura se siguió el ciclo TDD:
primero se escribió una prueba que fallaba, después se añadió la regla
y se volvió a ejecutar la prueba. Un ejemplo es el rechazo de un nivel
de figura no permitido.

Además, se hicieron pruebas manuales con Postman para comprobar las
peticiones y respuestas de la API, y se utilizó MongoDB Compass para
observar los datos guardados.

## 7. Retos y soluciones

- La conexión inicial con MongoDB devolvió un error de autenticación.
  Se revisó y reinicializó el entorno de desarrollo y se comprobó
  después que Mongoose podía conectarse correctamente.

- Al probar el progreso en Postman, envié el campo `figura` cuando la
  API esperaba `figuraId`. Revisé el nombre esperado y corregí la petición.

- Al probar una ruta protegida, introduje un identificador en lugar del
  token. Después distinguí que el token identifica a la usuaria que hace
  la petición, mientras que el ID señala el recurso con el que quiere
  trabajar.

## 8. Mejoras futuras

- Añadir una interfaz visual para consultar el catálogo y gestionar
  el progreso personal.
- Estudiar cómo añadir vídeos que muestren la realización de las figuras.
- Estudiar la desactivación y recuperación de cuentas como alternativa
  a la eliminación definitiva.
- Utilizar transacciones para que el borrado de una cuenta y sus
  progresos se realice de forma conjunta.
- Mejorar la documentación interactiva de la API con Swagger.