import IContactRepository from "../interface/IContactRepository";
import Contact from "../../../sequelize-models/contact.model";

export default class ContactService {
  constructor(private readonly repository: IContactRepository) {}

  public async create(contact: Contact): Promise<Contact> {
    if (await this.repository.checkIfContactExists(contact)) throw new Error('Contact already exists');
    const response = await this.repository.create(contact);
    contact.id = response.id;
    return contact;
  }

  public async getById(id: number): Promise<Contact | null | undefined> {
    return await this.repository.findByPk(id);
  }

  public async getAll(): Promise<Contact[]> {
    return await this.repository.findAll();
  }

  public async getByEmail(email: string): Promise<Contact | null | undefined> {
    return await this.repository.findOne(email);
  }
}