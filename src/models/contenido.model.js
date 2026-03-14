import pool from '../config/db.js';

export const getAllContenido = async () => {
  const [rows] = await pool.query('SELECT * FROM contenido ORDER BY fecha_creacion DESC');
  return rows;
};

export const getContenidoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM contenido WHERE id_contenido=?', [id]);
  return rows[0];
};

export const createContenido = async (data) => {
  const { titulo, cuerpo, tipo, fecha_creacion, id_admin } = data;
  const [result] = await pool.query(
    'INSERT INTO contenido (titulo, cuerpo, tipo, fecha_creacion, id_admin) VALUES (?, ?, ?, ?, ?)',
    [titulo, cuerpo, tipo, fecha_creacion || new Date(), id_admin]
  );
  return result;
};

export const updateContenido = async (id, data) => {
  const { titulo, cuerpo, tipo } = data;
  const [result] = await pool.query(
    'UPDATE contenido SET titulo=?, cuerpo=?, tipo=? WHERE id_contenido=?',
    [titulo, cuerpo, tipo, id]
  );
  return result;
};

export const deleteContenido = async (id) => {
  const [result] = await pool.query('DELETE FROM contenido WHERE id_contenido=?', [id]);
  return result;
};
