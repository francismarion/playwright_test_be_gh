import { Client } from 'pg';

export const db = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'test123',
  database: 'user',
});

export async function connectDB() {
  await db.connect();
  console.log('Connected to PostgreSQL');
}