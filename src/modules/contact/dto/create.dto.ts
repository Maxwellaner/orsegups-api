type CreateDto = {
  id?: number;
  name: string;
  contactType: string;
  phone: string;
  email: string;
}

type PutDto = {
  name?: string;
  contactType?: string;
  phone?: string;
  email?: string;
}

export { CreateDto, PutDto }
