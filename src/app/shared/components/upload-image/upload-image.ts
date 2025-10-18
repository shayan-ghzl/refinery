import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ValueAccessorBase } from '../../bases/value-accessor-base';

@Component({
  selector: 'app-upload-image',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './upload-image.html',
  styleUrl: './upload-image.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: UploadImage
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadImage extends ValueAccessorBase<string> {
  cdr = inject(ChangeDetectorRef);

  onFileSelected(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.onInput(reader.result as string);
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }
}
