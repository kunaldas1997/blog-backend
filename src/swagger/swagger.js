import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
   definition: {
      openapi: '3.0.3',
      info: {
         title: 'Blog API',
         version: '1.0.0',
         description: 'A Simple REST API for a Personal Blog'
      },
      servers: [
         {
            url: 'http://localhost:3000/api',
            description: "Development Server"
         }
      ]
   },
   apis: [
      'src/routes/*.js'
   ]
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
