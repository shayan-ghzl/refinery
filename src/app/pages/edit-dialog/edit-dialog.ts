import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.scss',
})
export class EditDialog {

}
