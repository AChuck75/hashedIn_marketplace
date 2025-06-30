import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  onLogin() {
    if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
        localStorage.setItem('username', 'admin');
        localStorage.setItem('password', 'admin');
      }
    const storedUsername = 'admin';
    const storedPassword = 'admin';
    if (this.username === storedUsername && this.password === storedPassword) {
      this.errorMessage = '';
      this.router.navigate(['/dashboard']); 
    } else {
      this.errorMessage = 'Invalid username or password';
      alert(this.errorMessage);
      this.username = ''; 
    }
  }
  onClickSignUp() {
    this.router.navigate(['/signup']);
  }
}