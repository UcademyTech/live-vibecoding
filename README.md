# Dudas en plataforma · live vibecoding

Repo base de la sesión técnica de Ucademy. Es una plataforma mínima en la que los alumnos envían dudas sobre sus cursos y los profes las responden. Lo que hay hecho es el punto de partida; en la sesión recibirás qué construir.

## Requisitos

- Node 20 o superior y npm 10 o superior.
- Nada más: la base de datos es un Mongo en memoria que se descarga con `npm install`. No hace falta Docker.

## Instalación y arranque

```bash
npm install      # instala todo y compila libs/shared
npm run dev      # API en http://localhost:3333/api y web en http://localhost:5173
```

Comprueba que en http://localhost:5173 ves la pantalla de alumno con las dudas de María. Si es así, estás listo para la sesión.

Otros comandos:

```bash
npm run dev:api        # solo la API (nest start --watch)
npm run dev:web        # solo la web (vite)
npm test               # tests de API y web
npm run test:api       # Jest
npm run test:web       # Vitest
npm run typecheck      # tsc en todos los workspaces
npm run lint           # ESLint
npm run build:shared   # recompila libs/shared si cambias algo ahí
```

## Cómo está montado

```
live-vibecoding/
├── CLAUDE.md / AGENTS.md   # reglas del equipo; tu IA debería leerlas
├── docs/ficha/parte-1.md   # plantilla de la primera parte de la sesión
├── libs/shared/            # enums, interfaces y usuarios compartidos por API y web
├── apps/api/               # NestJS + Mongoose, Mongo en memoria, seed al arrancar
│   └── src/
│       ├── common/         # BaseRepository y decorador CurrentUser
│       ├── database/       # conexión a Mongo (en memoria si no hay MONGODB_URI)
│       ├── modules/
│       │   ├── courses/    # completo: patrón de módulo, DTO, servicio y tests
│       │   └── doubts/     # a medias: enviar duda y ver las mías
│       └── seeds/          # datos de ejemplo
└── apps/web/               # React + Vite, TanStack Query, Zustand, Ant Design, styled-components
    └── src/
        ├── components/     # Layout, UserSwitcher, DoubtCard, EmptyState
        ├── hooks/          # useCourses, useMyDoubts, useCreateDoubt
        ├── i18n/           # t() con claves tipadas
        ├── pages/          # StudentPage (hecha) y TeacherPage (placeholder)
        ├── services/       # cliente axios
        └── store/          # usuario actual (Zustand)
```

- Sin Nx: npm workspaces y `concurrently`.
- `libs/shared` se compila a `dist` en `npm install`; API y web lo importan como `@live/shared`.
- La API lleva el prefijo `/api` y Swagger en http://localhost:3333/api/docs.

## Usuarios y datos

No hay login. Cada petición lleva la cabecera `x-user-id` con uno de estos usuarios; en la web se cambia desde el selector de la cabecera y en Swagger con el botón "Authorize".

| Id | Nombre | Rol |
|---|---|---|
| `u-maria` | María | Alumna (oposiciones) |
| `u-lucia` | Lucía | Alumna (oposiciones) |
| `u-jorge` | Jorge | Alumno (FP) |
| `u-ana` | Ana | Profe |
| `u-luis` | Luis | Profe |

Cursos del seed:

| Id | Curso | Vertical | Profe |
|---|---|---|---|
| `64f000000000000000000001` | Auxiliar Administrativo del Estado | Oposiciones | Ana |
| `64f000000000000000000002` | Administrativo del Estado | Oposiciones | Ana |
| `64f000000000000000000003` | Administración y Finanzas | FP | Luis |

Hay 15 dudas de ejemplo repartidas entre los tres cursos, algunas respondidas y otras pendientes desde hace horas o días. Los datos se regeneran en cada arranque de la API.

## Probar la API a mano

```bash
curl -H 'x-user-id: u-maria' http://localhost:3333/api/courses
curl -H 'x-user-id: u-maria' http://localhost:3333/api/doubts/mine
curl -X POST -H 'x-user-id: u-maria' -H 'content-type: application/json' \
  -d '{"courseId":"64f000000000000000000001","question":"¿Cómo se calcula el plazo?"}' \
  http://localhost:3333/api/doubts
```

Sin cabecera `x-user-id` la API responde 401.
