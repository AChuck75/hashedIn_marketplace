/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import {  Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { SortService } from '../../services/sort.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnDestroy{
  isLoggedIn = false;
  dropdownOpen = false;
  countItems = 0;
  searchQuery = '';
  sortOption = '';

  private cartSub: Subscription;
  private authSub: Subscription;
  
  
  constructor(private router: Router,
    private cartService: CartService,
    private searchService: SearchService,
    private sortService: SortService,
    private authService: AuthService,
  ) {
    this.router.events.subscribe((e) => {
      if(e instanceof NavigationEnd) {
       
        this.updateCartCount()
      }
    });
    this.cartSub = this.cartService.getCartObservable().subscribe((cart) => {
      this.countItems = cart.reduce((total, ) => total + 1, 0);
    });

    this.authSub = this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      console.log('Auth status changed:', isAuthenticated);
      this.isLoggedIn = isAuthenticated;
      
    });
    
    
  }

  ngOnDestroy() {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  updateCartCount() {
    this.countItems = this.cartService.getCart().reduce((total, ) => total + 1, 0);
  }
  

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    setTimeout(() => this.dropdownOpen = false, 150);
  }
  logout() {
    this.isLoggedIn = false;

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
  onMyProfileClick() {
    this.router.navigate(['/profile']);
    this.closeDropdown();
  }
  onSearch() {
    this.searchService.setSearchQuery(this.searchQuery);
  }

  onSortChange() {
    this.sortService.setsortType(this.sortOption);
  }
  goToNotifications() {
    this.router.navigate(['/notifications']);
  }
}
