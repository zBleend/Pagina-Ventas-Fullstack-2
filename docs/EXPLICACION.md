# Yorozu 万 / よろず - Explicación del Proyecto

Documento de presentación: explica qué hace el proyecto, cómo funciona por dentro, y en detalle el uso de `localStorage`. Está escrito como si lo presentaras en una entrevista de trabajo.

---

## 1. Resumen ejecutivo

**Yorozu** es un sistema de gestión de productos con autenticación de usuarios, construido **100% con tecnologías frontend**: HTML5, CSS3 y JavaScript vanilla. No hay servidor, no hay base de datos y no hay ninguna dependencia externa (sin frameworks, sin `npm`, sin librerías).

El proyecto tiene dos grandes bloques:

1. **Autenticación** → un usuario se registra o inicia sesión con su correo y contraseña. Solo quienes tienen sesión activa pueden entrar al panel.
2. **Panel de productos** → un CRUD completo (crear, leer, editar, eliminar) sobre un catálogo de productos, todo persistido en el navegador.

Si tuviera que explicarlo en una frase: *una tienda-concentradora de un inventario personal, donde solo el dueño (con login) puede registrar, listar, editar o eliminar productos, y la información sobrevive la recarga de la página porque vive en el almacenamiento del navegador.*

---

## 2. Problemática que resuelve

En muchas aplicaciones web, el acceso a las funciones principales debe estar **restringido a usuarios autenticados**. Este proyecto resuelve esa problemática sin infraestructura:

- El panel está **protegido por ruta**: si no hay sesión activa, `index.html` redirige automáticamente a `login.html`.
- El usuario puede **registrarse** (los datos quedan guardados) o usar **credenciales predefinidas**.
- Un inventario de productos se **mantiene persistente entre recargas** gracias a las APIs de almacenamiento del navegador.

Es una evaluación escolar de Fullstack II, pero está planteada con decisiones de arquitectura que serían válidas en un proyecto real pequeño (SPA simple, sin backend).

---

## 3. Arquitectura

### 3.1 Vista general del flujo

```
login.html  →  valida credenciales  →  guarda sesión (sessionStorage)  →  index.html
                 │
                 └── sin cuenta → registro.html → crea usuario → vuelve a login

index.html  →  si NO hay sesión → redirige a login.html
             →  si hay sesión   → CRUD de productos + vuelca todo a localStorage
```

### 3.2 Estructura de archivos

```
src/
├── pages/
│   ├── login.html            Página principal: header + formulario de login + video de muestra
│   ├── registro.html         Formulario de creación de cuenta
│   └── index.html            Panel protegido: pestañas "Registrar" y "Ver productos"
├── css/
│   ├── styles-login.css      Tema dark cyberpunk para login
│   ├── styles-registro.css   Tema para registro
│   └── styles.css            Estilos del panel de productos
├── js/
│   ├── auth.js               Usuarios, registro, sesión y protección de rutas
│   ├── login.js              Validación de formularios (login + registro)
│   ├── app.js                CRUD de productos + rendering de la tabla
│   └── transitions.js        Animaciones de transición entre login y registro
└── assets/
    ├── images/
    │   └── portada.png       Logo de la tienda (header de login y registro)
    └── video/
        └── muestra-productos.mp4   Carrusel de muestra (autoplay, sin sonido)
```

### 3.3 Por qué vanilla (sin frameworks)

- **Cero dependencias** → el proyecto se abre con doble clic en el `.html` y funciona, no hay `node_modules`.
- **Fastidios de evaluación** controlados: cada `.html`, `.css` y `.js` se revisa de forma aislada.
- El DOM, `fetch`-less y las Web APIs nativas (`localStorage`, `sessionStorage`, `FileReader`, View Transitions) son suficientes para el alcance.

---

## 4. Funciones del proyecto por archivo

### 4.1 `auth.js` - Autenticación y sesión

**Usuarios predefinidos** (siempre disponibles, además de los que se registren):

| Email | Contraseña |
|---|---|
| `admin@correo.com` | `12345678` |
| `juan@correo.com` | `12345678` |
| `cris@correo.com` | `12345678` |
| `fran@correo.com` | `12345678` |

Funciones clave:

- `validarLogin(email, contrasena)` → devuelve `true` si las credenciales existen y coinciden.
- `registrarUsuario(nombre, email, contrasena)` → agrega el usuario a la lista persistida; rechaza emails repetidos.
- `guardarSesion(usuario)` → escribe `{ email, nombre }` en `sessionStorage`.
- `obtenerSesion()` / `cerrarSesion()` → leer/borrar la sesión activa.
- `verificarSesion()` → **guarda de seguridad**: si no hay sesión, redirige a `login.html`. Se ejecuta al abrir `index.html` y es lo que hace que el panel sea privado.

### 4.2 `login.js` - Validación de formularios

Valida campo por campo (vacio, formato de email, longitud mínima de contraseña, coincidencia) y muestra el error **debajo del campo** en `<span class="error-message">`. Si pasa la validación, delega en `auth.js` para guardar la sesión y redirigir. En el registro: un email repetido se marca con "El correo ya está registrado".

### 4.3 `app.js` - CRUD de productos

Es el corazón del panel. Puntos a destacar:

- **Carga al iniciar**: `cargarProductos()` lee la clave `productos`. Si no existe (primera visita) o está vacía, **siembra 5 productos demo** con fotos de Pexels. Así el evaluador ve la tabla llena desde el primer minuto.
- **Registrar**: valida ID (mayor que 0 y no duplicado), nombre, descripción, precio y stock. Al guardar, persiste y redibuja la tabla.
- **Imagen del producto** en dos modalidades (radio `tipoImagen`):
  - **URL** → el usuario pega un enlace directo (`https://...`).
  - **Archivo** → `<input type="file" accept="image/*">` + `FileReader.readAsDataURL()` que convierte la imagen en una `data URL` base64 y la guarda en el producto.
- **Listar**: clona el `<template id="fila-producto">` para cada producto. Rellenar con `textContent` (nunca con `innerHTML` con datos de usuario) evita brechas de XSS. Las imágenes tienen `loading="lazy"`.
- **Editar**: rellena el formulario con el producto, bloquea el ID (no se puede cambiar) y cambia el botón a "Actualizar Producto". Si la imagen era un archivo, vuelve al modo "archivo".
- **Eliminar**: pide confirmación, filtra el array y persiste de nuevo.
- **Cerrar sesión**: borra la sesión y regresa a `login.html`.

### 4.4 `transitions.js` - Transiciones entre páginas

Usa **View Transitions API** (`document.startViewTransition`, `pageswap`, `pageshow`) para animar el paso login ↔ registro: la tarjeta "hace morphing" hacia el otro formulario. Guarda la posición en `sessionStorage` para que la animación no choque con la nativa del navegador.

### 4.5 `login.html` y `registro.html` - Presentación visual

El login es la *carta de presentación* de la tienda:

```html
<section class="imagen-portada">
  <video
    src="../assets/video/muestra-productos.mp4"
    type="video/mp4"
    autoplay
    muted
    loop
    playsinline
  ></video>
</section>
```

- **Video local** (`muestra-productos.mp4`): un carrusel de productos convertido a video (H.264) que se reproduce en bucle, **sin sonido** (`muted`) y **autoplay permitido** porque va mudo.
- En el `header` está el logo (`portada.png`) como sección `.logo-portada`, con el mismo cian del tema.
- En pantallas pequeñas la disposición pasa a una sola columna (el video arriba).

---

## 5. `localStorage` en detalle

### 5.1 Qué guardamos y por qué se eligió así

| Clave | Formato | Contenido | Quién escribe |
|---|---|---|---|
| `usuariosRegistrados` | JSON string | Array de `{ nombre, email, contrasena }` | `registrarUsuario()` |
| `productos` | JSON string | Array de objetos `producto` | `cargarProductos()` / `guardarProductos()` |

Comparación con `sessionStorage` (también usado):

- `localStorage` → **persiste indefinidamente** (los usuarios y productos se conservan aunque cierres la pestaña). Ideal para "datos".
- `sessionStorage` → **vive solo mientras la pestaña esté abierta**. Ideal para la **sesión activa**: al cerrar la pestaña el usuario vuelve a estar deslogueado, que es exactamente el comportamiento esperado de un sistema de login.

### 5.2 Cómo lo implementamos

Guardar y leer se reduce a dos líneas por operación:

```javascript
localStorage.setItem("productos", JSON.stringify(productos));
const guardados = JSON.parse(localStorage.getItem("productos"));
```

Detalles de la implementación:

1. **Siembra de demo** — si la clave no existe o el array quedó vacío, `cargarProductos()` crea los 5 productos demo y los persiste. Ventaja: la primera vista del panel nunca está vacía. Consideración: esto re-siembra si el usuario borra todos los productos; la evolución sería una bandera `productosInicializado`.

2. **`try/catch` al guardar** — `localStorage` tiene un límite de ~5 MB por origen. Guardar fotos base64 (largas) puede llenarlo; si `setItem` falla, mostramos un mensaje claro bajo el campo de imagen en vez de romper la app en silencio.

```javascript
function guardarProductos() {
  try {
    localStorage.setItem("productos", JSON.stringify(productos));
  } catch {
    mostrarError("prodImagen", "No se pudo guardar (límite de almacenamiento del navegador)");
  }
}
```

3. **Safe parsing** — `cargarProductos()` envuelve el `JSON.parse` en `try/catch`: si los datos están corruptos, devuelve una lista vacía en vez de crashear.

### 5.3 Limitaciones y evolución natural

| Limitación | Qué pasa hoy | Cómo evolucionaría |
|---|---|---|
| ~5 MB de cupo | Una foto base64 grande llena el cupo rápido | Migrar a **IndexedDB** (GBs, soporta blobs binarios) |
| Sin backend | Los datos viven solo en un navegador | Subir las fotos y el catálogo a un servidor (ej. backend + base de datos) |
| Sin cifrado real | La contraseña viaja en texto plano en el navegador | Hash en un backend + validación server-side |

> En la entrevista, este punto es el que más puntos da: **saber explicar que `localStorage` es la elección correcta para una demo sin backend, y saber nombrar exactamente cuándo dejaría de serlo** (multi-dispositivo, multi-usuario, volumen grande → ahí ya necesitas servidor/IndexedDB).

---

## 6. Trade-offs y decisiones de diseño

**Decisión: persistir productos con fotos base64 en `localStorage`.**
- A favor: funciona offline, sin servidor, y las imágenes no dependen de que una URL externa siga en línea.
- En contra: consume cupo rápido; las data URLs no son ideales para muchos productos.

**Decisión: sesión en `sessionStorage`, datos de usuarios en `localStorage`.**
- Mantiene el login "pegajoso" por pestaña y cierra sesión al cerrar la pestaña, sin contradecir la persistencia de datos.

**Decisión: video local muteado en vez de iframe de YouTube.**
- Funciona sin internet y no depende de la disponibilidad de un embed; `muted` lo hace elegible para `autoplay`.

**Decisión: `textContent` para rellenar la tabla en vez de `innerHTML`.**
- Evita inyección de HTML/scripts cuando los datos pueden contener nombres o descripciones de texto libre.

---

## 7. Cómo probarlo (guion rápido para entrevista)

1. Abre `src/pages/login.html` en el navegador.
   > Inicia con el video de muestra reproduciéndose y el logo en el header.
2. Entra con `admin@correo.com` / `12345678` → te lleva a `index.html`.
   > Si abres `index.html` directo sin sesión, redirige a `login.html` (ruta protegida).
3. En el panel: registra un producto con URL de imagen, guarda, y verás la fila en la pestaña "Ver Productos".
4. Registra otro producto con "Subir archivo" (elige una foto local). Le editas el precio o lo eliminas.
5. **Recarga la página** (F5) → los productos siguen ahí: eso es `localStorage`.
6. Cierra la pestaña y vuelve a abrir `index.html` → te pide login otra vez: la sesión estaba en `sessionStorage`.

---

## 8. Posibles preguntas de entrevista (con respuestas)

**¿Por qué no usaste un backend?**
El alcance no lo requiere: la autenticación y el catálogo caben perfectamente en las Web APIs de almacenamiento, y así el proyecto queda autocontenido y evaluable sin servicio. El día que hagan falta multi-dispositivo o carga real, migramos la capa de persistencia a IndexedDB y/o un servidor.

**¿Cómo proteges el panel si todo es frontend?**
`verificarSesion()` corre al cargar `index.html` y redirige si `sessionStorage` no trae sesión. Es una protección de interfaz, no de seguridad real: en producción la verificación real pertenece al servidor; aquí la sesión solo vive en el navegador.

**¿Por qué la sesión no va en `localStorage`?**
Para que cerrar la pestaña cierre sesión. `sessionStorage` se limpia al cerrar la pestaña; `localStorage` no. Son semánticas distintas y usarlas bien demuestra que entiendes la diferencia.

**¿Y si el usuario elige una imagen enorme?**
`FileReader` lee el archivo completo; si es muy grande, `localStorage` (~5 MB) falla y el `try/catch` de `guardarProductos()` lo avisa en el formulario. La mejora natural es comprimir la imagen antes (canvas) o guardar el blob en IndexedDB.

**¿Cómo agregarías búsqueda o filtros?**
Es solo otra función sobre el mismo array: `productos.filter(...)` y `renderizarProductos()` con el resultado filtrado, sin tocar la persistencia.