import pool from '../config/db.js';

export const getAllContenidoPaginas = async () => {
  const [rows] = await pool.query('SELECT * FROM contenido_paginas ORDER BY fecha_actualizacion DESC');
  return rows;
};

export const getContenidoPaginaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM contenido_paginas WHERE id_pagina=?', [id]);
  return rows[0];
};

export const createContenidoPagina = async (data) => {
  const { nombre_pagina, seccion, contenido, fecha_actualizacion } = data;
  const [result] = await pool.query(
    'INSERT INTO contenido_paginas (nombre_pagina, seccion, contenido, fecha_actualizacion) VALUES (?, ?, ?, ?)',
    [nombre_pagina, seccion, contenido, fecha_actualizacion || new Date()]
  );
  return result;
};

export const updateContenidoPagina = async (id, data) => {
  const { nombre_pagina, seccion, contenido } = data;
  const [result] = await pool.query(
    'UPDATE contenido_paginas SET nombre_pagina=?, seccion=?, contenido=?, fecha_actualizacion=NOW() WHERE id_pagina=?',
    [nombre_pagina, seccion, contenido, id]
  );
  return result;
};

export const deleteContenidoPagina = async (id) => {
  const [result] = await pool.query('DELETE FROM contenido_paginas WHERE id_pagina=?', [id]);
  return result;
};
