import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child {
  list = input<string[]>([]);
}
