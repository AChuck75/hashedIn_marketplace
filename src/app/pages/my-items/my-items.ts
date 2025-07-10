import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card";
import { FormsModule } from '@angular/forms';
import { Product } from '../../Interfaces/Dashboard';
import { ItemManagementService } from '../../services/item.management.service';



@Component({
  selector: 'app-my-items',
  imports: [CommonModule, ProductCardComponent,FormsModule],
  templateUrl: './my-items.html',
  styleUrl: './my-items.scss'
})
export class MyItems implements OnInit{
  dialogOpen = false;
  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    postedById:JSON.parse(sessionStorage.getItem('user')!).id,
  };
  products:Product[]=[]
  private itemManagementService = inject(ItemManagementService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);


  addProduct() {
    const paylaod={...this.newProduct,postedById:JSON.parse(sessionStorage.getItem('user')!).id}
    console.log(paylaod)
    if (this.newProduct.name && this.newProduct.price && this.newProduct.image) {
      this.itemManagementService.postItem(paylaod).subscribe({
        next: (response) => {
          console.log('Product posted successfully:', response);
          this.closeDialog();
          // Optionally, refresh your product list here
        },
        error: (err) => {
          console.error('Error posting product:', err);
          // Optionally, show an error message to the user
        }
      });
    }
  }

  loadProducts(){
    this.itemManagementService.getProductsForUser(JSON.parse(sessionStorage.getItem('user')!).id).subscribe({
      next: products => {
        this.products = products;
      },
      error: err => {
        console.error(err)
      }
    });
    this.cdr.detectChanges()
    
  }

  ngOnInit(): void {
    this.loadProducts()
  }


  openDialog() {
    this.dialogOpen = true;
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      image: '',
      category: ''
    };
  }

  closeDialog() {
    this.dialogOpen = false;
  }
  onProductDeleted(productId: string) {
    this.products = this.products.filter(p => p.id !== productId);
  }
}
