const pool = require('../config/database');


const findUserByUsername = async (username) => {
  const query = 'SELECT * FROM public.user_list WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0] || null;
};


module.exports = {
    findUserByUsername
  };