import ContactInMemory from "../../../../modules/contact/in-memory/contactInMemory";
import IContactRepository from "../../../../modules/contact/interface/IContactRepository";
import Contact from "../../../../sequelize-models/contact.model";
import ContactService from "../../../../modules/contact/services/contact.service";

const contactData: Contact = {
  name: 'Test',
  contactType: 'familiar',
  email: 'test@gmail.com',
  phone: '53991039232'
}

describe("Create contacts", () => {
  let repository: IContactRepository;
  let service: ContactService;

  beforeEach(() => {
    repository = new ContactInMemory();
    service = new ContactService(repository);
  });
  it("should be able to createa a new contact", async () => {
    const contact = await service.create(contactData);
    expect(contact).toHaveProperty("id");
    expect(contact.name).toBe('Test');
  });
  it("should not be able to create an existing contact", async () => {
    await service.create(contactData);

    await expect(service.create(contactData)).rejects.toEqual(
      new Error('Contact already exists')
    );
  });
});