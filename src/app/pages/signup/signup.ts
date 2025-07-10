import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  email = '';

  private router: Router=inject(Router);
  private authService: AuthService = inject(AuthService);

  onSignup() {
    if (this.username && this.password && this.email) {
      this.authService.signup(this.username, this.password, this.email)
        .subscribe({
          next: () => {
            alert('Signup successful! Please login.');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            alert('Signup failed: ' + (err.error?.message || 'Unknown error'));
          }
        });
    }
  }
}