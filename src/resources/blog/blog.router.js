import { Router } from 'express'
const controller = (req, res) => {
  res.send({ message: 'Hello Blog' })
}

const router = Router()

// /api/list
router
  .route('/')
  .get(controller)
  .post(controller)

// /api/list/:id
router
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller)

export default router
