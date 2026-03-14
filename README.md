# 🏫 API REST — InstitutoUTHH | Registro de Asistencia

API RESTful desarrollada con **Node.js + Express + MySQL2 + JWT** bajo arquitectura **MVC**.

---

## 🚀 Instalación

```bash
git clone <repo>
cd uthh-asistencia-api
npm install
cp .env.example .env   # Configura tus variables
npm run dev            # Desarrollo
npm start              # Producción
```

---

## ⚙️ Variables de Entorno (.env)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=u941347256_Equipo1

JWT_SECRET=uthh_asistencia_secret_key_2024
JWT_EXPIRES_IN=8h

PORT=3000
NODE_ENV=development
```

---

## 📁 Estructura MVC

```
uthh-asistencia/
├── src/
│   ├── config/
│   │   └── db.js                   ← Conexión MySQL (Pool)
│   ├── middlewares/
│   │   └── auth.middleware.js       ← JWT verifyToken / verifyAdmin
│   ├── models/                      ← Consultas SQL
│   │   ├── administrador.model.js
│   │   ├── empleado.model.js
│   │   ├── asistencia.model.js
│   │   ├── estado.model.js
│   │   ├── horario.model.js
│   │   ├── incidencias.model.js
│   │   ├── log_asistencia.model.js
│   │   ├── contacto.model.js
│   │   ├── contenido.model.js
│   │   ├── contenido_paginas.model.js
│   │   ├── historial_contenido_paginas.model.js
│   │   ├── imagenes.model.js
│   │   ├── noticias.model.js
│   │   ├── publicaciones.model.js
│   │   ├── auditoria_bajas.model.js
│   │   ├── auditoria_cambios_empleado.model.js
│   │   └── auditoria_bajas_publicaciones.model.js
│   ├── controllers/                 ← Lógica de negocio
│   │   ├── auth.controller.js
│   │   ├── empleado.controller.js
│   │   └── asistencia.controller.js
│   ├── routes/                      ← Definición de endpoints
│   │   ├── auth.routes.js
│   │   ├── empleado.routes.js
│   │   ├── asistencia.routes.js
│   │   └── ... (una por tabla)
│   └── app.js                       ← Punto de entrada
├── .env.example
├── .gitignore
├── package.json
└── vercel.json
```

---

## 🔐 Autenticación JWT

Todas las rutas (excepto login) requieren el header:

```
Authorization: Bearer <token>
```

### Login
```
POST /api/auth/login
Body: { "usuario": "admin", "password": "123456" }
```

### Registrar Admin (requiere token admin)
```
POST /api/auth/register
Body: { "nombre": "...", "usuario": "...", "password": "...", "correo": "..." }
```

---

## 📋 Endpoints

### 👤 Empleados `/api/empleados`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | /    | Listar todos |
| GET    | /:id | Obtener por ID |
| POST   | /    | Crear empleado |
| PUT    | /:id | Actualizar |
| DELETE | /:id | Eliminar |

**Body POST/PUT:**
```json
{
  "nombre": "Juan",
  "apellido_paterno": "García",
  "apellido_materno": "López",
  "correo": "juan@uthh.edu.mx",
  "telefono": "7891234567",
  "departamento": "Sistemas",
  "puesto": "Docente",
  "sucursal": "Campus Principal",
  "id_estado": 1
}
```

---

### 🕐 Asistencia `/api/asistencia`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | /    | Listar todas |
| GET    | /:id | Obtener por ID |
| GET    | /empleado/:id_empleado | Por empleado |
| GET    | /fecha/:fecha | Por fecha (YYYY-MM-DD) |
| POST   | /entrada | Registrar entrada |
| PATCH  | /:id/salida | Registrar salida |
| PUT    | /:id | Actualizar registro |
| DELETE | /:id | Eliminar |

**Registrar Entrada:**
```json
{ "id_empleado": 1, "ubicacion": "Edificio A", "observaciones": "" }
```

**Respuesta:**
```json
{ "ok": true, "message": "Entrada registrada", "id": 42, "hora_entrada": "08:05:32", "fecha": "2024-03-11" }
```

---

### 📅 Horarios `/api/horarios`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | /    | Listar todos |
| GET    | /:id | Por ID |
| POST   | /    | Crear |
| PUT    | /:id | Actualizar |
| DELETE | /:id | Eliminar |

**Body:**
```json
{ "id_empleado": 1, "dia_semana": "Lunes", "hora_entrada": "08:00:00", "hora_salida": "16:00:00" }
```

---

### ⚠️ Incidencias `/api/incidencias`
**Body:**
```json
{ "id_empleado": 1, "tipo": "falta", "descripcion": "Sin justificación", "fecha": "2024-03-11", "estatus": "pendiente" }
```

---

### 🔄 Estados `/api/estados`
**Body:** `{ "nombre_estado": "Activo", "descripcion": "Empleado activo" }`

---

### 📰 Noticias `/api/noticias`
**Body:** `{ "titulo": "...", "contenido": "...", "imagen_url": "...", "id_admin": 1 }`

### 📢 Publicaciones `/api/publicaciones`
**Body:** `{ "titulo": "...", "descripcion": "...", "imagen_url": "...", "tipo": "evento", "id_admin": 1 }`

### 📄 Contenido `/api/contenido`
### 🖼️ Imágenes `/api/imagenes`
### 📬 Contacto `/api/contacto`
### 📝 Páginas `/api/contenido-paginas`
### 🕵️ Log Asistencia `/api/log-asistencia`
### 🗂️ Auditoría Bajas `/api/auditoria-bajas`
### 🗂️ Auditoría Cambios Empleado `/api/auditoria-cambios-empleado`
### 🗂️ Auditoría Bajas Publicaciones `/api/auditoria-bajas-publicaciones`
### 👑 Administradores `/api/administradores`

Todos soportan: `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`

---

## ☁️ Despliegue en Vercel

1. Instalar Vercel CLI: `npm i -g vercel`
2. `vercel login`
3. `vercel --prod`
4. Agregar variables de entorno en **Settings > Environment Variables**

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|-----------|-----|
| Node.js   | Runtime |
| Express   | Servidor HTTP |
| MySQL2    | Conector BD con Promises |
| JWT       | Autenticación |
| bcryptjs  | Hash de contraseñas |
| dotenv    | Variables de entorno |
| cors      | Peticiones cross-origin |
| nodemon   | Recarga en desarrollo |
