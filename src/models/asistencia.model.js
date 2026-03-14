import pool from '../config/db.js';

export const getAllAsistencias = async () => {
  const [rows] = await pool.query(`
    SELECT a.*, 
           e.nombre, e.apellido_paterno, e.apellido_materno,
           e.departamento, e.puesto, e.sucursal
    FROM asistencia a
    LEFT JOIN empleado e ON a.id_empleado = e.id_empleado
    ORDER BY a.fecha DESC, a.hora_entrada DESC
  `);
  return rows;
};

export const getAsistenciaById = async (id) => {
  const [rows] = await pool.query(`
    SELECT a.*, 
           e.nombre, e.apellido_paterno, e.apellido_materno,
           e.departamento, e.puesto, e.sucursal
    FROM asistencia a
    LEFT JOIN empleado e ON a.id_empleado = e.id_empleado
    WHERE a.id_asistencia = ?
  `, [id]);
  return rows[0];
};

export const getAsistenciasByEmpleado = async (id_empleado) => {
  const [rows] = await pool.query(`
    SELECT * FROM asistencia 
    WHERE id_empleado = ?
    ORDER BY fecha DESC
  `, [id_empleado]);
  return rows;
};

export const getAsistenciasByFecha = async (fecha) => {
  const [rows] = await pool.query(`
    SELECT a.*, e.nombre, e.apellido_paterno, e.departamento, e.puesto, e.sucursal
    FROM asistencia a
    LEFT JOIN empleado e ON a.id_empleado = e.id_empleado
    WHERE a.fecha = ?
    ORDER BY a.hora_entrada ASC
  `, [fecha]);
  return rows;
};

export const registrarEntrada = async (data) => {
  const { id_empleado, fecha, hora_entrada, ubicacion, observaciones } = data;
  const [result] = await pool.query(
    `INSERT INTO asistencia (id_empleado, fecha, hora_entrada, ubicacion, observaciones)
     VALUES (?, ?, ?, ?, ?)`,
    [id_empleado, fecha, hora_entrada, ubicacion, observaciones]
  );
  return result;
};

export const registrarSalida = async (id, hora_salida) => {
  const [result] = await pool.query(
    `UPDATE asistencia SET hora_salida = ? WHERE id_asistencia = ?`,
    [hora_salida, id]
  );
  return result;
};

export const updateAsistencia = async (id, data) => {
  const { fecha, hora_entrada, hora_salida, ubicacion, observaciones } = data;
  const [result] = await pool.query(
    `UPDATE asistencia SET fecha=?, hora_entrada=?, hora_salida=?, ubicacion=?, observaciones=?
     WHERE id_asistencia=?`,
    [fecha, hora_entrada, hora_salida, ubicacion, observaciones, id]
  );
  return result;
};

export const deleteAsistencia = async (id) => {
  const [result] = await pool.query('DELETE FROM asistencia WHERE id_asistencia=?', [id]);
  return result;
};
