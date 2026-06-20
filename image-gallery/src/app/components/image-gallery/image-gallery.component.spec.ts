import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageGalleryComponent } from './image-gallery.component';

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGalleryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las imágenes al iniciar', () => {
    expect(component.images().length).toBeGreaterThan(0);
  });

  it('debería filtrar las imágenes borradas al iniciar', () => {
    const deletedImages = component.images().filter(img => img.borrado);
    expect(deletedImages.length).toBe(0);
  });

  it('debería renderizar todas las imágenes de la galería', () => {
    const imageItems = fixture.nativeElement.querySelectorAll('app-image-item');
    expect(imageItems.length).toBe(component.images().length);
  });

  it('debería eliminar la imagen del array al llamar onDeleteImage', () => {
    const initialLength = component.images().length;
    const firstImageId = component.images()[0].id;

    component.onDeleteImage(firstImageId);

    expect(component.images().length).toBe(initialLength - 1);
    expect(component.images().find(img => img.id === firstImageId)).toBeUndefined();
  });

  it('debería actualizar el array de forma inmutable al eliminar', () => {
    const originalArray = component.images();
    const firstImageId = component.images()[0].id;

    component.onDeleteImage(firstImageId);

    expect(component.images() === originalArray).toBe(false);
  });

  it('debería seguir funcionando después de varias eliminaciones', () => {
    const initialLength = component.images().length;

    component.onDeleteImage(component.images()[0].id);
    component.onDeleteImage(component.images()[0].id);

    expect(component.images().length).toBe(initialLength - 2);
  });
});
