# Planificación: Sistema de Gestión de Productos con Autenticación

Evaluación Formativa N° 1 - Desarrollo Fullstack II (DSY1104)

---

## Estructura del Proyecto

```
Pagina-Ventas/
├── src/
│   ├── pages/
│   │   ├── login.html       ← Página principal (login + opciones)
│   │   ├── registro.html    ← Formulario de registro
│   │   └── index.html       ← Panel de productos (protegido)
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── auth.js          ← Usuarios predefinidos + sesión
│   │   ├── login.js         ← Validación de formularios
│   │   └── app.js           ← CRUD de productos + verificación sesión
│   └── assets/
│       ├── images/
│       └── video/
├── .gitignore
├── README.md
└── PLAN.md
```

---

## Descripción de Cada Archivo

| Archivo | Función |
|---|---|
| `login.html` | Página principal con formulario de login + enlace a registro + video embebido |
| `registro.html` | Formulario de registro de usuario (nombre, email, contraseña, confirmar) |
| `index.html` | Formulario de registro de productos + listado de productos (protegido) |
| `styles.css` | Estilos compartidos para las 3 páginas |
| `auth.js` | Usuarios predefinidos, funciones de login/registro y manejo de sesión |
| `login.js` | Validación de formularios de login y registro |
| `app.js` | CRUD de productos (crear, listar, editar, eliminar) + verificación de sesión |
| `.gitignore` | Excluir Instrucciones.md y archivos del sistema |
| `README.md` | Descripción del proyecto, problemática y flujo de usuario |
| `PLAN.md` | Planificación del proyecto |

---

## Fases de Implementación

### Fase 1: Configuración

- Crear `.gitignore`
- Crear carpetas: `pages/`, `css/`, `js/`, `assets/images/`, `assets/video/`
- Eliminar archivos de la raíz (`index.html`, `styles.css`)
- **Commit:** `chore: reorganizar estructura del proyecto`

### Fase 2: JavaScript - auth.js

- Definir array de usuarios predefinidos (2-3 usuarios con email y contraseña)
- Función: `buscarUsuario(email)` → busca un usuario por email en el array
- Función: `validarLogin(email, contrasena)` → verifica credenciales contra el array
- Función: `registrarUsuario(nombre, email, contrasena)` → agrega usuario al array
- Función: `guardarSesion(usuario)` → guarda datos del usuario en sessionStorage
- Función: `obtenerSesion()` → lee la sesión activa desde sessionStorage
- Función: `cerrarSesion()` → elimina la sesión de sessionStorage
- Función: `verificarSesion()` → redirige a login.html si no hay sesión (para index.html)
- **Commit:** `feat: implementar auth.js con usuarios predefinidos y lógica de sesión`

### Fase 3: HTML - login.html

- Estructura semántica: header, nav, main, section, article, footer
- Título de bienvenida al sistema
- Formulario: email + contraseña + botón "Iniciar Sesión"
- Enlace "¿No tienes cuenta? Regístrate aquí" → registro.html
- Video embebido (iframe YouTube) en una sección "Sobre nosotros"
- Footer con copyright
- Enlace al CSS
- **Commit:** `feat: crear página principal login.html con formulario y video`

### Fase 4: HTML - registro.html

- Estructura semántica: header, main, footer
- Formulario: nombre, email, contraseña, confirmar contraseña + botón "Crear Cuenta"
- Enlace "¿Ya tienes cuenta? Inicia sesión" → login.html
- Enlace al CSS
- **Commit:** `feat: crear página de registro de usuario`

### Fase 5: HTML - index.html

- Estructura semántica: header, nav, main, section, article, footer
- Botón "Cerrar Sesión" en el nav o header
- Formulario: ID, nombre, descripción, precio, categoría, stock, imagen URL
- Contenedor vacío donde JS insertará las tarjetas de productos
- Footer con copyright
- Enlace al CSS
- **Commit:** `feat: crear página de productos con formulario y listado`

### Fase 6: JavaScript - login.js

- Funciones de validación reutilizables (validarCampoVacio, validarEmail, mostrarError, limpiarErrores)
- Validación de login: verificar credenciales usando auth.js, mostrar errores específicos
- Validación de registro: nombre, email, contraseña, confirmación, mostrar errores
- Si login/registro son exitosos → guardar sesión y redirigir a index.html
- **Commit:** `feat: implementar validación de formularios de login y registro`

### Fase 7: JavaScript - app.js

- Verificar sesión al cargar la página (si no hay sesión → redirigir a login.html)
- Array en memoria para productos
- Función: registrar producto (validar + agregar)
- Función: renderizar productos (generar HTML dinámico)
- Función: editar producto (cargar datos en formulario)
- Función: eliminar producto (confirmar + borrar)
- Función: cerrar sesión (limpiar sessionStorage y redirigir a login.html)
- **Commit:** `feat: implementar CRUD de productos con verificación de sesión`

### Fase 8: CSS - styles.css

- Estilos base (reset, body, header, nav, footer)
- Estilos de formularios
- Estilos de tarjetas de productos
- Estilos de mensajes de error
- Estilos de página principal (login.html)
- Estilos de botones de acceso
- **Commit:** `feat: agregar estilos CSS compartidos`

### Fase 9: Soporte

- Crear `README.md`
- Crear `PLAN.md`
- **Commit:** `docs: agregar README y PLAN del proyecto`

### Fase 10: Push

- `git push origin main`

---

## Criterios de Evaluación y Cómo se Cumplen

| Criterio | Qué cubre | Archivo |
|---|---|---|
| IE1.1.1: Estructura semántica | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` | Las 3 páginas HTML |
| IE1.1.1: Hipervínculos | Navegación entre las 3 páginas + enlaces de auth | Las 3 páginas HTML |
| IE1.1.1: Imágenes | `<img>` con `alt` en tarjetas de productos | `index.html` |
| IE1.1.1: Botones | Submit en formularios + editar/eliminar + cerrar sesión | Las 3 páginas + `app.js` |
| IE1.1.1: Video | `<iframe>` YouTube | `login.html` |
| IE1.1.1: Formularios | 3 formularios con `<label>`, `<input>`, `<select>`, `<textarea>` | `login.html`, `registro.html`, `index.html` |
| IE1.1.1: Footer | Copyright y datos | Las 3 páginas HTML |
| IE1.1.4: CSS externo | `styles.css` enlazado en las 3 páginas | Las 3 páginas HTML |
| IE1.2.1: Validaciones JS | `preventDefault()` + validaciones antes de procesar | `login.js`, `app.js` |
| IE1.2.2: Errores claros | Mensajes específicos por campo | `login.js`, `app.js` |
| IE1.2.2: Sugerencias | `placeholder`, `autocomplete`, `minlength` | Las 3 páginas HTML |
| IE1.3.1: Commits descriptivos | 10 commits con mensajes claros | Git |
| Autenticación | Usuarios predefinidos, login/registro, sesión con sessionStorage | `auth.js` |
| Protección de rutas | Verificación de sesión en index.html, redirect si no autenticado | `app.js` |

---

## Resumen de Archivos

| Archivo | Acción |
|---|---|
| `.gitignore` | Crear |
| `README.md` | Crear |
| `PLAN.md` | Crear |
| `src/pages/login.html` | Crear |
| `src/pages/registro.html` | Crear |
| `src/pages/index.html` | Crear |
| `src/css/styles.css` | Crear |
| `src/js/auth.js` | Crear |
| `src/js/login.js` | Crear |
| `src/js/app.js` | Crear |

**Total: 10 archivos nuevos**

---

## Formularios

### login.html

Tiene formulario de login:
- Email | `input[type="email"]` | `required`, `autocomplete="email"`, `placeholder="ejemplo@correo.com"`
- Contraseña | `input[type="password"]` | `required`, `autocomplete="current-password"`, `minlength="8"`

También contiene:
- Título de bienvenida
- Enlace "¿No tienes cuenta? Regístrate aquí" → registro.html
- Video embebido (iframe YouTube)

### registro.html

| Campo | Tipo | Atributos |
|---|---|---|
| Nombre | `input[type="text"]` | `required`, `autocomplete="name"`, `placeholder="Tu nombre"` |
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
| Imagen URL | `input[type="url"]` | `required`, `placeholder="https://..."` |
| Botones | `button[type="submit"]` | Texto: "Registrar" / "Actualizar" |

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
- Email sin `@` o `.` → "Ingrese un email válido"
- Contraseña < 8 caracteres → "La contraseña debe tener al menos 8 caracteres"
- Contraseñas no coinciden → "Las contraseñas no coinciden"
- Credenciales incorrectas → "Email o contraseña incorrectos"
- Email ya registrado → "Este email ya está registrado"

### app.js

- Todos los campos obligatorios deben estar completos
- Precio y stock deben ser números positivos
- Imagen URL debe ser válida
- Verificar sesión al cargar página → redirigir a login.html si no hay sesión

---

## Elementos HTML Requeridos

- Cada campo debe tener un `<label>` con `for="idDelCampo"`
- Usar `autocomplete` en cada input
- Usar `<span class="error">` para mensajes de error
- Usar `loading="lazy"` en imágenes
- `login.html` debe tener enlace a registro.html y video embebido

---

## Usuarios Predefinidos (auth.js)

```
[
  { nombre: "Admin",  email: "admin@admin.com",  contrasena: "12345678" },
  { nombre: "Juan",   email: "juan@correo.com",  contrasena: "12345678" },
  { nombre: "Maria",  email: "maria@correo.com",  contrasena: "12345678" }
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
  imagen: String
}
```
