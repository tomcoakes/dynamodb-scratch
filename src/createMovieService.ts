import AWS from 'aws-sdk'

const createMovieService = (dynamoDBClient: AWS.DynamoDB) => {
  return {
    listTables: async () => {
      return await dynamoDBClient.listTables().promise()
    },
  }
}

export default createMovieService
