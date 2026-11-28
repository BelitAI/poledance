import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Pole Dance API",
            version: "1.0.0",
            description: "Documentación de la API de Pole Dance.",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Servidor de desarrollo",
            },
        ],
        tags: [
            { name: "Auth", description: "Registro e inicio de sesión" },
            { name: "Figuras", description: "Catálogo de figuras" },
            { name: "Progresos", description: "Progreso de las usuarias" },
            { name: "Usuarias", description: "Gestión de usuarias" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/docs/*.yml"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };