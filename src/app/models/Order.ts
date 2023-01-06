export class Order {
  id: string;
  full_name: string;
  total_price: number;
  cc_number: string;
  address: string;

  constructor(id = '', full_name = '', total_price = 0, address = '', cc_number = '') {
    this.id = id;
    this.full_name = full_name;
    this.total_price = total_price;
    this.address = address;
    this.cc_number = cc_number;
  }
}
