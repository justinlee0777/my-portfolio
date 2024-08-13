import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sendMySQLQuery from '../../utils/send-mysql-query.function';
import getMySQLClient from './get-mysql-client.function';

interface ProsperoPageData {
  text_title: string;
  page_number: number;
  begin_index: number;
  end_index: number;
  text_description: string;
}

interface ProsperoPageStyleData {
  width: number;
  height: number;
  computed_font_size: string;
  computed_font_family: string;
  padding_top: number;
  padding_right: number;
  padding_bottom: number;
  padding_left: number;
  margin_top: number;
  margin_right: number;
  margin_bottom: number;
  margin_left: number;
  border_top: number;
  border_right: number;
  border_bottom: number;
  border_left: number;
  text_description: string;
  text_title: string;
  line_height: number;
  html: boolean;
}

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

  const mySQLClient = getMySQLClient();

  const startingPage = 1 + (pageNumber - 1) * pageSize;

  const endPage = startingPage + (pageSize - 1);

  const pagesQuery = `SELECT * FROM pages
        WHERE \
        text_title = '${textTitle}' \
        AND \
        text_description = '${textDescription}' \
        AND \
        page_number BETWEEN ${startingPage} AND ${endPage}`;

  const pageStylesQuery = `SELECT * FROM page_styles \
            WHERE text_title = '${textTitle}' AND text_description = '${textDescription}' \
            LIMIT 1`;

  const totalSizeQuery = `SELECT COUNT(*) FROM pages \
        WHERE text_title = '${textTitle}' AND text_description = '${textDescription}'`;

  mySQLClient.connect();

  const pages = await sendMySQLQuery<Array<ProsperoPageData>>(
    mySQLClient,
    pagesQuery
  );

  const pageStyleResults = await sendMySQLQuery<Array<ProsperoPageStyleData>>(
    mySQLClient,
    pageStylesQuery
  );

  const pageStyles = pageStyleResults.at(0);

  const totalSizeResults = await sendMySQLQuery<Array<{ 'COUNT(*)': number }>>(
    mySQLClient,
    totalSizeQuery
  );

  const totalSize = totalSizeResults.at(0)['COUNT(*)'];

  mySQLClient.end();

  const content = pages.map((page) =>
    text.slice(page.begin_index, page.end_index)
  );

  return {
    value: {
      html: Boolean(pageStyles.html),
      pageStyles: {
        width: pageStyles.width,
        height: pageStyles.height,
        computedFontSize: pageStyles.computed_font_size,
        computedFontFamily: pageStyles.computed_font_family,
        lineHeight: pageStyles.line_height,
        padding: {
          top: pageStyles.padding_top,
          right: pageStyles.padding_right,
          bottom: pageStyles.padding_bottom,
          left: pageStyles.padding_left,
        },
        margin: {
          top: pageStyles.margin_top,
          right: pageStyles.margin_right,
          bottom: pageStyles.margin_bottom,
          left: pageStyles.margin_left,
        },
        border: {
          top: pageStyles.border_top,
          right: pageStyles.border_right,
          bottom: pageStyles.border_bottom,
          left: pageStyles.border_left,
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
