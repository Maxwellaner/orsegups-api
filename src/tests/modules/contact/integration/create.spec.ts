import app from '../../../../app';
import request from 'supertest';

describe("Create contacts", () => {
  it("should be able to create a new contact", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration create',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-create@gmail.com"
    });
    
    expect(response.status).toBe(201);
    expect(response.body.contact).toHaveProperty("id");
  })
})