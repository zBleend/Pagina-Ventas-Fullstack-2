# Sistema de Gestión de Productos con Autenticación

Sistema de gestión de productos con autenticación de usuarios, desarrollado con HTML5, CSS y JavaScript vanilla. Los usuarios se autentican con credenciales predefinidas y acceden a un panel de productos con operaciones CRUD completas.

Evaluación Formativa N° 1 - Desarrollo Fullstack II (DSY1104)

## Problemática

En muchas aplicaciones web, el acceso a funcionalidades principales debe estar restringido a usuarios autenticados. Este proyecto resuelve esa problemática implementando un sistema de login/registro con protección de rutas en el navegador, utilizando únicamente tecnologías frontend (HTML, CSS, JavaScript) sin servidor ni base de datos.

## Flujo de Usuario

```
login.html (página principal)
  ├── [Formulario Login]      → valida credenciales → index.html
  ├── [Video de muestra]      → presentación visual de la tienda (logo portada)
  └── [Enlace Registro]       → registro.html → crea cuenta → login.html → index.html

registro.html (creación de cuenta)
  └── Crea usuario nuevo y vuelve a login.html

index.html (panel de productos - protegido)
  ├── CRUD de productos (registrar, listar, editar, eliminar)
  └── Si no hay sesión activa → redirige a login.html
```

## Estructura del Proyecto

```
src/
├── pages/
│   ├── login.html            ← Página principal (login + video de muestra)
│   ├── registro.html         ← Formulario de registro de usuario
│   └── index.html            ← Panel de gestión de productos (protegido)
├── css/
│   ├── styles-login.css      ← Estilos de la página de login
│   ├── styles-registro.css   ← Estilos de la página de registro
│   └── styles.css            ← Estilos del panel de productos
├── js/
│   ├── auth.js               ← Usuarios predefinidos y lógica de sesión
│   ├── login.js              ← Validación de formularios de login y registro
│   ├── app.js                ← CRUD de productos y verificación de sesión
│   └── transitions.js        ← Animaciones de transición entre páginas
└── assets/
    ├── images/
    │   └── portada.png       ← Logo/portada de la tienda
    └── video/
        └── muestra-productos.mp4 ← Video de muestra (carrusel de fotos)
```

## Tecnologías

- HTML5
- CSS3
- JavaScript (vanilla)
- sessionStorage (para manejo de sesión)
- localStorage (para persistir usuarios y productos)
- View Transitions API (animaciones entre login y registro)

## Usuarios Predefinidos

| Email | Contraseña |
|---|---|
| `admin@correo.com` | `12345678` |
| `juan@correo.com` | `12345678` |
| `cris@correo.com` | `12345678` |
| `fran@correo.com` | `12345678` |