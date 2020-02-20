import { Router } from 'express'
import controllers from './blog.controllers'

const router = Router()

// /api/list
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/list/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
