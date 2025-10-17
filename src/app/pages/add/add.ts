import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UploadImage } from '../../shared/components/upload-image/upload-image';
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
    RouterLink,
    UploadImage
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Add {
  readonly states = inject(States);

  formGroup = new FormGroup({
    profile: new FormControl<string | null>(null),
    firstName: new FormControl<string | null>(null, [Validators.required]),
    lastName: new FormControl<string | null>(null, [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(120)]),
    education: new FormControl<string | null>(null, [Validators.required]),
    nationalId: new FormControl<string | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  formatDate(date: Date) {
    return date.getFullYear() + '/' +
      String(date.getMonth() + 1).padStart(2, '0') + '/' +
      String(date.getDate()).padStart(2, '0');
  }

  submit(event: Event) {
    if (this.formGroup.invalid) {
      return;
    }
    const formattedDate = this.formatDate(this.formGroup.value.birthDate as Date);

    const newUser = { ...this.formGroup.value, birthDate: formattedDate } as Omit<User, 'id'>;
    this.states.addItem(newUser);

    (event.target as HTMLFormElement).reset();
  }
}
