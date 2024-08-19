import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Fact } from '../../src/models/fact.interface';
import unwrapAWSValue from '../../src/utils/unwrap-aws-value.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fact>
) {
  if (req.method === 'GET') {
    const client = new DynamoDBClient();

    const command = new GetItemCommand({
      TableName: 'Facts',
      Key: {
        fact_id: {
          S: 'fact-of-the-day',
        },
      },
    });

    const response = await client.send(command);

    const fact = Object.fromEntries(
      Object.entries(response.Item!).map(([key, value]) => [
        key,
        unwrapAWSValue(value),
      ])
    ) as Fact;

    res.status(200).json(fact);
  } else {
    res.status(404).end();
  }
}
