export default class Contact {
  id?: number;
  name: string;
  contactType: string;
  phone: string;
  email: string;

  private constructor({ name, email, phone, contactType}: Contact) {
    this.name = name;
    this.contactType = contactType;
    this.email = email;
    this.phone = phone;
  }

  static create({ name, email, phone, contactType}: Contact) {
    const contact = new Contact({ name, email, phone, contactType });
    return contact;
  }

}