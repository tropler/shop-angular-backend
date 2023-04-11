import { APIGatewayProxyHandler } from "aws-lambda";
import { productsMocks } from "../../mocks/products";
import { formatResponse } from "../../utils/formatResponce";

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  try {
    const products = await Promise.resolve(productsMocks);
    const product = products.find(p => p.id === event.pathParameters.id);

    if (!product) {
      return formatResponse(404, 'Product not found');
    }

    return formatResponse(200, product);
  } catch (error) {
    return formatResponse(500, error);
  }
};