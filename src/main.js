import e from "express";
import router from "./routes/routes.js";
import u_router from "./routes/routers_user.js";
import { errorHandler } from "./middleware/errorMiddle.js";
import { connect } from "./config/db.js";
import cors from 'cors';
import { swaggerUi, specs } from "./swagger/swagger.js";

const app = e();
connect();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors({
    origin: true,
    credentials: true,
    methods: 'POST, PUT, DELETE, OPTIONS'
}));

app.use(e.json());
app.use(e.urlencoded({ extended: false }));
const port =  3000;

export const run = () => {

    app.use('/api/posts/', router);
    app.use('/api/user/', u_router);
    app.use(errorHandler);
    app.listen(port);
    console.log(`Swagger docs available at http://localhost:${port}/docs`);
}