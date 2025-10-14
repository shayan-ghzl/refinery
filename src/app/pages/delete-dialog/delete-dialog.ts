import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../shared/models/models';
import { States } from '../../shared/services/states';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss'
})
export class DeleteDialog {
  dialogData = inject<User>(MAT_DIALOG_DATA);
  states = inject(States);
}
