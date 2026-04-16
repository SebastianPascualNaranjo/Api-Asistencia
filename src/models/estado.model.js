import pool from '../config/db.js';

// Obtener todos los estados
export const getAllEstados = async () => {
  const [rows] = await pool.query('SELECT * FROM estado');
  return rows;
};

// Obtener estado por ID
export const getEstadoById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM estado WHERE id_estado = ?',
    [id]
  );
  return rows[0];
};

// Crear nuevo estado
export const createEstado = async (data) => {
  const { num_trabajador, fecha, estatus } = data;

  const [result] = await pool.query(
    `INSERT INTO estado (num_trabajador, fecha, estatus)
     VALUES (?, ?, ?)`,
    [num_trabajador, fecha, estatus]
  );

  return result;
};

// Actualizar estado
export const updateEstado = async (id, data) => {
  const { num_trabajador, fecha, estatus } = data;

  const [result] = await pool.query(
    `UPDATE estado
     SET num_trabajador = ?, fecha = ?, estatus = ?
     WHERE id_estado = ?`,
    [num_trabajador, fecha, estatus, id]
  );

  return result;
};

// Eliminar estado
export const deleteEstado = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM estado WHERE id_estado = ?',
    [id]
  );

  return result;
};