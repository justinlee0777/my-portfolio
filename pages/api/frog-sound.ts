import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import FrogSound from '../../src/models/frog-sound';
import toCamelCase from '../../src/utils/to-camel-case.function';
import unwrapAWSValue from '../../src/utils/unwrap-aws-value.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FrogSound>
) {
  if (req.method === 'GET') {
    const client = new DynamoDBClient();

    const command = new GetItemCommand({
      TableName: 'frog_sounds',
      Key: {
        frog_sound_id: {
          S: 'frog-sound-of-the-day',
        },
      },
    });

    const response = await client.send(command);

    const frogSound = Object.fromEntries(
      Object.entries(response.Item!).map(([key, value]) => [
        toCamelCase(key, '_'),
        unwrapAWSValue(value),
      ])
    ) as FrogSound;

    res.status(200).json(frogSound);
  } else {
    res.status(404).end();
  }
}
