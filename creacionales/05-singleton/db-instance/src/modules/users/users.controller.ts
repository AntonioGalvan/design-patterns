import type { Request, Response } from 'express'
import { UsersRepository } from './users.repository'

const repository = new UsersRepository()

export async function getUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await repository.findAll()
    res.json({ data: users })
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ error: 'No se pudieron obtener los usuarios.' })
  }
}
