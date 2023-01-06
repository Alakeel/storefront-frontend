export class Product {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
  quantity: number;

  constructor(id = 1, name = '', price = 0, url = '', description = '', quantity = 0) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.url = url;
    this.description = description;
    this.quantity = quantity;
  }
}
