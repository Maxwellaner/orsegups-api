import IContactRepository from "../interface/IContactRepository";
import Contact from "../../../sequelize-models/contact.model";
import { CreateDto, PutDto } from "../dto/create.dto";

export default class ContactService {
  constructor(private readonly repository: IContactRepository) {}

  public async create(contact: CreateDto): Promise<Contact | null> {
    const exists = await this.getByEmail(contact.email);
    if (exists) return null;
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

  public async put(id: number, dto: PutDto): Promise<Contact | string> {
    const exists = await this.getById(id);
    if (!exists) return 'Este contato não existe!';
    if (dto.email) {
      const existingEmail = await this.getByEmail(dto.email);
      if (exists?.email !== dto.email)
        if (existingEmail) return 'Este e-mail já existe! Confira na lista de contatos';
    }
    return await this.repository.put(id, dto);
  }

  public async delete(id: number): Promise<Contact | string> {
    const exists = await this.getById(id);
    if (!exists) return 'Este contato não existe!';
    await this.repository.delete(id);
    return exists;
  }
}