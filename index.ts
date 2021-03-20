import express from 'express'
import { Express } from 'express-serve-static-core'
import createMovieService from './src/createMovieService'
import setupDatabase from './src/setupDatabase'

import debugRouter from './src/routers/debug'
import createDebugRouter from './src/routers/debug'

setupDatabase().then((dynamoDBClient) => {
  const movieService = createMovieService(dynamoDBClient)
  createAndConfigureApp(express(), movieService)
})

function createAndConfigureApp(app: Express, dbService) {
  console.log('>>> dbService: ', dbService)
  app.get('/', (req, res) => {
    console.log('>>> req: ', req.query)
    res.send('Hello, World!')
  })

  app.use('/debug', createDebugRouter(dbService))

  app.listen('3000', () => {
    console.log('>>> app started')
  })

  return app
}
