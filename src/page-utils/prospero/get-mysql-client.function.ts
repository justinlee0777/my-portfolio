import type { Connection } from 'mysql';
import { createConnection } from 'mysql';

export default function getMySQLClient(): Connection {
  return createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    port: Number(process.env.RDS_PORT),
  });
}
