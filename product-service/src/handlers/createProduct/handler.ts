import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';
import { createItem } from "../../dynamoDB";
import { formatResponse } from "../../utils/formatResponce";

export const createProduct: APIGatewayProxyHandler = async (event) => {  
    try {
        const { price, title, description, count } = JSON.parse(event.body);

        await createItem({
          id: uuidv4(),
          price,
          title,
          description,
          count
        });
    
        return formatResponse(200, 'Product successfuly created');
      } catch (error) {
        return formatResponse(500, error);
      }  

}