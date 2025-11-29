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
├── src/                               # Código fuente principal
│   ├── index.html                     # HTML principal (renderer)
│   ├── index.js                       # Proceso principal de Electron
│   │
│   ├── app/                           # AngularJS (renderer)
│   │   ├── app.module.js              # Módulo principal
│   │   ├── app.routes.js              # Configuración de rutas
│   │   ├── config.js                  # Configuración global
│   │   ├── session.js                 # Gestión de sesión
│   │
│   │   ├── controllers/               # Controllers agrupados por features
│   │   │   ├── applications/
│   │   │   │   └── applicationCtrl.js
│   │   │   ├── auth/
│   │   │   │   ├── forgotPasswordCtrl.js
│   │   │   │   ├── loginCtrl.js
│   │   │   │   └── registrationCtrl.js
│   │   │   ├── config/
│   │   │   │   ├── changePasswordCtrl.js
│   │   │   │   └── configCtrl.js
│   │   │   ├── games/
│   │   │   │   └── gameCtrl.js
│   │   │   ├── home/
│   │   │   │   └── homeCtrl.js
│   │   │   ├── notifications/
│   │   │   │   └── notificationsCtrl.js
│   │   │   ├── posts/
│   │   │   │   └── newPCtrl.js
│   │   │   ├── profile/
│   │   │   │   ├── editProfileCtrl.js
│   │   │   │   └── profileCtrl.js
│   │   │   ├── rate/
│   │   │   │   └── rateCtrl.js
│   │   │   ├── store/
│   │   │   │   └── storeCtrl.js
│   │   │   └── users/
│   │   │       └── userCtrl.js
│   │
│   │   ├── services/                  # Servicios centralizados
│   │   │   ├── authService.js
│   │   │   ├── contact_infService.js
│   │   │   ├── gameService.js
│   │   │   ├── modeService.js
│   │   │   ├── notificationService.js
│   │   │   ├── notificationStateService.js
│   │   │   ├── paymentService.js
│   │   │   ├── platformService.js
│   │   │   ├── popupService.js
│   │   │   ├── postService.js
│   │   │   ├── reviewService.js
│   │   │   ├── rewardService.js
│   │   │   └── userService.js
│   │
│   │   ├── shared/                     # Componentes reutilizables
│   │   │   ├── navigation-sidebar/
│   │   │   └── searchable-dropdown/
│   │
│   │   ├── views/                      # Templates HTML por features
│   │   │   ├── applications/
│   │   │   │   └── applications.html
│   │   │   ├── auth/
│   │   │   │   ├── forgotPassword.html
│   │   │   │   ├── login.html
│   │   │   │   └── registration.html
│   │   │   ├── config/
│   │   │   │   ├── changePassword.html
│   │   │   │   └── config.html
│   │   │   ├── games/
│   │   │   │   └── games.html
│   │   │   ├── home/
│   │   │   │   └── home.html
│   │   │   ├── loading/
│   │   │   │   └── loading.html
│   │   │   ├── notifications/
│   │   │   │   └── notifications.html
│   │   │   ├── posts/
│   │   │   │   └── newPost.html
│   │   │   ├── profile/
│   │   │   │   ├── edit-profile.html
│   │   │   │   └── profile.html
│   │   │   ├── rate/
│   │   │   │   └── rate.html
│   │   │   └── store/
│   │   │       └── store.html
│   │
│   ├── assets/                        # Recursos estáticos
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── popupS.css
│   │   └── scripts/
│   │       └── utils.js
│
├── .env
├── package.json
└── README.md
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