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

### 📋 Próximos Pasos
- Crear la estructura de carpetas profesional (`components`, `pages`, `context`).
- Implementar el Layout base (Sidebar + Navbar).
- Desarrollar el Dashboard inicial.
