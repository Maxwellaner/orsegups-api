import app from '../../../../app';
import request from 'supertest';
import Contact from '../../../../sequelize-models/contact.model';

describe("Integration - Put contacts", () => {
  it("should be able to update an existing contact", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration put',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-put@gmail.com"
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    const contact: Contact = response.body;
    const newName = 'Integration put updated'
    const payload = {
      name: newName,
      phone: contact.phone,
      email: contact.email,
      contactType: contact.contactType
    }

    const updateResponse = await request(app).put(`/api/contacts/${contact.id}`).send(payload);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toEqual(newName);
  });

  it("should not be able to update an unexisting contact", async () => {
    const updateResponse = await request(app).put(`/api/contacts/${234234}`).send({
      name: 'Integration put',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-put@gmail.com"
    });

    expect(updateResponse.status).toBe(400);
  });
});