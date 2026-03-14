import pool from '../config/db.js';

export const getAllContenidoPaginas = async () => {
  const [rows] = await pool.query('SELECT * FROM contenido_paginas ORDER BY ultima_actualizacion DESC');
  return rows;
};

export const getContenidoPaginaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM contenido_paginas WHERE id=?', [id]);
  return rows[0];
};

export const createContenidoPagina = async (data) => {
  const { titulo, pagina, contenido } = data;
  const [result] = await pool.query(
    'INSERT INTO contenido_paginas (titulo, pagina, contenido) VALUES (?, ?, ?)',
    [titulo, pagina, contenido]
  );
  return result;
};

export const updateContenidoPagina = async (id, data) => {
  const { titulo, pagina, contenido } = data;
  const [result] = await pool.query(
    'UPDATE contenido_paginas SET titulo=?, pagina=?, contenido=?, ultima_actualizacion=NOW() WHERE id=?',
    [titulo, pagina, contenido, id]
  );
  return result;
};

export const deleteContenidoPagina = async (id) => {
  const [result] = await pool.query('DELETE FROM contenido_paginas WHERE id=?', [id]);
  return result;
};