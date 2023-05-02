import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatResponse } from '../../utils/formatResponce';
import { BUCKET_NAME, FOLDER_NAME } from '../../constants/constant';

export const importProductsFile: APIGatewayProxyHandler = async (event) => {
  try {
     const name = event.queryStringParameters.name;

     if (!name) {
      throw new Error('Enter file name!');
     }

     const s3Client = new S3Client({region: 'eu-west-1'});

      const objectKey = `${FOLDER_NAME}/${name}`;

      const params = {
        Bucket: BUCKET_NAME,
        Key: objectKey
      };

      const putObjectCommand = new PutObjectCommand(params);
      await s3Client.send(putObjectCommand);

      const url = await getSignedUrl(s3Client, putObjectCommand);
      return formatResponse(200, url);
    }
    catch (e) {
      return formatResponse(500, 'Something went wrong!');
    }    
}