import { Router } from 'express'
import { getProducts } from './products.controller'

// Router: es el encargado de definir las rutas de la API y asociarlas a los controladores correspondientes.

// Creamos un router de Express para los productos.
export const productsRoutes = Router()

// Definimos la ruta GET /api/products que llama a la función getProducts.
productsRoutes.get('/', getProducts)
