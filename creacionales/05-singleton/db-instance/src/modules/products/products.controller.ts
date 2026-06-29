import type { Request, Response } from 'express'
import { ProductsRepository } from './products.repository'

//Controller: es el encargado de recibir las peticiones HTTP, procesarlas y devolver una respuesta.

// Creamos una instancia del repositorio de productos para poder usar sus métodos.
const repository = new ProductsRepository()

// Función para manejar la ruta GET /api/products.
// req: objeto que representa la solicitud HTTP entrante.
// res: objeto que representa la respuesta HTTP que se enviará.
export async function getProducts(_req: Request, res: Response): Promise<void> {
  try {
    // Llamamos al método findAll del repositorio para obtener todos los productos.
    const products = await repository.findAll()
    
    // Respondemos con un JSON que contiene los productos.
    res.json({ data: products })
  } catch (error) {
    console.error('Error al obtener productos:', error)
    res.status(500).json({ error: 'No se pudieron obtener los productos.' })
  }
}
