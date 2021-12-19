import ContactInMemory from "../../../../modules/contact/in-memory/contactInMemoryRepository";
import IContactRepository from "../../../../modules/contact/interface/IContactRepository";
import ContactService from "../../../../modules/contact/services/contact.service";
import Contact from "../../../../sequelize-models/contact.model";

describe("Unit - Delete contact", () => {
  let mockRepository: IContactRepository;
  let service: ContactService;

  let contact: Contact;

  beforeAll(async () => {
    mockRepository = new ContactInMemory();
    service = new ContactService(mockRepository);

    contact = await service.create({
      name: 'Unit delete',
      contactType: 'familiar',
      email: 'unit-delete@gmail.com',
      phone: '53991039232'
    }) as Contact;
  });
  it("should be able to delete an existing contact", async () => {
    const response = await service.delete(Number(contact.id));

    expect(response).not.toBe(null);
  });
  it("should not be able to delete a unexisting contact", async () => {
    const contact = await service.delete(2);

    expect(contact).toBe("Este contato não existe!");
  });
})