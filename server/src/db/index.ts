import { Sequelize } from "sequelize";

import { config } from "dotenv"; 
config();

const sequelize = new Sequelize( process.env.DB!, process.env.USER!, process.env.PASSWORD!, {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: (...msg) => console.log(msg)
});

export { sequelize }