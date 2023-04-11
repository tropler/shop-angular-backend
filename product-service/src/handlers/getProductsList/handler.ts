import { APIGatewayProxyHandler } from "aws-lambda";
import { productsMocks } from "../../mocks/products";
import { formatResponse } from "../../utils/formatResponce";

export const getProductsList: APIGatewayProxyHandler = async () => {
  try {
    const products = await Promise.resolve(productsMocks);

    if (!products) {
      return formatResponse(404, 'Products are not found');
    }

    return formatResponse(200, products);
  } catch (error) {
    return formatResponse(500, error);
  }
};


