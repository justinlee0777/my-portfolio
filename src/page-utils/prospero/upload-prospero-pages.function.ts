import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import PagesAsIndicesOutput from 'prospero/models/pages-as-indices-output.interface';
import sendMySQLQuery from '../../utils/send-mysql-query.function';
import getMySQLClient from './get-mysql-client.function';

export default async function uploadProsperoPages(
  textTitle: string,
  textDescription: string,
  textData: PagesAsIndicesOutput
) {
  const s3Client = new S3Client();

  const command = new PutObjectCommand({
    Bucket: 'prospero-texts',
    Key: textTitle,
    Body: textData.text,
  });

  await s3Client.send(command);

  const mySQLClient = getMySQLClient();

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
    },
    margin: {
      top: marginTop,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft,
    },
    border: {
      top: borderTop,
      right: borderRight,
      bottom: borderBottom,
      left: borderLeft,
    },
  } = textData.pageStyles;

  const { html } = textData;

  mySQLClient.connect();

  const updateStylesQuery = `REPLACE INTO page_styles \
                       VALUES (\
                       ${width}, \
                       ${height}, \
                       '${computedFontSize}', \
                       '${computedFontFamily}', \
                       ${paddingTop}, \
                       ${paddingRight}, \
                       ${paddingBottom}, \
                       ${paddingLeft}, \
                       ${marginTop}, \
                       ${marginRight}, \
                       ${marginBottom}, \
                       ${marginLeft}, \
                       ${borderTop}, \
                       ${borderRight}, \
                       ${borderBottom}, \
                       ${borderLeft}, \
                       '${textDescription}', \
                       '${textTitle}', \
                       ${lineHeight}, \
                       ${html} \
                       )`;

  await sendMySQLQuery(mySQLClient, updateStylesQuery);

  const deleteOldPagesQuery = `DELETE FROM pages WHERE text_title = '${textTitle}' AND text_description = '${textDescription}'`;

  await sendMySQLQuery(mySQLClient, deleteOldPagesQuery);

  const pageValues = textData.pages.map(
    (page, index) =>
      `('${textTitle}',${index + 1},${page.beginIndex},${
        page.endIndex
      },'${textDescription}')`
  );

  const insertPagesQuery = `INSERT INTO pages VALUES${pageValues.join(', ')}`;

  await sendMySQLQuery(mySQLClient, insertPagesQuery);

  mySQLClient.end();
}
