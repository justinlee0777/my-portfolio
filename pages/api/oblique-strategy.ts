import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObliqueStrategy } from '../../src/models/oblique-strategy.interface';
import unwrapAWSValue from '../../src/utils/unwrap-aws-value.function';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ObliqueStrategy>
) {
  if (req.method === 'GET') {
    const client = new DynamoDBClient();

    const command = new GetItemCommand({
      TableName: 'oblique_strategies',
      Key: {
        oblique_strategy_id: {
          S: 'oblique_strategy_of_the_day',
        },
      },
    });

    const response = await client.send(command);

    const obliqueStrategy = Object.fromEntries(
      Object.entries(response.Item!).map(([key, value]) => [
        key,
        unwrapAWSValue(value),
      ])
    ) as ObliqueStrategy;

    res.status(200).json(obliqueStrategy);
  } else {
    res.status(404).end();
  }
}
