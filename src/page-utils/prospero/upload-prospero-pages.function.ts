import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import PagesAsIndicesOutput from 'prospero/models/pages-as-indices-output.interface';
import { TableOfContentsSection } from 'prospero/models/table-of-contents.interface';
import { ProsperoPageDataModel } from '../../models/propsero-page-data.model';
import { ProsperoPageStyleDataModel } from '../../models/prospero-page-style-data.model';
import { ProsperoTableOfContentsModel } from '../../models/prospero-table-of-contents.model';
import connectToMongoDB from './connect-to-mongodb.function';

export default async function uploadProsperoPages(
  textTitle: string,
  textDescription: string,
  textData: PagesAsIndicesOutput & { chapters: Array<TableOfContentsSection> }
) {
  const s3Client = new S3Client();

  const command = new PutObjectCommand({
    Bucket: 'prospero-texts',
    Key: `${textTitle}-${textDescription}`,
    Body: textData.text,
  });

  await s3Client.send(command);

  await connectToMongoDB();

  const {
    width,
    height,
    computedFontSize,
    computedFontFamily,
    lineHeight,
    padding: {
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
      left: paddingLeft,
    } = {},
    margin: {
      top: marginTop,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft,
    } = {},
    border: {
      top: borderTop,
      right: borderRight,
      bottom: borderBottom,
      left: borderLeft,
    } = {},
  } = textData.pageStyles;

  await ProsperoPageStyleDataModel.updateOne(
    { textTitle, textDescription },
    {
      width,
      height,
      computedFontFamily,
      computedFontSize,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      lineHeight,
    },
    { upsert: true }
  );

  await ProsperoPageDataModel.deleteMany({ textTitle, textDescription });

  await ProsperoPageDataModel.insertMany(
    textData.pages.map((page, index) => ({
      textTitle,
      textDescription,
      pageNumber: index + 1,
      beginIndex: page.beginIndex,
      endIndex: page.endIndex,
    }))
  );

  await ProsperoTableOfContentsModel.updateOne(
    { textTitle, textDescription },
    {
      sections: textData.chapters,
    },
    { upsert: true }
  );
}
