import app from "./src/app.js"
import * as dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./src/docs/head.js";
import swaggerUI from "swagger-ui-express";

dotenv.config();

const port = process.env.PORT || 3000;

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));


