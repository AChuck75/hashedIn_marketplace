import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card";
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  description?: string;
  price: number;
  image: string;
  count: number;
};

@Component({
  selector: 'app-my-items',
  imports: [CommonModule, ProductCardComponent,FormsModule],
  templateUrl: './my-items.html',
  styleUrl: './my-items.scss'
})
export class MyItems {
  dialogOpen = false;
  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    image: '',
    count: 0
  };
  products:Product[] = [
  {
    name: 'Wireless Headphones',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    count: 0
  },
  {
    name: 'Smart Watch',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    count: 0
  },
  {
    name: 'Bluetooth Speaker',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    count: 0
  },
  {
    name: 'VR Headset',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    count: 0
  }
];

addProduct() {
  console.log('Adding product:', this.newProduct);
    if (this.newProduct.name && this.newProduct.price && this.newProduct.image){
      this.products.push({
        ...this.newProduct,
        count: 0
      });
      
      this.closeDialog();
     }
  }

  openDialog() {
    this.dialogOpen = true;
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      image: '',
      count: 0
    };
  }

  closeDialog() {
    this.dialogOpen = false;
  }
}
