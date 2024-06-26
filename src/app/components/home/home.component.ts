import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  transactions: any[] = [];
  balance: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getBalance().subscribe(
      (data: any[]) => {
        this.balance = data;
      },
      (error: any) => {
        console.error('Failed to fetch balance', error);
      }
    );

    this.authService.getTransactions().subscribe(
      (data: any[]) => {
        this.transactions = data;
      },
      (error: any) => {
        console.error('Failed to fetch transactions', error);
      }
    );

  }
}
