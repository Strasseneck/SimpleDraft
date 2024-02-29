import express from "express";
import routes from './routes/index'
import cors from "cors";
import { sequelize } from "./db";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

async function bootstrap () {
    await sequelize.sync({ force : true });
    app.listen(PORT)
    console.log(`Server RUNNING at http://localhost:${PORT}`)
}

bootstrap ();

