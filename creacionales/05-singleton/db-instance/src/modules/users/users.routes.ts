import { Router } from 'express'
import { getUsers } from './users.controller'

export const usersRoutes = Router()

usersRoutes.get('/', getUsers)
