# Campus Vault App

Plataforma web para compartir y organizar material académico universitario: apuntes, resúmenes y recursos por materia.

---

## Bitácora de desarrollo

---

### Etapa 1 — Arranque del proyecto

Instalamos Node.js LTS desde [nodejs.org](https://nodejs.org) y luego `pnpm` como gestor de paquetes, que elegimos sobre `npm` porque es más rápido, usa menos disco y maneja mejor los workspaces.

```bash
npm install -g pnpm
```

Creamos el proyecto con el wizard de Next.js:

```bash
pnpx create-next-app@latest campus-vault-app
```

Durante el wizard elegimos: TypeScript, ESLint, Tailwind CSS, directorio `src/`, App Router y alias de importación `@/*`. Turbopack lo dejamos desactivado por estabilidad.

---

### Etapa 2 — Instalación de dependencias

Instalamos todo el stack de una sola vez para no volver a este paso:

```bash
pnpm add bcryptjs jsonwebtoken cookie mysql2 zod react-hook-form lucide-react sonner clsx tailwind-merge
pnpm add -D @types/bcryptjs @types/jsonwebtoken @types/cookie
```

Lo que instalamos y por qué:

| Paquete           | Por qué lo elegimos                                          |
| ----------------- | ------------------------------------------------------------ |
| `bcryptjs`        | Hashear contraseñas. Más seguro que MD5 o SHA directo        |
| `jsonwebtoken`    | Crear y verificar tokens JWT para la sesión                  |
| `cookie`          | Serializar cookies HTTP de forma segura                      |
| `mysql2`          | Cliente MySQL moderno con soporte nativo a Promises          |
| `zod`             | Validar datos en runtime, no solo en compilación             |
| `react-hook-form` | Formularios con mínimo re-render y fácil integración con Zod |
| `lucide-react`    | Íconos SVG limpios y tipados                                 |
| `sonner`          | Toasts modernos para feedback al usuario                     |
| `clsx`            | Unir clases CSS condicionalmente sin concatenar strings      |
| `tailwind-merge`  | Evitar conflictos cuando dos clases Tailwind se pisan        |

---

### Etapa 3 — Evaluación del estado inicial

Antes de arrancar a escribir código revisamos qué tan sólida estaba la base. La calificamos así:

- **7.5/10** para empezar a desarrollar
- **5.5/10** para considerarla base de producción

Lo que estaba bien: stack coherente, TypeScript strict, ESLint bien configurado, estructura de carpetas con separación por tipo.

Lo que faltaba: capas de dominio vacías, sin validación de entorno, sin contrato de errores, sin cliente de DB, sin convenciones documentadas.

---

### Etapa 4 — Definición de arquitectura

Decidimos organizar el código por dominios (`features/`) en lugar de solo por tipo de archivo. La razón: cuando la app crece, tener todo `auth/` junto es más mantenible que tener los componentes en un lado, los servicios en otro y los tipos en otro.

```
features/
 ├─ auth/        ← todo lo de autenticación junto
 ├─ uploads/     ← todo lo de archivos junto
 ├─ subjects/    ← todo lo de materias junto
 └─ summaries/   ← todo lo de resúmenes junto
```

También decidimos mantener el proyecto como un monolito Next.js por ahora, con frontend y API routes en la misma app. Conviene separar en Backend/Frontend independientes solo cuando haya múltiples clientes (web + mobile), equipos separados o necesidades de escalado distintas.

Establecimos convenciones de nombres:

| Tipo              | Convención          | Ejemplo                       |
| ----------------- | ------------------- | ----------------------------- |
| Componentes React | PascalCase          | `UserCard.tsx`                |
| Hooks             | camelCase con `use` | `useAuth.ts`                  |
| Servicios         | `nombre.service.ts` | `auth.service.ts`             |
| Schemas Zod       | `nombre.schemas.ts` | `auth.schemas.ts`             |
| Tipos TypeScript  | `nombre.types.ts`   | `user.types.ts`               |
| API routes        | `route.ts`          | `app/api/auth/login/route.ts` |

---

### Etapa 5 — Creación de la estructura de directorios

Creamos todos los directorios y archivos vacíos del sistema base y del primer feature (auth) antes de escribir código, para tener claro el mapa completo:

```
src/
├── middleware.ts
├── app/
│   └── api/
│       ├── health/route.ts
│       └── auth/
│           ├── register/route.ts
│           ├── login/route.ts
│           ├── logout/route.ts
│           └── me/route.ts
├── features/
│   └── auth/
│       ├── auth.schemas.ts
│       └── auth.service.ts
├── lib/
│   ├── env.ts
│   ├── db.ts
│   ├── errors.ts
│   ├── api-response.ts
│   ├── jwt.ts
│   ├── cookie.ts
│   └── password.ts
└── types/
    └── user.types.ts
```

Durante la creación corregimos dos errores:

- `middleware.ts` estaba dentro de una carpeta `middleware/` — Next.js lo requiere directamente en `src/`
- `auth.services.ts` tenía una `s` de más — la convención es singular `auth.service.ts`

---

### Etapa 6 — Escritura del código base (en progreso)

Estamos completando los archivos en este orden, respetando dependencias:

```
 ✅ Estructura de directorios creada
 ⬜ types/user.types.ts         → contratos del dominio User
 ⬜ lib/env.ts                  → validación de variables de entorno con Zod
 ⬜ lib/errors.ts               → clase AppError y códigos estándar
 ⬜ lib/api-response.ts         → helpers ok() y fail() para respuestas HTTP
 ⬜ lib/db.ts                   → pool singleton de conexiones MySQL
 ⬜ lib/password.ts             → hash y verify con bcryptjs
 ⬜ lib/jwt.ts                  → sign y verify de tokens JWT
 ⬜ lib/cookie.ts               → serialización de cookies httpOnly seguras
 ⬜ features/auth/auth.schemas.ts   → schemas Zod de login y register
 ⬜ features/auth/auth.service.ts   → lógica de negocio de autenticación
 ⬜ app/api/auth/register/route.ts  → POST /api/auth/register
 ⬜ app/api/auth/login/route.ts     → POST /api/auth/login
 ⬜ app/api/auth/logout/route.ts    → POST /api/auth/logout
 ⬜ app/api/auth/me/route.ts        → GET /api/auth/me
 ⬜ middleware.ts                   → protección de rutas
 ⬜ app/api/health/route.ts         → GET /api/health
```

---

### Etapa 7 — Lo que viene después de auth

Una vez terminada la capa de autenticación, el orden de trabajo será:

1. **UI base**: layout, header, sistema de diseño mínimo (Button, Input, Card)
2. **Módulo de materias** (`features/subjects/`): CRUD completo
3. **Módulo de uploads** (`features/uploads/`): subida de PDFs con almacenamiento cloud
4. **Módulo de resúmenes** (`features/summaries/`): listado, búsqueda y favoritos
5. **Testing**: unitario con Vitest para utils y schemas
6. **CI/CD**: GitHub Actions con lint + typecheck + test + build
7. **Rate limiting**: proteger endpoints de auth contra fuerza bruta
8. **Logging estructurado**: trazabilidad de errores en producción
9. **Documentación de API**: OpenAPI/Swagger

---

### Configuración de entorno

El archivo `.env` en la raíz del proyecto (no se commitea al repositorio):

```env
NODE_ENV=development

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=tu_password_aqui
MYSQL_DATABASE=campus_vault

JWT_SECRET=reemplazar_con_string_largo_y_aleatorio
JWT_EXPIRES_IN=15m
```

El archivo `.env.example` en el repositorio sirve como plantilla pública con los nombres de variables sin valores reales.

---

### Comandos del proyecto

```bash
pnpm dev          # servidor de desarrollo en localhost:3000
pnpm build        # build de producción
pnpm start        # servidor de producción (requiere build previo)
pnpm lint         # ESLint sobre todo el proyecto
pnpm typecheck    # TypeScript sin emitir archivos
pnpm check        # lint + typecheck juntos
```
