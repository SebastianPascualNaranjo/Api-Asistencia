import pool from '../config/db.js';

export const getAllHistorial = async () => {
  const [rows] = await pool.query('SELECT * FROM historial_contenido_paginas ORDER BY fecha_cambio DESC');
  return rows;
};

export const getHistorialById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM historial_contenido_paginas WHERE id_historial=?', [id]);
  return rows[0];
};

export const getHistorialByPagina = async (id_pagina) => {
  const [rows] = await pool.query(
    'SELECT * FROM historial_contenido_paginas WHERE id_pagina=? ORDER BY fecha_cambio DESC',
    [id_pagina]
  );
  return rows;
};

export const createHistorial = async (data) => {
  const { id_pagina, contenido_anterior, contenido_nuevo, id_admin, fecha_cambio } = data;
  const [result] = await pool.query(
    `INSERT INTO historial_contenido_paginas 
     (id_pagina, contenido_anterior, contenido_nuevo, id_admin, fecha_cambio) VALUES (?, ?, ?, ?, ?)`,
    [id_pagina, contenido_anterior, contenido_nuevo, id_admin, fecha_cambio || new Date()]
  );
  return result;
};

export const deleteHistorial = async (id) => {
  const [result] = await pool.query('DELETE FROM historial_contenido_paginas WHERE id_historial=?', [id]);
  return result;
};
