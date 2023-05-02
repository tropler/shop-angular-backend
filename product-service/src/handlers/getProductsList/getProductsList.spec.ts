import { APIGatewayProxyEvent } from "aws-lambda";
import { productsMocks } from "../../mocks/products";
import { getProductsList } from "./handler";

describe('#getProductsById', () => {
    it('should return list of products', async () => {
        const mockedEvent: APIGatewayProxyEvent = { } as any;
        const result = await getProductsList(mockedEvent, null, null);

        const expectedResult = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(productsMocks),
        };

        expect(result).toEqual(expectedResult);
    });
});