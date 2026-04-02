import { Router } from 'express';
import * as ctrl from '../controllers/asistencia.controller.js';

const router = Router();


router.get('/',                           ctrl.getAll);
router.get('/:id',                        ctrl.getById);
router.get('/empleado/:id_empleado',      ctrl.getByEmpleado);
router.get('/fecha/:fecha',               ctrl.getByFecha);
router.post('/entrada',                   ctrl.registrarEntrada);
router.patch('/:id/salida',              ctrl.registrarSalida);
router.put('/:id',                        ctrl.update);
router.delete('/:id',                     ctrl.remove);
router.get('/retardos', ctrl.getRetardosPorMes);

export default router;
