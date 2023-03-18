import { GoogleUserDetails } from './signin/types/GoogleUserDetails';
import { client } from '../Utils/DB/db';

const getAccount = async (email: string) => {
  const res = await client.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  return res.rows[0];
};

const updateRefreshToken = async (userId: number, rt: string) => {
  try {
    const res = await client.query(
      `UPDATE users SET refresh_token = '${rt}' WHERE id = '${userId}'`
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAccountId = async (userId: number) => {
  try {
    const res = await client.query(
      `SELECT * FROM users WHERE id = '${userId}'`
    );
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createGoogleAccount = async (user: GoogleUserDetails) => {
  try {
    const id = await client.query(
      `INSERT INTO users (first_name,last_name,email, oauth_id,is_oauth) VALUES ('${user.first_name}','${user.last_name}','${user.email}', '${user.oauth_id}','true') RETURNING id`
    );

    return id.rows[0].id;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { getAccount, updateRefreshToken, getAccountId, createGoogleAccount };
