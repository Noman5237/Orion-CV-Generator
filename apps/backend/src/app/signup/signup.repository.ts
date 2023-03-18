import { Type } from 'class-transformer';
import { AddressDto } from './signup/dtos/signupAddress.dto';

import { client } from '../Utils/DB/db';

const getUserByEmail = async (email: string) => {
  const res = await client.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  return res.rows[0];
};

const createAccount = async (
  first_name: string,
  last_name: string,
  user_address: AddressDto,
  email: string,
  password: string
) => {
  try {
    const id = await client.query(
      `INSERT INTO users (first_name,last_name,email, password) VALUES ('${first_name}','${last_name}','${email}', '${password}') RETURNING id`
    );

    const res = createAddress(id.rows[0].id, user_address);
    if (res) {
      return id.rows[0].id;
    } else {
      deleteUser(id.rows[0].id);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createAddress = async (user_id: number, user_address: AddressDto) => {
  const { address, city, state, zip_code, country } = user_address;

  try {
    const res = await client.query(
      `INSERT INTO address (user_id, address, city, state, zip_code, country) VALUES ('${user_id}','${address}','${city}','${state}','${zip_code}','${country}')`
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteUser = async (id: number) => {
  try {
    const res = await client.query(`DELETE FROM users WHERE id = '${id}'`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
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

export { createAccount, getUserByEmail, updateRefreshToken };
