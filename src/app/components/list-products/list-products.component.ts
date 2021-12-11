import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/models/products";
import { ProductService } from "src/app/services/product.service";

@Component(
  {
    selector: 'list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.css']
  }
)

export class listProductsComponent implements OnInit{

  listProducts: Product[] =[] 
  constructor(private _productService: ProductService, 
              private toastr: ToastrService){ }

  ngOnInit(): void{
   this.getProducts();
  }
  
  getProducts() {
    this._productService.getProducts().subscribe(data =>{

      console.log(data);
      this.listProducts = data; 
    }, error =>{
      console.log(error)
    }
    )
  }

  deleteProduct(id: any){
    this._productService.deleteProduct(id).subscribe(data => {

      this.toastr.success('el producto fue eliminado con exito', 'producto eliminado');
      this.getProducts();
    }, error =>{
      console.log(error);
    }
    )
}

}