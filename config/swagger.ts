import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Project Test Elevarm',
      version: '1.0.0',
      description: 'Mini Project Test Elevarm - Gojek App Backend',
    },
  },
  // Path to the API docs
  apis: ['./src/modules/**/*.ts'], // Your route files containing OpenAPI annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;