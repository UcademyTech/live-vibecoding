# Reglas del equipo

Léelas antes de tocar código. El repo ya las sigue todas; imita lo que hay.

## Arquitectura de la API

- Capas: controller → service → repository. Un servicio solo habla con su repositorio y con otros servicios, nunca con el repositorio de otro módulo.
- Usa `BaseRepository`. No reimplementes lo que ya aporta.
- Tres DTOs por recurso: `create-x.dto.ts`, `update-x.dto.ts`, `x.dto.ts`. La validación va en el DTO con class-validator, no en el servicio.
- Errores esperados con las excepciones HTTP de Nest: `NotFoundException`, `BadRequestException`, `ForbiddenException`, `ConflictException`. Los inesperados se dejan caer.
- `Logger` de Nest con el contexto del módulo. Nunca `console.log`.
- Las restricciones (required, índices) van en el schema.

## Frontend

- Estado de servidor con TanStack Query; estado de UI con `useState` o Zustand. Invalida por la key base.
- La lógica vive en hooks (`useX`); el componente describe qué se pinta.
- Toda pantalla que dependa de un fetch tiene tres caminos: cargando, error y contenido. Las listas que pueden venir vacías tienen estado vacío.
- Antes de crear un componente, mira Ant Design y después `src/components`.
- styled-components en `Component.styles.ts`, transient props con `$`. Sin estilos inline salvo valores calculados en runtime. Sin CSS global nuevo.
- Todo texto visible pasa por `t('KEY')`. Claves en inglés, en mayúsculas con guiones bajos, en `src/i18n/es.ts`. Una clave inexistente no compila.

## TypeScript y naming

- Sin `any`, sin `ts-ignore`, sin non-null assertion (`!`), sin `as` para callar al compilador.
- Enums `EX`, interfaces `IX`, types `TX`. Funciones como verbos (`findX`, `getX`, `createX`, `handleX`). Booleans `isX`, `hasX`, `canX`.
- Identificadores en inglés. Ficheros en kebab-case en la API, PascalCase para componentes, camelCase para hooks y utils.
- Magic numbers como constante con nombre.
- Los tipos que comparten API y web viven en `libs/shared`. Si los cambias, `npm run build:shared`.

## Tests

- API: Jest, sigue `courses.service.spec.ts` (repositorio mockeado). Web: Vitest y Testing Library, sigue `StudentPage.spec.tsx`.
- `npm test` en verde antes de cada commit.

## Limpieza

- Sin código muerto, sin código comentado, sin imports sin usar, sin `console.log`.
- No cambies la estructura del repo ni añadas dependencias salvo que haga falta, y dilo.
