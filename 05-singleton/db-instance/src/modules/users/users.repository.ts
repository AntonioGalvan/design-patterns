import { Database } from '../../database/Database'
import { QueryBuilder } from '../../database/QueryBuilder'

export interface User {
  id: number
  name: string
  email: string
}

export class UsersRepository {
  async findAll(): Promise<User[]> {
    // Misma instancia que usa products.
    const db = Database.getInstance()

    //Query: select id, name, email from users order by id asc
    const query = QueryBuilder
      .table('users')
      .select('id', 'name', 'email')
      .orderBy('id', 'ASC')
      .build()

    return db.query(query.text, query.values)
  }
}
