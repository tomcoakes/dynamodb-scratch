import AWS from 'aws-sdk'

const createDbService = (dynamoDBClient: AWS.DynamoDB) => {
  return {
    listTables: async () => {
      return await dynamoDBClient.listTables().promise()
    },
  }
}

export default createDbService
