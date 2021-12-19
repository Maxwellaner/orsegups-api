import app from '../../../../app';
import request from 'supertest';
import Contact from '../../../../sequelize-models/contact.model';

describe("Integration - Get contacts", () => {
  it("should be able to get a contact", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration get',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-get@gmail.com"
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    const getResponse = await request(app).get(`/api/contacts/${response.body.id}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toEqual('Integration get');
  });

  it("should be able to get many contacts", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration get many',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-getmany@gmail.com"
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    const getResponse = await request(app).get('/api/contacts');

    expect(getResponse.status).toBe(200);
    
    const contacts: Contact[] = getResponse.body;
    const hasContact = contacts.find(item => {
      return item.id === response.body.id
    });

    expect(contacts.length).toBeGreaterThan(0);
    expect(hasContact).toBeTruthy();
  });
});