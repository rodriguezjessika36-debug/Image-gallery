import { Component, OnInit, signal } from '@angular/core';
import { Image, IMAGES } from '../../interfaces/image.interface';
import { ImageItemComponent } from '../image-item/image-item.component';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [ImageItemComponent, CdkDropList, CdkDrag, ButtonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  images = signal<Image[]>([]);
  selectedIds = signal<Set<number>>(new Set());

  ngOnInit() {
    this.images.set(IMAGES.filter(img => !img.borrado));
  }

  onDeleteImage(imageId: number): void {
    this.images.update(currentImages =>
      currentImages.filter(img => img.id !== imageId)
    );
  }

  onToggleSelect(id: number): void {
    this.selectedIds.update(current => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  onDeleteSelected(): void {
    const count = this.selectedIds().size;
    const confirmDelete = window.confirm(`¿Eliminar ${count} imágenes seleccionadas?`);
    if (!confirmDelete) return;

    const idsToDelete = this.selectedIds();
    this.images.update(current => current.filter(img => !idsToDelete.has(img.id)));
    this.selectedIds.set(new Set());
  }

  onDrop(event: CdkDragDrop<Image[]>): void {
    this.images.update(current => {
      const reordered = [...current];
      moveItemInArray(reordered, event.previousIndex, event.currentIndex);
      return reordered;
    });
  }
}


