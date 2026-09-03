# Sistema de Gestión de Productos con Autenticación

Sistema de gestión de productos con autenticación de usuarios, desarrollado con HTML5, CSS y JavaScript vanilla. Los usuarios se autentican con credenciales predefinidas y acceden a un panel de productos con operaciones CRUD completas.

Evaluación Formativa N° 1 - Desarrollo Fullstack II (DSY1104)

## Probleática

En muchas aplicaciones web, el acceso a funcionalidades principales debe estar restringido a usuarios autenticados. Este proyecto resuelve esa problemática implementando un sistema de login/registro con protección de rutas en el navegador, utilizando únicamente tecnologías frontend (HTML, CSS, JavaScript) sin servidor ni base de datos.

## Flujo de Usuario

```
main.html (landing page)
  ├── [Botón Login]     → login.html → valida credenciales → index.html
  └── [Botón Registro]  → registro.html → crea cuenta → login.html → index.html

index.html (panel de productos - protegido)
  └── Si no hay sesión activa → redirige a main.html
```

## Estructura del Proyecto

```
src/
├── pages/
│   ├── main.html        ← Landing page (página de entrada)
│   ├── login.html       ← Formulario de inicio de sesión
│   ├── registro.html    ← Formulario de registro de usuario
│   └── index.html       ← Panel de gestión de productos (protegido)
├── css/
│   └── styles.css       ← Estilos compartidos
├── js/
│   ├── auth.js          ← Usuarios predefinidos y lógica de sesión
│   ├── login.js         ← Validación de formularios de login y registro
│   └── app.js           ← CRUD de productos y verificación de sesión
└── assets/
    ├── images/          ← Imágenes
    └── video/           ← Videos
```

## Tecnologías

- HTML5
- CSS3
- JavaScript (vanilla)
- sessionStorage (para manejo de sesión)
