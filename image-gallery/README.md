# Galería de Imágenes

App de galería hecha con Angular 21 (standalone components + signals). Permite ver imágenes en grid, eliminarlas (una por una o en masa), seleccionarlas y reordenarlas con drag and drop.

## Instalación

```bash
npm install
```

## Levantar el proyecto

```bash
ng serve
```

Abrir `http://localhost:4200/`.

## Tests

```bash
ng test --no-watch
```

Con cobertura:

```bash
ng test --no-watch --coverage
```

## Lint

```bash
ng lint
```

## Build de producción

```bash
ng build
```

Los archivos quedan en `dist/`.

## Estructura

```
src/app/
  components/
    image-gallery/   estado y lógica (signals, drag&drop, selección)
    image-item/       presentación de cada imagen, emite eventos al padre
  interfaces/
    image.interface.ts
```

## Stack

Angular 21, PrimeNG, Angular CDK (drag and drop), Tailwind, Vitest.
