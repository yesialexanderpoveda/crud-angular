import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/models/products";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'create-product',
  templateUrl: './create-products.component.html',
  styles: [`
.text-danger{
  text-align: start;
  margin-left: 7px;
}
`]

})
export class CreateProductsComponent implements OnInit {

  productForm: FormGroup;
  title = "Crear Producto";
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private aRouter: ActivatedRoute
  ) {

    this.productForm = this.fb.group({
      product: ['', [Validators.required]],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEdit()
  }
  addProduct() {

    const PRODUCT: Product = {

      name: this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value

    }

    if (this.id !== null) {
      // edit product
      this.productService.editProduct(this.id, PRODUCT).subscribe(data => {
        this.toastr.info("El producto fue actualizado", "Producto actualizado!")
        this.router.navigate(['/'])
      }, error => {
        console.log(error);
        this.productForm.reset();
      })
    } else {
      //add product

      this.productService.saveProduct(PRODUCT).subscribe(data => {
        this.toastr.success('exitoso', 'producto registrado')
        this.router.navigate(['/'])
      }, error => {
        console.log(error);
        this.productForm.reset();
      })
    }


  }


  esEdit() {
    if (this.id !== null) {
      console.log(this.id, 'inside')
      this.title = 'editar producto'
      this.productService.getProduct(this.id).subscribe((data: any) => {
        this.productForm.setValue({

          product: data.name,
          category: data.category,
          location: data.location,
          price: data.price
        })
      })
    }

  }

}