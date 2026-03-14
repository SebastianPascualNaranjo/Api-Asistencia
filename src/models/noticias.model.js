import pool from '../config/db.js';

export const getAllNoticias = async () => {
  const [rows] = await pool.query('SELECT * FROM noticias ORDER BY fecha_publicacion DESC');
  return rows;
};

export const getNoticiaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM noticias WHERE id_noticia=?', [id]);
  return rows[0];
};

export const createNoticia = async (data) => {
  const { titulo, contenido, imagen_url, fecha_publicacion, id_admin } = data;
  const [result] = await pool.query(
    'INSERT INTO noticias (titulo, contenido, imagen_url, fecha_publicacion, id_admin) VALUES (?, ?, ?, ?, ?)',
    [titulo, contenido, imagen_url, fecha_publicacion || new Date(), id_admin]
  );
  return result;
};

export const updateNoticia = async (id, data) => {
  const { titulo, contenido, imagen_url } = data;
  const [result] = await pool.query(
    'UPDATE noticias SET titulo=?, contenido=?, imagen_url=? WHERE id_noticia=?',
    [titulo, contenido, imagen_url, id]
  );
  return result;
};

export const deleteNoticia = async (id) => {
  const [result] = await pool.query('DELETE FROM noticias WHERE id_noticia=?', [id]);
  return result;
};
