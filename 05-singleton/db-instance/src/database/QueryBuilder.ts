export interface SqlQuery {
  text: string
  values: unknown[]
}

export class QueryBuilder {
  private readonly tableName: string
  private columns: string[] = ['*']
  private readonly wheres: string[] = []
  private readonly values: unknown[] = []
  private readonly orders: string[] = []
  private limitValue?: number

  constructor(table: string) {
    this.tableName = table
  }

  static table(name: string): QueryBuilder {
    return new QueryBuilder(name)
  }

  select(...columns: string[]): this {
    if (columns.length > 0) this.columns = columns
    return this
  }

  where(column: string, operator: string, value: unknown): this {
    this.values.push(value)
    this.wheres.push(`${column} ${operator} $${this.values.length}`)
    return this
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orders.push(`${column} ${direction}`)
    return this
  }

  limit(count: number): this {
    this.limitValue = count
    return this
  }

  build(): SqlQuery {
    const values = [...this.values]
    const parts: string[] = [
      `SELECT ${this.columns.join(', ')} FROM ${this.tableName}`,
    ]

    if (this.wheres.length > 0) {
      parts.push(`WHERE ${this.wheres.join(' AND ')}`)
    }
    if (this.orders.length > 0) {
      parts.push(`ORDER BY ${this.orders.join(', ')}`)
    }
    if (this.limitValue !== undefined) {
      values.push(this.limitValue)
      parts.push(`LIMIT $${values.length}`)
    }

    return { text: parts.join(' '), values }
  }
}
