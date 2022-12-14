import { db } from '../database/db';
import { environment } from '../environments';
import DatabaseError from '../models/errors/database.error.model';
import { User } from '../models/useModel';

const { DATABASE_ENCRYPTION_KEY } = environment;
class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `SELECT uuid, username FROM application_user;`;

    const { rows } = await db.query<User>(query);

    return rows || [];
  }

  async findById(uuid: string): Promise<User> {
    try {
      const query = `SELECT uuid, username FROM application_user WHERE uuid = $1;`;

      const values = [uuid];
      const { rows } = await db.query<User>(query, values);

      return rows[0];
    } catch (error) {
      throw new DatabaseError('Error na consulta por ID', error);
    }
  }

  async create(user: User): Promise<string> {
    const query = `INSERT INTO application_user (username, password) VALUES ($1, crypt($2, $3)) RETURNING uuid;`;

    const values = [user.username, user.password, DATABASE_ENCRYPTION_KEY];
    const { rows } = await db.query<{ uuid: string }>(query, values);

    return rows[0].uuid;
  }

  async update(user: User): Promise<void> {
    const query = `UPDATE application_user SET username = $1, password = crypt($2, $3) WHERE uuid = $4;`;

    const values = [
      user.username,
      user.password,
      DATABASE_ENCRYPTION_KEY,
      user.uuid,
    ];

    await db.query(query, values);
  }

  async removeById(uuid: string): Promise<void> {
    const query = `DELETE FROM application_user WHERE uuid = $1;`;

    const values = [uuid];
    await db.query(query, values);
  }

  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const query = `SELECT uuid, username FROM application_user WHERE username = $1 AND password = crypt($2, $3);`;

      const values = [username, password, DATABASE_ENCRYPTION_KEY];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user || null;
    } catch (error) {
      throw new DatabaseError(
        'Erro na consulta por username e password',
        error
      );
    }
  }
}

export default new UserRepository();
