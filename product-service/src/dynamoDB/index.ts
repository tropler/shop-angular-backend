import { DynamoDB } from 'aws-sdk';

export const dynamo = new DynamoDB.DocumentClient({ region: 'eu-west-1' });

export const scan = async (tableName: string) => {
    const scanResults = await dynamo.scan({
        TableName: tableName,
    }).promise();

    return scanResults.Items;
}

export const query = async (tableName: string, key: string, id: string) => {
    const queryResults = await dynamo.query({
        TableName: tableName,
        KeyConditionExpression: `${key} = :id`,
        ExpressionAttributeValues: { ':id': id }
    }).promise();

    return queryResults.Items[0];
}
export const createItem = ({ id, price, title, description, count }) => {
    return dynamo.transactWrite({
        TransactItems: [
          {
            Put: {
              TableName: 'products',
              Item: {
                id,
                price,
                title,
                description,
              },
            },
          },
          {
            Put: {
              TableName: 'stocks',
              Item: {
                product_id: id,
                count,
              },
            },
          },
        ],
      }).promise();
}