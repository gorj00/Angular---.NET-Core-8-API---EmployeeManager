import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-text-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-text-field.component.html',
  styleUrl: './icon-text-field.component.scss'
})
export class IconTextFieldComponent {

  @Input() icon?: string
  @Input() label?: string
  @Input() value?: string | null

}
