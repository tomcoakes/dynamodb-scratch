import express from 'express'
import createDbService from './src/createMovieService'
import setupDatabase from './src/setupDatabase'

setupDatabase().then((dynamoDBClient) => {
  const dbService = createDbService(dynamoDBClient)
  createAndConfigureApp(express(), dbService)
})

function createAndConfigureApp(app, dbService) {
  console.log('>>> dbService: ', dbService)
  app.get('/', (req, res) => {
    console.log('>>> req: ', req.query)
    res.send('Hello, World!')
  })

  app.get('/products', async (req, res) => {
    const products = await dbService.listTables()
    res.send(products)
  })

  app.listen('3000', () => {
    console.log('>>> app started')
  })

  return app
}
