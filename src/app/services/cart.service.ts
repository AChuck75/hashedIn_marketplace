import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Product = { name: string; price: number; image: string; count: number };

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
}