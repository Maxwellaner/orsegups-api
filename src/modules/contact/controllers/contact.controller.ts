import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../../utils/interfaces/controller.interface";
import validationMiddleware from '../../../middleware/validation.middleware';
import validate from '../schemas/contact.schema';
import HttpException from "../../../utils/exceptions/http.exception";
import ContactService from "../services/contact.service";
import ContactRepository from "../repository/contactRepository";
export default class ContactController implements Controller {
  public path = '/contacts'
  public router = Router();
  private repository = new ContactRepository();
  private contactService = new ContactService(this.repository);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(validate.create),
      this.create
    );
    this.router.get(
      `${this.path}`,
      this.getAll
    );
    this.router.get(
      `${this.path}/:id`,
      this.get
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(validate.put),
      this.put
    );
    this.router.delete(
      `${this.path}/:id`,
      this.delete
    );
  }

  private create = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { body } = req;
      const contact = await this.contactService.create(body);
      res.status(201).json({ contact: contact });
    } catch(e) {
      next(new HttpException(400, 'An error occurred, please try again later'));
    }
  }

  private get = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const contact = await this.contactService.getById(Number(req.params.id));
    res.send(contact);
  }

  private getAll = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const contacts = await this.contactService.getAll();
    res.send(contacts);
  }

  private put = async(req: Request, res: Response, next: NextFunction) : Promise<Response | void> => {
    const { body } = req;
    const contact = await this.contactService.put(Number(req.params.id), body);
    res.send(contact);
  }

  private delete = async(req: Request, res: Response, next: NextFunction) : Promise<Response | void> => {
    try {
      await this.contactService.delete(Number(req.params.id));
      res.status(200);
    } catch(e) {
      next(new HttpException(400, 'An error occurred, please try again later'));
    }
  }
}