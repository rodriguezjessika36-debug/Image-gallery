import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../../interfaces/image.interface';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule],
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent {
  image = input.required<Image>();
  destacada = input<boolean>(false);
}