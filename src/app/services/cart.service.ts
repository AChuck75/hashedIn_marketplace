import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product { name: string; price: number; image: string; count: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);

  getCart():Product[] {
    console.log('Cart items:', this.cart);
    return this.cart;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    const existing = this.cart.find(p => p.name === product.name);
    if (existing) {
      existing.count++;
    } else {
      this.cart.push({ ...product, count: 1 });
    }
    this.cartSubject.next(this.cart);
  }

  removeFromCart(product: Product) {
    const existing = this.cart.find(p => p.name === product.name);
    if (existing && existing.count > 1) {
      existing.count--;
    } else {
      this.cart = this.cart.filter(p => p.name !== product.name);
    }
    this.cartSubject.next(this.cart);
  }
  updateCartItem(product: Product) {
    const cart = this.getCart();
  const index = cart.findIndex(item => item.name === product.name);
  if (index !== -1) {
    cart[index].count = product.count;
    if (cart[index].count <= 0) {
      cart.splice(index, 1);
    }
    
    this.cartSubject.next(cart);
  }
  }
  updateTotalPrice() {
    return this.cart.reduce((total, item) => total + item.price * item.count, 0);
  }
  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
}