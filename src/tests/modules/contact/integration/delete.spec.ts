import app from '../../../../app';
import request from 'supertest';

describe("Integration - Delete contacts", () => {
  it("should be able to delete a contact", async () => {
    const response = await request(app).post("/api/contacts/create").send({
      name: 'Integration delete',
      contactType: 'familiar',
      phone: "53991039390",
      email: "integration-delete22222@gmail.com"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    
    const deleteResponse = await request(app).delete(`/api/contacts/${response.body.id}`);

    expect(deleteResponse.status).toBe(200);
  });

  it("should not be able to delete an unexisting contact", async () => {
    const deleteResponse = await request(app).delete(`/api/contacts/${34535345}`);

    expect(deleteResponse.status).toBe(400);
  });
});