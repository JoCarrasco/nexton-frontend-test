import { Component, input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss'
})
export class Avatar {
  size = input<'xsmall' | 'small' | 'medium' | 'large'>('medium');
  imgUrl = input<string | undefined>(undefined);
  imgAlt = input<string | undefined>(undefined);
}
