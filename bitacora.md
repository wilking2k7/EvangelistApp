# Bitácora de Desarrollo - EvangelistApp

## [2026-04-25] - Inicialización y Configuración Base

### ⚙️ Configuración del Entorno
- **Framework**: Vite + React.
- **Estilos**: TailwindCSS + PostCSS.
- **Control de Versiones**: Git inicializado y vinculado a `https://github.com/wilking2k7/EvangelistApp.git`.

### 🛠️ Acciones Realizadas
1.  **Inicialización**: Se ejecutó `npx create-vite` para crear la estructura base en React.
2.  **Dependencias**: Instalación de `tailwindcss`, `postcss`, y `autoprefixer`.
3.  **Sistema de Diseño**:
    - Creación de `tailwind.config.js` con tokens personalizados (Indigo Accent, Slate 950).
    - Creación de `postcss.config.js`.
    - Configuración de `src/index.css` con clases base para **Glassmorphism** y diseño premium.
4.  **Estructura de Directorios**: Creación de carpetas `components`, `pages`, `hooks`, `context`, `services` y `utils`.
5.  **Componentes Core**:
    - `Sidebar.jsx`: Navegación lateral con diseño de vidrio.
    - `Layout.jsx`: Contenedor principal de la aplicación.
    - `App.jsx`: Implementación del Dashboard con tarjetas de estadísticas y tablas de ejemplo.
6.  **Repositorio**: Repositorio local vinculado al remoto en GitHub.
7.  **GitHub Push**: Se realizó el primer commit y push a la rama `main`.
8.  **Contexto y Autenticación**: 
    - Actualización de roles: **Administrador, Pastor, Líder, Auxiliar**.
    - Implementación de helper `hasRole` para control de permisos.
9.  **Navegación**: Instalación de `react-router-dom` y configuración de rutas dinámicas.
10. **Módulo de Personas**: 
    - Creación de `People.jsx` con visualización de "Hermanos" y "Amigos".
    - Implementación de estados espirituales (Interesado, Consolidando, Bautizado).
11. **Refactorización**: Migración del Dashboard a su propia página y creación de componente `Card` reutilizable.
12. **Infraestructura Docker**: 
    - Creación de `docker-compose.yml`.
    - Configuración de PostgreSQL 15 en el puerto **5433**.
    - Configuración de pgAdmin 4 en el puerto **5051**.
13. **Backend Core (NestJS)**:
    - Inicialización de la carpeta `server`.
    - Configuración de `main.ts`, `app.module.ts` y `prisma.service.ts`.
    - Definición del esquema `schema.prisma` con modelos de: User (Roles), Person (Spiritual Status), Visit y Question (Audit).
    - Ejecución de la primera migración de base de datos exitosa.
14. **API Endpoints (Primera Fase)**:
    - `GET /people`: Obtener listado de personas con sus líderes asignados.
    - `POST /people`: Registro de nuevas personas.
    - `GET /dashboard/stats`: Cálculo en tiempo real de estadísticas para el panel principal.
15. **Conexión Frontend-Backend**:
    - Instalación de `axios`.
    - Creación de `src/services/api.js` para centralizar las peticiones.
    - Actualización de `People.jsx` y `Dashboard.jsx` para consumir datos reales de la base de datos de Docker.
16. **Interactividad y Datos Iniciales**:
    - Creación de `seed.ts` para poblar la base de datos con Admin, Pastor, Líder y datos de prueba.
    - Desarrollo del componente `AddPersonModal.jsx` con validaciones y carga dinámica de líderes.
    - Integración del flujo de guardado de nuevas personas desde la interfaz.
17. **Módulo 2 (Programación de Visitas)**:
    - Creación del `VisitsModule` en el backend con endpoints de CRUD y Auditoría.
    - Desarrollo de `Scheduling.jsx` con vista de lista de próximas visitas y modal de programación.
    - Conexión de la agenda con la base de datos real (NestJS + Prisma).
18. **Módulo 6 y 7 (Base de Conocimiento y Auditoría)**:
    - Creación del `QuestionsModule` en el backend para gestionar preguntas capturadas en visitas.
    - Desarrollo de `Audit.jsx`: Interfaz para Pastores donde revisan preguntas, redactan la respuesta oficial y aprueban la publicación.
    - Desarrollo de `KnowledgeBase.jsx`: Centro de estudio con buscador por temáticas y listado de Q&A auditadas.
19. **Seguridad y Autenticación (Fase 2)**:
    - Implementación de `AuthModule` en el backend con JWT (JSON Web Tokens) y cifrado Bcrypt.
    - Desarrollo de la página de `Login.jsx` con diseño inmersivo y validaciones.
    - Refactorización de `AuthContext.jsx` para persistencia de sesión en LocalStorage.
    - Protección de rutas en el frontend y visualización dinámica del perfil en el `Sidebar`.

### 📋 Próximos Pasos
- Crear la estructura de carpetas profesional (`components`, `pages`, `context`).
- Implementar el Layout base (Sidebar + Navbar).
- Desarrollar el Dashboard inicial.
