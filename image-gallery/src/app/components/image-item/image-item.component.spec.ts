import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageItemComponent } from './image-item.component';
import { Image } from '../../interfaces/image.interface';

describe('ImageItemComponent', () => {
  let component: ImageItemComponent;
  let fixture: ComponentFixture<ImageItemComponent>;

  const mockImage: Image = {
    id: 1,
    titulo: 'Aurora',
    descripcion: 'Imagen de aurora',
    src: '/images/aurora.png',
    borrado: false,
    categoria: 'naturaleza'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('image', mockImage);
    fixture.detectChanges();
  });

  it('debería renderizar el botón de eliminar', () => {
    const deleteButton = fixture.nativeElement.querySelector('p-button[icon="pi pi-trash"]');
    expect(deleteButton).toBeTruthy();
  });

  it('debería mostrar el diálogo de confirmación al hacer click en eliminar', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    const deleteButton = fixture.nativeElement.querySelector('p-button[icon="pi pi-trash"]');
    deleteButton.click();

    expect(confirmSpy).toHaveBeenCalledWith('¿Eliminar "Aurora"?');
  });

  it('debería emitir deleteImage con el id de la imagen al confirmar', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    let emittedId: number | undefined;
    component.deleteImage.subscribe((id: number) => emittedId = id);

    const deleteButton = fixture.nativeElement.querySelector('p-button[icon="pi pi-trash"]');
    deleteButton.click();

    expect(emittedId).toBe(1);
  });

  it('no debería emitir deleteImage si se cancela la eliminación', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    let emitted = false;
    component.deleteImage.subscribe(() => emitted = true);

    const deleteButton = fixture.nativeElement.querySelector('p-button[icon="pi pi-trash"]');
    deleteButton.click();

    expect(emitted).toBe(false);
  });

  it('debería emitir toggleSelect con el id de la imagen al hacer click en el checkbox', () => {
    // Arrange
    let emittedId: number | undefined;
    component.toggleSelect.subscribe((id: number) => emittedId = id);
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');

    // Act
    checkbox.click();

    // Assert
    expect(emittedId).toBe(1);
  });

  it('debería aplicar la clase selected cuando el input selected es true', () => {
    // Arrange
    fixture.componentRef.setInput('selected', true);

    // Act
    fixture.detectChanges();

    // Assert
    const card = fixture.nativeElement.querySelector('p-card');
    expect(card.classList.contains('selected')).toBe(true);
  });

  it('no debería tener la clase selected cuando el input selected es false', () => {
    const card = fixture.nativeElement.querySelector('p-card');
    expect(card.classList.contains('selected')).toBe(false);
  });

  it('debería llamar stopPropagation al hacer click en el checkbox de selección', () => {
    // Arrange
    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');

    // Act
    component.onToggleSelect(event);

    // Assert
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('debería manejar un título vacío sin lanzar errores', () => {
    // Arrange
    const edgeImage: Image = { ...mockImage, titulo: '' };
    fixture.componentRef.setInput('image', edgeImage);
    fixture.detectChanges();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    const deleteButton = fixture.nativeElement.querySelector('p-button[icon="pi pi-trash"]');

    // Act
    const clickAndDelete = () => deleteButton.click();

    // Assert
    expect(clickAndDelete).not.toThrow();
    expect(confirmSpy).toHaveBeenCalledWith('¿Eliminar ""?');
  });

  it('debería emitir un evento por cada click confirmado en clicks rápidos sucesivos', () => {
    // Arrange: el componente no tiene debounce ni guarda de "ya se está eliminando"
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const emittedIds: number[] = [];
    component.deleteImage.subscribe((id: number) => emittedIds.push(id));
    const deleteButton = fixture.nativeElement.querySelector('p-button[icon="pi pi-trash"]');

    // Act
    deleteButton.click();
    deleteButton.click();

    // Assert
    expect(emittedIds).toEqual([1, 1]);
  });
});
