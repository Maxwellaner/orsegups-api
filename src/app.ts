import express, { Application } from 'express';
import cors from 'cors';

import Controller from './utils/interfaces/controller.interface';
import ErrorMiddleware from './middleware/error.middleware';
import sequelize from './database/connection';

import ContactController from './modules/contact/controllers/contact.controller';
class App {
  public express: Application;

  constructor(controllers: Controller[]) {
    this.express = express();

    this.initialize();
    this.initializeControllers(controllers);
    this.initializaErrorHandler();
  }

  private initialize(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: false }));
    sequelize.sync();
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    })
  }

  private initializaErrorHandler(): void {
    this.express.use(ErrorMiddleware);
  }
}

export default new App([new ContactController()]).express;
