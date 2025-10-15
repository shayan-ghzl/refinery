import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { _closeDialogVia, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AutoFocus } from '../../shared/directives/auto-focus';
import { User } from '../../shared/models/models';
import { States } from '../../shared/services/states';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AutoFocus
  ],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.scss',
})
export class EditDialog {
  dialogData = inject<User>(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<any>>(MAT_DIALOG_DATA, { optional: true });
  states = inject(States);

  previewUrl = './images/user.svg';

  formGroup = new FormGroup({
    firstName: new FormControl<string | null>(null, [Validators.required]),
    lastName: new FormControl<string | null>(null, [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(120)]),
    education: new FormControl<string | null>(null, [Validators.required]),
    nationalId: new FormControl<string | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    const date = new Date(this.dialogData.birthDate.replace(/\//g, '-'));

    this.formGroup.setValue({
      firstName: this.dialogData.firstName,
      lastName: this.dialogData.lastName,
      age: this.dialogData.age,
      education: this.dialogData.education,
      nationalId: this.dialogData.nationalId,
      birthDate: date,
    });

    this.previewUrl = this.dialogData.profile;
  }

  onFileSelected(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.formGroup.markAsDirty();
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.previewUrl = './images/user.svg';
    this.formGroup.markAsDirty();
  }

  submit() {
    if (this.formGroup.invalid || this.formGroup.pristine) {
      return;
    }
    const formattedDate = (this.formGroup.value.birthDate as Date).toISOString().split('T')[0].replace(/-/g, '/');

    const updatedUser = { ...this.formGroup.value, birthDate: formattedDate, id: this.dialogData.id, profile: this.previewUrl } as User;
    this.states.editItem(updatedUser);

    if (this.dialogRef) {
      _closeDialogVia(this.dialogRef, 'mouse', this.dialogData);
    }
  }
}
