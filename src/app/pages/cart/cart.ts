import { Component, inject } from '@angular/core';
import { CartService, Product } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  imports: [CommonModule]
})
export class Cart {

  
  private cartService: CartService = inject(CartService);
  get cartItems(): Product[] {
    return this.cartService.getCart();
  }
  
  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  }
  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orderDetails = this.cartItems.map(item => `${item.name} (x${item.count}) - $${item.price.toFixed(2)}`).join('\n');
    const total = this.totalPrice.toFixed(2);
    alert(`Order placed successfully!\n\nOrder Details:\n${orderDetails}\n\nTotal: $${total}`);
    this.cartService.getCart().length = 0; // Clear the cart
  }
}