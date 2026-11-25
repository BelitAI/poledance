# Pole Dance

Aplicación para consultar un catálogo de figuras de pole dance y registrar el progreso personal de cada usuaria.

## Requisitos

- Node.js y npm.
- Docker y Docker Compose.

## Instalación

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` a partir de `.env.example` y completar las
variables de entorno.

## Variables de entorno

- `MONGO_USER`, `MONGO_PASSWORD` y `MONGO_DB`: usuario, contraseña
  y nombre de la base de datos.
- `MONGO_HOST` y `MONGO_PORT`: dirección y puerto de MongoDB.
  Al ejecutar la API en el ordenador, pueden ser `localhost` y `27017`.
- `MONGO_AUTH_SOURCE`: base de datos de autenticación; en esta
  configuración se usa `admin`.
- `JWT_SECRET`: clave secreta usada para firmar y verificar tokens.

## Arrancar el proyecto

Con Docker en marcha, ejecuta este comando desde la carpeta del proyecto:

```bash
docker compose up --build -d
```

Este comando construye la imagen de la API y arranca los contenedores de la API y MongoDB.

Si modificas el código de la API, vuelve a ejecutar el mismo comando para reconstruir la imagen y aplicar los cambios.

La API estará disponible en `http://localhost:3001`.

Para detener los contenedores:

```bash
docker compose stop
```

Los datos de MongoDB se conservan en un volumen de Docker.

## Tests

Para ejecutar las pruebas:

```bash
npm test
```

## ## Objetivo del proyecto

Construir una API de backend con registro, inicio de sesión y permisos. Cada usuaria podrá consultar las figuras y registrar cuáles está intentando y cuáles ha conseguido.

La API tendrá al menos tres entidades, con un mínimo de dos colecciones en MongoDB. Además del registro y el login, contará con al menos tres endpoints funcionales, dos de los cuales modificarán la base de datos.

El servidor, la conexión a MongoDB, la autenticación y las rutas
principales del catálogo y del progreso personal ya están implementados.
El proyecto incluye pruebas unitarias y continúa en desarrollo.

## Tecnologías

- **Node.js:** ejecutar JavaScript en el servidor.
- **Express:** definir las rutas de la API y gestionar las peticiones y respuestas.
- **MongoDB:** guardar los datos en documentos.
- **Mongoose:** definir los modelos y las validaciones y trabajar con MongoDB desde JavaScript.
- **Jest:** ejecutar pruebas unitarias.
- **Docker Compose:** arrancar la API y MongoDB en contenedores.

## Modelo de datos

La aplicación tendrá tres entidades: usuarias, figuras y progresos.

| Entidad | Qué guarda | Datos iniciales |
| --- | --- | --- |
| Usuaria | Una cuenta y sus permisos | Nombre, email, contraseña protegida y rol |
| Figura | Una figura del catálogo común | Nombre, descripción y nivel |
| Progreso | El seguimiento personal de una figura | Referencias a la usuaria y la figura y estado |

### Organización en MongoDB

- Las usuarias se guardarán en una colección.
- Las figuras se guardarán en otra colección, compartida por todas las usuarias.
- Los progresos se guardan en una colección propia. Cada progreso tiene una referencia a la usuaria y otra a la figura del catálogo.
- El estado de un progreso puede ser `practicando` o `lograda`.
- Una usuaria tendrá como máximo un progreso por figura.
- Cada cuenta tendrá un email único.
- La contraseña se guardará como un hash y no se devolverá en las respuestas.

Por ejemplo, Ana puede tener un progreso de Fireman con estado
`practicando`. Otra usuaria puede referenciar la misma figura del
catálogo y tener su propio estado.

## Roles y permisos

| Rol | Permisos |
| --- | --- |
| `user` | Consultar el catálogo, gestionar sus propios progresos y eliminar su propia cuenta. |
| `admin` | Gestionar el catálogo, modificar los progresos de cualquier usuaria y eliminar cuentas. |

El registro público creará cuentas con el rol `user`. La API no
permitirá elegir el rol `admin` durante el registro.

Las rutas protegidas requerirán autenticación mediante JWT. Un
middleware comprobará el rol para restringir al menos una ruta a
administradoras. Cada usuaria puede modificar el estado de sus propios progresos.
Una administradora puede modificar el estado de los progresos de
cualquier usuaria.

Las contraseñas se protegerán mediante bcrypt y no se devolverán
en las respuestas de la API.

## Endpoints

Un endpoint es una combinación de método HTTP y ruta que permite realizar una acción en la API.

| Método | Ruta | Función | Acceso | Modifica la base de datos |
| --- | --- | --- | --- | --- |
| `POST` | `/auth/registro` | Crear una cuenta | Público | Sí |
| `POST` | `/auth/login` | Iniciar sesión | Público | No |
| `GET` | `/figuras` | Consultar el catálogo | Público | No |
| `POST` | `/figuras` | Añadir una figura | Administradora | Sí |
| `PATCH` | `/figuras/:figuraId` | Editar una figura | Administradora | Sí |
| `DELETE` | `/figuras/:figuraId` | Eliminar una figura sin progresos asociados | Administradora | Sí |
| `GET` | `/progresos` | Consultar mi seguimiento | Usuaria autenticada | No |
| `POST` | `/progresos` | Empezar a intentar una figura | Usuaria autenticada | Sí |
| `PATCH` | `/progresos/:id` | Actualizar el estado de un progreso | Propietaria o administradora | Sí |
| `DELETE` | `/usuarias/:usuariaId` | Eliminar una cuenta y sus progresos | Propietaria o administradora | Sí |

En `/progresos/:id`, `:id` representa el identificador del progreso
que queremos actualizar. La API comprobará que el progreso pertenece
a la usuaria autenticada, salvo que tenga el rol `admin`.

En `/usuarias/:usuariaId`, `:usuariaId` representa la cuenta que se
quiere eliminar. Una usuaria puede eliminar su propia cuenta y una
administradora puede eliminar cualquier cuenta. Al eliminarla, también
se eliminan sus progresos; las figuras del catálogo se conservan.

Actualmente, el borrado de los progresos y el de la cuenta se realizan
en dos operaciones separadas. Si la segunda falla, podrían eliminarse
los progresos y conservarse la cuenta. Queda pendiente estudiar el uso
de transacciones para realizar ambas operaciones de forma conjunta.

## Plan de trabajo

1. Definir el alcance, las entidades, los permisos y las rutas.
2. Preparar el servidor con Node.js y Express.
3. Configurar MongoDB con Docker y conectar la aplicación mediante Mongoose.
4. Configurar Jest para las pruebas unitarias.
5. Escribir primero los tests de cada funcionalidad y después implementar
   sus modelos, validaciones y lógica cuando corresponda.
6. Incluir al menos cuatro tests unitarios sin conexión a la base de
   datos, que cubran la autorización y una función de lógica o validación.
7. Implementar el registro, el login y las comprobaciones de permisos.
8. Implementar las rutas del catálogo y del seguimiento personal.
9. Comprobar los endpoints y documentar la instalación, las variables de
   entorno, el arranque y la ejecución de los tests.
10. Preparar la memoria del proyecto.

El desarrollo se hará paso a paso, explicando cada cambio antes de implementarlo.

