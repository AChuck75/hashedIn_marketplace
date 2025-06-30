import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  imports: [CommonModule, FormsModule]
})
export class Signup {
  username = '';
  password = '';

  private router: Router=inject(Router);
  onSignup() {
    if (this.username && this.password) {
      // Save credentials to localStorage (for demo purposes only)
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      alert('Signup successful! Please login.');
      this.router.navigate(['/login']);
    }
  }
}