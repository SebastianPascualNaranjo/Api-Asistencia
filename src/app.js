import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import empleadoRoutes from './routes/empleado.routes.js';
import authRoutes from './routes/auth.routes.js';
import asistenciaRoutes from './routes/asistencia.routes.js';
import horarioRoutes from './routes/horario.routes.js';
import incidenciasRoutes from './routes/incidencias.routes.js';
import estadoRoutes from './routes/estado.routes.js';
import administradorRoutes from './routes/administrador.routes.js';
import contactoRoutes from './routes/contacto.routes.js';
import noticiasRoutes from './routes/noticias.routes.js';
import publicacionesRoutes from './routes/publicaciones.routes.js';
import imagenesRoutes from './routes/imagenes.routes.js';
import contenidoRoutes from './routes/contenido.routes.js';
import contenidoPaginasRoutes from './routes/contenido_paginas.routes.js';
import logAsistenciaRoutes from './routes/log_asistencia.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/incidencias', incidenciasRoutes);
app.use('/api/estados', estadoRoutes);
app.use('/api/administradores', administradorRoutes);
app.use('/api/contactos', contactoRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/imagenes', imagenesRoutes);
app.use('/api/contenido', contenidoRoutes);
app.use('/api/contenido-paginas', contenidoPaginasRoutes);
app.use('/api/log-asistencia', logAsistenciaRoutes);

app.get('/', (req, res) => {
  res.send('API Asistencia UTHH');
});
// Solo iniciar el servidor si no estamos en producción (para evitar conflictos con pruebas)

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}

export default app;