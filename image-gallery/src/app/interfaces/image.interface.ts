export interface Image {
  id: number;
  titulo: string;
  descripcion: string;
  src: string;
  borrado: boolean;
  categoria: string;
}

export const IMAGES: Image[] = [
  {
    id: 1,
    titulo: 'Aurora',
    descripcion: 'Imagen de aurora',
    src: '/images/aurora.png',
    borrado: false,
    categoria: 'naturaleza'
  },
  {
    id: 2,
    titulo: 'Japón',
    descripcion: 'Imagen de japón',
    src: '/images/japon.png',
    borrado: false,
    categoria: 'viajes'
  },
  {
    id: 3,
    titulo: 'Lago',
    descripcion: 'Imagen de lago',
    src: '/images/lago.png',
    borrado: false,
    categoria: 'naturaleza'
  },
  {
    id: 4,
    titulo: 'Playa',
    descripcion: 'Imagen de playa',
    src: '/images/playa.png',
    borrado: false,
    categoria: 'playas'
  },
  {
    id: 5,
    titulo: 'Prado',
    descripcion: 'Imagen de prado',
    src: '/images/prado.png',
    borrado: false,
    categoria: 'naturaleza'
  },
  {
    id: 6,
    titulo: 'Santorini',
    descripcion: 'Imagen de santorini',
    src: '/images/santorini.png',
    borrado: false,
    categoria: 'viajes'
  }
];