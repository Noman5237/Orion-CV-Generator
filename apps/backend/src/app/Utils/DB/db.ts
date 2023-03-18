import { ConfigService } from '@nestjs/config/dist';
import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: '5432',
  database: 'backend',
  user: 'admin@orion.org',
  password: 'a925617886e8799cc5be05aee17f9b70fa3e91370a471e06c21277c10804d0dc',
});
client
  .connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to database', err);
  });

export { client };
