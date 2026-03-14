import pool from '../config/db.js';

export const getAllEstados = async () => {
  const [rows] = await pool.query('SELECT * FROM estado');
  return rows;
};

export const getEstadoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM estado WHERE id_estado=?', [id]);
  return rows[0];
};

export const createEstado = async (data) => {
  const { nombre_estado, descripcion } = data;
  const [result] = await pool.query(
    'INSERT INTO estado (nombre_estado, descripcion) VALUES (?, ?)',
    [nombre_estado, descripcion]
  );
  return result;
};

export const updateEstado = async (id, data) => {
  const { nombre_estado, descripcion } = data;
  const [result] = await pool.query(
    'UPDATE estado SET nombre_estado=?, descripcion=? WHERE id_estado=?',
    [nombre_estado, descripcion, id]
  );
  return result;
};

export const deleteEstado = async (id) => {
  const [result] = await pool.query('DELETE FROM estado WHERE id_estado=?', [id]);
  return result;
};
