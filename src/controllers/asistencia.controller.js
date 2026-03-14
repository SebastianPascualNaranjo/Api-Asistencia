import * as AsistenciaModel from '../models/asistencia.model.js';

export const getAll = async (req, res) => {
  try {
    const data = await AsistenciaModel.getAllAsistencias();
    res.json({ ok: true, data });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const getById = async (req, res) => {
  try {
    const data = await AsistenciaModel.getAsistenciaById(req.params.id);
    if (!data) return res.status(404).json({ ok: false, message: 'Registro no encontrado' });
    res.json({ ok: true, data });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const getByEmpleado = async (req, res) => {
  try {
    const data = await AsistenciaModel.getAsistenciasByEmpleado(req.params.id_empleado);
    res.json({ ok: true, data });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const getByFecha = async (req, res) => {
  try {
    const data = await AsistenciaModel.getAsistenciasByFecha(req.params.fecha);
    res.json({ ok: true, data });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const registrarEntrada = async (req, res) => {
  try {
    const { id_empleado, ubicacion, observaciones } = req.body;
    const ahora = new Date();
    const fecha = ahora.toISOString().split('T')[0];
    const hora_entrada = ahora.toTimeString().split(' ')[0];
    const result = await AsistenciaModel.registrarEntrada({ id_empleado, fecha, hora_entrada, ubicacion, observaciones });
    res.status(201).json({ ok: true, message: 'Entrada registrada', id: result.insertId, hora_entrada, fecha });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const registrarSalida = async (req, res) => {
  try {
    const ahora = new Date();
    const hora_salida = ahora.toTimeString().split(' ')[0];
    await AsistenciaModel.registrarSalida(req.params.id, hora_salida);
    res.json({ ok: true, message: 'Salida registrada', hora_salida });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const update = async (req, res) => {
  try {
    await AsistenciaModel.updateAsistencia(req.params.id, req.body);
    res.json({ ok: true, message: 'Asistencia actualizada' });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const remove = async (req, res) => {
  try {
    await AsistenciaModel.deleteAsistencia(req.params.id);
    res.json({ ok: true, message: 'Registro eliminado' });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};
