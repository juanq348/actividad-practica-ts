# Actividad Práctica - Backend con TypeScript
Esta actividad fue desarrollada en **TypeScript** con **Express** y **Sequelize**, para manejar la autenticación de usuarios y gestión de equipos. Tiene registro y login con JWT, roles para los usuarios y CRUD para los equipos de la organización Formotex

---

## 1. Requisitos
- **Node.js** 
- **npm** 
- **PostgreSQL** (servidor local)

## 2. Clonar repositorio (en el directorio que quieras)
```bash
git clone https://github.com/juanq348/actividad-practica-ts.git
```

## 2. Configurar variables de entorno
Crea un archivo **.env** en la raíz del proyecto con la siguiente estructura:
```bash
PORT=4000
DB_HOST=localhost
DB_NAME=formotex
DB_USER=postgres
DB_PASS=contraseña_de_tu_postgres
JWT_SECRET=jwt
```

## 3. Comandos para ejecutar el proyecto
```bash
#Instalar dependencias
npm install

#Ejecutar servidor
npm run dev

#El servidor estara corriendo en http://localhost:4000
```

## 4. Endpoints
### Autenticación
- **POST:** `/api/auth/register` => Para registrar usuarios (solo el admin puede).
- **POST:** `/api/auth/login` => Login de usuario.

### Equipos
- **POST:** `/api/equipments` => Crear un equipo
- **GET:** `/api/equipments` => Listar todos los equipos
- **GET:** `/api/equipments/:id` => Obtener equipo por ID
- **PUT:** `/api/equipments/:id` => Actualizar un equipo
- **DELETE:** `/api/equipments/:id` => Eliminar un equipo (solo el admin puede)

## 5. Justificación Técnica
### 5.1 Relación entre entidades
- Un usuario puede tener varios equipos
- Cada equipo puede pertenecer a un usuario o no puede tener ninguno hasta que un administrador se lo asigne a un usuario.

### 5.2 Organización de carpetas
```bash
src/
    |- config/ 
    |- controllers/
    |- middlewares/
    |- models/
    |- routes/
    |- services/
    |- utils/
```

### 5.3 Propiedades relevantes para cada entidad
- **User**: `name`, `email`, `password`, `role` (admin o user).
- **Equipment**: `serialNumber`(único para cada equipo), `name`, `brand`, `description`, `location`, `state`(disponible, en_uso, en_reparacion, no_disponible), `ownerId`.
- `createdAt` y `updatedAt` generados por Sequelize.

### 5.4 Elección de librerías
- **Express:** Para el servidor.
- **Sequelize:** ORM para manejar PostgreSQL.
- **bcrypt:** Para hashear la contraseña.
- **JWT:** Autenticación basada en tokens.
- **express-validator:** Validación de inputs de requests.

## 6. Aclaraciones
- Tenes que tener PostgreSQL corriendo.
- Podes usar `Postman` o `Insomnia` para probar todos los endpoints.