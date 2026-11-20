# Memoria del proyecto Pole Dance

> Documento de trabajo. Se irá completando durante el desarrollo.

## 1. Descripción de la API

La aplicación permitirá consultar un catálogo común de figuras de pole
dance y registrar el progreso personal de cada usuaria.

Las entidades previstas son usuarias, figuras y progresos. Cada usuaria
podrá registrar si está intentando una figura o si la ha conseguido.

## 2. Base de datos

El proyecto utiliza MongoDB con Mongoose. La propuesta es guardar las
usuarias y las figuras en colecciones separadas, y embeber el progreso
dentro de cada usuaria con una referencia a la figura del catálogo.

Esta organización y sus validaciones están pendientes de implementación
y revisión.

## 3. Arquitectura

El servidor utiliza Node.js y Express. La configuración de la aplicación
está en `src/app.js`, el arranque en `src/index.js` y la conexión con la
base de datos en `src/config/db.js`.

MongoDB y Mongo Express se ejecutan mediante Docker Compose.

## 4. Seguridad

Pendiente de implementación. Están previstos registro y login con bcrypt
y JWT, dos roles y comprobaciones de propiedad de los recursos.

## 5. Endpoints

Pendientes de implementación. Las rutas previstas se describen en el
README.

## 6. Testing

Jest está configurado. Las pruebas unitarias están pendientes de
implementación y se escribirán antes de la lógica correspondiente.

## 7. Retos y soluciones

- La conexión inicial con MongoDB devolvió un error de autenticación.
  Se reinicializó el entorno sin datos de aplicación y se comprobó
  después que Mongoose podía conectarse correctamente.

## 8. Mejoras futuras

Pendiente de completar según avance el proyecto.