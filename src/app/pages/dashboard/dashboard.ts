import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../services/search.service';
import { SortService } from '../../services/sort.service';

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


export class Dashboard implements OnInit {
  count=0;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private cartService: CartService = inject(CartService);
    private http:HttpClient= inject(HttpClient);
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
    private searchService: SearchService= inject(SearchService);
    private sortService: SortService= inject(SortService);
  ngOnInit() {
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
