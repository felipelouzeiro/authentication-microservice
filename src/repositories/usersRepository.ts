import { db } from '../database/db';
import { User } from '../models/useModel';

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = 'SELECT uuid, username FROM application_user;';

    const { rows } = await db.query<User>(query);

    return rows || [];
  }

  async findById(uuid: string): Promise<User> {
    const query =
      'SELECT uuid, username FROM application_user WHERE uuid = $1;';

    const values = [uuid];
    const { rows } = await db.query<User>(query, values);

    return rows[0];
  }
}

export default new UserRepository();
