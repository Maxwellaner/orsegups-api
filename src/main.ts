import App from './app';
import ContactController from './modules/contact/controllers/contact.controller';
import sequelize from './database/connection';

sequelize.sync();
const app = new App([new ContactController()], 4000);

app.listen();
