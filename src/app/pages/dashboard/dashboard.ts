import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../services/search.service';
import { SortService } from '../../services/sort.service';
import { Subscription } from 'rxjs';
import { Product } from '../../Interfaces/Dashboard'; 
import { ItemManagementService } from '../../services/item.management.service';
import { TransactionManagementService } from '../../services/transaction.management.service';
import { PendingRequest } from '../../Interfaces/Notifications';


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
  loggedInUserId: string | number = '';
  pendingRequests:PendingRequest[]=[]
  filteredProducts: Product[] = [];
  private cartService: CartService = inject(CartService);
  private http:HttpClient= inject(HttpClient);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private searchService: SearchService= inject(SearchService);
  private sortService: SortService= inject(SortService);
  private cartsub!: Subscription;
  private itemManagementService:ItemManagementService= inject(ItemManagementService);
  private transactionManagementService:TransactionManagementService=inject(TransactionManagementService);
  
  ngOnInit() {
    
    this.http.get<Product[]>('http://localhost:4000/api/products',{
      withCredentials: true,
    })
    .subscribe((data: Product[]) => {
      
      this.products = data.map((item: Product) => ({
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.category,
        id: item.id,
        postedById: item.postedById,
        postingDate: item.postingDate,
        postedBy:item.postedBy
      }));

      this.filteredProducts = [...this.products];
      
      
      this.cdr.detectChanges();
    });
    this.transactionManagementService.getPendingRequestsForSeller().subscribe({
      next: (requests) => {
        this.pendingRequests=requests
      },
      error: () => this.pendingRequests = []
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
    const user = sessionStorage.getItem('user');
    if (user) {
      this.loggedInUserId = JSON.parse(user).id;
    }
  }

  ngOnDestroy() {
    if(this.cartsub) {
      this.cartsub.unsubscribe();
    }
  }




sortProducts(sortOption: string) {
  if (sortOption === 'name') {
    this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'priceLow') {
    this.filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortOption === 'priceHigh') {
    this.filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }
 
}
  isPendingApproval(productId: string | number | undefined): boolean {
    return this.pendingRequests.some(req => req.productId === productId);
  }
  onAddToCart(product: Product) {
    
    this.cartService.addToCart(product);
  }
  onRemoveFromCart(product: Product) {
    
      this.cartService.removeFromCart(product);
    
  }
  canBuyNow(product: Product): boolean {
  const ownerId = product.postedBy?.id ?? product.postedById;
  if (!ownerId) return false;
  return String(ownerId) !== String(this.loggedInUserId);
}
  onBuyNow(product: Product) {
  this.itemManagementService.buyProduct(product.id as string).subscribe({
    next: (response) => {
      console.log(response)
      alert('Buy request sent to seller!');
    },
    error: (err) => {
      alert(err.error?.error || 'Failed to send buy request.');
    }
  });
}
}
