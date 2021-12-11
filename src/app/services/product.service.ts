import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/products";

@Injectable({
  providedIn: 'root'
})

export class ProductService{

  url = 'http://localhost:4000/api/products'
  constructor(private http:HttpClient){}

  getProducts(): Observable<any>{
      return this.http.get(this.url)
  }

  deleteProduct(id: string): Observable<any>{
      let url = `${this.url}/${id}`
      return this.http.delete(url);
  }


  saveProduct(product: Product): Observable<any>{ 
      return this.http.post(this.url, product); 
  }
  
  getProduct(id: string): Observable<any>{
    let url = `${this.url}/${id}`;
      return this.http.get(url);

  }
  
  editProduct(id: string, product: Product): Observable<any>{
    let url = `${this.url}/${id}`;
    return this.http.put(url, product);
    
  }

}