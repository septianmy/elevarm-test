import { Pool } from 'pg';
import 'dotenv/config';

const dbPort: number = parseInt(process.env.DB_PORT || '5432');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: dbPort, // Default PostgreSQL port
});

export default pool;