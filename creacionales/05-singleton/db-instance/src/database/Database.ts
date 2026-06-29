import { Pool } from 'pg'
import { env } from '../config/env'

// Singleton: garantiza una única instancia de conexión a la BD.

export class Database {
  // Unica instancia, estática y privada.
  private static instance: Database | null = null

  // La pool es la que maneja las conexiones a la base de datos; es privada para que nadie más pueda crear otra.
  private readonly pool: Pool

  // Constructor privado: nadie puede instanciar Database desde fuera de la clase.
  private constructor() {
    const url = new URL(env.DATABASE_URL)
    const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1'

    // Quitamos sslmode de la URL (pg avisa de que cambiara de significado);
    // el cifrado SSL lo controlamos con la opcion ssl de abajo.
    url.searchParams.delete('sslmode')

    // Creamos la pool de conexiones a la base de datos.
    this.pool = new Pool({
      connectionString: url.toString(),
      ssl: isLocal ? false : { rejectUnauthorized: false }
    })

    // Se ejecuta una sola vez: aunque varios módulos (products, users...)
    // pidan getInstance(), la conexión se crea una única vez.
    console.log('Conexión a la base de datos creada (única instancia).')
  }

  // Único punto de acceso: crea la instancia una vez y la reutiliza.
  static getInstance(): Database {
    if (Database.instance === null) {
      Database.instance = new Database()
    }
    
    return Database.instance
  }

  // Método para ejecutar consultas SQL parametrizadas.
  async query(
    sql: string,
    params: unknown[] = [],
  ): Promise<any[]> {
    const result = await this.pool.query(sql, params)
    return result.rows
  }
  
  // Método para cerrar la pool de conexiones (por ejemplo, al apagar la app).
  async close(): Promise<void> {
    await this.pool.end()
  }
}
