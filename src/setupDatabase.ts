import AWS from 'aws-sdk'
import { TABLE_NAME } from './constants'

const setupDatabase = async () => {
  AWS.config.update({
    region: 'eu-west-2',
  })

  AWS.config.dynamodb = {
    endpoint: 'http://localhost:8000',
  }

  const dynamodb = new AWS.DynamoDB()
  const tables = await dynamodb.listTables().promise()

  if (!tables.TableNames.includes(TABLE_NAME)) {
    console.log('>>> creating table')
    dynamodb.createTable(
      {
        TableName: 'movies',
        AttributeDefinitions: [
          { AttributeName: 'title', AttributeType: 'S' },
          { AttributeName: 'year', AttributeType: 'N' },
        ],
        KeySchema: [{ AttributeName: 'title', KeyType: 'HASH' }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      },
      (err, data) => {
        if (err) {
          console.error('>>> createTable error: ', err)
        } else {
          console.log('>>> createTable response: ', data)
        }
      },
    )
  } else {
    console.log('>>> table already exists')
  }

  return dynamodb
}

export default setupDatabase
