import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findAdminByUsuario, createAdmin } from '../models/administrador.model.js';
dotenv.config();

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    if (!usuario || !password)
      return res.status(400).json({ ok: false, message: 'Usuario y contraseña son requeridos' });

    const admin = await findAdminByUsuario(usuario);
    if (!admin)
      return res.status(401).json({ ok: false, message: 'Credenciales incorrectas' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return res.status(401).json({ ok: false, message: 'Credenciales incorrectas' });

    const token = jwt.sign(
      { id: admin.id_admin, usuario: admin.usuario, rol: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({ ok: true, token, admin: { id: admin.id_admin, nombre: admin.nombre, usuario: admin.usuario, correo: admin.correo } });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { nombre, usuario, password, correo } = req.body;
    if (!nombre || !usuario || !password || !correo)
      return res.status(400).json({ ok: false, message: 'Todos los campos son requeridos' });

    const existe = await findAdminByUsuario(usuario);
    if (existe)
      return res.status(409).json({ ok: false, message: 'El usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);
    await createAdmin({ nombre, usuario, password: hash, correo });
    res.status(201).json({ ok: true, message: 'Administrador registrado correctamente' });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
