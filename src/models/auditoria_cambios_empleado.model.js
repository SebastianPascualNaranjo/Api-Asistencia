import pool from '../config/db.js';

export const getAllAuditoriaCambios = async () => {
  const [rows] = await pool.query(`
    SELECT ac.*, e.nombre, e.apellido_paterno
    FROM auditoria_cambios_empleado ac
    LEFT JOIN empleado e ON ac.id_empleado = e.id_empleado
    ORDER BY ac.fecha_cambio DESC
  `);
  return rows;
};

export const getAuditoriaCambioById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM auditoria_cambios_empleado WHERE id=?', [id]);
  return rows[0];
};

export const getCambiosByEmpleado = async (id_empleado) => {
  const [rows] = await pool.query(
    'SELECT * FROM auditoria_cambios_empleado WHERE id_empleado=? ORDER BY fecha_cambio DESC',
    [id_empleado]
  );
  return rows;
};

export const createAuditoriaCambio = async (data) => {
  const { id_empleado, campo_modificado, valor_anterior, valor_nuevo, id_admin, fecha_cambio } = data;
  const [result] = await pool.query(
    `INSERT INTO auditoria_cambios_empleado 
     (id_empleado, campo_modificado, valor_anterior, valor_nuevo, id_admin, fecha_cambio)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id_empleado, campo_modificado, valor_anterior, valor_nuevo, id_admin, fecha_cambio || new Date()]
  );
  return result;
};

export const deleteAuditoriaCambio = async (id) => {
  const [result] = await pool.query('DELETE FROM auditoria_cambios_empleado WHERE id=?', [id]);
  return result;
};
