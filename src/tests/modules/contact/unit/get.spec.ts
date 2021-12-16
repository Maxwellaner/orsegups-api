import ContactInMemory from "../../../../modules/contact/in-memory/contactInMemoryRepository";
import IContactRepository from "../../../../modules/contact/interface/IContactRepository";
import ContactService from "../../../../modules/contact/services/contact.service";
import Contact from "../../../../sequelize-models/contact.model";

describe("Get contacts", () => {
  let mockRepository: IContactRepository;
  let service: ContactService;

  let firstContact: Contact;
  let secondContact: Contact;

  beforeAll(async () => {
    mockRepository = new ContactInMemory();
    service = new ContactService(mockRepository);

    firstContact = await service.create({
      name: 'Unit get',
      contactType: 'familiar',
      email: 'unit-get@gmail.com',
      phone: '53991039232'
    });
    secondContact = await service.create({
      name: 'Unit get 2',
      contactType: 'familiar',
      email: 'unit-get2@gmail.com',
      phone: '53991039232'
    });
  });
  it("should be able to get a contact", async () => {
    const contact = await service.getById(Number(firstContact.id));
    expect(contact).toHaveProperty("name");
    expect(contact?.name).toBe('Unit get');
  });
  it("should be able to get many contacts", async () => {
    const contacts = await service.getAll();
    expect(contacts.length).toBeGreaterThan(0);
    expect(contacts[0].name).toBe('Unit get');
  });
});