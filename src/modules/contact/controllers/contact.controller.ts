import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../../utils/interfaces/controller.interface";
import validationMiddleware from '../../../middleware/validation.middleware';
import validate from '../schemas/contact.schema';
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
    const { body } = req;
    const contact = await this.contactService.create(body);
    if (!contact) {
      res.status(400).json({ message: 'Este e-mail já existe! Confira na lista de contatos' });
    } else {
      res.status(201).json(contact);
    }
  }

  private get = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const contact = await this.contactService.getById(Number(req.params.id));
    if (!contact) {
      res.status(400).json({ message: 'Este contato não existe!' });
    } else {
      res.send(contact);
    }
  }

  private getAll = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const contacts = await this.contactService.getAll();
    res.send(contacts);
  }

  private put = async(req: Request, res: Response, next: NextFunction) : Promise<Response | void> => {
    const { body } = req;
    const contact = await this.contactService.put(Number(req.params.id), body);
    if (typeof contact !== 'string') {
      res.send(contact);
    } else {
      res.status(400).json({ message: contact });
    }
  }

  private delete = async(req: Request, res: Response, next: NextFunction) : Promise<Response | void> => {
    const response = await this.contactService.delete(Number(req.params.id));
    if (typeof response === 'string') {
      res.status(400).json({ message: response });
    } else {
      res.status(200).send(response);
    }
  }
}