import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT: number = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send('Hello Express with Typescript')
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});