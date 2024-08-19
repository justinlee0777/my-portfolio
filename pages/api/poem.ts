import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Poem } from '../../src/models/poem.interface';
import unwrapAWSValue from '../../src/utils/unwrap-aws-value.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Poem>
) {
  if (req.method === 'GET') {
    const client = new DynamoDBClient();

    const command = new GetItemCommand({
      TableName: 'Poem',
      Key: {
        poem_id: {
          S: 'poem-of-the-day',
        },
      },
    });

    const response = await client.send(command);

    const poem = Object.fromEntries(
      Object.entries(response.Item!).map(([key, value]) => [
        key,
        unwrapAWSValue(value),
      ])
    ) as Poem;

    res.status(200).json(poem);
  } else {
    res.status(404).end();
  }
}
