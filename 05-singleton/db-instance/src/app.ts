import express from 'express'
import type { Express } from 'express'
import { productsRoutes } from './modules/products/products.routes'
import { usersRoutes } from './modules/users/users.routes'

export function createApp(): Express {
  // Creamos la app de Express y configuramos las rutas.
  const app = express()

  // Middleware para parsear JSON en el body de las peticiones.
  app.use(express.json())

  // Rutas de la API.
  
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  //use se utiliza para montar rutas en la aplicación de Express
  app.use('/api/products', productsRoutes)
  app.use('/api/users', usersRoutes)

  return app
}
