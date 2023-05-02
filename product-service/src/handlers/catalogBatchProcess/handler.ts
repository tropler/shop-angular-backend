import { Handler } from "aws-lambda";
import { formatResponse } from "../../utils/formatResponce";
import {SNSClient, PublishCommand} from '@aws-sdk/client-sns';
import { createItem } from '../../dynamoDB/index';
import { SNS_TOPIC_ARN } from "../../constants/constants";

export const catalogBatchProcess: Handler = async (event) => {  
    const snsClient = new SNSClient({region: 'eu-west-1'});

    try {
        for (const record of event.Records) {
            const productData = JSON.parse(record.body);

            const product = await createItem(productData);

            if (product) {
                const publishCommand = new PublishCommand({
                Subject: 'Product created',
                Message: JSON.stringify(productData),
                MessageAttributes: {
                    count: {
                        DataType: 'Number',
                        StringValue: productData.count,
                    }
                },
                TopicArn: SNS_TOPIC_ARN
                })

                await snsClient.send(publishCommand);
            }
        }

        return formatResponse(200, 'Product successfuly created');
      } catch (error) {
        return formatResponse(500, error);
      } 
}