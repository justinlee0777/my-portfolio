import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ProsperoPageDataModel } from '../../models/propsero-page-data.model';
import { ProsperoPageStyleDataModel } from '../../models/prospero-page-style-data.model';
import connectToMongoDB from './connect-to-mongodb.function';

export default async function getProsperoPages(
  textTitle: string,
  textDescription: string,
  pageNumber: number,
  pageSize: number
) {
  const s3Client = new S3Client();

  const command = new GetObjectCommand({
    Bucket: 'prospero-texts',
    Key: textTitle,
  });

  const result = await s3Client.send(command);

  const text = await result.Body.transformToString();

  await connectToMongoDB();

  const startingPage = 1 + (pageNumber - 1) * pageSize;

  const endPage = startingPage + (pageSize - 1);

  const pages = await ProsperoPageDataModel.find({
    textTitle,
    textDescription,
    pageNumber: { $gt: startingPage, $lt: endPage },
  }).lean();

  const pageStyles = await ProsperoPageStyleDataModel.findOne({
    textTitle,
    textDescription,
  }).lean();

  const totalSize = await ProsperoPageDataModel.countDocuments({
    textDescription,
    textTitle,
  });

  const content = pages.map((page) =>
    text.slice(page.beginIndex, page.endIndex)
  );

  return {
    value: {
      html: Boolean(pageStyles.html),
      pageStyles: {
        width: pageStyles.width,
        height: pageStyles.height,
        computedFontSize: pageStyles.computedFontSize,
        computedFontFamily: pageStyles.computedFontFamily,
        lineHeight: pageStyles.lineHeight,
        padding: {
          top: pageStyles.paddingTop,
          right: pageStyles.paddingRight,
          bottom: pageStyles.paddingBottom,
          left: pageStyles.paddingLeft,
        },
        margin: {
          top: pageStyles.marginTop,
          right: pageStyles.marginRight,
          bottom: pageStyles.marginBottom,
          left: pageStyles.marginLeft,
        },
        border: {
          top: pageStyles.borderTop,
          right: pageStyles.borderRight,
          bottom: pageStyles.borderBottom,
          left: pageStyles.borderLeft,
        },
      },
      content,
    },
    page: {
      pageNumber,
      pageSize,
      pages: Math.ceil(totalSize / pageSize),
      totalSize,
    },
  };
}
