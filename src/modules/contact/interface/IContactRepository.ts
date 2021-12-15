import Contact from "../../../sequelize-models/contact.model";

export default interface IContactRepository {
  create(contact: Contact): Promise<Contact>;
  findByPk(id: number): Promise<Contact | null | undefined>;
  findOne(email: string): Promise<Contact | null | undefined>;
  findAll(): Promise<Contact[]>;
  checkIfContactExists(contact: Contact): Promise<Boolean>;
}