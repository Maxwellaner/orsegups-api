import IContactRepository from "../interface/IContactRepository";
import Contact from "../../../sequelize-models/contact.model";

export default class ContactInMemory implements IContactRepository {
  private contacts: Contact[] = [];

  async create(contact: Contact): Promise<Contact> {
    Object.assign(contact, {
      id: Math.random() * 100
    });
    this.contacts.push(contact);
    return Promise.resolve(contact);
  }
  findByPk(id: number): Promise<Contact | undefined> {
    throw new Error("Method not implemented.");
  }
  findOne(email: string): Promise<Contact | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Contact[]> {
    throw new Error("Method not implemented.");
  }
  async checkIfContactExists(contact: Contact): Promise<Boolean> {
    const exists = !!this.contacts.some(item => item.email === contact.email);
    return Promise.resolve(exists);
  }
}