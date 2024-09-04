import type { NextApiRequest, NextApiResponse } from 'next';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z, ZodType } from 'zod';
import getOpenAIApi from '../../../src/api/openai/open-ai.client';
import { FormMetadataValueConfig } from '../../../src/utils/ai-form-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const openaiAPI = getOpenAIApi();

    const {
      formConfig,
      answer,
    }: { formConfig: FormMetadataValueConfig; answer: string } = JSON.parse(
      req.body
    );

    let valueType: ZodType;

    switch (formConfig.type) {
      case 'boolean':
        valueType = z.boolean().or(z.null());
        break;
      case 'number':
        valueType = z.number().or(z.null());
        break;
      default:
        valueType = z.string().or(z.null());
        break;
    }

    const completions = await openaiAPI.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `
          Extract the ${formConfig.type} value from the user's response.
          This is the question the answer belongs to: ${formConfig.label}.
          If, instead of answering, the user asks any questions, answer to the best of your ability.
          `,
        },
        {
          role: 'user',
          content: answer,
        },
      ],
      response_format: zodResponseFormat(
        z.object({
          value: valueType.optional(),
          answer: z.string().optional(),
        }),
        'answer'
      ),
    });

    res.status(200).json(completions.choices.at(0)!.message.parsed);
  } else {
    res.status(404).end();
  }
}
