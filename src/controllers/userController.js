const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');


const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login request received: ${username}`);

  try {
    const user = await userModel.findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.user_password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (!user.verified) {
      return res.status(403).json(
        { 
          message:
          'Usuario sin verificar. Un administrador te validará pronto.' 
        }
      );
    }
    console.log(`User ${username} logged in successfully.`);
    return res.status(200).json(
      {
         message: '¡Acceso correcto!',
         user_id: user.id 
      }
    );
  } catch (error) {
    console.error('Error durante el acceso:', error.message);
    return res.status(500).json({ message: 'Error durante el acceso' });
  }
};


const registerUser = async (req, res) => {
  const { 
    first_name, last_name_1, last_name_2,
    username, user_password, email 
  } = req.body;

  try {
    const existingUserByUsername = await userModel.findUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json(
        { message: 'El nombre de usuario ya existe.' }
      );
    }

    const existingUserByEmail = await userModel.findUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json(
        { message: 'El correo electrónico ya está registrado.' }
      );
    }

    await userModel.createUser({
      first_name,
      last_name_1,
      last_name_2: last_name_2 || null,
      username,
      user_password,
      email,
    });

    return res.status(201).json({ message: 'Usuario registrado con éxito.' });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    return res.status(500).json(
      { message: 'Error en el servidor al registrar usuario.' }
    );
  }
};


module.exports = {
  loginUser,
  registerUser
};
