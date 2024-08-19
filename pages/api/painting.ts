import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Painting } from '../../src/models/painting.interface';
import unwrapAWSValue from '../../src/utils/unwrap-aws-value.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Painting>
) {
  if (req.method === 'GET') {
    const client = new DynamoDBClient();

    const command = new GetItemCommand({
      TableName: 'Paintings',
      Key: {
        painting_id: {
          S: 'painting-of-the-day',
        },
      },
    });

    const response = await client.send(command);

    const painting = Object.fromEntries(
      Object.entries(response.Item!).map(([key, value]) => [
        key,
        unwrapAWSValue(value),
      ])
    ) as Painting;

    res.status(200).json(painting);
  } else {
    res.status(404).end();
  }
}
