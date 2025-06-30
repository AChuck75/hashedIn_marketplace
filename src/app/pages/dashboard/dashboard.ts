import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../services/search.service';
import { SortService } from '../../services/sort.service';
import { Subscription } from 'rxjs';

interface Product  { 
  name: string; 
  price: number; 
  image: string; 
  count: number;
  description?: string;
};


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})


export class Dashboard implements OnInit, OnDestroy {
  count=0;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private cartService: CartService = inject(CartService);
  private http:HttpClient= inject(HttpClient);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private searchService: SearchService= inject(SearchService);
  private sortService: SortService= inject(SortService);
  private cartsub!: Subscription;
  
  ngOnInit() {
    this.loadProducts();
    this.cartsub= this.cartService.getCartObservable().subscribe((cart) => {
      this.syncProducts(cart);
    })
    this.http.get<Product[]>('https://fakestoreapi.com/products') // Example API
      .subscribe((data: Product[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.products = data.map((item: any) => ({
          name: item.title,
          price: item.price,
          image: item.image,
          count: 0,
          description: item.description || ''
        }));
        this.filteredProducts = [...this.products];
        const cart=this.cartService.getCart();
        this.syncProducts(cart);
        this.cdr.detectChanges(); 
      });
      this.searchService.searchQuery$.subscribe(query => {
        if (query) {
          this.filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
          );
        } else {
          this.filteredProducts = [...this.products];
        }
        
      });
      this.sortService.sortType$.subscribe(sortOption => {
        this.sortProducts(sortOption);
      });
      
  }

  ngOnDestroy() {
    if(this.cartsub) {
      this.cartsub.unsubscribe();
    }
  }
loadProducts() {
  const cart = this.cartService.getCart();
  this.syncProducts(cart);
}

syncProducts(cart: Product[]) {
  this.filteredProducts.forEach(product => {
    const cartItem = cart.find(item => item.name === product.name); 
    product.count = cartItem ? cartItem.count : 0;
  });
}

sortProducts(sortOption: string) {
  if (sortOption === 'name') {
    this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'priceLow') {
    this.filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'priceHigh') {
    this.filteredProducts.sort((a, b) => b.price - a.price);
  }
 
}

  onAddToCart(product: Product) {
    product.count++;
    this.cartService.addToCart(product);
  }
  onRemoveFromCart(product: Product) {
    if (product.count > 0) {
      product.count--;
      this.cartService.removeFromCart(product);
    }
  }
}
