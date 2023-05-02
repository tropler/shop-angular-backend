import * as AWS from 'aws-sdk-mock'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import {importProductsFile} from './handler'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { formatResponse } from '../../utils/formatResponce'

AWS.mock('S3', 'getSignedUrl', function (_method, _never, callback) {
    callback(null, 'https://aws:s3:test.csv');
})

jest.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: jest.fn()
}));

jest.mock('../../utils/formatResponce', () => ({
    formatResponse: jest.fn(),
}))

describe('#import', () => {

    test('should return error if name was not passed', async () => {
        const mockedEvent: APIGatewayProxyEvent = {
            queryStringParameters: {
                name: ''
            }
         } as any;
        await importProductsFile(mockedEvent, null, null);

        expect(formatResponse).toHaveBeenCalledWith(500, 'Something went wrong!');
    })

    test('should be called', async () => {
        const mockedEvent: APIGatewayProxyEvent = {
            queryStringParameters: {
                name: 'product.csv'
            }
         } as any;
         
        await importProductsFile(mockedEvent, null, null);

        expect(getSignedUrl).toHaveBeenCalled();
    })
})