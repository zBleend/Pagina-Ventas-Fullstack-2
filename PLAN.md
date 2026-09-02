# Planificación: Tienda Web - Registro de Productos

Evaluación Formativa N° 1 - Desarrollo Fullstack II (DSY1104)

---

## Estructura del Proyecto

```
Pagina-Ventas/
├── src/
│   ├── pages/
│   │   ├── index.html
│   │   ├── login.html
│   │   └── registro.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js
│   │   └── login.js
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
| `login.html` | Formulario de inicio de sesión + video embebido |
| `registro.html` | Formulario de registro de usuario |
| `index.html` | Formulario de registro de productos + listado de productos |
| `styles.css` | Estilos compartidos para las 3 páginas |
| `login.js` | Validación de formularios de login y registro |
| `app.js` | CRUD de productos (crear, listar, editar, eliminar) |
| `.gitignore` | Excluir Instrucciones.md y archivos del sistema |
| `README.md` | Descripción básica del proyecto |
| `PLAN.md` | Planificación del proyecto |

---

## Fases de Implementación

### Fase 1: Configuración

- Crear `.gitignore`
- Crear carpetas: `pages/`, `css/`, `js/`, `assets/images/`, `assets/video/`
- Eliminar archivos de la raíz (`index.html`, `styles.css`)
- **Commit:** `chore: reorganizar estructura del proyecto`

### Fase 2: HTML - login.html

- Estructura semántica: header, nav, main, section, article, footer
- Formulario: email + contraseña
- Video embebido (iframe YouTube)
- Enlaces a las 3 páginas
- **Commit:** `feat: crear página de login con formulario y video embebido`

### Fase 3: HTML - registro.html

- Misma estructura semántica
- Formulario: nombre, email, contraseña, confirmar contraseña
- Enlaces a las 3 páginas
- **Commit:** `feat: crear página de registro de usuario`

### Fase 4: HTML - index.html

- Misma estructura semántica
- Formulario: ID, nombre, descripción, precio, categoría, stock, imagen URL
- Contenedor vacío donde JS insertará las tarjetas de productos
- Enlaces a las 3 páginas
- **Commit:** `feat: crear página principal con formulario y listado de productos`

### Fase 5: JavaScript - login.js

- Validación de login (email + contraseña)
- Validación de registro (nombre, email, contraseña, confirmación)
- Mensajes de error claros
- **Commit:** `feat: implementar validación de formularios de login y registro`

### Fase 6: JavaScript - app.js

- Array en memoria para productos
- Función: registrar producto (validar + agregar)
- Función: renderizar productos (generar HTML dinámico)
- Función: editar producto (cargar datos en formulario)
- Función: eliminar producto (confirmar + borrar)
- **Commit:** `feat: implementar CRUD de productos con array en memoria`

### Fase 7: CSS - styles.css

- Estilos base (reset, body, header, nav, footer)
- Estilos de formularios
- Estilos de tarjetas de productos
- Estilos de mensajes de error
- **Commit:** `feat: agregar estilos CSS compartidos`

### Fase 8: Soporte

- Crear `README.md`
- Crear `PLAN.md`
- **Commit:** `docs: agregar README y PLAN del proyecto`

### Fase 9: Push

- `git push origin main`

---

## Criterios de Evaluación y Cómo se Cumplen

| Criterio | Qué cubre | Archivo |
|---|---|---|
| IE1.1.1: Estructura semántica | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` | Las 3 páginas HTML |
| IE1.1.1: Hipervínculos | Navegación entre las 3 páginas | Las 3 páginas HTML |
| IE1.1.1: Imágenes | `<img>` con `alt` en tarjetas de productos | `index.html` |
| IE1.1.1: Botones | Submit en formularios + editar/eliminar | Las 3 páginas + `app.js` |
| IE1.1.1: Video | `<iframe>` YouTube | `login.html` |
| IE1.1.1: Formularios | 3 formularios con `<label>`, `<input>`, `<select>`, `<textarea>` | Las 3 páginas HTML |
| IE1.1.1: Footer | Copyright y datos | Las 3 páginas HTML |
| IE1.1.4: CSS externo | `styles.css` enlazado en las 3 páginas | Las 3 páginas HTML |
| IE1.2.1: Validaciones JS | `preventDefault()` + validaciones antes de procesar | `login.js`, `app.js` |
| IE1.2.2: Errores claros | Mensajes específicos por campo | `login.js`, `app.js` |
| IE1.2.2: Sugerencias | `placeholder`, `autocomplete`, `minlength` | Las 3 páginas HTML |
| IE1.3.1: Commits descriptivos | 9 commits con mensajes claros | Git |

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
| `src/js/login.js` | Crear |
| `src/js/app.js` | Crear |

**Total: 9 archivos nuevos**

---

## Formularios

### login.html

| Campo | Tipo | Atributos |
|---|---|---|
| Email | `input[type="email"]` | `required`, `autocomplete="email"`, `placeholder="ejemplo@correo.com"` |
| Contraseña | `input[type="password"]` | `required`, `autocomplete="current-password"`, `minlength="8"` |

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

### login.js

- Campo vacío → "Este campo es obligatorio"
- Email sin `@` o `.` → "Ingrese un email válido"
- Contraseña < 8 caracteres → "La contraseña debe tener al menos 8 caracteres"
- Contraseñas no coinciden → "Las contraseñas no coinciden"

### app.js

- Todos los campos obligatorios deben estar completos
- Precio y stock deben ser números positivos
- Imagen URL debe ser válida

---

## Elementos HTML Requeridos

- Cada campo debe tener un `<label>` con `for="idDelCampo"`
- Usar `autocomplete` en cada input
- Usar `<span class="error">` para mensajes de error
- Usar `loading="lazy"` en imágenes

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
