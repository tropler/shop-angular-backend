import * as AWS from "aws-sdk-mock";
import { createItem } from "../../dynamoDB";
import { catalogBatchProcess } from "./handler";


jest.mock('../../dynamoDB/index.ts', () => ({
    createItem: jest.fn(),
}));

describe('#catalogBatchProcess', () => {
    it('should call createItem method for all records', async () => {
        const result = await catalogBatchProcess({ Records: [{ body: '{"title": "Example1"}' }, { body: '{"title": "Example2"}' }] }, null, null);

        expect(createItem).toHaveBeenCalledTimes(2);

        expect(result.statusCode).toEqual(200);
    });
})