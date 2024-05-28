import { AuthService } from './../../auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatSnackBarModule } from '@angular/material/snack-bar';;
import { ReactiveFormsModule } from '@angular/forms';
import { TransferComponent } from './transfer.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransferComponent,
    MatSnackBarModule
  ],
  providers: [AuthService],
  exports: [TransferComponent]
})
export class TransferModule { }
