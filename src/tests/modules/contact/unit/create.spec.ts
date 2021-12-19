import ContactInMemory from "../../../../modules/contact/in-memory/contactInMemoryRepository";
import IContactRepository from "../../../../modules/contact/interface/IContactRepository";
import Contact from "../../../../sequelize-models/contact.model";
import ContactService from "../../../../modules/contact/services/contact.service";

describe("Unit - Create contacts", () => {
  let mockRepository: IContactRepository;
  let service: ContactService;

  const contactData: Contact = {
    name: 'Unit create',
    contactType: 'familiar',
    email: 'unit-create@gmail.com',
    phone: '53991039232'
  }

  beforeEach(() => {
    mockRepository = new ContactInMemory();
    service = new ContactService(mockRepository);
  });
  it("should be able to createa a new contact", async () => {
    const contact = await service.create(contactData) as Contact;
    expect(contact).toHaveProperty("id");
    expect(contact?.name).toBe('Unit create');
  });
  it("should not be able to create an existing contact", async () => {
    const contact = await service.create(contactData);
    expect(contact).not.toBe(null);
  });
});