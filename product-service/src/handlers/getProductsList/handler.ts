import { APIGatewayProxyHandler } from "aws-lambda";
import { productsMocks } from "../../mocks/products";

export const getProductsList: APIGatewayProxyHandler = async () => {
  try {
    const products = await Promise.resolve(productsMocks);

    if (!products) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify('Products are not found')
      };
    }

    return {
      statusCode: 200, 
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(products)
    };
  } catch (error) {
    return {
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(error),
    };
  }
};


