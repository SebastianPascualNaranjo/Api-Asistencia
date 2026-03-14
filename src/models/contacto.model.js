import pool from '../config/db.js';

export const getAllContactos = async () => {
  const [rows] = await pool.query('SELECT * FROM contacto');
  return rows;
};

export const getContactoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM contacto WHERE id_contacto=?', [id]);
  return rows[0];
};

export const createContacto = async (data) => {
  const { nombre, correo, telefono, mensaje, fecha } = data;
  const [result] = await pool.query(
    'INSERT INTO contacto (nombre, correo, telefono, mensaje, fecha) VALUES (?, ?, ?, ?, ?)',
    [nombre, correo, telefono, mensaje, fecha || new Date()]
  );
  return result;
};

export const updateContacto = async (id, data) => {
  const { nombre, correo, telefono, mensaje } = data;
  const [result] = await pool.query(
    'UPDATE contacto SET nombre=?, correo=?, telefono=?, mensaje=? WHERE id_contacto=?',
    [nombre, correo, telefono, mensaje, id]
  );
  return result;
};

export const deleteContacto = async (id) => {
  const [result] = await pool.query('DELETE FROM contacto WHERE id_contacto=?', [id]);
  return result;
};
