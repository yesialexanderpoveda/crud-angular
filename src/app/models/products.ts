export class Product{
  _id?: number;
  name: string;
  category: string;
  location: string;
  price: number;

  constructor(name: string, category: string, location: string, price: number  ){
this.name = name;
this.category = category;
this.location = location;
this.price = price;
  }

}