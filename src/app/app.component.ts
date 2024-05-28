import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule]
})
export class AppComponent {
  title = 'simple-angular-app';

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    console.log('logado?', !!this.authService.getBearerToken());
    return !!this.authService.getBearerToken();
  }

  logout(): void {
    this.authService.setBearerToken('');
    this.authService.setUserId(null);
    this.router.navigate(['/login']);
  }
}
