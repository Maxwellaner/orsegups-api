import IContactRepository from "../interface/IContactRepository";
import contactModel from "../../../sequelize-models/contact.model";

import SequelizeContact from "../models/sequelize.contact";

export default class ContactRepository implements IContactRepository {
  async create(contact: contactModel): Promise<contactModel> {
    return await (await SequelizeContact.create(contact)).toJSON();
  }
  async findByPk(id: number): Promise<contactModel | null | undefined> {
    return (await SequelizeContact.findByPk(id))?.toJSON();
  }
  async findOne(email: string): Promise<contactModel | null | undefined> {
    return (await SequelizeContact.findOne({ where: { email } }))?.toJSON();
  }
  async findAll(): Promise<contactModel[]> {
    const contacts: contactModel[] = [];
    const response = await SequelizeContact.findAll();
    response.forEach(contact => contacts.push(contact.toJSON()));
    return contacts;
  }
  async checkIfContactExists(contact: contactModel): Promise<Boolean> {
    return !!await this.findOne(contact.email);
  }
}