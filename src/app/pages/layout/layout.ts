import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { debounce, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  isLoggedIn = false;
  dropdownOpen = false;
  countItems = 0;
  searchQuery = '';
  sortOption = '';

  private cartSub: Subscription;
  
  constructor(private router: Router,
    private cartService: CartService,
    private searchService: SearchService,
    private sortService: SortService
  ) {
    this.router.events.subscribe((e) => {
      if(e instanceof NavigationEnd) {
        this.updateLoginStatus();
        this.updateCartCount()
      }
    });
    this.cartSub = this.cartService.getCartObservable().subscribe((cart) => {
      this.countItems = cart.reduce((total, item) => total + item.count, 0);
    });
    
    
  }

  ngOnDestroy() {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  updateCartCount() {
    this.countItems = this.cartService.getCart().reduce((total, item) => total + item.count, 0);
  }
  updateLoginStatus() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isLoggedIn = !!localStorage.getItem('username') && !!localStorage.getItem('password');
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    setTimeout(() => this.dropdownOpen = false, 150);
  }
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
    this.updateCartCount();
    this.closeDropdown();
  }
  onCartClick() {
    this.router.navigate(['/cart']);
  }
  onMyItemsClick(){
    this.router.navigate(['/my-items']);
    this.closeDropdown();
  }
  onSearch() {
    this.searchService.setSearchQuery(this.searchQuery);
  }

  onSortChange() {
    this.sortService.setsortType(this.sortOption);
  }
}
