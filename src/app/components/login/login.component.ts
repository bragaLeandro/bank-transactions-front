import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response: string) => {
        this.authService.setBearerToken(response);
        const userId = this.authService.getUserIdFromToken(response);
        if (userId) {
          this.authService.setUserId(userId);
          this.router.navigate(['/home']);
        } else {
          console.error('Failed to extract user ID from token');
        }
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }
}
