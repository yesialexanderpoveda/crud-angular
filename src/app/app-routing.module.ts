import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductsComponent } from './components/create-products/create-products.component';
import { listProductsComponent } from './components/list-products/list-products.component';

const routes: Routes = [
  {path: '', component: listProductsComponent},
  {path: 'create-product', component: CreateProductsComponent},
  {path: 'edit-product/:id', component: CreateProductsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
