import { Router } from 'express'

function createDebugRouter(dbService) {
  const router = Router()

  router.get('/list-tables', async (req, res) => {
    const products = await dbService.listTables()
    res.send(products)
  })

  return router
}

export default createDebugRouter
