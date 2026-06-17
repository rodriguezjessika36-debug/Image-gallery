import { Component } from '@angular/core';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImageGalleryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
