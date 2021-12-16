import ContactInMemory from "../../../../modules/contact/in-memory/contactInMemoryRepository";
import IContactRepository from "../../../../modules/contact/interface/IContactRepository";
import ContactService from "../../../../modules/contact/services/contact.service";
import Contact from "../../../../sequelize-models/contact.model";

describe("Put contact", () => {
  let mockRepository: IContactRepository;
  let service: ContactService;

  let contact: Contact;

  beforeAll(async () => {
    mockRepository = new ContactInMemory();
    service = new ContactService(mockRepository);

    contact = await service.create({
      name: 'Unit put',
      contactType: 'familiar',
      email: 'unit-put@gmail.com',
      phone: '53991039232'
    });
  });
  it("should be able to update a contact", async () => {
    const name = 'New name';
    const payload = {
      name,
    }
    const response = await service.put(Number(contact.id), payload);
    expect(response.name).toBe(name);
  });

  it("should not be able to update a contact that not exists", async () => {
    const name = 'New name';
    const payload = {
      name,
    }

    await expect(service.put(Number(2), payload)).rejects.toEqual(
      new Error('Contact dont exists')
    );
  });
})