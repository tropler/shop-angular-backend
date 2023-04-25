import {S3} from "aws-sdk";
import {Handler} from "aws-lambda";
import * as csvParser from "csv-parser";
import { BUCKET_NAME } from "../../constants/constant";

export const importFileParser: Handler = async (event) => {
  try {
    const s3 = new S3();
    
    for (const record of event.Records) {
      const objectKey = record.s3.object.key;
      if (objectKey) {
        const params = {
          Bucket: BUCKET_NAME,
          Key: objectKey,
        };

        const parse = (stream) =>
            new Promise((_resolve, reject) => {
              stream.on("data", (data) => console.log("Record:", data));
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

        const s3Stream = s3.getObject(params).createReadStream();

        await parse(s3Stream.pipe(csvParser()));
      }
    }
  } catch (err) {
    console.log('Something went wrong!')
  }
};