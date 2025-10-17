import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { User } from '../../shared/models/models';
import { States } from '../../shared/services/states';
import { DeleteDialog } from '../delete-dialog/delete-dialog';
import { EditDialog } from '../edit-dialog/edit-dialog';
import { SearchPipe } from './pipes/search-pipe';

@Component({
  selector: 'app-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatInputModule,
    SearchPipe
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class List {
  readonly dialog = inject(MatDialog);
  readonly states = inject(States);

  users = this.states.getUsers();

  displayedColumns: string[] = ['index', 'profile', 'firstName', 'lastName', 'age', 'education', 'nationalId', 'birthDate', 'more'];

  editDialog(user: User): void {
    this.dialog.open(EditDialog, {
      panelClass: ['app-dialog-container'],
      maxWidth: '640px',
      width: '100%',
      autoFocus: false,
      data: user
    });
  }

  deleteDialog(user: User): void {
    this.dialog.open(DeleteDialog, {
      panelClass: ['app-dialog-container'],
      maxWidth: '420px',
      width: '100%',
      autoFocus: false,
      data: user
    });
  }
}
