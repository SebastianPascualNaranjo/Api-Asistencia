import pool from '../config/db.js';

export const getAllAsistencias = async () => {
  const [rows] = await pool.query(`
    SELECT * FROM asistencia ORDER BY FECHA DESC
  `);
  return rows;
};

export const getAsistenciaById = async (id) => {
  const [rows] = await pool.query(`
    SELECT * FROM asistencia WHERE \`ID-ASISTENCIA\` = ?
  `, [id]);
  return rows[0];
};

export const getAsistenciasByTrabajador = async (num_trabajador) => {
  const [rows] = await pool.query(`
    SELECT * FROM asistencia WHERE \`NUM-TRABAJADOR\` = ? ORDER BY FECHA DESC
  `, [num_trabajador]);
  return rows;
};

export const getAsistenciasByFecha = async (fecha) => {
  const [rows] = await pool.query(`
    SELECT * FROM asistencia WHERE FECHA = ? ORDER BY ENTRADA ASC
  `, [fecha]);
  return rows;
};

export const registrarEntrada = async (data) => {
  const { NUM_TRABAJADOR, ID_HORARIO, FECHA, ENTRADA } = data;
  const [result] = await pool.query(
    `INSERT INTO asistencia (\`NUM-TRABAJADOR\`, \`ID-HORARIO\`, FECHA, ENTRADA)
     VALUES (?, ?, ?, ?)`,
    [NUM_TRABAJADOR, ID_HORARIO, FECHA, ENTRADA]
  );
  return result;
};

export const registrarSalida = async (id, SALIDA) => {
  const [result] = await pool.query(
    `UPDATE asistencia SET SALIDA = ? WHERE \`ID-ASISTENCIA\` = ?`,
    [SALIDA, id]
  );
  return result;
};

export const updateAsistencia = async (id, data) => {
  const { NUM_TRABAJADOR, ID_HORARIO, FECHA, ENTRADA, SALIDA, ID_INCIDENCIA } = data;
  const [result] = await pool.query(
    `UPDATE asistencia SET 
     \`NUM-TRABAJADOR\`=?, \`ID-HORARIO\`=?, FECHA=?, ENTRADA=?, SALIDA=?, \`ID-INCIDENCIA\`=?
     WHERE \`ID-ASISTENCIA\`=?`,
    [NUM_TRABAJADOR, ID_HORARIO, FECHA, ENTRADA, SALIDA, ID_INCIDENCIA, id]
  );
  return result;
};

export const deleteAsistencia = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM asistencia WHERE \`ID-ASISTENCIA\`=?`, [id]
  );
  return result;
};