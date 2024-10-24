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


module.exports = {
  loginUser
};
