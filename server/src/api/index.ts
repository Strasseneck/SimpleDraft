import express, { Express, Request, Response } from "express";
import cors from "cors";
import { sequelize } from "../db";

const app: Express = express();
const PORT: number = 3000;

app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.json('Hello Express with Typescript')
});


async function bootstrap () {
    await sequelize.sync({ force : true });
    app.listen(PORT)
    console.log(`Server running at http://localhost:${PORT}`)
}

bootstrap ();

