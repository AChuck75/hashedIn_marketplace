import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Product {
  name: string;
  description?: string;
  price: number;
  image: string;
  count: number;
};
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
  imports: [FormsModule,CommonModule] 
})
export class ProductCardComponent {
  @Input()
  product!: Product;
  saveAllProducts() {
    // Logic to save all products, e.g., send to a server or local storage
    console.log('Saving all products:', this.product);
  }
}