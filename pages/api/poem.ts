import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Poem } from '../../src/models/poem.interface';
import toCamelCase from '../../src/utils/to-camel-case.function';
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
        toCamelCase(key, '_'),
        unwrapAWSValue(value),
      ])
    ) as Poem;

    const s3Key = 'objectName';

    if (poem[s3Key]) {
      const s3Client = new S3Client({ region: 'us-east-1' });

      const command = new GetObjectCommand({
        Bucket: 'poem-of-the-day',
        Key: poem[s3Key],
      });

      const result = await s3Client.send(command);

      const text = await result.Body.transformToString();

      poem.text = text;
      delete poem.lines;
    }

    res.status(200).json(poem);
  } else {
    res.status(404).end();
  }
}
