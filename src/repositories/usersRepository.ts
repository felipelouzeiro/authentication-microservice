import { db } from '../database/db';
import { DATABASE_ENCRYPTION_KEY } from '../environments';
import { User } from '../models/useModel';

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `SELECT uuid, username FROM application_user;`;

    const { rows } = await db.query<User>(query);

    return rows || [];
  }

  async findById(uuid: string): Promise<User> {
    const query = `SELECT uuid, username FROM application_user WHERE uuid = $1;`;

    const values = [uuid];
    const { rows } = await db.query<User>(query, values);

    return rows[0];
  }

  async create(user: User): Promise<string> {
    const query = `INSERT INTO application_user (username, password) VALUES ($1, crypt($2, $3)) RETURNING uuid;`;

    const values = [user.username, user.password, DATABASE_ENCRYPTION_KEY];
    const { rows } = await db.query<{ uuid: string }>(query, values);

    return rows[0].uuid;
  }
}

export default new UserRepository();
