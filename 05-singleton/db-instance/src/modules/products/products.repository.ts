import { Database } from '../../database/Database'
import { QueryBuilder } from '../../database/QueryBuilder'

// Repository: es el encargado de interactuar con la base de datos y devolver los datos al controller.

export interface Product {
  id: number
  name: string
  price: number
  stock: number
}

export class ProductsRepository {
  async findAll(): Promise<Product[]> {
    // Singleton: obtenemos la misma instancia de conexión que usan otros repositorios.
    const db = Database.getInstance()

    //Query: select id, name, price, stock from products order by id asc
    const query = QueryBuilder.table('products')
      .select('id', 'name', 'price', 'stock')
      .orderBy('id', 'ASC')
      .build()

    const rows = await db.query(query.text, query.values)

    // Pasamos el precio a número.
    return rows.map((row) => ({ ...row, price: Number(row.price) }))
  }
}
