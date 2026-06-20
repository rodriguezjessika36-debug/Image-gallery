import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { App } from './app';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { Image } from './interfaces/image.interface';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Mi Galería de Imágenes');
  });
});

// Tests de integración: renderizan App completa (App > ImageGallery > ImageItem)
// sin mockear ningún componente hijo, y disparan clicks reales sobre el DOM
// en vez de llamar métodos del componente directamente.
describe('Integración: flujo completo de usuario', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
  });

  it('el usuario carga la app y ve la galería con imágenes', () => {
    const imageItems = fixture.nativeElement.querySelectorAll('app-image-item');
    expect(imageItems.length).toBeGreaterThan(0);
  });

  it('el usuario elimina una imagen y desaparece de la galería', () => {
    // Arrange
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const initialCount = fixture.nativeElement.querySelectorAll('app-image-item').length;
    const deleteButton = fixture.nativeElement.querySelector('p-button[icon="pi pi-trash"]');

    // Act
    deleteButton.click();
    fixture.detectChanges();

    // Assert
    const finalCount = fixture.nativeElement.querySelectorAll('app-image-item').length;
    expect(finalCount).toBe(initialCount - 1);
  });

  it('el usuario reordena las imágenes y el orden cambia', () => {
    // Arrange: tomamos la instancia real de ImageGalleryComponent dentro del árbol de App
    const galleryDebugElement = fixture.debugElement.query(By.directive(ImageGalleryComponent));
    const galleryComponent: ImageGalleryComponent = galleryDebugElement.componentInstance;
    const firstImageId = galleryComponent.images()[0].id;
    const dropEvent = { previousIndex: 0, currentIndex: 2 } as CdkDragDrop<Image[]>;

    // Act
    galleryComponent.onDrop(dropEvent);
    fixture.detectChanges();

    // Assert
    expect(galleryComponent.images()[2].id).toBe(firstImageId);
  });

  it('el usuario selecciona varias imágenes y puede eliminarlas juntas', () => {
    // Arrange
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const initialCount = fixture.nativeElement.querySelectorAll('app-image-item').length;
    const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');

    // Act: selecciona las dos primeras imágenes haciendo click real en sus checkboxes
    checkboxes[0].click();
    checkboxes[1].click();
    fixture.detectChanges();

    const batchDeleteButton = fixture.nativeElement.querySelector('.batch-bar p-button');
    batchDeleteButton.click();
    fixture.detectChanges();

    // Assert
    const finalCount = fixture.nativeElement.querySelectorAll('app-image-item').length;
    expect(finalCount).toBe(initialCount - 2);
  });
});
