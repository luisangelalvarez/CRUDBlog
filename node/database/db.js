import {Sequelize} from 'sequelize';

const db = new Sequelize('datablog', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db