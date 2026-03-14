import pool from '../config/db.js';

export const getAllHorarios = async () => {
  const [rows] = await pool.query(`
    SELECT h.*, e.nombre, e.apellido_paterno, e.departamento
    FROM horario h
    LEFT JOIN empleado e ON h.id_empleado = e.id_empleado
  `);
  return rows;
};

export const getHorarioById = async (id) => {
  const [rows] = await pool.query(`
    SELECT h.*, e.nombre, e.apellido_paterno, e.departamento
    FROM horario h
    LEFT JOIN empleado e ON h.id_empleado = e.id_empleado
    WHERE h.id_horario = ?
  `, [id]);
  return rows[0];
};

export const getHorarioByEmpleado = async (id_empleado) => {
  const [rows] = await pool.query(
    'SELECT * FROM horario WHERE id_empleado=?', [id_empleado]
  );
  return rows;
};

export const createHorario = async (data) => {
  const { id_empleado, dia_semana, hora_entrada, hora_salida } = data;
  const [result] = await pool.query(
    'INSERT INTO horario (id_empleado, dia_semana, hora_entrada, hora_salida) VALUES (?, ?, ?, ?)',
    [id_empleado, dia_semana, hora_entrada, hora_salida]
  );
  return result;
};

export const updateHorario = async (id, data) => {
  const { dia_semana, hora_entrada, hora_salida } = data;
  const [result] = await pool.query(
    'UPDATE horario SET dia_semana=?, hora_entrada=?, hora_salida=? WHERE id_horario=?',
    [dia_semana, hora_entrada, hora_salida, id]
  );
  return result;
};

export const deleteHorario = async (id) => {
  const [result] = await pool.query('DELETE FROM horario WHERE id_horario=?', [id]);
  return result;
};
