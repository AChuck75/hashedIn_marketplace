import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../services/search.service';
import { describe } from 'node:test';
import { SortService } from '../../services/sort.service';

type Product = { 
  name: string; 
  price: number; 
  image: string; 
  count: number 
};


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})


export class Dashboard {
  count=0;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(
    private cartService: CartService,
    private http:HttpClient,
    private cdr: ChangeDetectorRef,
    private searchService: SearchService,
    private sortService: SortService,
  ) {}
  ngOnInit() {
    this.http.get<Product[]>('https://fakestoreapi.com/products') // Example API
      .subscribe((data: any) => {
        this.products = data.map((item: any) => ({
          name: item.title,
          price: item.price,
          image: item.image,
          count: 0,
          description: item.description || ''
        }));
        this.filteredProducts = [...this.products];
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
