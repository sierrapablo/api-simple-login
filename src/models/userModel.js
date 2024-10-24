const pool = require('../config/database');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


let queryByUsernameSQL;
try {
  queryByUsernameSQL = fs.readFileSync(
    path.join(__dirname, `../sql/${process.env.BY_USERNAME_SQL}`),
    'utf8'
  );
} catch (error) {
  console.error(`Error reading SQL file: ${error.message}`);
  throw new Error('Failed to load SQL query');
}

const findUserByUsername = async (username) => {
  try {
    const result = await pool.query(queryByUsernameSQL, [username]);
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Database query error: ${error.message}`);
    throw new Error('Database query failed');
  }
};


let queryByEmailSQL;
try {
  queryByEmailSQL = fs.readFileSync(
    path.join(__dirname, `../sql/${process.env.BY_EMAIL_SQL}`),
    'utf8'
  );
} catch (error) {
  console.error(`Error reading SQL file: ${error.message}`);
  throw new Error('Failed to load SQL query');
}

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(queryByEmailSQL, [email]);
    return result.rows[0] || null;
  } catch (error){
    console.error(`Database query error: ${error.message}`);
    throw new Error('Database query failed');
  }
};


let queryCreateUser;
try {
  queryCreateUser = fs.readFileSync(
    path.join(__dirname, `../sql/${process.env.CREATE_USER_SQL}`),
    'utf8'
  );
} catch (error) {
  console.error(`Error reading SQL file: ${error.message}`);
  throw new Error('Failed to load SQL query');
}

const createUser = async (userData) => {
  const { 
    first_name, last_name_1, last_name_2,
    username, user_password, email
  } = userData;

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);

    const values = [
      first_name, last_name_1, last_name_2, username, hashedPassword, email
    ];
    
    await pool.query(queryCreateUser, values);

  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};


module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser
};
