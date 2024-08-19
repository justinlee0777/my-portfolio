import type { Connection } from 'mysql';

export default async function sendMySQLQuery<ResultType = void>(
  connection: Connection,
  query: string
): Promise<ResultType> {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results: ResultType) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
