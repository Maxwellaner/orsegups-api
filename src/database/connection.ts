import { Sequelize } from 'sequelize';

const path = process.env.NODE_ENV == "test" ? './test.sqlite' : process.env.DB_PATH;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${path}`
});

export default sequelize;
