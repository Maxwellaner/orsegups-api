import app from '../../../../app';
import request from 'supertest';

describe("Integration - Create contacts", () => {
  it("should be able to create a new contact", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration create',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-create@gmail.com"
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to create a new contact with incorrectly name format", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: '9999',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-create@gmail.com"
    });
    expect(response.status).toBe(400);
  });

  it("should not be able to create a new contact with incorrectly number format", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration create',
      contactType: 'familiar',
      phone: "539910393",
      email: "integration-create@gmail.com"
    });
    expect(response.status).toBe(400);
  });

  it("should not be able to create a new contact with incorrectly number format", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration create',
      contactType: 'familiar',
      phone: "53991039390111",
      email: "integration-create@gmail.com"
    });
    expect(response.status).toBe(400);
  });

  it("should not be able to create a new contact with incorrectly e-mail format", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration create',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-create.com"
    });
    expect(response.status).toBe(400);
  });

  it("should not be able to create a new contact with incorrectly contactType format", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration create',
      contactType: 'example',
      phone: "53991039390",
      email: "integration-create@gmail.com"
    });
    expect(response.status).toBe(400);
  });
});