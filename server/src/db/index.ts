import { Sequelize } from "sequelize";

import { password } from './models/password';

const sequelize = new Sequelize('drafts', 'strasseneck', password, {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: (...msg) => console.log(msg)
});

export { sequelize }