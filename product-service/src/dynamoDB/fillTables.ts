import { BatchWriteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { productsMocks } from '../mocks/products';


const client = new DynamoDBClient({ region: 'eu-west-1' });

const tablesParams = {
    RequestItems: {
        products: [],
        stocks: []
    }
};

function createRequestParams() {
    productsMocks.forEach(product => {
        const { id, count, description, price, title } = product;
        const convertedProduct = {
            PutRequest: {
                Item: {
                    id: { S : id },
                    description: { S: description },
                    price: { N: price.toString() },
                    title: { S: title },
    
                }
            }
        }
        const convertedStock = {
            PutRequest: {
                Item: {
                    product_id: { S: id },
                    count: { N: count.toString() },
                }
            }
        }
    
        tablesParams.RequestItems.products.push(convertedProduct);
        tablesParams.RequestItems.stocks.push(convertedStock);
    });
}


async function sendTableData() {
  try {
    const data = await client.send(new BatchWriteItemCommand(tablesParams));
    console.log("Success, items inserted", data);        
  } catch (err) {
    console.log("Error", err);
  }
};

createRequestParams();
sendTableData();


