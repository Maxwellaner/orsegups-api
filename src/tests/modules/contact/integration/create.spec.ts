import app from '../../../../app';
import request from 'supertest';

describe("Create contacts", () => {
  it("should be able to create a new contact", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'kkk',
      contactType: 'familiar',
      phone: "53991039390",
      email: "kkk@gmail.com"
    });
    
    expect(response.status).toBe(201);
    expect(response.body.contact).toHaveProperty("id");
  })
  it("shoud", async () => {
    const response = await request(app).get("/api/contacts");
    expect(response.status).toBe(200);
  })
})