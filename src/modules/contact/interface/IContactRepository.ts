import Contact from "../../../sequelize-models/contact.model";
import { CreateDto, PutDto } from "../dto/create.dto";

export default interface IContactRepository {
  create(contact: CreateDto): Promise<Contact>;
  findByPk(id: number): Promise<Contact | null | undefined>;
  findOne(email: string): Promise<Contact | null | undefined>;
  findAll(): Promise<Contact[]>;
  put(id: number, dto: PutDto): Promise<Contact>;
  delete(id: number): Promise<void>;
}