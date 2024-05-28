import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  userAccount: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.transferForm = this.fb.group({
      senderAccountNumber: [{ value: '', disabled: true }, Validators.required],
      destinationAccountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required]
    });

    this.transferForm.get('type')?.valueChanges.subscribe(type => {
      const destinationAccountControl = this.transferForm.get('destinationAccountNumber');
      if (type === 'CREDIT') {
        destinationAccountControl?.disable();
      } else {
        destinationAccountControl?.enable();
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUserAccount().subscribe(
      (data: any) => {
        this.userAccount = data;
        this.transferForm.patchValue({ senderAccountNumber: this.userAccount.accountNumber });
      },
      (error: any) => {
        console.error('Failed to fetch account details', error);
      }
    );
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      const transferData = this.transferForm.getRawValue();
      transferData.senderAccountNumber = this.userAccount.accountNumber;

      this.authService.makeTransfer(transferData).subscribe(response => {
        this.snackBar.open('Transferência finalizada', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/home']);
      }, error => {
        console.error('Transfer failed', error);
        this.snackBar.open(`Falha na transferência: ${error.error.message}`, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
    }
  }
}
