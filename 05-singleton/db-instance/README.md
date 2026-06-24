# API de Productos y Usuarios · Patrón Singleton (+ repaso de Builder)

API mínima en Node + TypeScript pensada para implementar patrones de diseño.

## Qué hace

- Un seeder crea las tablas `products` y `users`, cada una con 3 registros.
- `GET /api/products` devuelve todos los productos.
- `GET /api/users` devuelve todos los usuarios.

Los dos módulos (`products` y `users`) usan la MISMA instancia de conexión (Singleton)

## Rutas útiles

| Archivo                        | Patrón / Rol                                        |
| ------------------------------ | --------------------------------------------------- |
| `src/database/Database.ts`     | Singleton: única instancia de conexión a la BD.     |
| `src/database/QueryBuilder.ts` | Builder: arma el SQL paso a paso (parametrizado).   |
| `src/modules/products/...`     | Usa el Singleton + el Builder.                      |
| `src/modules/users/...`        | Usa la MISMA instancia del Singleton.               |

### El Singleton en 3 claves (`Database.ts`)

1. Atributo `private static instance` -> guarda la única instancia.
2. `private constructor()` -> nadie puede hacer `new Database()` desde fuera.
3. `static getInstance()` -> único punto de acceso; crea la instancia la
   primera vez y devuelve siempre la misma.

> Demostración en clase: arranca el API y llama a `/api/products` y luego a
> `/api/users`. El mensaje "Conexión a la base de datos creada (única
> instancia)" aparece UNA sola vez, aunque ambos módulos pidan la conexión.

## Estructura de carpetas

```
src/
├─ config/
│  └─ env.ts                 # carga y valida variables de entorno
├─ database/
│  ├─ Database.ts            # Singleton (pool de conexión)
│  └─ QueryBuilder.ts        # Builder (SQL parametrizado)
├─ modules/
│  ├─ products/
│  │  ├─ products.repository.ts   # usa Singleton + Builder
│  │  ├─ products.controller.ts   # maneja req/res
│  │  └─ products.routes.ts       # define las rutas
│  └─ users/
│     ├─ users.repository.ts      # usa la MISMA instancia (Singleton)
│     ├─ users.controller.ts
│     └─ users.routes.ts
├─ seeders/
│  └─ seed.ts                # crea tablas products y users + datos
├─ app.ts                    # crea y configura Express
└─ server.ts                 # arranca el servidor
```

## Puesta en marcha

```bash
pnpm install

cp .env.example .env
# pega tu DATABASE_URL de Neon en el archivo .env

pnpm seed
pnpm dev
```

Prueba los endpoints:

```bash
curl http://localhost:3000/api/products
curl http://localhost:3000/api/users
```

Respuestas de ejemplo:

```json
// GET /api/products
{
  "data": [
    { "id": 1, "name": "Teclado mecánico", "price": 49.99, "stock": 10 },
    { "id": 2, "name": "Mouse inalámbrico", "price": 19.99, "stock": 25 },
    { "id": 3, "name": "Monitor 24 pulgadas", "price": 129.99, "stock": 7 }
  ]
}

// GET /api/users
{
  "data": [
    { "id": 1, "name": "Ana García", "email": "ana@example.com" },
    { "id": 2, "name": "Luis Pérez", "email": "luis@example.com" },
    { "id": 3, "name": "Marta Ruiz", "email": "marta@example.com" }
  ]
}
```

## Scripts

| Comando          | Descripción                                  |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | Arranca el API con recarga automática (tsx). |
| `pnpm start`     | Arranca el API una vez.                      |
| `pnpm seed`      | Crea las tablas e inserta los datos.         |
| `pnpm typecheck` | Comprueba los tipos con TypeScript.          |
