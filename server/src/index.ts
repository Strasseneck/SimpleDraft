import express from "express";
import routes from './routes/index'
import cors from "cors";
import { sequelize } from "./db/index";
import { syncDb } from "./db/sync";
import User from "./db/models/User";
import Draft from "./db/models/Draft";
import Change from "./db/models/Change";

import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

async function bootstrap () {
    await syncDb();
    // await sequelize.sync({ alter : true });
    // await User.sync();
    // await Draft.sync();
    // await Change.sync();
    app.listen(PORT)
    console.log(`Server RUNNING at http://localhost:${PORT}`)
}

bootstrap ();

