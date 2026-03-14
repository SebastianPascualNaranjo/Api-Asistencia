import pool from '../config/db.js';

export const getAllAuditoriaBajas = async () => {
  const [rows] = await pool.query('SELECT * FROM auditoria_bajas ORDER BY fecha_baja DESC');
  return rows;
};

export const getAuditoriaBajaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM auditoria_bajas WHERE id=?', [id]);
  return rows[0];
};

export const createAuditoriaBaja = async (data) => {
  const { tabla_afectada, id_registro, motivo, fecha_baja, id_admin } = data;
  const [result] = await pool.query(
    'INSERT INTO auditoria_bajas (tabla_afectada, id_registro, motivo, fecha_baja, id_admin) VALUES (?, ?, ?, ?, ?)',
    [tabla_afectada, id_registro, motivo, fecha_baja || new Date(), id_admin]
  );
  return result;
};

export const deleteAuditoriaBaja = async (id) => {
  const [result] = await pool.query('DELETE FROM auditoria_bajas WHERE id=?', [id]);
  return result;
};
