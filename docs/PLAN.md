# Planificación: Sistema de Gestión de Productos con Autenticación

Evaluación Formativa N° 1 - Desarrollo Fullstack II (DSY1104)

---

## Estructura del Proyecto

```
Pagina-Ventas-Fullstack-2/
├── src/
│   ├── pages/
│   │   ├── login.html          ← Página principal (login + video de muestra)
│   │   ├── registro.html       ← Formulario de registro de usuario
│   │   └── index.html          ← Panel de productos (protegido)
│   ├── css/
│   │   ├── styles-login.css    ← Estilos de la página de login
│   │   ├── styles-registro.css ← Estilos de la página de registro
│   │   └── styles.css          ← Estilos del panel de productos (index)
│   ├── js/
│   │   ├── auth.js             ← Usuarios predefinidos + lógica de sesión
│   │   ├── login.js            ← Validación de formularios (login + registro)
│   │   ├── app.js              ← CRUD de productos + verificación de sesión
│   │   └── transitions.js      ← Animaciones de transición entre login/registro
│   └── assets/
│       ├── images/
│       │   └── portada.png     ← Logo/portada de la tienda
│       └── video/
│           └── muestra-productos.mp4 ← Video de muestra (carrusel de fotos)
├── .gitignore
├── README.md
├── PLAN.md
├── EXPLICACION.md
└── INSTRUCCIONES.md
```

---

## Descripción de Cada Archivo

| Archivo | Función |
|---|---|
| `login.html` | Página principal con formulario de login, video de muestra y enlace a registro |
| `registro.html` | Formulario de registro de usuario (nombre, email, contraseña, confirmar) |
| `index.html` | Panel protegido: pestañas para registrar/ver productos + listado en tabla horizontal |
| `styles-login.css` | Estilos del tema dark cyberpunk para la página de login |
| `styles-registro.css` | Estilos del mismo tema para la página de registro |
| `styles.css` | Estilos del panel de productos (index) |
| `auth.js` | Usuarios predefinidos, funciones de login/registro y manejo de sesión |
| `login.js` | Validación de formularios de login y registro |
| `app.js` | CRUD de productos (crear, listar, editar, eliminar) + verificación de sesión |
| `transitions.js` | Animaciones de morfing entre login y registro (View Transitions) |
| `portada.png` | Logo/portada de la tienda usado en login y registro |
| `muestra-productos.mp4` | Video de muestra (autoplay muteado en `.imagen-portada` de login) |
| `.gitignore` | Excluir archivos del sistema y del evaluador |
| `README.md` | Descripción del proyecto, problemática y flujo de usuario |
| `PLAN.md` | Planificación del proyecto |
| `EXPLICACION.md` | Explicación del proyecto y sus funciones (estilo entrevista) |

---

## Fases de Implementación

### Fase 1: Configuración

- Crear `.gitignore`
- Crear carpetas: `pages/`, `css/`, `js/`, `assets/images/`
- Commit efectuado: `chore: reorganizar estructura del proyecto`
- Cinco archivos de prueba en la raíz eliminados al finalizar la reestructuración

### Fase 2: JavaScript - auth.js

- Array de usuarios predefinidos (4 usuarios con email y contraseña)
- Función `buscarUsuario(email)` → busca un usuario por email en el array
- Función `validarLogin(email, contrasena)` → verifica credenciales contra el array
- Función `registrarUsuario(nombre, email, contrasena)` → agrega usuario al array
- Función `guardarSesion(usuario)` → guarda datos mínimos en sessionStorage
- Función `obtenerSesion()` → lee la sesión activa desde sessionStorage
- Función `cerrarSesion()` → elimina la sesión de sessionStorage
- Función `verificarSesion()` → redirige a login.html si no hay sesión
- Los usuarios registrados se persisten en `localStorage` (clave `usuariosRegistrados`)
- Commit efectuado: implementación de `auth.js`

### Fase 3: HTML + CSS - login.html

- Estructura semántica: header, main, section, article, footer
- Título de bienvenida al sistema
- Imagen de portada → video de muestra (`muestra-productos.mp4`) con logo (`portada.png`)
- Formulario: email + contraseña + botón "Iniciar sesión"
- Enlace "¿No tiene cuenta? Regístrese ahora mismo" → registro.html
- Layout en grid de 2 columnas: video de muestra a la izquierda, tarjeta de login a la derecha
- Footer con copyright
- Estilos propios en `styles-login.css`
- Commits efectuados: página de login, estilos y refinamiento (landing, estructura)

### Fase 4: HTML + CSS - registro.html

- Estructura semántica: header, main, footer
- Imagen de portada en el header
- Formulario: nombre, email, contraseña, confirmar contraseña + botón "Crear cuenta"
- Enlace "¿Ya tienes cuenta? Inicia sesión" → login.html
- Footer con copyright
- Estilos propios en `styles-registro.css`
- Commit efectuado: página de registro con validación

### Fase 5: HTML - index.html

- Estructura semántica: header, nav, main, section, article, footer
- Nav con "PRODUCTOS" y "CERRAR SESIÓN"
- Formulario: ID, nombre, descripción, precio, categoría, stock e imagen (URL o archivo local)
- Sección `imagen-opciones` (radios `tipoImagen`) para elegir URL o subir archivo
- Pestañas `.tab-btn` para alternar entre la vista de registro y la vista de lista
- Tabla con `<tbody id="contenedorProductos">` donde JS inserta las filas de productos
- `<template id="fila-producto">` con el HTML de la fila (JS solo lo clona y lo rellena)
- Footer con copyright
- Enlace a `styles.css`

### Fase 6: JavaScript - login.js

- Funciones de validación reutilizables (`validarCampoVacio`, `validarEmail`, `validarContrasenas`, `mostrarError`, `limpiarErrores`)
- Validación de login: verificar credenciales usando `auth.js`, mostrar errores específicos
- Validación de registro: nombre, email, contraseña, confirmación, mostrar errores
- Si login/registro son exitosos → guardar sesión y redirigir a `index.html` / `login.html`

### Fase 7: JavaScript - app.js

- Verificar sesión al cargar la página (si no hay sesión → redirigir a login.html)
- Productos persistidos en `localStorage` (clave `productos`) con siembra inicial de productos demo
- Función `mostrarVista(vista)` (alternar entre las pestañas del panel)
- Función `registrarProducto` (validar + agregar/actualizar)
- Función `renderizarProductos` (clonar el `<template>` y rellenar celdas con `textContent`)
- Función `editarProducto` (cargar datos en formulario)
- Función `eliminarProducto` (confirmar + borrar)
- Función `limpiarFormulario` (resetear form y volver a estado "Registrar")
- Cerrar sesión (limpiar sessionStorage y redirigir a login.html)

### Fase 8: JavaScript - transitions.js

- Animación de morfing entre la tarjeta de login y el formulario de registro
- Uso de View Transitions API + sessionStorage para persistir la posición entre páginas
- Manejo de `pageswap` y `pageshow` para evitar conflictos con la transición nativa

### Fase 9: Soporte

- Crear `README.md`
- Crear `PLAN.md`
- Commit efectuado: `docs: actualizar documentación del proyecto`

### Fase 10: Push

- `git push origin main`

---

## Criterios de Evaluación y Cómo se Cumplen

| Criterio | Qué cubre | Archivo |
|---|---|---|
| IE1.1.1: Estructura semántica | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` | Las 3 páginas HTML |
| IE1.1.1: Hipervínculos | Navegación entre las 3 páginas + enlaces de auth | Las 3 páginas HTML |
| IE1.1.1: Imágenes | `<img>` con `alt` en portada y tarjetas de productos | 3 páginas + `app.js` |
| IE1.1.1: Botones | Submit en formularios + editar/eliminar + cerrar sesión | Las 3 páginas + `app.js` |
| IE1.1.1: Tablas | `<table>`, `<thead>`, `<tbody>` para listar productos | `index.html`, `app.js` |
| IE1.1.1: Formularios | Formularios con `<label>`, `<input>`, `<select>`, `<textarea>` | Las 3 páginas HTML |
| IE1.1.1: Footer | Copyright y datos | Las 3 páginas HTML |
| IE1.1.4: CSS externo | CSS enlazado en las 3 páginas | Las 3 páginas HTML |
| IE1.2.1: Validaciones JS | `preventDefault()` + validaciones antes de procesar | `login.js`, `app.js` |
| IE1.2.2: Errores claros | Mensajes específicos por campo | `login.js`, `app.js` |
| IE1.2.2: Sugerencias | `placeholder`, `autocomplete`, `minlength` | Las 3 páginas HTML |
| IE1.3.1: Commits descriptivos | Commits con mensajes claros | Git |
| Autenticación | Usuarios predefinidos, login/registro, sesión con sessionStorage | `auth.js` |
| Protección de rutas | Verificación de sesión en index.html, redirect si no autenticado | `app.js` |
| Extras | Animaciones de transición entre páginas | `transitions.js` |

---

## Resumen de Archivos

| Archivo | Acción |
|---|---|
| `.gitignore` | Crear |
| `README.md` | Crear |
| `PLAN.md` | Crear |
| `INSTRUCCIONES.md` | Crear |
| `src/pages/login.html` | Crear |
| `src/pages/registro.html` | Crear |
| `src/pages/index.html` | Crear |
| `src/css/styles-login.css` | Crear |
| `src/css/styles-registro.css` | Crear |
| `src/css/styles.css` | Crear |
| `src/js/auth.js` | Crear |
| `src/js/login.js` | Crear |
| `src/js/app.js` | Crear |
| `src/js/transitions.js` | Crear |
| `src/assets/images/portada.png` | Crear |
| `src/assets/video/muestra-productos.mp4` | Crear |
| `EXPLICACION.md` | Crear |

---

## Formularios

### login.html

| Campo | Tipo | Atributos |
|---|---|---|
| Email | `input[type="email"]` | `required`, `autocomplete="email"`, `placeholder="cristobal@gmail.com"` |
| Contraseña | `input[type="password"]` | `required`, `autocomplete="current-password"`, `minlength="8"` |

También contiene:
- Título de bienvenida
- Enlace "¿No tiene cuenta? Regístrese ahora mismo" → registro.html
- Grid de 2 columnas con el video de muestra junto al formulario

### registro.html

| Campo | Tipo | Atributos |
|---|---|---|
| Nombre | `input[type="text"]` | `required`, `autocomplete="name"`, `placeholder="Nombre de usuario"` |
| Email | `input[type="email"]` | `required`, `autocomplete="email"` |
| Contraseña | `input[type="password"]` | `required`, `minlength="8"` |
| Confirmar contraseña | `input[type="password"]` | `required` |

### index.html

| Campo | Tipo | Atributos |
|---|---|---|
| ID | `input[type="number"]` | `required`, `min="1"` |
| Nombre | `input[type="text"]` | `required` |
| Descripción | `textarea` | `required` |
| Precio | `input[type="number"]` | `required`, `min="0"`, `step="0.01"` |
| Categoría | `select` | `required` → Electrónica, Ropa, Alimentos, Otros |
| Stock | `input[type="number"]` | `required`, `min="0"` |
| Imagen | `input[type="url"]` + `input[type="file"]` | Radios `tipoImagen` (URL / archivo); file con `accept="image/*"` |
| Botones | `button[type="submit"]` | Texto: "Registrar Producto" / "Actualizar Producto" |

---

## Validaciones JavaScript

### auth.js

- Buscar usuario por email en el array de predefinidos
- Verificar que la contraseña coincida con el email proporcionado
- Validar que el email no esté ya registrado al hacer registro
- Guardar sesión solo con datos mínimos (email, nombre)
- Redirigir a login.html si no hay sesión activa

### login.js

- Campo vacío → "Este campo es obligatorio"
- Email sin `@` o `.` → "El correo debe contener @ / un dominio"
- Contraseña < 8 caracteres → "La contraseña debe tener al menos 8 caracteres"
- Contraseñas no coinciden → "Las contraseñas no coinciden"
- Credenciales incorrectas → "Correo o contraseña incorrecto"
- Email ya registrado → "El correo ya está registrado"

### app.js

- Todos los campos obligatorios deben estar completos
- Precio y stock deben ser números positivos
- ID debe ser mayor a 0 y no estar duplicado
- Imagen requerida (URL válida o archivo seleccionado)
- Verificar sesión al cargar página → redirigir a login.html si no hay sesión

---

## Elementos HTML Requeridos

- Cada campo debe tener un `<label>` con `for="idDelCampo"`
- Usar `autocomplete` en cada input
- Usar `<span class="error-message">` para mensajes de error
- Usar `loading="lazy"` en imágenes de productos
- `login.html` debe tener enlace a registro.html, video de muestra y logo portada

---

## Usuarios Predefinidos (auth.js)

```
[
  { nombre: "Admin",     email: "admin@correo.com",  contrasena: "12345678" },
  { nombre: "Juan",      email: "juan@correo.com",   contrasena: "12345678" },
  { nombre: "Cristobal", email: "cris@correo.com",   contrasena: "12345678" },
  { nombre: "Francisca", email: "fran@correo.com",   contrasena: "12345678" }
]
```

---

## Funciones de auth.js

| Función | Parámetros | Retorna | Descripción |
|---|---|---|---|
| `buscarUsuario` | `email` | `Object/null` | Busca un usuario por email en el array |
| `validarLogin` | `email, contrasena` | `Boolean` | Verifica credenciales contra el array |
| `registrarUsuario` | `nombre, email, contrasena` | `Boolean` | Agrega usuario, retorna true si exitoso |
| `guardarSesion` | `usuario` | `void` | Guarda `{email, nombre}` en sessionStorage |
| `obtenerSesion` | - | `Object/null` | Lee la sesión activa |
| `cerrarSesion` | - | `void` | Elimina la sesión de sessionStorage |
| `verificarSesion` | - | `void` | Redirige a login.html si no hay sesión |

---

## Objeto Producto (app.js)

```
{
  id: Number,
  nombre: String,
  descripcion: String,
  precio: Number,
  categoria: String,
  stock: Number,
  imagen: String (URL http o data URL base64 de un archivo local)
}
```