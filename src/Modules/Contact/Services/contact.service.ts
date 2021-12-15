import Contact from "../Models/contact.model";

export default class ContactService {
  private contact = Contact;

  public async create(body: string): Promise<Contact> {
    try {
      return await Contact.create(body);
    } catch(e) {
      throw new Error('Unable to create contact');
    }
  }

  public async getById(id: number): Promise<Contact | null> {
    return await Contact.findByPk(id);
  }

  public async getAll(): Promise<Contact[]> {
    return await Contact.findAll();
  }

  public async getByEmail(email: string): Promise<Contact | null> {
    return await Contact.findOne({ where: {email} });
  }
}