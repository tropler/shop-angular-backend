import { APIGatewayProxyHandler } from "aws-lambda";
import { query } from "../../dynamoDB";
import { formatResponse } from "../../utils/formatResponce";

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters.id;

    const [product, stock] = await Promise.all([
      query('products', 'id', id), 
      query('stocks', 'product_id', id)
    ]);

    const convertedProduct = { 
        ...product,
        count: stock.count 
      };

    if (!convertedProduct) {
      return formatResponse(404, 'Product not found');
    }

    return formatResponse(200, convertedProduct);
  } catch (error) {
    return formatResponse(500, error);
  }
};