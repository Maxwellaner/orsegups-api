import IContactRepository from "../interface/IContactRepository";
import Contact from "../../../sequelize-models/contact.model";

import SequelizeContact from "../models/sequelize.contact";
import { CreateDto, PutDto } from "../dto/create.dto";

export default class ContactRepository implements IContactRepository {
  async create(contact: CreateDto): Promise<Contact> {
    return await (await SequelizeContact.create(contact)).toJSON();
  }
  async findByPk(id: number): Promise<Contact | null | undefined> {
    return (await SequelizeContact.findByPk(id))?.toJSON();
  }
  async findOne(email: string): Promise<Contact | null | undefined> {
    const contact = (await SequelizeContact.findOne({ where: { email } }))?.toJSON();
    return contact as Contact;
  }
  async findAll(): Promise<Contact[]> {
    const contacts: Contact[] = [];
    const response = await SequelizeContact.findAll();
    response.forEach(contact => contacts.push(contact.toJSON()));
    return contacts;
  }
  async checkIfContactExists(contact: Contact): Promise<Boolean> {
    return !!await this.findOne(contact.email);
  }
  async put(id: number, dto: PutDto): Promise<Contact> {
    const contact = await SequelizeContact.findByPk(id) as SequelizeContact;
    contact.set(dto);
    await contact.save();
    return contact.toJSON();
  }
  async delete(id: number): Promise<void> {
    const contact = await SequelizeContact.findByPk(id) as SequelizeContact;
    return await contact.destroy();
  }
}