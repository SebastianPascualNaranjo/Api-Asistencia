import pool from '../config/db.js';

export const getAllIncidencias = async () => {
  const [rows] = await pool.query(`
    SELECT i.*, e.nombre, e.apellido_paterno, e.departamento, e.puesto
    FROM incidencias i
    LEFT JOIN empleado e ON i.id_empleado = e.id_empleado
    ORDER BY i.fecha DESC
  `);
  return rows;
};

export const getIncidenciaById = async (id) => {
  const [rows] = await pool.query(`
    SELECT i.*, e.nombre, e.apellido_paterno, e.departamento
    FROM incidencias i
    LEFT JOIN empleado e ON i.id_empleado = e.id_empleado
    WHERE i.id_incidencia = ?
  `, [id]);
  return rows[0];
};

export const getIncidenciasByEmpleado = async (id_empleado) => {
  const [rows] = await pool.query(
    'SELECT * FROM incidencias WHERE id_empleado=? ORDER BY fecha DESC', [id_empleado]
  );
  return rows;
};

export const createIncidencia = async (data) => {
  const { id_empleado, tipo, descripcion, fecha, estatus } = data;
  const [result] = await pool.query(
    'INSERT INTO incidencias (id_empleado, tipo, descripcion, fecha, estatus) VALUES (?, ?, ?, ?, ?)',
    [id_empleado, tipo, descripcion, fecha, estatus || 'pendiente']
  );
  return result;
};

export const updateIncidencia = async (id, data) => {
  const { tipo, descripcion, fecha, estatus } = data;
  const [result] = await pool.query(
    'UPDATE incidencias SET tipo=?, descripcion=?, fecha=?, estatus=? WHERE id_incidencia=?',
    [tipo, descripcion, fecha, estatus, id]
  );
  return result;
};

export const deleteIncidencia = async (id) => {
  const [result] = await pool.query('DELETE FROM incidencias WHERE id_incidencia=?', [id]);
  return result;
};
