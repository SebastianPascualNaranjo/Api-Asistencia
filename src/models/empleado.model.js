import pool from '../config/db.js';

export const getAllEmpleados = async () => {
  const [rows] = await pool.query(`SELECT * FROM empleado`);
  return rows;
};

export const getEmpleadoById = async (id) => {
  const [rows] = await pool.query(`
    SELECT * FROM empleado WHERE id_empleado = ?
  `, [id]);
  return rows[0];
};

export const createEmpleado = async (data) => {
  const { NOMBRE, 'A-PATERNO': aPaterno, 'A-MATERNO': aMaterno, CURP, 
          DEPARTAMENTO, PUESTO, pws } = data;
  const [result] = await pool.query(
    `INSERT INTO empleado (NOMBRE, \`A-PATERNO\`, \`A-MATERNO\`, CURP, DEPARTAMENTO, PUESTO, pws)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [NOMBRE, aPaterno, aMaterno, CURP, DEPARTAMENTO, PUESTO, pws]
  );
  return result;
};

export const updateEmpleado = async (id, data) => {
  const { NOMBRE, 'A-PATERNO': aPaterno, 'A-MATERNO': aMaterno, CURP,
          DEPARTAMENTO, PUESTO, pws } = data;
  const [result] = await pool.query(
    `UPDATE empleado SET NOMBRE=?, \`A-PATERNO\`=?, \`A-MATERNO\`=?, CURP=?, 
     DEPARTAMENTO=?, PUESTO=?, pws=? WHERE \`ID-EMPLEADO\`=?`,
    [NOMBRE, aPaterno, aMaterno, CURP, DEPARTAMENTO, PUESTO, pws, id]
  );
  return result;
};

export const deleteEmpleado = async (id) => {
  const [result] = await pool.query('DELETE FROM empleado WHERE id_empleado=?', [id]);
  return result;
};
