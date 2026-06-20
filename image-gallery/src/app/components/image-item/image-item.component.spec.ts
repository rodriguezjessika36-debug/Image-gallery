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
});
