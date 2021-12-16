import IContactRepository from "../interface/IContactRepository";
import Contact from "../../../sequelize-models/contact.model";
import { PutDto } from "../dto/create.dto";

export default class ContactService {
  constructor(private readonly repository: IContactRepository) {}

  public async create(contact: Contact): Promise<Contact> {
    const exists = await this.getByEmail(contact.email);
    if (exists) throw new Error('Contact already exists');
    const response = await this.repository.create(contact);
    contact.id = response.id;
    return contact;
  }

  public async getById(id: number): Promise<Contact | null | undefined> {
    const contact = await this.repository.findByPk(id);
    if (!contact) throw new Error('Contact dont exists');
    return contact;
  }

  public async getAll(): Promise<Contact[]> {
    return await this.repository.findAll();
  }

  public async getByEmail(email: string): Promise<Contact | null | undefined> {
    return await this.repository.findOne(email);
  }

  public async put(id: number, dto: PutDto): Promise<Contact> {
    if (!id) throw new Error('Invalid contact identifier');
    await this.getById(id);
    return await this.repository.put(id, dto);
  }

  public async delete(id: number): Promise<void> {
    if (!id) throw new Error('Invalid contact identifier');
    await this.getById(id);
    return await this.repository.delete(id);
  }
}