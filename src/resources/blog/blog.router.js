import { Router } from 'express'
import controllers from './blog.controllers'

const router = Router()

// /api/blog
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/blog/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
