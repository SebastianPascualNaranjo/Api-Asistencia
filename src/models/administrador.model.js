import pool from '../config/db.js';

export const findAdminByUsuario = async (usuario) => {
  const [rows] = await pool.query('SELECT * FROM administrador WHERE usuario = ?', [usuario]);
  return rows[0];
};

export const getAllAdmins = async () => {
  const [rows] = await pool.query('SELECT id_admin, nombre, usuario, correo FROM administrador');
  return rows;
};

export const createAdmin = async (data) => {
  const { nombre, usuario, password, correo } = data;
  const [result] = await pool.query(
    'INSERT INTO administrador (nombre, usuario, password, correo) VALUES (?, ?, ?, ?)',
    [nombre, usuario, password, correo]
  );
  return result;
};

export const updateAdmin = async (id, data) => {
  const { nombre, usuario, correo } = data;
  const [result] = await pool.query(
    'UPDATE administrador SET nombre=?, usuario=?, correo=? WHERE id_admin=?',
    [nombre, usuario, correo, id]
  );
  return result;
};

export const deleteAdmin = async (id) => {
  const [result] = await pool.query('DELETE FROM administrador WHERE id_admin=?', [id]);
  return result;
};
