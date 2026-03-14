import { Router } from 'express';
import * as Model from '../models/incidencias.model.js';

const router = Router();

const getAll  = async (req, res) => { try { const fn = Object.values(Model).find(f => typeof f === 'function' && f.name.startsWith('getAll')); const data = await fn(); res.json({ ok: true, data }); } catch (e) { res.status(500).json({ ok: false, message: e.message }); } };
const getById = async (req, res) => { try { const fn = Object.values(Model).find(f => typeof f === 'function' && f.name.includes('ById')); const data = await fn(req.params.id); if (!data) return res.status(404).json({ ok: false, message: 'No encontrado' }); res.json({ ok: true, data }); } catch (e) { res.status(500).json({ ok: false, message: e.message }); } };
const create  = async (req, res) => { try { const fn = Object.values(Model).find(f => typeof f === 'function' && f.name.startsWith('create')); const r = await fn(req.body); res.status(201).json({ ok: true, message: 'Creado', id: r?.insertId }); } catch (e) { res.status(500).json({ ok: false, message: e.message }); } };
const update  = async (req, res) => { try { const fn = Object.values(Model).find(f => typeof f === 'function' && f.name.startsWith('update')); await fn(req.params.id, req.body); res.json({ ok: true, message: 'Actualizado' }); } catch (e) { res.status(500).json({ ok: false, message: e.message }); } };
const remove  = async (req, res) => { try { const fn = Object.values(Model).find(f => typeof f === 'function' && f.name.startsWith('delete')); await fn(req.params.id); res.json({ ok: true, message: 'Eliminado' }); } catch (e) { res.status(500).json({ ok: false, message: e.message }); } };

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
