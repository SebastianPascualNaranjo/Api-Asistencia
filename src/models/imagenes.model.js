import pool from '../config/db.js';

export const getAllImagenes = async () => {
  const [rows] = await pool.query('SELECT * FROM imagenes ORDER BY fecha_subida DESC');
  return rows;
};

export const getImagenById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM imagenes WHERE id_imagen=?', [id]);
  return rows[0];
};

export const createImagen = async (data) => {
  const { nombre, url, tipo, referencia_id, referencia_tabla, fecha_subida } = data;
  const [result] = await pool.query(
    `INSERT INTO imagenes (nombre, url, tipo, referencia_id, referencia_tabla, fecha_subida) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, url, tipo, referencia_id, referencia_tabla, fecha_subida || new Date()]
  );
  return result;
};

export const updateImagen = async (id, data) => {
  const { nombre, url, tipo } = data;
  const [result] = await pool.query(
    'UPDATE imagenes SET nombre=?, url=?, tipo=? WHERE id_imagen=?',
    [nombre, url, tipo, id]
  );
  return result;
};

export const deleteImagen = async (id) => {
  const [result] = await pool.query('DELETE FROM imagenes WHERE id_imagen=?', [id]);
  return result;
};
