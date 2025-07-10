import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../Interfaces/Dashboard';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  imports: [CommonModule,FormsModule]
})
export class Cart {

  
  private cartService: CartService = inject(CartService);
  get cartItems(): Product[] {
    return this.cartService.getCart();
  }
  
  get totalPrice(): number {
    return (this.cartItems.reduce((sum, item) => sum + (item.price as number) * 2, 0));
  }
  onQtyChange(item: Product) {
    
    this.cartService.updateCartItem(item); 
    
  }
  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orderDetails = this.cartItems.map(item => `${item.name} (x${item}) - $${(item.price as number).toFixed(2)}`).join('\n');
    const total = this.totalPrice.toFixed(2);
    alert(`Order placed successfully!\n\nOrder Details:\n${orderDetails}\n\nTotal: $${total}`);
    this.cartService.getCart().length = 0;
    this.cartService.clearCart();
  }
}