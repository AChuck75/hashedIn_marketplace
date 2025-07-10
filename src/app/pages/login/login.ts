import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  private router:Router=inject(Router);
  private authService: AuthService = inject(AuthService);

  onLogin() {
    if (this.username && this.password ) {
      this.authService.login(this.username, this.password)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']); 
           
          },
          error: () => {
            alert('Something went wrong. Please try again.');
          }
        });
    }
  }
  onClickSignUp() {
    this.router.navigate(['/signup']);
  }
}