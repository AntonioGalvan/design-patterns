import { Database } from '../database/Database'

async function seed(): Promise<void> {
  const db = Database.getInstance()

  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id    SERIAL PRIMARY KEY,
      name  TEXT NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0
    )
  `)

  await db.query('TRUNCATE TABLE products RESTART IDENTITY')

  await db.query(
    `INSERT INTO products (name, price, stock)
     VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9)`,
    [
      'Teclado mecánico', 49.99, 10,
      'Mouse inalámbrico', 19.99, 25,
      'Monitor 24 pulgadas', 129.99, 7,
    ],
  )

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id    SERIAL PRIMARY KEY,
      name  TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `)

  await db.query('TRUNCATE TABLE users RESTART IDENTITY')

  await db.query(
    `INSERT INTO users (name, email)
     VALUES ($1, $2), ($3, $4), ($5, $6)`,
    [
      'Ana García', 'ana@example.com',
      'Luis Pérez', 'luis@example.com',
      'Marta Ruiz', 'marta@example.com',
    ],
  )

  console.log('Seed completado.')
  await db.close()
}

seed().catch((error) => {
  console.error('Error ejecutando el seed:', error)
  process.exit(1)
})
