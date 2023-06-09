import { APIGatewayRequestAuthorizerEventV2, Handler } from 'aws-lambda';

export const basicAuthorizer: Handler = async (event: APIGatewayRequestAuthorizerEventV2) => {
  const { headers } = event;
  const { authorization: token } = headers;
  console.log(event);

  const user = Buffer.from(token?.split(' ')[1], 'base64')?.toString() || '';


  const [username, password] = user?.split(':');

  console.log(user);

  return {
    isAuthorized: process.env[username] === password,
  };
}