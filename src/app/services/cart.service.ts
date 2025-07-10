import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Interfaces/Dashboard';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);

  getCart():Product[] {
    
    return this.cart;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {

      this.cart.push({ ...product });
    
    this.cartSubject.next(this.cart);
  }

  removeFromCart(product: Product) {
   
      this.cart = this.cart.filter(p => p.name !== product.name);
    
    this.cartSubject.next(this.cart);
  }
  updateCartItem(product: Product) {
    const cart = this.getCart();
  const index = cart.findIndex(item => item.name === product.name);
  if (index !== -1) {
    cart[index] = product;
    
    
    this.cartSubject.next(cart);
  }
  }
  updateTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price as number) , 0);
  }
  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
}