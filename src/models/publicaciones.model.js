import pool from '../config/db.js';

export const getAllPublicaciones = async () => {
  const [rows] = await pool.query('SELECT * FROM publicaciones ORDER BY fecha_publicacion DESC');
  return rows;
};

export const getPublicacionById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM publicaciones WHERE id_publicacion=?', [id]);
  return rows[0];
};

export const createPublicacion = async (data) => {
  const { titulo, descripcion, imagen_url, tipo, fecha_publicacion, id_admin } = data;
  const [result] = await pool.query(
    `INSERT INTO publicaciones (titulo, descripcion, imagen_url, tipo, fecha_publicacion, id_admin) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [titulo, descripcion, imagen_url, tipo, fecha_publicacion || new Date(), id_admin]
  );
  return result;
};

export const updatePublicacion = async (id, data) => {
  const { titulo, descripcion, imagen_url, tipo } = data;
  const [result] = await pool.query(
    'UPDATE publicaciones SET titulo=?, descripcion=?, imagen_url=?, tipo=? WHERE id_publicacion=?',
    [titulo, descripcion, imagen_url, tipo, id]
  );
  return result;
};

export const deletePublicacion = async (id) => {
  const [result] = await pool.query('DELETE FROM publicaciones WHERE id_publicacion=?', [id]);
  return result;
};
