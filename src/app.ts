import express, { Application } from 'express';
import cors from 'cors';

import Controller from './utils/interfaces/controller.interface';
import ErrorMiddleware from './middleware/error.middleware';

export default class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialize();
    this.initializeControllers(controllers);
    this.initializaErrorHandler();
  }

  private initialize(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: false }));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    })
  }

  private initializaErrorHandler(): void {
    this.express.use(ErrorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    })
  }
}