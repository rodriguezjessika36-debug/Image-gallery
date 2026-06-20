import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageGalleryComponent } from './image-gallery.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Image } from '../../interfaces/image.interface';

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

  it('debería agregar el id al set de seleccionados al togglear una imagen no seleccionada', () => {
    // Arrange
    const imageId = component.images()[0].id;

    // Act
    component.onToggleSelect(imageId);

    // Assert
    expect(component.selectedIds().has(imageId)).toBe(true);
  });

  it('debería quitar el id del set de seleccionados al togglear una imagen ya seleccionada', () => {
    // Arrange
    const imageId = component.images()[0].id;
    component.onToggleSelect(imageId);

    // Act
    component.onToggleSelect(imageId);

    // Assert
    expect(component.selectedIds().has(imageId)).toBe(false);
  });

  it('debería permitir seleccionar varias imágenes a la vez', () => {
    // Arrange
    const [first, second] = component.images();

    // Act
    component.onToggleSelect(first.id);
    component.onToggleSelect(second.id);

    // Assert
    expect(component.selectedIds().size).toBe(2);
    expect(component.selectedIds().has(first.id)).toBe(true);
    expect(component.selectedIds().has(second.id)).toBe(true);
  });

  it('debería actualizar el set de selección de forma inmutable', () => {
    const originalSet = component.selectedIds();
    component.onToggleSelect(component.images()[0].id);
    expect(component.selectedIds() === originalSet).toBe(false);
  });

  it('no debería mostrar la barra de borrado batch cuando no hay imágenes seleccionadas', () => {
    const batchBar = fixture.nativeElement.querySelector('.batch-bar');
    expect(batchBar).toBeFalsy();
  });

  it('debería mostrar la barra de borrado batch cuando hay al menos una imagen seleccionada', () => {
    // Arrange
    component.onToggleSelect(component.images()[0].id);

    // Act
    fixture.detectChanges();

    // Assert
    const batchBar = fixture.nativeElement.querySelector('.batch-bar');
    expect(batchBar).toBeTruthy();
  });

  it('debería eliminar las imágenes seleccionadas al confirmar el borrado batch', () => {
    // Arrange
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const [first, second] = component.images();
    const initialLength = component.images().length;
    component.onToggleSelect(first.id);
    component.onToggleSelect(second.id);

    // Act
    component.onDeleteSelected();

    // Assert
    expect(component.images().length).toBe(initialLength - 2);
    expect(component.images().find(img => img.id === first.id)).toBeUndefined();
    expect(component.images().find(img => img.id === second.id)).toBeUndefined();
  });

  it('no debería eliminar nada si se cancela el borrado batch', () => {
    // Arrange
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const initialLength = component.images().length;
    component.onToggleSelect(component.images()[0].id);

    // Act
    component.onDeleteSelected();

    // Assert
    expect(component.images().length).toBe(initialLength);
  });

  it('debería limpiar el set de seleccionados después de eliminar el batch', () => {
    // Arrange
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.onToggleSelect(component.images()[0].id);

    // Act
    component.onDeleteSelected();

    // Assert
    expect(component.selectedIds().size).toBe(0);
  });

  it('debería reordenar el array al soltar un drag', () => {
    // Arrange
    const imagesBeforeDrop = component.images();
    const draggedImage = imagesBeforeDrop[0];
    const dropEvent = { previousIndex: 0, currentIndex: 2 } as CdkDragDrop<Image[]>;

    // Act
    component.onDrop(dropEvent);

    // Assert
    expect(component.images()[2]).toEqual(draggedImage);
    expect(component.images().length).toBe(imagesBeforeDrop.length);
  });

  it('debería marcar como destacada a la imagen que queda primera tras reordenar', () => {
    // Arrange
    const dropEvent = { previousIndex: 0, currentIndex: 2 } as CdkDragDrop<Image[]>;

    // Act
    component.onDrop(dropEvent);
    fixture.detectChanges();

    // Assert
    const imageItems = fixture.nativeElement.querySelectorAll('app-image-item');
    expect(imageItems[0].textContent).toContain('⭐');
    expect(imageItems[1].textContent).not.toContain('⭐');
  });
});
