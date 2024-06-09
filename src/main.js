import e from "express";
import router from "./routes/routes.js";
import user_router from "./routes/userRouter.js";
import { errorHandler } from "./middleware/errorMiddle.js";
import { connect } from "./config/db.js";
import cors from 'cors';

const app = e();
connect();

var whiteList = ['http://locahost:4200/'];

app.use(cors({
    origin: true,

    credentials: true,

    methods: 'POST, PUT, DELETE, OPTIONS'
}));

app.use(e.json());
app.use(e.urlencoded({ extended: false }));
const port = process.env.PORT || 8080;


console.log(port);
export const run = () => {

    app.use('/api/posts/', router);
    app.use('/user/', user_router);
    app.use(errorHandler);
    app.listen(port);
}