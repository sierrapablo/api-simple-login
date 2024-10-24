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


module.exports = {
  findUserByUsername
};
