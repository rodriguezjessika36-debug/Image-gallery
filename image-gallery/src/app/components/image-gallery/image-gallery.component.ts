import { Component, OnInit, signal } from '@angular/core';
import { Image, IMAGES } from '../../interfaces/image.interface';
import { ImageItemComponent } from '../image-item/image-item.component';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [ImageItemComponent],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  images = signal<Image[]>([]);

  ngOnInit() {
    this.images.set(IMAGES.filter(img => !img.borrado));
  }

  onDeleteImage(imageId: number): void {
    this.images.update(currentImages => 
      currentImages.filter(img => img.id !== imageId)
    );
  }
}


