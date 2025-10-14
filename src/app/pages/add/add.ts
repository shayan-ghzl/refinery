import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { User } from '../../shared/models/models';
import { States } from '../../shared/services/states';

@Component({
  selector: 'app-add',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  readonly states = inject(States);

  formGroup = new FormGroup({
    firstName: new FormControl<string | null>(null, [Validators.required]),
    lastName: new FormControl<string | null>(null, [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required]),
    education: new FormControl<string | null>(null, [Validators.required]),
    nationalId: new FormControl<string | null>(null, [Validators.required]),
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    const formattedDate = (this.formGroup.value.birthDate as Date).toISOString().split('T')[0].replace(/-/g, '/');

    const newUser = { ...this.formGroup.value, birthDate: formattedDate } as Omit<User, 'id'>;
    this.states.addItem(newUser);

    this.formGroup.reset();
  }
}
