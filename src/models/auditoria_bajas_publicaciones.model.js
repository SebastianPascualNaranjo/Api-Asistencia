import pool from '../config/db.js';

export const getAllAuditoriaBajasPublicaciones = async () => {
  const [rows] = await pool.query('SELECT * FROM auditoria_bajas_publicaciones ORDER BY fecha_baja DESC');
  return rows;
};

export const getAuditoriaBajaPublicacionById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM auditoria_bajas_publicaciones WHERE id=?', [id]);
  return rows[0];
};

export const createAuditoriaBajaPublicacion = async (data) => {
  const { id_publicacion, motivo, fecha_baja, id_admin } = data;
  const [result] = await pool.query(
    'INSERT INTO auditoria_bajas_publicaciones (id_publicacion, motivo, fecha_baja, id_admin) VALUES (?, ?, ?, ?)',
    [id_publicacion, motivo, fecha_baja || new Date(), id_admin]
  );
  return result;
};

export const deleteAuditoriaBajaPublicacion = async (id) => {
  const [result] = await pool.query('DELETE FROM auditoria_bajas_publicaciones WHERE id=?', [id]);
  return result;
};
