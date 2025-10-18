import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Child } from '../child/child';

@Component({
  selector: 'app-parent',
  imports: [
    Child,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Parent {
  firstName = '';

  list = signal<string[]>([]);

  add(firstNameModel: NgModel) {
    if (firstNameModel.invalid) {
      return;
    }
    this.list.update(items => items.concat(firstNameModel.value as string));
    firstNameModel.reset();
  }
}
