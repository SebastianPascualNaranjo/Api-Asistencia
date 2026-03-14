import * as EmpleadoModel from '../models/empleado.model.js';

export const getAll = async (req, res) => {
  try {
    const data = await EmpleadoModel.getAllEmpleados();
    res.json({ ok: true, data });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const getById = async (req, res) => {
  try {
    const data = await EmpleadoModel.getEmpleadoById(req.params.id);
    if (!data) return res.status(404).json({ ok: false, message: 'Empleado no encontrado' });
    res.json({ ok: true, data });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const create = async (req, res) => {
  try {
    const result = await EmpleadoModel.createEmpleado(req.body);
    res.status(201).json({ ok: true, message: 'Empleado creado', id: result.insertId });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const update = async (req, res) => {
  try {
    await EmpleadoModel.updateEmpleado(req.params.id, req.body);
    res.json({ ok: true, message: 'Empleado actualizado' });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const remove = async (req, res) => {
  try {
    await EmpleadoModel.deleteEmpleado(req.params.id);
    res.json({ ok: true, message: 'Empleado eliminado' });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};
