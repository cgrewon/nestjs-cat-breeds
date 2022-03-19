const type = process.env.DB_TYPE;
const host = process.env.DB_HOST;
const port = parseInt(process.env.DB_PORT);
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

export const TYPEORM_CONF = {
  type: type,
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  autoLoadEntities: true,
  entities: ['src/**/entities/*.entity{ .ts,.js}'],
  synchronize: true,
};
