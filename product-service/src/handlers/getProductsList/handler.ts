import { APIGatewayProxyHandler } from "aws-lambda";
import { scan } from "../../dynamoDB";
import { formatResponse } from "../../utils/formatResponce";

export const getProductsList: APIGatewayProxyHandler = async () => {
  try {

    const [productsTable, stocksTable] = await Promise.all([scan('products'), scan('stocks')]);


    const products = productsTable.map((product) => {
      const productCount = stocksTable.find(stock => product.id === stock.product_id ).count;
      
      return { 
        ...product, 
        count: productCount};
    });

    if (!products) {
      return formatResponse(404, 'Products are not found');
    }

    return formatResponse(200, products);
  } catch (error) {
    return formatResponse(500, error);
  }
};


