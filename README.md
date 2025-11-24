# Sidekick Desktop App 🎮

Aplicación de escritorio desarrollada con AngularJS y Electron diseñada para conectar jugadores, facilitar la formación de equipos y mejorar la experiencia de juego.

## 🚀 Funcionalidades principales

- **Autenticación**: Inicio de sesión seguro, registro y recuperación de contraseña.
- **Navegación**: Menú y vistas dinámicas para acceder fácilmente a las distintas secciones de la aplicación.
- **Gestión de Publicaciones**: Crear, buscar y visualizar publicaciones para encontrar compañeros de juego.
- **Gestión de Solicitudes**: Enviar y recibir solicitudes para unirse a sesiones o equipos.
- **Gestión de Perfil**: Configurar información del usuario, actualizar datos y administrar la cuenta.
- **Sistema de Recompensas**: Obtener y canjear recompensas dentro de la plataforma.
- **Notificaciones**: Recibir alertas y avisos dentro de la app de escritorio.
- **Búsqueda de Juegos**: Buscar juegos y consultar información relevante según plataforma o título.  

## 🛠️ Stack Tecnológico

- **Frontend**:
    - **AngularJS**: Framework principal para construir la interfaz de la aplicación de escritorio.
    - **UI-Router**: Manejo de rutas y navegación entre vistas.
    - **Bootstrap**: Librería UI para diseño responsivo y componentes visuales.
    - **jQuery**: Utilidades y manipulación del DOM.
    - **Font Awesome**: Íconos vectoriales escalables.
    - **CSS / HTML**: Estructura y estilos personalizados de la aplicación.

- **Escritorio / Backend**:
    - **Electron**: Plataforma para empaquetar y ejecutar la aplicación como software de escritorio multiplataforma.
    - **dotenv**: Manejo de variables de entorno.
    - **electron-reload**: Recarga automática de la app durante el desarrollo.

- **API**:
    - **IGDB API**: Fuente de datos de videojuegos.
    - **axios**: Cliente HTTP para realizar solicitudes a la API.

- **Utilidades**:
    - **localStorage**: Persistencia local de datos.
    - **crypto**: Funciones de cifrado.
    - **jsonwebtoken (JWT)**: Manejo de tokens de autenticación.

- **Lenguajes y Tecnologías Base**:
    - JavaScript
    - HTML
    - CSS  

## 💻 Estructura del Proyecto
```
├── src/ # Código fuente de la aplicación
│ ├── index.html # Archivo HTML principal
│ ├── index.js # Proceso principal de Electron
│ ├── app/ # Módulos y componentes AngularJS
│ │ ├── config.js # Configuración global y constantes
│ │ ├── session.js # Gestión de sesión del usuario
│ │ ├── app.module.js # Definición del módulo principal AngularJS
│ │ ├── app.routes.js # Configuración de rutas
│ │ ├── components/ # Componentes de la aplicación
│ │ │ ├── auth/ # Autenticación
│ │ │ │ ├── authService.js
│ │ │ ├── login/ # Inicio de sesión
│ │ │ │ ├── loginCtrl.js
│ │ │ ├── forgotPassword/ # Recuperación de contraseña
│ │ │ │ ├── forgotPasswordCtrl.js
│ │ │ ├── registration/ # Registro de usuarios
│ │ │ │ ├── registrationCtrl.js
│ │ │ ├── home/ # Pantalla principal
│ │ │ │ ├── homeCtrl.js
│ │ │ ├── profile/ # Perfil de usuario
│ │ │ │ ├── profileCtrl.js
│ │ │ ├── game/ # Vista de detalle de juego
│ │ │ │ ├── gameCtrl.js
│ │ │ ├── search/ # Búsqueda de juegos
│ │ │ │ ├── searchCtrl.js
│ │ │ ├── navbar/ # Barra de navegación
│ │ │ │ ├── navbarDirective.js
│ │ │ ├── footer/ # Pie de página
│ │ │ │ ├── footerDirective.js
│ │ │ ├── editProfile/ # Edición de perfil
│ │ │ │ ├── editProfileCtrl.js
│ ├── assets/ # Recursos estáticos
│ │ ├── css/
│ │ │ ├── style.css # Estilos principales
│ │ │ ├── popupS.css # Estilos de pop-ups
│ │ ├── scripts/
│ │ │ ├── utils.js # Funciones utilitarias
├── .env # Variables de entorno
├── package.json # Dependencias y scripts
└── README.md # Documentación del proyecto
```

## 📌 Requisitos Previos

- **Node.js (>=16)**
- **npm**
- **Electron** instalado globalmente (instalar con: `npm install -g electron`)  

## 📦 Instalación y Ejecución

1. **Instalar dependencias**

```bash
npm install
```

2. **Iniciar la aplicación**

```bash
npm run start
```

Esto iniciará la aplicación de escritorio mediante Electron.