import {S3} from "aws-sdk";
import {Handler} from "aws-lambda";
import * as csvParser from "csv-parser";
import { BUCKET_NAME, SQS_URL } from "../../constants/constant";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { formatResponse } from "../../utils/formatResponce";

export const importFileParser: Handler = async (event) => {
  try {
    const sqsClient = new SQSClient({region: 'eu-west-1'})
    const s3 = new S3();
    const results = [];

    for (const record of event.Records) {
      const objectKey = record.s3.object.key;
      if (objectKey) {
        const params = {
          Bucket: BUCKET_NAME,
          Key: objectKey,
        };

        const parse = (stream) =>
            new Promise((_resolve, reject) => {
              stream.on("data", (data) => results.push(data));
              stream.on("error", (error) => {
                console.log(error);
                reject();
              });
              stream.on("end", async () => {
                try {
                  const copyParams = {
                    Bucket: BUCKET_NAME,
                    CopySource: `/${BUCKET_NAME}/${objectKey}`,
                    Key: objectKey.replace('uploaded', 'parsed'),
                  };

                  await s3.copyObject(copyParams).promise();

                  await s3.deleteObject(params).promise();
                } catch (err) {
                  console.log(`Error: ${err}`);
                }
              });
            });
            
        results.map((item) => {
          sqsClient.send(
            new SendMessageCommand({
              MessageBody: JSON.stringify(item),
              QueueUrl: SQS_URL
            })
          );
        });

        const s3Stream = s3.getObject(params).createReadStream();

        await parse(s3Stream.pipe(csvParser()));
      }
    }
    return formatResponse(200);
  } catch (err) {
    return formatResponse(500, err);
  }
};