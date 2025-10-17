import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  styleUrl: './delete-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialog {
  dialogData = inject<User>(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<boolean, DeleteDialog>>(MatDialogRef);

  states = inject(States);

  confirm() {
    this.states.removeItem(this.dialogData);
    this.dialogRef.close();
  }
}
