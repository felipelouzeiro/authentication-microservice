import { Pool } from 'pg';
import { environment } from '../environments';

const connectionString = environment.CONNECTION_DATABASE;

export const db = new Pool({ connectionString });
