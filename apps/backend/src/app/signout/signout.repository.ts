import { client } from '../Utils/DB/db';

const deleteRefreshToken = async (userId: number) => {
  try {
    const res = await client.query(
      //put null in refresh_token if its not null already
      `UPDATE users SET refresh_token = NULL WHERE id = '${userId}' AND refresh_token IS NOT NULL`
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export { deleteRefreshToken };
