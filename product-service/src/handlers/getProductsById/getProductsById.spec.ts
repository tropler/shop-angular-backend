import { APIGatewayProxyEvent } from "aws-lambda";
import { productsMocks } from "../../mocks/products";
import { getProductsById } from "./handler";

describe('#getProductsById', () => {
    it('should return product by Id', async () => {
        const mockedEvent: APIGatewayProxyEvent = {
            pathParameters: {
                id: "1"
            }
        } as any;
        const result = await getProductsById(mockedEvent, null, null);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(productsMocks[0]),
        };

        expect(result).toEqual(expectedResult);
    });

    it('should return 404 status if product is not found', async () => {
        const mockedEvent: APIGatewayProxyEvent = {
            pathParameters: {
                id: "55"
            }
        } as any;
        const result = await getProductsById(mockedEvent, null, null);

        const expectedResult = {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify('Product not found'),
        };

        expect(result).toEqual(expectedResult);
    });

    it('should return 500 status if invalid request', async () => {
        const mockedEvent: APIGatewayProxyEvent = {
        } as any;
        const result = await getProductsById(mockedEvent, null, null);

        const expectedResult = {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({}),
        };

        expect(result).toEqual(expectedResult);
    });
});