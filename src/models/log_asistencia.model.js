import pool from '../config/db.js';

export const getAllLogs = async () => {
  const [rows] = await pool.query(`
    SELECT l.*, e.nombre, e.apellido_paterno
    FROM log_asistencia l
    LEFT JOIN empleado e ON l.id_empleado = e.id_empleado
    ORDER BY l.fecha_hora DESC
  `);
  return rows;
};

export const getLogById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM log_asistencia WHERE id_log=?', [id]);
  return rows[0];
};

export const getLogsByEmpleado = async (id_empleado) => {
  const [rows] = await pool.query(
    'SELECT * FROM log_asistencia WHERE id_empleado=? ORDER BY fecha_hora DESC', [id_empleado]
  );
  return rows;
};

export const createLog = async (data) => {
  const { id_empleado, accion, descripcion, fecha_hora } = data;
  const [result] = await pool.query(
    'INSERT INTO log_asistencia (id_empleado, accion, descripcion, fecha_hora) VALUES (?, ?, ?, ?)',
    [id_empleado, accion, descripcion, fecha_hora || new Date()]
  );
  return result;
};

export const deleteLog = async (id) => {
  const [result] = await pool.query('DELETE FROM log_asistencia WHERE id_log=?', [id]);
  return result;
};
