import { Pool } from 'pg';
import { CONNECTION_DATABASE } from '../environments';

const connectionString = CONNECTION_DATABASE;

export const db = new Pool({ connectionString });
