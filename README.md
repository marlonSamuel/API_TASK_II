# API_TASK_II

## Descripción

Este es un proyecto de Node.js que utiliza TypeScript, Express, y Firebase. El proyecto está configurado para gestionar diferentes entornos (desarrollo, producción, staging) mediante archivos `.env` y usa varias bibliotecas y herramientas para manejar la inyección de dependencias, validaciones y autenticación.

## Tecnologías Utilizadas

### Firebase Functions

**Firebase Functions** se utiliza para desplegar funciones serverless que se ejecutan en respuesta a eventos, como solicitudes HTTP. Elegí Firebase Functions porque proporciona una infraestructura escalable y administrada, lo que permite desplegar funciones sin necesidad de gestionar servidores. Esto facilita el desarrollo y la escalabilidad de la aplicación, especialmente cuando se necesita integrar con otros servicios de Firebase, como Firestore.

### Node.js

**Node.js** es una plataforma de ejecución para JavaScript en el servidor. Opté por Node.js debido a su rendimiento eficiente en la gestión de operaciones de entrada/salida (I/O) y su capacidad para manejar múltiples conexiones concurrentes. Node.js también ofrece un ecosistema amplio y maduro a través de npm, permitiendo el uso de numerosas bibliotecas y herramientas para acelerar el desarrollo.

### Express

**Express** es un framework minimalista para Node.js que simplifica el proceso de construcción de aplicaciones web y APIs. 
Elegí Express por su simplicidad y flexibilidad, así como por su amplia adopción en la comunidad Node.js. Express proporciona una forma rápida y fácil de definir rutas, manejar solicitudes y respuestas, y gestionar middleware, lo que acelera el desarrollo de la API del proyecto.

### Inyección de Dependencias (Awilix)

**Awilix** es una biblioteca para la inyección de dependencias en Node.js. Utilizo la inyección de dependencias para gestionar y resolver las dependencias de los servicios y controladores de manera más efectiva. Esto mejora la modularidad del código, facilita la prueba de unidades y el mantenimiento del proyecto, y permite una mayor flexibilidad en la configuración y el despliegue. Awilix proporciona un contenedor de dependencias que simplifica la administración de los componentes y sus interacciones dentro de la aplicación.

Estas tecnologías juntas proporcionan una base sólida para construir una aplicación escalable y mantenible, permitiendo una gestión eficiente del código y facilitando la integración con servicios y herramientas adicionales.


## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <url-del-repositorio>

2. **Instala las dependencias**
    npm install

## Configuración
Antes de compilar y ejecutar el proyecto, debes crear una carpeta llamada config en la raíz del proyecto. Dentro de esta carpeta, crea los siguientes archivos .env:

- production.env
- development.env
- staging.env

Estos archivos deben contener las variables de entorno necesarias para cada entorno

ejemplo de archivo.env
APP_FOO=development
jwt_secret=tu_secreto_jwt

Para usar uno de estos archivos antes de compilar, 
establece la variable de entorno APP_FOO al nombre del archivo .env que deseas usar. 
Por ejemplo SET APP_FOO=development

## Iniciar la aplicación en desarrollo:
    npm run start:dev

## Coutruir el proyecto
    npm run build

## Ejecutar linter
    npm run lint

## Estructura del Proyecto

    src/ - Código fuente de la aplicación.
    src/controllers/ - Controladores de la aplicación.
    src/services/ - Servicios de la aplicación.
    src/dtos/ - Definiciones de Data Transfer Objects (DTOs).
    src/common/ - Utilidades comunes y clases base.
    config/ - Archivos de configuración .env.

## Dependencias.

El proyecto usa las siguientes dependencias:

    awilix: Contenedor de inyección de dependencias.
    awilix-express: Integración de Awilix con Express.
    axios: Cliente HTTP.
    cors: Middleware para manejo de CORS.
    dotenv: Carga de variables de entorno desde archivos .env.
    express: Framework para servidores web.
    express-validator: Middleware para validaciones.
    firebase-admin: SDK de administración de Firebase.
    jsonwebtoken: Manejo de JSON Web Tokens.
    moment: Librería para manipulación de fechas.
    save: Librería para almacenamiento de datos.
    sha.js: Hashing de algoritmos.
    socket.io: Comunicación en tiempo real.
    ts-node-dev: Herramienta para desarrollo en TypeScript.
    firebase-functions: Funciones de Firebase.

## Contribución
Si deseas contribuir a este proyecto, por favor haz un fork del repositorio y realiza un pull request con tus cambios. Asegúrate de seguir las normas de codificación establecidas.

## Licencia
Este proyecto está bajo la Licencia ISC. Consulta el archivo LICENSE para más detalles.

