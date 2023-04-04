import { APIGatewayProxyHandler } from "aws-lambda";
import { productsMocks } from "../../mocks/products";

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  try {
    const products = await Promise.resolve(productsMocks);
    const product = products.find(p => p.id === event.pathParameters.id);

    if (!product) {
      return {
        statusCode: 404, 
        body: JSON.stringify('Product not found')
       }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product)
    };
  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify(error)
    };
  }
};