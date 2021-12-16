import IContactRepository from "../interface/IContactRepository";
import Contact from "../../../sequelize-models/contact.model";
import { CreateDto, PutDto } from "../dto/create.dto";

export default class ContactInMemoryRepository implements IContactRepository {
  private contacts: Contact[] = [];

  create(contact: CreateDto): Promise<Contact> {
    Object.assign(contact, {
      id: Math.random() * 100
    });
    this.contacts.push(contact);
    return Promise.resolve(contact);
  }
  findByPk(id: number): Promise<Contact | undefined> {
    const contact = this.contacts.find(contact => {
      return contact.id === id;
    })
    return Promise.resolve(contact);
  }
  findOne(email: string): Promise<Contact | undefined> {
    const contact = this.contacts.find(contact => {
      return contact.email === email;
    })
    return Promise.resolve(contact);
  }
  findAll(): Promise<Contact[]> {
    return Promise.resolve(this.contacts);
  }
  checkIfContactExists(contact: Contact): Promise<Boolean> {
    const exists = !!this.contacts.some(item => item.email === contact.email);
    return Promise.resolve(exists);
  }
  put(id: number, contact: PutDto): Promise<Contact> {
    const oldContact = this.contacts.find(item => item.id === id) as Contact;
    Object.assign(oldContact, {
      ...contact
    });
    return Promise.resolve(oldContact);
  }
  delete(id: number): Promise<void> {
    const newArray = this.contacts.filter(contact => { return contact.id !== id });
    this.contacts = newArray;
    return Promise.resolve();
  }
}