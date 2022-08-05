import { db } from '../database/db';
import { User } from '../models/useModel';

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = 'SELECT uuid, username FROM application_user;';

    const result = await db.query<User>(query);

    const rows = result.rows;

    return rows || [];
  }
}

export default new UserRepository();
