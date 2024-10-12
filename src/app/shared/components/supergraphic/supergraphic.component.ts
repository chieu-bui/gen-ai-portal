import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'supergraphic',
  standalone: true,
  templateUrl: './supergraphic.component.html',
  styleUrl: './supergraphic.component.scss',
  host: { class: 'supergraphic' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupergraphicComponent {}
