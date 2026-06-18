import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../../interfaces/image.interface';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule, TooltipModule],
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent {
  image = input.required<Image>();
  destacada = input<boolean>(false);
  deleteImage = output<number>();

  onDeleteClick(event: Event): void {
    event.stopPropagation();
    const confirmDelete = window.confirm(`¿Eliminar "${this.image().titulo}"?`);
    if (confirmDelete) {
      this.deleteImage.emit(this.image().id);
    }
  }
}
