# Guía Completa: Creando un Sistema de Gestión de Productos con Autenticación

**Evaluación Formativa N° 1 - Desarrollo Fullstack II (DSY1104)**

**Nivel:** Principiante absoluto

---

## Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [HTML Semántico](#2-html-semántico)
3. [CSS Moderno y Diseño Visual](#3-css-moderno-y-diseño-visual)
4. [JavaScript y el DOM](#4-javascript-y-el-dom)
5. [Proyecto Paso a Paso](#5-proyecto-paso-a-paso)
6. [Errores Comunes y Soluciones](#6-errores-comunes-y-soluciones)
7. [Recursos Adicionales](#7-recursos-adicionales)

---

# 1. Introducción

## 1.1. ¿Qué vamos a construir?

Vamos a crear un **sistema de gestión de productos con autenticación de usuarios**. La problemática que resolvemos es: ¿cómo restringir el acceso a funcionalidades principales solo a usuarios autenticados, usando únicamente tecnologías frontend?

El sistema tendrá 4 páginas:

| Página | Qué hace |
|---|---|
| `main.html` | Landing page con opciones de Login y Registro |
| `login.html` | Iniciar sesión (email + contraseña) |
| `registro.html` | Crear una cuenta nueva |
| `index.html` | Panel de gestión de productos (protegido) |

**Lo que podrás hacer al finalizar:**
- Ver una landing page con opciones de acceso
- Iniciar sesión con usuarios predefinidos
- Crear cuentas nuevas
- Acceder al panel de productos solo si estás autenticado
- Agregar productos con imagen, precio y categoría
- Ver todos los productos en una cuadrícula
- Editar productos existentes
- Eliminar productos
- Cerrar sesión y ser redirigido a la landing page

## 1.2. Tecnologías que usaremos

| Tecnología | Qué es | Para qué la usamos |
|---|---|---|
| **HTML5** | Lenguaje de estructura | Crear la "columna vertebral" de cada página: títulos, formularios, imágenes, botones |
| **CSS3** | Lenguaje de estilos | Pintar y decorar: colores, fuentes, tamaños, disposición en pantalla |
| **JavaScript** | Lenguaje de programación | Dar "vida" al sitio: validar formularios, guardar productos, mostrar errores |

**Metáfora:** Si la web fuera una casa:
- **HTML** es la estructura (paredes, techos, puertas, ventanas)
- **CSS** es la decoración (pintura, muebles, cortinas)
- **JavaScript** es la electricidad y el agua (hace que las cosas funcionen)

## 1.3. Estructura del proyecto

```
Pagina-Ventas/
├── src/
│   ├── pages/
│   │   ├── main.html        ← Landing page (entrada)
│   │   ├── login.html       ← Inicio de sesión
│   │   ├── registro.html    ← Registro de usuario
│   │   └── index.html       ← Gestión de productos (protegido)
│   ├── css/
│   │   └── styles.css       ← Estilos compartidos
│   ├── js/
│   │   ├── auth.js          ← Usuarios predefinidos y lógica de sesión
│   │   ├── login.js         ← Validación de formularios
│   │   └── app.js           ← Lógica de productos y verificación de sesión
│   └── assets/
│       ├── images/          ← Imágenes
│       └── video/           ← Videos
├── .gitignore
├── README.md
└── PLAN.md
```

## 1.4. Cómo leer este documento

- **Si nunca programaste:** Lee todo de principio a fin, en orden.
- **Si sabes algo de HTML:** Puedes saltar partes de la Sección 2, pero lee las secciones de CSS y JavaScript.
- **Código de ejemplo:** Todos los bloques de código tienen comentarios explicando cada línea.
- **Metáforas:** Comparo cada concepto con algo de la vida real para que sea más fácil de entender.
- **Prácticas:** Al final de cada sección hay ejercicios para practicar.

## 1.5. Frontend desde la perspectiva de un backend developer

Si vienes de Java o Python, estos son los paralelos que necesitas conocer:

| Concepto Backend | Equivalente Frontend |
|---|---|
| Archivo `.java` / `.py` | Archivo `.html` (estructura) + `.css` (estilos) + `.js` (lógica) |
| Clase con métodos | Objeto del DOM con propiedades y métodos |
| Spring Boot templates (Thymeleaf, JSP) | HTML estático + JavaScript dinámico |
| Modelo de datos (POJO) | Objeto JavaScript plain `{propiedad: valor}` |
| Base de datos | Array en memoria (o localStorage) |
| Endpoint REST | No existe - todo está en el navegador |
| Consola del servidor | Consola del navegador (F12) |
| Compilar y ejecutar | Abrir el archivo `.html` en el navegador |

## 1.6. Diferencia clave: Backend vs Frontend

**En Backend (Java/Python):**
1. Escribes código en el servidor
2. El cliente envía una petición
3. El servidor procesa y responde
4. El cliente muestra el resultado

**En Frontend (HTML/CSS/JS):**
1. El navegador descarga los archivos
2. HTML crea la estructura
3. CSS la decora
4. JavaScript hace que sea interactiva
5. TODO corre en el navegador del usuario

**No hay servidor. No hay base de datos. No hay endpoints.**
El "estado" se pierde al recargar la página (por eso usamos arrays en memoria).

---

# 2. HTML Semántico

## 2.1. ¿Qué es HTML? (La estructura de una casa)

**HTML** significa **HyperText Markup Language** (Lenguaje de Marcado de Hipertexto). No es un lenguaje de programación, sino de **estructura**. Le dice al navegador: "esto es un título", "esto es un párrafo", "esto es un formulario".

**Metáfora:** Imagina que estás construyendo una casa. Antes de poner la pintura o los muebles, necesitas los planos: dónde va cada pared, cada puerta, cada ventana. HTML son esos planos.

**Ejemplo simple:**

```html
<!-- Esto es un comentario en HTML. El navegador NO lo muestra. -->
<h1>Mi Tienda</h1>
<p>Vendemos productos increíbles.</p>
```

- `<h1>` y `</h1>` son **etiquetas** (tags). La primera abre, la segunda cierra.
- `Mi Tienda` es el **contenido** que se muestra en pantalla.
- `<!-- ... -->` es un **comentario**. Sirve para notas del programador.

## 2.2. Documento base - Esqueleto de toda página

**Toda página HTML** tiene esta estructura mínima. Es como el "esqueleto" que siempre necesitas:

```html
<!-- 1. Indica al navegador que esto es HTML5 -->
<!DOCTYPE html>

<!-- 2. Abre el documento HTML. lang="es" dice que el contenido es en español -->
<html lang="es">

  <!-- 3. <head> es la información que NO se ve en pantalla -->
  <head>
    <!-- Define la codificación de caracteres (permite tildes y ñ) -->
    <meta charset="UTF-8" />

    <!-- Hace que la página se vea bien en celulares -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Conecta el archivo CSS (los estilos) -->
    <link rel="stylesheet" href="../css/styles.css" />

    <!-- El título que aparece en la pestaña del navegador -->
    <title>Mi Tienda</title>
  </head>

  <!-- 4. <body> es TODO lo que se ve en la pantalla -->
  <body>
    <!-- Aquí va el contenido visible: títulos, formularios, imágenes... -->
  </body>

</html>
```

**Explicación línea por línea:**

| Línea | Qué hace |
|---|---|
| `<!DOCTYPE html>` | Le dice al navegador: "esto es HTML5". Siempre va primero. |
| `<html lang="es">` | Abre el documento. `lang="es"` ayuda a lectores de pantalla y buscadores. |
| `<head>` | Contiene metadatos (información sobre la página, no visible). |
| `<meta charset="UTF-8">` | Permite mostrar tildes, ñ y caracteres especiales correctamente. |
| `<meta name="viewport">` | Hace que la página se adapte a pantallas de celular. **Sin esto, se ve horrible en el móvil.** |
| `<link rel="stylesheet">` | Conecta el archivo CSS. Sin esto, la página no tiene colores ni estilos. |
| `<title>` | El texto de la pestaña del navegador. |
| `<body>` | Todo lo que el usuario ve y compra está aquí dentro. |

**Importante:** El orden de `<head>` antes de `<body>` no es opcional. Es la regla de HTML.

## 2.3. Etiquetas semánticas

HTML5 nos da etiquetas que **describen qué contienen**. En lugar de usar solo `<div>` para todo (que no dice nada), usamos etiquetas con significado:

### `<header>` - La puerta principal

```html
<!-- El header es la parte superior de la página: logo, título, navegación -->
<header>
  <h1>Mi Tienda Online</h1>
</header>
```

**Metáfora:** Es como la fachada de una tienda. Lo primero que ve el cliente. Contiene el nombre y a veces el logo.

### `<nav>` - El mapa de navegación

```html
<!-- El nav contiene los enlaces para moverse entre páginas -->
<nav>
  <ul>
    <li><a href="main.html">INICIO</a></li>
    <li><a href="login.html">LOGIN</a></li>
    <li><a href="registro.html">REGISTRO</a></li>
  </ul>
</nav>
```

**Metáfora:** Es como el letrero que dice "A la izquierda está la caja, a la derecha están los productos". Guía al usuario.

**Explicación de las etiquetas internas:**
- `<ul>` = Unordered List (lista sin orden). Crea viñetas (puntos).
- `<li>` = List Item (elemento de la lista). Cada enlace es un `<li>`.
- `<a href="...">` = Anchor (ancla). Es el enlace clicable. `href` indica a dónde lleva.

### `<main>` - El contenido principal

```html
<!-- El main envuelve TODO el contenido principal de la página -->
<!-- Solo debe haber UNO por página -->
<main>
  <!-- Aquí van las secciones con el contenido real -->
</main>
```

**Metáfora:** Es el interior de la tienda. Donde están los productos, los formularios, la información importante.

### `<section>` - Las habitaciones

```html
<!-- Una sección agrupa contenido relacionado -->
<section>
  <h2>Registrar Producto</h2>
  <!-- Aquí va el formulario de registro -->
</section>

<section>
  <h2>Productos Disponibles</h2>
  <!-- Aquí va la lista de productos -->
</section>
```

**Metáfora:** Cada sección es una "habitación" de la tienda. Una para el formulario, otra para ver productos, otra para el video.

### `<article>` - Los muebles dentro de cada habitación

```html
<!-- Un article es contenido independiente que puede ser reutilizable -->
<article>
  <h3>Laptop HP</h3>
  <p>Precio: $599.990</p>
  <img src="laptop.jpg" alt="Laptop HP de 15 pulgadas">
</article>
```

**Metáfora:** Son los "muebles" o "productos" dentro de cada habitación. Cada producto en la tienda es un `<article>`.

### `<footer>` - La firma del arquitecto

```html
<!-- El footer es el pie de página: copyright, información de contacto -->
<footer>
  <p>&copy; 2026 Mi Tienda - Evaluación Fullstack II</p>
</footer>
```

**Metáfora:** Es la tarjeta de presentación del negocio. Siempre al final, con información de contacto y copyright.

**Resumen visual:**

```
┌─────────────────────────────────┐
│  <header>  ← Fachada            │
│  ┌───────────────────────────┐  │
│  │  <nav>  ← Letrero guía   │  │
│  └───────────────────────────┘  │
├─────────────────────────────────┤
│  <main>  ← Interior de la tienda│
│  ┌───────────────────────────┐  │
│  │  <section>  ← Habitación  │  │
│  │  ┌─────────────────────┐  │  │
│  │  │  <article>  ← Mueble│  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  <section>  ← Habitación  │  │
│  │  ┌─────────────────────┐  │  │
│  │  │  <article>  ← Mueble│  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
├─────────────────────────────────┤
│  <footer>  ← Tarjeta de presentación│
└─────────────────────────────────┘
```

## 2.4. Formularios - El corazón del registro

Los formularios son la parte más importante de nuestro proyecto. Son donde el usuario escribe datos.

### `<form>` - El contenedor del formulario

```html
<!-- action="#" indica a dónde se envían los datos (usaremos JS para manejarlo) -->
<!-- method="POST" es el método de envío (para enviar datos al servidor) -->
<form id="loginForm" action="#" method="POST">
  <!-- Aquí van todos los campos del formulario -->
</form>
```

**NOTA:** En nuestro proyecto NO usaremos `action` real porque no hay servidor. JavaScript interceptará el envío.

### `<label>` - Las etiquetas descriptivas

```html
<!-- El atributo "for" conecta la etiqueta con el input -->
<!-- for="email" significa "esta etiqueta es para el campo con id="email"" -->
<label for="email">Correo Electrónico</label>
<input type="email" id="email" name="email">
```

**¿Por qué importan los labels?**
1. **Accesibilidad:** Los lectores de pantalla leen la etiqueta junto al campo.
2. **Usabilidad:** Si haces clic en la etiqueta, el cursor se mueve al campo.
3. **SEO:** Ayuda a los buscadores a entender el formulario.

### `<input>` - Los campos de entrada

Los inputs son donde el usuario escribe. El atributo `type` define qué tipo de dato espera:

#### type="text" - Texto general

```html
<label for="nombre">Nombre del Producto</label>
<!-- type="text" acepta cualquier texto -->
<!-- required significa que el campo es obligatorio -->
<!-- placeholder muestra un texto de ejemplo dentro del campo -->
<input
  type="text"
  id="nombre"
  name="nombre"
  placeholder="Ej: Laptop HP"
  required
>
```

#### type="email" - Correo electrónico

```html
<label for="email">Correo Electrónico</label>
<!-- type="email" VALIDA automáticamente que tenga formato de email -->
<!-- Si el usuario escribe "juan" sin @, el navegador muestra error -->
<input
  type="email"
  id="email"
  name="email"
  placeholder="ejemplo@correo.com"
  autocomplete="email"
  required
>
```

**¿Qué es `autocomplete="email"`?** Le dice al navegador que guarde este campo para autocompletarlo después. El usuario no tiene que escribirlo de nuevo.

#### type="password" - Contraseña

```html
<label for="contrasena">Contraseña</label>
<!-- type="password" oculta los caracteres con puntos o asteriscos -->
<input
  type="password"
  id="contrasena"
  name="contrasena"
  minlength="8"
  autocomplete="current-password"
  required
>
```

**¿Qué es `minlength="8"`?** Obliga a que la contraseña tenga al menos 8 caracteres. Si el usuario escribe menos, el navegador muestra un error.

#### type="number" - Números

```html
<label for="precio">Precio</label>
<!-- type="number" solo acepta números -->
<!-- min="0" significa que el mínimo es 0 (no se pueden poner precios negativos) -->
<!-- step="0.01" permite decimales (como 1999.50) -->
<input
  type="number"
  id="precio"
  name="precio"
  min="0"
  step="0.01"
  placeholder="19999"
  required
>
```

#### type="url" - Dirección web

```html
<label for="imagen">URL de la Imagen</label>
<!-- type="url" VALIDA que empiece con http:// o https:// -->
<input
  type="url"
  id="imagen"
  name="imagen"
  placeholder="https://ejemplo.com/imagen.jpg"
  required
>
```

#### type="submit" - Botón de envío

```html
<!-- type="submit" envía el formulario cuando se hace clic -->
<!-- El texto dentro del botón es lo que se muestra -->
<button type="submit">Iniciar Sesión</button>
```

### `<textarea>` - Campos de texto largo

```html
<label for="descripcion">Descripción</label>
<!-- textarea es para textos largos (varias líneas) -->
<!-- rows="4" significa que el campo tiene 4 filas de alto -->
<textarea
  id="descripcion"
  name="descripcion"
  rows="4"
  placeholder="Describe el producto..."
  required
></textarea>
```

### `<select>` + `<option>` - Listas desplegables

```html
<label for="categoria">Categoría</label>
<!-- select crea un menú desplegable -->
<select id="categoria" name="categoria" required>
  <!-- option es cada opción del menú -->
  <!-- value es el valor que se envía (el texto es lo que ve el usuario) -->
  <option value="">-- Selecciona una categoría --</option>
  <option value="electronica">Electrónica</option>
  <option value="ropa">Ropa</option>
  <option value="alimentos">Alimentos</option>
  <option value="otros">Otros</option>
</select>
```

**¿Por qué la primera opción tiene `value=""`?** Es una "trampa" para detectar si el usuario no seleccionó nada. Si selecciona esta opción, el formulario detecta que está vacío.

### Resumen de atributos importantes

| Atributo | Qué hace | Ejemplo |
|---|---|---|
| `required` | Obligatorio. Sin esto, el campo puede quedar vacío | `<input required>` |
| `placeholder` | Texto de ejemplo dentro del campo | `placeholder="Tu nombre"` |
| `autocomplete` | Sugiere valores guardados | `autocomplete="email"` |
| `minlength` | Mínimo de caracteres | `minlength="8"` |
| `min` | Valor mínimo (números) | `min="0"` |
| `max` | Valor máximo (números) | `max="100"` |
| `step` | Incremento (números decimales) | `step="0.01"` |
| `id` | Identificador único del campo | `id="email"` |
| `name` | Nombre del campo al enviar datos | `name="email"` |

## 2.5. Imágenes y videos

### `<img>` - Insertar imágenes

```html
<!-- src es la ruta de la imagen (puede ser URL o archivo local) -->
<!-- alt es una descripción para personas con discapacidad visual -->
<!-- loading="lazy" carga la imagen solo cuando el usuario hace scroll hasta ella -->
<img
  src="https://ejemplo.com/laptop.jpg"
  alt="Laptop HP de 15 pulgadas con teclado retroiluminado"
  loading="lazy"
>
```

**¿Por qué `alt` es importante?**
1. Si la imagen no carga, se muestra el texto alternativo.
2. Los lectores de pantalla lo leen en voz alta para personas ciegas.
3. Ayuda a Google a entender de qué trata la imagen.

### `<iframe>` - Videos de YouTube

```html
<!-- iframe incrusta contenido de otro sitio (como YouTube) -->
<!-- width="100%" significa que ocupa todo el ancho disponible -->
<!-- height="400" es la altura en píxeles -->
<!-- frameborder="0" elimina el borde del video -->
<!-- allowfullscreen permite poner el video en pantalla completa -->
<iframe
  width="100%"
  height="400"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video de presentación de la tienda"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

**¿Cómo obtener el ID de un video de YouTube?**
1. Ve al video en YouTube
2. Copia la URL: `https://www.youtube.com/watch?v=ABC123XYZ`
3. El ID es lo que viene después de `v=`: `ABC123XYZ`
4. Tu iframe sería: `src="https://www.youtube.com/embed/ABC123XYZ"`

## 2.6. Listas y navegación

### Listas con `<ul>` y `<li>`

```html
<!-- ul = Unordered List (lista con viñetas/puntos) -->
<ul>
  <li>Primer elemento</li>    <!-- li = List Item -->
  <li>Segundo elemento</li>
  <li>Tercer elemento</li>
</ul>

<!-- ol = Ordered List (lista numerada) -->
<ol>
  <li>Primer paso</li>
  <li>Segundo paso</li>
  <li>Tercer paso</li>
</ol>
```

### Hipervínculos con `<a>`

```html
<!-- a = Anchor (ancla) -->
<!-- href = HyperReference (a dónde lleva el enlace) -->
<!-- target="_blank" abre el enlace en una nueva pestaña -->
<a href="index.html">Ir al inicio</a>
<a href="https://google.com" target="_blank">Buscar en Google</a>
```

**Rutas relativas (entre archivos del proyecto):**
- `href="index.html"` → Busca el archivo en la misma carpeta
- `href="pages/index.html"` → Busca en la subcarpeta "pages"
- `href="../css/styles.css"` → Sube un nivel y busca en "css"

**El `../` es como decir "sube un nivel en la carpeta".**

## 2.7. Buenos hábitos HTML

### Indentación consistente

```html
<!-- BIEN: Cada nivel de anidación se indenta con 2 espacios -->
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <header>
      <h1>Título</h1>
    </header>
  </body>
</html>

<!-- MAL: Todo pegado, sin espacios -->
<html><head><title>Mi Página</title></head><body><header><h1>Título</h1></header></body></html>
```

### Comentarios útiles

```html
<!-- El formulario de login -->
<form id="loginForm">
  <!-- Campo de email -->
  <label for="email">Email</label>
  <input type="email" id="email">
</form>

<!-- Productos dinámicos generados por JavaScript -->
<div id="contenedorProductos">
  <!-- JS inserta las tarjetas aquí -->
</div>
```

### Cerrar todas las etiquetas

```html
<!-- BIEN: Todas las etiquetas están cerradas -->
<p>Texto</p>
<img src="foto.jpg" alt="Foto">
<br>

<!-- MAL: Etiqueta sin cerrar -->
<p>Texto
<img src="foto.jpg" alt="Foto">
```

## 2.8. Práctica: Crear login.html

**Objetivo:** Crear la estructura HTML completa de la página de login.

**Paso 1:** Crea el archivo `src/pages/login.html`

**Paso 2:** Agrega el esqueleto base (DOCTYPE, html, head, body)

**Paso 3:** Dentro del body, agrega en este orden:
1. `<header>` con un `<h1>` que diga "Mi Tienda"
2. `<main>` con 2 secciones:
   - Sección 1: Formulario de login (email + contraseña + botón)
   - Sección 2: Enlace "¿No tienes cuenta? Regístrate aquí" → registro.html
3. Enlace de vuelta a main.html
4. `<footer>` con copyright

**Verifica que:**
- Todos los `<label>` tienen `for` conectado al `id` del `<input>`
- Todos los `<input>` tienen `required`
- Los enlaces apuntan a las páginas correctas
- El formulario tiene un `id` para conectar con JavaScript

---

# 3. CSS Moderno y Diseño Visual

## 3.1. ¿Qué es CSS? (La pintura y decoración)

**CSS** significa **Cascading Style Sheets** (Hojas de Estilo en Cascada). Mientras HTML crea la estructura, CSS la **decora**: colores, tamaños, posiciones, fuentes.

**Metáfora:** Si HTML es la estructura de la casa (paredes, puertas), CSS es todo lo visual: el color de la pintura, los muebles, las cortinas, la iluminación.

**Ejemplo:**

```css
/* Esto es un comentario en CSS. El navegador NO lo muestra. */

/* Selecciona TODOS los elementos <h1> y les pone color azul */
h1 {
  color: blue;  /* Propiedad: valor; */
}
```

## 3.2. Cómo se conecta HTML con CSS

Para que los estilos se apliquen, necesitas "conectar" el CSS con el HTML. Hay 2 formas, pero solo usaremos la primera (la correcta):

### Forma 1: Archivo externo (la recomendada)

```html
<!-- En el <head> del HTML, agrega esto: -->
<link rel="stylesheet" href="../css/styles.css">
```

- `rel="stylesheet"` dice "este archivo es una hoja de estilos"
- `href="../css/styles.css"` es la ruta al archivo CSS

**Ventaja:** Un solo archivo CSS sirve para TODAS las páginas. Si cambias el color de fondo, cambia en todas partes.

### Forma 2: Dentro del HTML (NO recomendada)

```html
<!-- Puedes escribir CSS directamente en el HTML, pero NO lo hagas -->
<style>
  h1 { color: blue; }
</style>
```

**¿Por qué no?** Porque si tienes 4 páginas, tendrías que copiar los estilos 4 veces. Con un archivo externo, lo escribes una vez y sirve para todas.

## 3.3. Selectores - Cómo encontrar elementos

Los selectores son la forma en que CSS "encuentra" los elementos del HTML para estilizarlos.

### Selector de elemento

```css
/* Selecciona TODOS los <h1> de la página */
h1 {
  font-size: 2rem;     /* Tamaño de fuente */
  color: #333;         /* Color gris oscuro */
}

/* Selecciona TODOS los <p> de la página */
p {
  line-height: 1.6;    /* Espacio entre líneas */
  margin-bottom: 1rem; /* Espacio abajo del párrafo */
}
```

### Selector de clase (.)

```css
/* Selecciona cualquier elemento con class="destacado" */
/* El punto (.) antes del nombre significa "clase" */
.destacado {
  background-color: yellow;
  padding: 10px;
}
```

```html
<!-- En el HTML, usas class="destacado" -->
<p class="destacado">Este párrafo está destacado</p>
<p>Este párrafo NO está destacado</p>
```

### Selector de ID (#)

```css
/* Selecciona SOLO el elemento con id="formulario-login" */
/* El numeral (#) antes del nombre significa "ID" */
#formulario-login {
  max-width: 400px;
  margin: 0 auto;  /* Centra el formulario */
}
```

```html
<!-- En el HTML, usas id="formulario-login" -->
<!-- Un ID debe ser ÚNICO. Solo puede existir UNA vez por página -->
<form id="formulario-login">
  <!-- campos -->
</form>
```

**¿Clase vs ID?**
- **Clase (`.clase`):** Puedes usarla en múltiples elementos. Es "reutilizable".
- **ID (`#id`):** Solo puede ser de UN elemento. Es "único".

### Selector descendente

```css
/* Selecciona los <article> que están DENTRO de un <section> */
/* No afecta los <article> que estén fuera de <section> */
section article {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
}
```

**Metáfora:** Es como decir "pinta solo los muebles que están dentro de la sala", ignorando los muebles del dormitorio.

### Resumen de selectores

| Selector | Sintaxis | Ejemplo | Afecta a |
|---|---|---|---|
| Elemento | `etiqueta` | `h1 { }` | Todos los `<h1>` |
| Clase | `.nombre` | `.card { }` | Todos los `class="card"` |
| ID | `#nombre` | `#login { }` | Solo `id="login"` (único) |
| Descendente | `padre hijo` | `section p { }` | `<p>` dentro de `<section>` |

## 3.4. Propiedades fundamentales

### Colores

```css
/* Color del texto */
h1 {
  color: #333333;        /* Hexadecimal: #RRGGBB */
  color: rgb(51, 51, 51); /* RGB: rojo, verde, azul (0-255) */
  color: red;             /* Nombre del color */
}

/* Color de fondo */
body {
  background-color: #f5f5f5;  /* Gris muy claro */
}

/* Paleta de colores recomendada */
:root {
  --color-primario: #2563eb;   /* Azul principal */
  --color-secundario: #1e40af; /* Azul oscuro */
  --color-exito: #16a34a;      /* Verde (éxito) */
  --color-error: #dc2626;      /* Rojo (error) */
  --color-texto: #1f2937;      /* Gris oscuro para texto */
  --color-fondo: #f9fafb;      /* Gris muy claro de fondo */
}
```

### Tipografía

```css
body {
  /* font-family: Define qué fuente usar */
  /* El navegador intenta la primera; si no la tiene, usa la segunda, etc. */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  /* font-size: Tamaño de la fuente */
  /* 1rem = tamaño base del navegador (generalmente 16px) */
  font-size: 1rem;

  /* font-weight: Grosor del texto */
  /* normal = 400, bold = 700 */
  font-weight: normal;
}

h1 {
  font-size: 2rem;     /* 2 veces el tamaño base */
  font-weight: bold;   /* Texto en negrita */
}

p {
  font-size: 1rem;     /* Tamaño base */
  line-height: 1.6;    /* Espacio entre líneas (1.6 es legible) */
}
```

### Espaciado

```css
/* margin: Espacio FUERA del elemento (hacia afuera) */
/* padding: Espacio DENTRO del elemento (hacia adentro) */

.card {
  /* Todos los lados */
  margin: 20px;         /* 20px por todos los lados por fuera */
  padding: 15px;        /* 15px por todos los lados por dentro */

  /* Lados individuales: top right bottom left (en sentido horario) */
  margin: 10px 20px 10px 20px;  /* arriba 10, derecha 20, abajo 10, izquierda 20 */

  /* Abreviado: arriba/abajo izquierda/derecha */
  margin: 10px 20px;    /* arriba/abajo 10, izquierda/derecha 20 */
}
```

**Metáfora:**
- **Margin** es como el espacio entre tu silla y la pared.
- **Padding** es como el espacio entre el borde de tu silla y donde te sientas.

### Bordes

```css
.card {
  /* border: grosor estilo color */
  border: 1px solid #e5e7eb;  /* Borde delgado gris */

  /* border-radius: Esquinas redondeadas */
  border-radius: 8px;          /* Esquinas suaves */
  border-radius: 50%;          /* Círculo perfecto */
}
```

### Dimensiones

```css
.card {
  /* width: Ancho */
  width: 300px;          /* Ancho fijo de 300 píxeles */
  width: 100%;           /* Ancho al 100% del contenedor padre */
  width: 50vw;           /* 50% del ancho de la ventana (viewport width) */

  /* max-width: Ancho máximo (se adapta si hay menos espacio) */
  max-width: 1200px;     /* Nunca será más ancho que 1200px */

  /* height: Alto */
  height: auto;          /* Se ajusta al contenido */
  height: 200px;         /* Alto fijo */
}
```

## 3.5. Layout con Flexbox

**Flexbox** es la forma moderna de organizar elementos en fila o columna. Es como tener un "contenedor flexible" que ordena sus hijos automáticamente.

**Analogía para backend devs:** Flexbox es como un `LayoutManager` en Java Swing/JavaFX o un `flex container` en CSS de Android. La diferencia: en Java defines el layout en el código, en CSS defines el layout con propiedades.

```css
/* Esto es como decir en Java: "usar FlowLayout horizontal" */
.container {
  display: flex;
  flex-direction: row;
}

/* Esto es como decir: "usar GridLayout de 3 columnas" */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

### El concepto básico

```css
/* Cuando pones display: flex a un contenedor, sus hijos se vuelven "flex items" */
/* Por defecto, se organizan en fila (uno al lado del otro) */

.container {
  display: flex;              /* Activa Flexbox */
  gap: 20px;                  /* Espacio entre los elementos */
}
```

```html
<div class="container">
  <div class="card">Producto 1</div>
  <div class="card">Producto 2</div>
  <div class="card">Producto 3</div>
</div>
<!-- Los 3 cards se mostrarán EN FILA, uno al lado del otro -->
```

### flex-direction

```css
/* flex-direction define la dirección de los elementos */
.container {
  display: flex;
  flex-direction: row;         /* Por defecto: fila (izquierda a derecha) */
  flex-direction: row-reverse; /* Fila invertida (derecha a izquierda) */
  flex-direction: column;      /* Columna (uno debajo del otro) */
  flex-direction: column-reverse; /* Columna invertida */
}
```

### justify-content

```css
/* justify-content distribuye los elementos en el eje PRINCIPAL (horizontal en row) */
.container {
  display: flex;
  justify-content: flex-start;    /* Todos pegados a la izquierda */
  justify-content: flex-end;      /* Todos pegados a la derecha */
  justify-content: center;        /* Centrados */
  justify-content: space-between; /* Espacio uniforme entre ellos */
  justify-content: space-around;  /* Espacio alrededor de cada uno */
  justify-content: space-evenly;  /* Espacio exactamente igual */
}
```

### align-items

```css
/* align-items distribuye los elementos en el eje TRANSVERSAL (vertical en row) */
.container {
  display: flex;
  align-items: stretch;      /* Todos se estiran para tener la misma altura */
  align-items: flex-start;   /* Todos alineados arriba */
  align-items: flex-end;     /* Todos alineados abajo */
  align-items: center;       /* Todos centrados verticalmente */
}
```

### flex-wrap

```css
/* Si los elementos no caben en una fila, ¿qué pasa? */
.container {
  display: flex;
  flex-wrap: nowrap;   /* Por defecto: NO saltan línea. Se encogen. */
  flex-wrap: wrap;     /* Saltan a la siguiente línea si no caben */
}
```

### Ejemplo práctico: Cuadrícula de productos

```css
/* Contenedor de productos: cuadrícula responsive */
.contenedor-productos {
  display: flex;
  flex-wrap: wrap;           /* Los cards saltan de línea si no caben */
  gap: 20px;                 /* Espacio entre cards */
  justify-content: center;   /* Centra los cards horizontalmente */
}

/* Cada tarjeta de producto */
.producto-card {
  width: 280px;              /* Ancho fijo del card */
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background-color: white;
}
```

```html
<div class="contenedor-productos">
  <div class="producto-card">Laptop HP - $599.990</div>
  <div class="producto-card">Mouse Logitech - $19.990</div>
  <div class="producto-card">Teclado Mecánico - $49.990</div>
  <div class="producto-card">Monitor Samsung - $199.990</div>
</div>
```

## 3.6. Diseño responsivo

**Responsivo** significa que la página se adapta a diferentes tamaños de pantalla: celular, tablet, computador.

### @media queries

```css
/* Por defecto, los estilos son para escritorio */

/* Cuando la pantalla sea menor a 768px (tablets y celulares) */
@media (max-width: 768px) {
  /* Cambia el layout a columna */
  .contenedor-productos {
    flex-direction: column;
    align-items: center;
  }
}

/* Cuando la pantalla sea menor a 480px (celulares pequeños) */
@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem;  /* Reduce el tamaño del título */
  }
}
```

### Unidades relativas

| Unidad | Qué es | Cuándo usarla |
|---|---|---|
| `px` | Píxeles fijos | Bordes, sombras (cosas que no deben cambiar) |
| `rem` | Relativa al tamaño base del navegador | Tipografía, espaciado general |
| `%` | Porcentaje del contenedor padre | Anchos de elementos dentro de flex |
| `vw` | % del ancho de la ventana | Anchos que deben ocupar toda la pantalla |
| `vh` | % del alto de la ventana | Altos que deben ocupar toda la pantalla |

**Regla de oro:** Para tipografía y espaciado, usa `rem`. Para anchos de contenedores, usa `%` o `vw`.

### Mobile-first

**Mobile-first** significa: escribe los estilos para celular PRIMERO, luego usa `@media (min-width: ...)` para agregar estilos de escritorio.

```css
/* ESTILOS PARA CELULAR (base) */
.card {
  width: 100%;             /* Ocupa todo el ancho en celular */
  padding: 10px;
}

/* CUANDO LA PANTALLA SEA MAYOR A 768px (tablet+) */
@media (min-width: 768px) {
  .card {
    width: 45%;            /* Ocupa la mitad del ancho */
    padding: 20px;
  }
}

/* CUANDO LA PANTALLA SEA MAYOR A 1024px (escritorio) */
@media (min-width: 1024px) {
  .card {
    width: 30%;            /* Ocupa un tercio del ancho */
  }
}
```

## 3.7. Variables CSS (Custom Properties)

Las variables te permiten guardar valores y reutilizarlos. Si quieres cambiar un color, lo cambias UNA vez y se actualiza en todas partes.

```css
/* Las variables se definen en :root (el nivel más alto) */
:root {
  --color-primario: #2563eb;
  --color-error: #dc2626;
  --color-exito: #16a34a;
  --radio-borde: 8px;
  --sombra: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Las variables se usan con var(--nombre) */
button {
  background-color: var(--color-primario);
  border-radius: var(--radio-borde);
}

.card {
  box-shadow: var(--sombra);
  border-radius: var(--radio-borde);
}

.mensaje-error {
  color: var(--color-error);
}
```

**Ventaja:** Si mañana quieres cambiar el color primario de azul a verde, solo cambias una línea:
```css
:root {
  --color-primario: #16a34a;  /* De azul a verde */
}
```
Y TODO el sitio cambia automáticamente.

## 3.8. Efectos y transiciones

### Transiciones suaves

```css
/* transition hace que los cambios de estilo sean suaves, no bruscos */
button {
  background-color: var(--color-primario);
  transition: background-color 0.3s ease;  /* Transición de 0.3 segundos */
}

/* Cuando el mouse pasa por encima (hover) */
button:hover {
  background-color: var(--color-secundario);  /* Color más oscuro */
}
```

### Sombras

```css
/* box-shadow: eje-x eje-y desenfoque color */
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /*          x   y    blur   color con transparencia */
}

/* Sombra más pronunciada al pasar el mouse */
.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

## 3.9. El reset global

Al inicio de tu CSS, siempre debes "resetear" los estilos por defecto del navegador:

```css
/* Reset: Elimina márgenes y paddings por defecto del navegador */
* {
  margin: 0;           /* Sin márgenes */
  padding: 0;          /* Sin paddings */
  box-sizing: border-box;  /* El padding y border se incluyen en el ancho total */
}
```

**¿Qué es `box-sizing: border-box`?**

Sin `border-box`:
- Si pones `width: 300px` + `padding: 20px` + `border: 1px`, el ancho total es **342px** (300 + 20 + 20 + 1 + 1). ¡Se sale del contenedor!

Con `border-box`:
- Si pones `width: 300px` + `padding: 20px` + `border: 1px`, el ancho total es **300px**. El padding y border se "comen" el espacio interno.

**Siempre usa `box-sizing: border-box`.** Te ahorrará muchos dolores de cabeza.

## 3.10. Buenos hábitos CSS

### Organización por secciones

```css
/* ==================== */
/* RESET Y VARIABLES    */
/* ==================== */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --color-primario: #2563eb;
}

/* ==================== */
/* TIPOGRAFÍA           */
/* ==================== */
body { font-family: 'Segoe UI', sans-serif; }
h1 { font-size: 2rem; }

/* ==================== */
/* LAYOUT               */
/* ==================== */
.container { max-width: 1200px; margin: 0 auto; }

/* ==================== */
/* COMPONENTES          */
/* ==================== */
.card { border: 1px solid #e5e7eb; }
button { background-color: var(--color-primario); }

/* ==================== */
/* RESPONSIVE           */
/* ==================== */
@media (max-width: 768px) { ... }
```

### Otras buenas prácticas

```css
/* COMENTARIOS: Explica por qué haces algo, no qué haces */
/* Este padding extra es para compensar la barra de navegación fija */
body { padding-top: 60px; }

/* NOMENCLATURA CLARA: Los nombres de clase deben describir qué es */
.producto-card { }      /* BIEN: describe el componente */
.rojo { }               /* MAL: describe el color, no la función */

/* EVITAR !important */
/* MAL: */
p { color: red !important; }

/* BIEN: Usa un selector más específico */
section p { color: red; }
```

## 3.11. Práctica: Estilizar login.html

**Objetivo:** Crear los estilos CSS para la página de login.

**Paso 1:** Abre `src/css/styles.css`

**Paso 2:** Agrega el reset global y las variables (copia el código de la sección 3.9)

**Paso 3:** Estiliza en este orden:
1. Reset y variables (`:root`)
2. Tipografía base (`body`)
3. Header y nav
4. Formulario (inputs, labels, botón)
5. Mensajes de error
6. Footer
7. Responsive (`@media`)

**Resultado esperado:**
- La página tiene fondo gris claro (`#f9fafb`)
- El formulario está centrado con máximo 400px de ancho
- Los inputs tienen bordes redondeados, padding y borde gris
- Al hacer clic en un input, el borde cambia a azul (focus)
- El botón es azul, texto blanco, bordes redondeados
- Al pasar el mouse sobre el botón, el color se oscurece suavemente
- Los errores se muestran en rojo debajo del campo
- La navegación está en horizontal con enlaces azules
- El footer tiene fondo oscuro y texto blanco

**Si no te funciona, verifica:**
- ¿Conectaste el CSS en el HTML con `<link rel="stylesheet" href="../css/styles.css">`?
- ¿Las rutas son correctas? (`../` sube un nivel de carpeta)
- ¿El navegador está actualizado? (F5 o Ctrl+R)
- Abre la consola del navegador (F12) y busca errores en rojo

---

# 4. JavaScript y el DOM

## 4.0. JavaScript para developers Backend

Si vienes de Java o Python, JavaScript tiene particularidades que necesitas conocer antes de empezar.

### 4.0.1. var vs const vs let

```javascript
// Java: final String nombre = "Juan";  (const)
//       String nombre = "Juan";         (variable normal)

// JavaScript: TRES formas de declarar variables
var nombre = "Juan";    // OBSOLETO. Scope de función. NO USAR.
let nombre = "Juan";    // Variable normal. Scope de bloque (como Java).
const nombre = "Juan";  // Constante. No puede cambiar. Scope de bloque.

// Ejemplo práctico
const PI = 3.14159;     // No cambia nunca
let contador = 0;       // Puede cambiar
contador = 1;           // OK
// PI = 3;              // ERROR: Assignment to constant variable
```

**Regla simple:** Usa `const` por defecto. Si necesitas cambiar el valor, usa `let`. Nunca uses `var`.

### 4.0.2. Comparadores: =, ==, ===

```javascript
// = es ASIGNACIÓN (igual que en Java/Python)
let x = 5;

// == es IGUALDAD FLOJA (compara valor, ignora tipo)
// JavaScript intenta convertir tipos automáticamente
"5" == 5         // true  (convierte "5" a número)
"5" == "5"       // true
null == undefined // true
0 == false       // true

// === es IGUALDAD ESTRICTA (compara valor Y tipo)
// Esto es lo que debes usar SIEMPRE
"5" === 5        // false (string !== number)
"5" === "5"      // true
null === undefined // false
0 === false      // false
```

**Regla de oro:** Usa `===` SIEMPRE. El `==` causa bugs difíciles de encontrar.

### 4.0.3. Truthy y Falsy

```javascript
// En Java/Python: solo booleanos son true/false
// En JavaScript: CUALQUIER valor se convierte a booleano

// Valores FALSYS (se convierten a false):
false
0
""            // string vacío
null
undefined
NaN           // Not a Number

// Todo lo demás es TRUTHY:
"0"           // true (string no vacío)
"false"       // true (string no vacío)
[]            // true (array vacío)
{}            // true (objeto vacío)

// Útil para validaciones (como en Python: if nombre:)
if (email) {
  // Se ejecuta si email no es vacío, null, undefined, etc.
}
```

### 4.0.4. undefined vs null

```javascript
// null: "no tiene valor" (explícito, como None en Python)
let nombre = null;

// undefined: "no se ha definido" (implícito)
let apellido;
console.log(apellido);  // undefined

// Diferencia práctica:
// null = yo sé que está vacío (lo asigné yo)
// undefined = el navegador no encontró nada
```

### 4.0.5. Hoisting (Elevar)

```javascript
// JavaScript "mueve" las declaraciones al inicio automáticamente
console.log(x);  // undefined (no da error)
var x = 5;

// Equivale a:
var x;
console.log(x);  // undefined
x = 5;

// Con let/const NO pasa (da error si accedes antes de declarar):
console.log(y);  // ReferenceError
let y = 5;
```

### 4.0.6. Type Coercion (Coerción de tipos)

```javascript
// JavaScript convierte tipos automáticamente (peligroso)
"5" + 3      // "53"  (string + number = concatenación)
"5" - 3      // 2     (string - number = operación matemática)
"5" * 2      // 10
"cinco" - 1  // NaN   (No se puede convertir)

// Por eso usa ===, no ==
"5" == 5     // true  (convierte "5" a 5)
"5" === 5    // false (tipos diferentes)
```

### 4.0.7. this en JavaScript (muy diferente a Java)

```javascript
// En Java: this siempre se refiere a la instancia actual
// En JavaScript: this depende de CÓMO se llama la función

const persona = {
  nombre: "Juan",
  saludar: function() {
    console.log(this.nombre);  // "Juan" (función normal)
  }
};

const persona2 = {
  nombre: "Ana",
  saludar: () => {
    console.log(this.nombre);  // undefined (arrow function NO tiene su propio this)
  }
};
```

### 4.0.8. Métodos de arrays (como Stream en Java)

```javascript
let numeros = [1, 2, 3, 4, 5];

// .filter() = Stream.filter()
let pares = numeros.filter(n => n % 2 === 0);  // [2, 4]

// .map() = Stream.map()
let duplicados = numeros.map(n => n * 2);  // [2, 4, 6, 8, 10]

// .find() = como buscar en una lista
let encontrado = numeros.find(n => n > 3);  // 4

// .reduce() = Stream.reduce()
let suma = numeros.reduce((acc, n) => acc + n, 0);  // 15

// .forEach() = como un for-each
numeros.forEach(n => console.log(n));
```

### 4.0.9. Funciones como objetos

```javascript
// En JS, las funciones son objetos (como en Python)
function sumar(a, b) { return a + b; }

// Puedes pasar funciones como parámetros
function ejecutar(funcion, x, y) {
  return funcion(x, y);
}
ejecutar(sumar, 5, 3);  // 8

// Arrow functions son más concisas
const sumar2 = (a, b) => a + b;
const cuadrado = n => n * n;  // Un solo parámetro, sin paréntesis
```

### 4.0.10. JSON en JavaScript

```javascript
// Java: Gson o Jackson
// Python: json.dumps() / json.loads()
// JavaScript: JSON.stringify() / JSON.parse()

// Objeto a JSON string
let persona = { nombre: "Juan", edad: 30 };
let json = JSON.stringify(persona);
// '{"nombre":"Juan","edad":30}'

// JSON string a objeto
let objeto = JSON.parse('{"nombre":"Juan","edad":30}');
console.log(objeto.nombre);  // "Juan"
```

### 4.0.11. Asincronía: callbacks, Promises, async/await

```javascript
// Java: hilos, CompletableFuture
// Python: asyncio
// JavaScript: callbacks, Promises, async/await

// Callback (el estilo antiguo)
setTimeout(function() {
  console.log("Después de 2 segundos");
}, 2000);

// Promise (similar a CompletableFuture)
fetch("https://api.ejemplo.com/datos")
  .then(respuesta => respuesta.json())
  .then(datos => console.log(datos))
  .catch(error => console.error(error));

// async/await (más moderno, como Java 11+)
async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://api.ejemplo.com/datos");
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.error(error);
  }
}
```

### 4.0.12. Eventos (concepto nuevo para backend devs)

```javascript
// En Java: listeners, event handlers
// En JavaScript: addEventListener

// Escuchar un clic
document.getElementById("boton").addEventListener("click", function() {
  console.log("Hiciste clic");
});

// Escuchar envío de formulario
document.getElementById("formulario").addEventListener("submit", function(event) {
  event.preventDefault();  // Evita que la página se recargue
  console.log("Formulario enviado");
});

// Equivalente en Java:
// boton.addActionListener(e -> System.out.println("Clic"));
```

---

## 4.1. ¿Qué es JavaScript? (El cerebro de la casa)

**JavaScript** es un lenguaje de programación que hace que las páginas web sean **interactivas**. Sin JavaScript, una página web es como un libro: solo puedes leer, no puedes hacer clic en botones que hagan cosas.

**Metáfora:** Si HTML es la estructura y CSS es la decoración, JavaScript es la **electricidad**. Hace que las luces funcionen, que las puertas se abran, que el agua salga del grifo.

**Ejemplo:**

```javascript
// Esto es un comentario en JavaScript. El navegador NO lo ejecuta.

// Cuando el usuario hace clic en el botón, se ejecuta esta función
document.getElementById("miBoton").addEventListener("click", function() {
  alert("¡Hola! Hiciste clic en el botón");
});
```

## 4.2. ¿Qué es el DOM?

**DOM** significa **Document Object Model** (Modelo de Objetos del Documento). Es una representación en forma de "árbol" de todo el HTML de tu página.

### La metáfora del árbol genealógico

Imagina tu HTML como un árbol genealógico:

```
                    document
                       │
                      html
                    ┌──┴──┐
                   head   body
                    │      │
                   title  header
                            │
                           h1
```

Cada etiqueta HTML es un **nodo** del DOM. JavaScript puede "ver" y "tocar" cada nodo.

### La jerarquía del DOM

```javascript
window          // La ventana completa del navegador
  └── document  // El documento HTML completo
        └── html  // La etiqueta <html>
              ├── head  // La etiqueta <head>
              │     ├── meta
              │     ├── title
              │     └── link
              └── body  // La etiqueta <body>
                    ├── header
                    │     └── h1
                    ├── nav
                    │     └── ul
                    │           ├── li
                    │           └── li
                    ├── main
                    │     └── section
                    │           └── article
                    └── footer
```

**¿Para qué sirve esto?** Para que JavaScript pueda encontrar cualquier elemento y modificarlo:
- Cambiar el texto de un `<h1>`
- Mostrar u ocultar un `<div>`
- Agregar clases CSS a un elemento
- Crear nuevos elementos y agregarlos a la página

## 4.3. Cómo se conecta JS con HTML

```html
<!-- Puedes poner JavaScript al final del <body> -->
<!-- Esto es para que el HTML se cargue PRIMERO y luego el JS lo manipule -->
<body>
  <!-- Todo el contenido HTML -->
  <script src="../js/app.js"></script>
</body>
```

**¿Por qué al final del body?** Porque JavaScript se ejecuta en orden. Si el `<script>` estuviera en el `<head>`, intentaría encontrar elementos que aún no existen.

## 4.4. Encontrar elementos en el DOM

JavaScript necesita encontrar los elementos del HTML antes de poder modificarlos. Hay varias formas:

### getElementById

```html
<input type="text" id="nombre">
```

```javascript
// Busca el elemento con id="nombre"
// Retorna UN solo elemento (porque los IDs son únicos)
const campoNombre = document.getElementById("nombre");
```

### querySelector

```html
<form id="loginForm">
  <input type="email" id="email">
  <input type="password" id="contrasena">
</form>
```

```javascript
// Busca el PRIMER elemento que coincida con el selector CSS
const formulario = document.querySelector("#loginForm");  // Por ID
const primerInput = document.querySelector("input");      // Primer <input> de la página

// Busca por clase
const cards = document.querySelector(".producto-card");   // Primer .producto-card
```

### querySelectorAll

```html
<article class="producto-card">Laptop</article>
<article class="producto-card">Mouse</article>
<article class="producto-card">Teclado</article>
```

```javascript
// Busca TODOS los elementos que coincidan con el selector
// Retorna un array (una lista de elementos)
const todasLasTarjetas = document.querySelectorAll(".producto-card");

// Puedes recorrer el array
todasLasTarjetas.forEach(function(tarjeta) {
  console.log(tarjeta);  // Imprime cada tarjeta en la consola
});
```

### Resumen de búsqueda

| Método | Busca por | Retorna | Cuándo usarlo |
|---|---|---|---|
| `getElementById("id")` | ID | 1 elemento | Cuando conoces el ID exacto |
| `querySelector(".clase")` | Selector CSS | 1 elemento (el primero) | Cuando necesitas un selector complejo |
| `querySelectorAll(".clase")` | Selector CSS | Todos los elementos | Cuando necesitas varios elementos |

## 4.5. Escuchar eventos

Los **eventos** son acciones del usuario: clic, escribir, enviar formulario, pasar el mouse.

### addEventListener

```javascript
// Sintaxis: elemento.addEventListener("evento", función)

// Cuando el usuario haga clic en el botón
const boton = document.getElementById("miBoton");
boton.addEventListener("click", function() {
  console.log("Hiciste clic");
});

// Cuando el usuario envíe el formulario
const formulario = document.getElementById("loginForm");
formulario.addEventListener("submit", function(event) {
  // event.preventDefault() EVITA que el formulario recargue la página
  // SIN esto, cada vez que envías el formulario, la página se recarga
  event.preventDefault();

  console.log("Formulario enviado");
});
```

### Eventos comunes

| Evento | Qué lo dispara |
|---|---|
| `"click"` | Clic con el mouse |
| `"submit"` | Envío de formulario (clic en botón submit) |
| `"input"` | El usuario escribe en un campo |
| `"change"` | El usuario cambia el valor de un campo |
| `"keydown"` | Presiona una tecla |
| `"mouseover"` | El mouse pasa por encima |

### event.preventDefault()

```javascript
// SIN preventDefault: el formulario recarga la página
formulario.addEventListener("submit", function() {
  // El navegador recarga la página automáticamente
});

// CON preventDefault: el formulario NO recarga la página
formulario.addEventListener("submit", function(event) {
  event.preventDefault();  // Evita la recarga
  // Ahora puedes validar y procesar con JavaScript
});
```

**Esto es CRÍTICO.** Si olvidas `preventDefault()`, tu formulario recargará la página y perderás todos los datos.

## 4.6. Obtener valores de inputs

```html
<input type="email" id="email">
<input type="password" id="contrasena">
<button type="submit">Iniciar Sesión</button>
```

```javascript
const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function(event) {
  event.preventDefault();  // Evitar recarga

  // Obtener el valor del campo email
  const email = document.getElementById("email").value;
  //                    .value = lo que el usuario escribió

  // Obtener el valor del campo contraseña
  const contrasena = document.getElementById("contrasena").value;

  console.log("Email:", email);
  console.log("Contraseña:", contrasena);
});
```

**`.value`** es la propiedad que contiene lo que el usuario escribió en el campo.

## 4.7. Crear y modificar elementos

### Modificar el contenido de un elemento

```html
<h1 id="titulo">Mi Tienda</h1>
```

```javascript
const titulo = document.getElementById("titulo");

// Cambiar el texto
titulo.textContent = "Nueva Tienda";

// Cambiar el HTML (puedes incluir etiquetas)
titulo.innerHTML = "Nueva <em>Tienda</em>";
```

| Propiedad | Qué hace |
|---|---|
| `.textContent` | Cambia solo el texto (ignora etiquetas HTML) |
| `.innerHTML` | Cambia el contenido HTML (puedes incluir `<em>`, `<strong>`, etc.) |

### Crear un elemento nuevo

```javascript
// 1. Crear el elemento (está "en el aire", aún no está en la página)
const nuevoParrafo = document.createElement("p");

// 2. Darle contenido
nuevoParrafo.textContent = "Este es un párrafo nuevo";

// 3. Agregarlo a la página
document.body.appendChild(nuevoParrafo);
```

### Modificar atributos

```javascript
const imagen = document.getElementById("miImagen");

// Cambiar el src de una imagen
imagen.src = "https://ejemplo.com/nueva-foto.jpg";

// Cambiar el alt
imagen.alt = "Descripción de la nueva foto";
```

### Agregar y quitar clases CSS

```javascript
const elemento = document.getElementById("miElemento");

// Agregar una clase
elemento.classList.add("activo");

// Quitar una clase
elemento.classList.remove("activo");

// Cambiar una clase (si tiene la clase, la quita; si no la tiene, la agrega)
elemento.classList.toggle("activo");

// Verificar si tiene una clase
if (elemento.classList.contains("activo")) {
  console.log("El elemento está activo");
}
```

## 4.8. Validación de formularios

La validación es uno de los aspectos más importantes de nuestro proyecto. JavaScript debe verificar que los datos sean correctos ANTES de procesarlos.

### Validar campos vacíos

```javascript
function validarCampoVacio(valor, nombreCampo) {
  // .trim() elimina espacios en blanco al inicio y final
  // Si el usuario escribe solo espacios, trim() lo deja vacío
  if (valor.trim() === "") {
    mostrarError(nombreCampo, "Este campo es obligatorio");
    return false;  // La validación FALLÓ
  }
  return true;  // La validación PASÓ
}
```

### Validar formato de email

```javascript
function validarEmail(email) {
  // includes() verifica si el string contiene un carácter específico
  if (!email.includes("@")) {
    mostrarError("email", "El email debe contener @");
    return false;
  }

  if (!email.includes(".")) {
    mostrarError("email", "El email debe contener un dominio (ej: .com)");
    return false;
  }

  return true;
}
```

**NOTA:** Esta es una validación simple. En un proyecto real, usarías una expresión regular (regex) más completa.

### Validar contraseñas

```javascript
function validarContrasenas(contrasena, confirmar) {
  if (contrasena.length < 8) {
    mostrarError("contrasena", "La contraseña debe tener al menos 8 caracteres");
    return false;
  }

  if (contrasena !== confirmar) {
    mostrarError("confirmar", "Las contraseñas no coinciden");
    return false;
  }

  return true;
}
```

### Mostrar mensajes de error

```javascript
function mostrarError(campo, mensaje) {
  // Busca el <span> que muestra el error (lo crearemos en el HTML)
  const elementoError = document.getElementById("error-" + campo);

  if (elementoError) {
    elementoError.textContent = mensaje;  // Pone el texto del error
    elementoError.style.display = "block";  // Muestra el mensaje
  }
}

function limpiarErrores() {
  // Busca todos los spans de error y los oculta
  const errores = document.querySelectorAll(".error-message");
  errores.forEach(function(error) {
    error.textContent = "";
    error.style.display = "none";
  });
}
```

### Ejemplo completo de validación

```javascript
const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function(event) {
  event.preventDefault();  // Evitar recarga

  // Limpiar errores anteriores
  limpiarErrores();

  // Obtener valores
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  // Validar
  let esValido = true;

  if (!validarCampoVacio(email, "email")) {
    esValido = false;
  } else if (!validarEmail(email)) {
    esValido = false;
  }

  if (!validarCampoVacio(contrasena, "contrasena")) {
    esValido = false;
  } else if (!validarContrasenas(contrasena, "")) {
    esValido = false;
  }

  // Si todo es válido, procesar
  if (esValido) {
    console.log("Login exitoso:", email);
    alert("¡Bienvenido!");
  }
});
```

## 4.9. Arrays y objetos en JavaScript

### ¿Qué es un array?

Un **array** es una lista de elementos. Como una lista de la compra:

```javascript
// Crear un array vacío
let frutas = [];

// Agregar elementos
frutas.push("Manzana");    // frutas = ["Manzana"]
frutas.push("Pera");       // frutas = ["Manzana", "Pera"]
frutas.push("Naranja");    // frutas = ["Manzana", "Pera", "Naranja"]

// Acceder a un elemento (empieza en 0)
console.log(frutas[0]);    // "Manzana"
console.log(frutas[1]);    // "Pera"

// Longitud del array
console.log(frutas.length); // 3
```

### ¿Qué es un objeto?

Un **objeto** es como una ficha técnica: tiene datos con nombres específicos.

```javascript
// Crear un objeto
let producto = {
  id: 1,
  nombre: "Laptop HP",
  precio: 599990,
  categoria: "electronica",
  stock: 15
};

// Acceder a las propiedades
console.log(producto.nombre);     // "Laptop HP"
console.log(producto.precio);     // 599990
console.log(producto["categoria"]); // "electronica"
```

### Array de objetos (la combinación más común)

```javascript
// Un array que contiene muchos productos
let productos = [
  {
    id: 1,
    nombre: "Laptop HP",
    precio: 599990,
    categoria: "electronica"
  },
  {
    id: 2,
    nombre: "Mouse Logitech",
    precio: 19990,
    categoria: "electronica"
  },
  {
    id: 3,
    nombre: "Camiseta Nike",
    precio: 29990,
    categoria: "ropa"
  }
];

// Acceder al primer producto
console.log(productos[0].nombre);  // "Laptop HP"

// Acceder al precio del segundo producto
console.log(productos[1].precio);  // 19990
```

### Métodos útiles de arrays

```javascript
let productos = [];

// .push() - Agregar un elemento al final
productos.push({
  id: 1,
  nombre: "Laptop",
  precio: 599990
});
// productos = [{id: 1, nombre: "Laptop", precio: 599990}]

// .filter() - Crear un nuevo array con elementos que cumplan una condición
let soloElectronica = productos.filter(function(producto) {
  return producto.categoria === "electronica";
});

// .find() - Encontrar el PRIMER elemento que cumpla la condición
let productoEncontrado = productos.find(function(producto) {
  return producto.id === 1;
});

// .forEach() - Recorrer cada elemento
productos.forEach(function(producto) {
  console.log(producto.nombre);
});

// .splice() - Eliminar un elemento
// splice(indice, cantidadAEliminar)
productos.splice(0, 1);  // Elimina el primer elemento
```

### Generar IDs automáticamente

```javascript
let contadorID = 1;  // Empieza en 1

function crearProducto(datos) {
  let nuevoProducto = {
    id: contadorID,    // Usa el contador actual
    nombre: datos.nombre,
    precio: datos.precio,
    // ... más propiedades
  };

  contadorID++;  // Incrementa para el siguiente producto
  return nuevoProducto;
}
```

## 4.10. Renderizado dinámico

**Renderizar** significa "crear HTML a partir de datos". En lugar de escribir cada producto en el HTML, JavaScript los genera automáticamente.

**Analogía backend:** Es como cuando Thymeleaf o JSP generan HTML a partir de un template. Pero aquí el template lo crea JavaScript en el navegador, no en el servidor.

### Recorrer un array y crear HTML

```javascript
let productos = [
  { id: 1, nombre: "Laptop", precio: 599990, imagen: "laptop.jpg" },
  { id: 2, nombre: "Mouse", precio: 19990, imagen: "mouse.jpg" }
];

function renderizarProductos() {
  // 1. Encontrar el contenedor donde se insertarán los productos
  const contenedor = document.getElementById("contenedorProductos");

  // 2. Crear el HTML de cada producto
  let html = "";  // Variable vacía para construir el HTML

  // NOTA: Aquí usamos una arrow function () => {} y template literals ` `
  // Se explican más abajo en esta sección
  productos.forEach(producto => {
    html += `
      <article class="producto-card">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onclick="editarProducto(${producto.id})">Editar</button>
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
      </article>
    `;
  });

  // 3. Insertar el HTML en el contenedor
  contenedor.innerHTML = html;
}
```

### Template Literals (backticks)

```javascript
// NOTA PARA BACKEND DEVS:
// En Java usas: "Hola " + nombre + ", bienvenido"
// En Python usas: f"Hola {nombre}, bienvenido"
// En JavaScript moderno usas template literals con backticks (`):

let nombre = "Juan";
let saludo = `Hola ${nombre}, bienvenido`;
// Resultado: "Hola Juan, bienvenido"

// Ventaja: puedes saltar líneas sin concatenar
let html = `
  <div>
    <h1>${nombre}</h1>
    <p>Texto</p>
  </div>
`;
// Equivalente en Java sería:
// "<div>\n  <h1>" + nombre + "</h1>\n  <p>Texto</p>\n</div>"
```

### Arrow Functions

```javascript
// NOTA PARA BACKEND DEVS:
// En Java: () -> { }
// En Python: lambda x: x + 1
// En JavaScript: () => { }

// Función tradicional
productos.forEach(function(producto) {
  console.log(producto.nombre);
});

// Arrow function (más concisa)
productos.forEach(producto => {
  console.log(producto.nombre);
});

// Si es una sola línea, puedes omitir las llaves {} y el return implícito
let duplicados = productos.map(p => p.precio * 2);
// Equivalente a:
let duplicados = productos.map(function(p) { return p.precio * 2; });
```

### Cuándo renderizar

```javascript
// Renderizar cuando la página carga
renderizarProductos();

// Renderizar después de agregar un producto
productos.push(nuevoProducto);
renderizarProductos();

// Renderizar después de eliminar un producto
productos = productos.filter(p => p.id !== idAEliminar);
renderizarProductos();
```

## 4.11. Almacenamiento en memoria

En nuestro proyecto, los datos se guardan **solo en memoria**. Esto significa que cuando recargas la página, se pierde todo.

```javascript
// Este array guarda TODOS los productos
// Está en memoria RAM del navegador
let productos = [];

// Cuando agregas un producto
productos.push(nuevoProducto);

// Cuando recargas la página, productos vuelve a estar vacío []
// Porque la memoria se limpia
```

**¿Por qué lo hacemos así?**
- Es más simple (no necesitamos servidor ni base de datos)
- Para una evaluación escolar es suficiente
- Lo importante es demostrar que sabes usar arrays y DOM

**En un proyecto real,** usarías `localStorage` o una base de datos para que los datos persistan.

## 4.12. Buenos hábitos JS

### Usar const y let (nunca var)

```javascript
// BIEN:
const PI = 3.14159;       // const = constante (no cambia)
let contador = 0;         // let = variable (puede cambiar)

// MAL:
var contador = 0;         // var es antiguo y puede causar bugs
```

### Nombres descriptivos

```javascript
// BIEN: El nombre describe qué guarda
const precioTotal = 599990;
const usuariosRegistrados = [];
function validarEmail(email) { }

// MAL: Nombres genéricos que no dicen nada
const x = 599990;
const arr = [];
function val(e) { }
```

### Comentar el código

```javascript
// Calcular el precio con IVA (19%)
const iva = precio * 0.19;
const precioConIva = precio + iva;

// NOTA: El IVA de Chile es 19%. Fuente: SII.
```

### Manejar errores

```javascript
function procesarDatos() {
  try {
    // Código que podría fallar
    const datos = JSON.parse(datoInvalido);
  } catch (error) {
    // Si hay un error, se ejecuta esto
    console.error("Error al procesar:", error.message);
  }
}
```

## 4.13. Práctica: Validar login.html

**Objetivo:** Crear la validación JS del formulario de login.

**Paso 1:** Abre `src/js/login.js`

**Paso 2:** Crear las funciones de validación:
1. `validarCampoVacio(valor, nombreCampo)` → Retorna true/false
2. `validarEmail(email)` → Retorna true/false
3. `mostrarError(campo, mensaje)` → Muestra el error
4. `limpiarErrores()` → Oculta todos los errores

**Paso 3:** Enlazar el formulario:
1. Encontrar el formulario con `getElementById`
2. Agregar `addEventListener("submit", ...)`
3. Dentro del evento: `preventDefault()`, validar, mostrar errores

**Resultado esperado:**
- Al enviar el formulario vacío, se muestra "Este campo es obligatorio" en ambos campos
- Al escribir "juan" sin @, se muestra "Ingrese un email válido"
- Al escribir "12345" en contraseña, se muestra "La contraseña debe tener al menos 8 caracteres"
- Al corregir los errores y enviar de nuevo, los mensajes desaparecen
- Al enviar con datos válidos, aparece un `alert("¡Bienvenido!")`
- La página NO se recarga al enviar

**Si no te funciona, verifica:**
- ¿El `id` del formulario en el HTML coincide con el `getElementById` en el JS?
- ¿El `<script>` está al final del `<body>` en el HTML?
- Abre la consola (F12) y busca errores en rojo
- Verifica que los `<span>` de error tienen `id="error-email"` y `id="error-contrasena"`

---

# 5. Proyecto Paso a Paso

Esta sección aplica todo lo que aprendiste en las secciones anteriores. Sigue los pasos en orden y copia el código completo de cada archivo.

## 5.1. Fase 1: Configuración inicial

**Paso 1:** Verificar la estructura de carpetas

```
Pagina-Ventas/
├── src/
│   ├── pages/
│   │   ├── main.html
│   │   ├── login.html
│   │   ├── registro.html
│   │   └── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── login.js
│   │   └── app.js
│   └── assets/
│       ├── images/
│       └── video/
├── .gitignore
├── README.md
└── PLAN.md
```

**Paso 2:** Verificar que `.gitignore` excluye `Instrucciones.md`

**Paso 3:** Hacer commit
```bash
git add -A
git commit -m "chore: verificar estructura del proyecto"
```

## 5.2. Fase 2: auth.js - Usuarios y Sesión

### JavaScript - Código completo

Crea el archivo `src/js/auth.js` con el siguiente código:

```javascript
// ========================================
// USUARIOS PREDEFINIDOS
// ========================================

// Array de usuarios que ya existen en el sistema
let usuarios = [
  { nombre: "Admin", email: "admin@admin.com", contrasena: "12345678" },
  { nombre: "Juan", email: "juan@correo.com", contrasena: "12345678" },
  { nombre: "Maria", email: "maria@correo.com", contrasena: "12345678" }
];

// ========================================
// FUNCIONES DE AUTENTICACIÓN
// ========================================

// Busca un usuario por email en el array
function buscarUsuario(email) {
  return usuarios.find(function(usuario) {
    return usuario.email === email;
  });
}

// Valida las credenciales (email + contraseña)
function validarLogin(email, contrasena) {
  const usuario = buscarUsuario(email);
  if (usuario && usuario.contrasena === contrasena) {
    return true;
  }
  return false;
}

// Registra un usuario nuevo (agrega al array)
function registrarUsuario(nombre, email, contrasena) {
  // Verificar que el email no esté registrado
  const existe = buscarUsuario(email);
  if (existe) {
    return false; // Email ya registrado
  }

  // Agregar el nuevo usuario
  usuarios.push({
    nombre: nombre,
    email: email,
    contrasena: contrasena
  });
  return true; // Registro exitoso
}

// ========================================
// FUNCIONES DE SESIÓN
// ========================================

// Guarda la sesión del usuario en sessionStorage
function guardarSesion(usuario) {
  sessionStorage.setItem("usuarioActivo", JSON.stringify({
    nombre: usuario.nombre,
    email: usuario.email
  }));
}

// Obtiene la sesión activa (retorna null si no hay sesión)
function obtenerSesion() {
  const sesion = sessionStorage.getItem("usuarioActivo");
  if (sesion) {
    return JSON.parse(sesion);
  }
  return null;
}

// Cierra la sesión (elimina de sessionStorage)
function cerrarSesion() {
  sessionStorage.removeItem("usuarioActivo");
}

// Verifica si hay sesión activa. Si no, redirige a main.html
function verificarSesion() {
  const sesion = obtenerSesion();
  if (!sesion) {
    window.location.href = "main.html";
  }
}
```

**Commit:**
```bash
git add src/js/auth.js
git commit -m "feat: implementar auth.js con usuarios predefinidos y lógica de sesión"
```

## 5.3. Fase 3: main.html - Landing Page

### HTML - Código completo

Crea el archivo `src/pages/main.html` con el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/styles.css">
  <title>Mi Tienda - Bienvenido</title>
</head>
<body>
  <header>
    <h1>Mi Tienda</h1>
  </header>
  <main>
    <section>
      <h2>Bienvenido al Sistema de Gestión de Productos</h2>
      <article class="acceso-container">
        <p>Accede al panel de productos para registrar, editar y eliminar productos.</p>
        <div class="botones-acceso">
          <a href="login.html" class="btn-acceso">Iniciar Sesión</a>
          <a href="registro.html" class="btn-acceso btn-registro">Crear Cuenta</a>
        </div>
      </article>
    </section>
    <section>
      <h2>Sobre el Sistema</h2>
      <article>
        <iframe width="100%" height="400"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video de presentación del sistema"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>
      </article>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Mi Tienda - Evaluación Fullstack II</p>
  </footer>
</body>
</html>
```

**Commit:**
```bash
git add src/pages/main.html
git commit -m "feat: crear landing page main.html con opciones de acceso"
```

## 5.4. Fase 4: login.html

### HTML - Código completo

Copia esto en `src/pages/login.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/styles.css">
  <title>Iniciar Sesión - Mi Tienda</title>
</head>
<body>
  <header>
    <h1>Mi Tienda</h1>
  </header>
  <main>
    <section>
      <h2>Iniciar Sesión</h2>
      <article>
        <form id="loginForm">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" name="email"
                 placeholder="ejemplo@correo.com"
                 autocomplete="email" required>
          <span id="error-email" class="error-message"></span>

          <label for="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena"
                 minlength="8"
                 autocomplete="current-password" required>
          <span id="error-contrasena" class="error-message"></span>

          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>¿No tienes cuenta? <a href="registro.html">Regístrate aquí</a></p>
        <p><a href="main.html">← Volver a la página principal</a></p>
      </article>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Mi Tienda - Evaluación Fullstack II</p>
  </footer>
  <script src="../js/auth.js"></script>
  <script src="../js/login.js"></script>
</body>
</html>
```

**Commit:**
```bash
git add src/pages/login.html
git commit -m "feat: crear estructura HTML de login.html"
```

### JavaScript - Código completo

Copia esto en `src/js/login.js`:

```javascript
// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

// Muestra un mensaje de error debajo del campo
function mostrarError(campo, mensaje) {
  const elementoError = document.getElementById("error-" + campo);
  if (elementoError) {
    elementoError.textContent = mensaje;
    elementoError.style.display = "block";
  }
}

// Oculta todos los mensajes de error
function limpiarErrores() {
  const errores = document.querySelectorAll(".error-message");
  errores.forEach(function(error) {
    error.textContent = "";
    error.style.display = "none";
  });
}

// Verifica si un campo está vacío
function validarCampoVacio(valor, nombreCampo) {
  if (valor.trim() === "") {
    mostrarError(nombreCampo, "Este campo es obligatorio");
    return false;
  }
  return true;
}

// Verifica si un email tiene formato válido
function validarEmail(email) {
  if (!email.includes("@")) {
    mostrarError("email", "El email debe contener @");
    return false;
  }
  if (!email.includes(".")) {
    mostrarError("email", "El email debe contener un dominio (ej: .com)");
    return false;
  }
  return true;
}

// ========================================
// EVENT LISTENER DEL FORMULARIO
// ========================================

// Espera a que el usuario envíe el formulario
document.getElementById("loginForm").addEventListener("submit", function(event) {
  // Previene que la página se recargue
  event.preventDefault();

  // Limpia errores anteriores
  limpiarErrores();

  // Obtiene los valores de los campos
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  // Valida cada campo
  let esValido = true;

  if (!validarCampoVacio(email, "email")) {
    esValido = false;
  } else if (!validarEmail(email)) {
    esValido = false;
  }

  if (!validarCampoVacio(contrasena, "contrasena")) {
    esValido = false;
  } else if (contrasena.length < 8) {
    mostrarError("contrasena", "La contraseña debe tener al menos 8 caracteres");
    esValido = false;
  }

  // Si todo es válido, intenta iniciar sesión con auth.js
  if (esValido) {
    const loginExitoso = validarLogin(email, contrasena);
    if (loginExitoso) {
      const usuario = buscarUsuario(email);
      guardarSesion(usuario);
      window.location.href = "index.html";
    } else {
      mostrarError("email", "Email o contraseña incorrectos");
    }
  }
});
```

**Commit:**
```bash
git add src/js/login.js
git commit -m "feat: implementar validación de login"
```

## 5.5. Fase 5: registro.html

### HTML - Código completo

Copia esto en `src/pages/registro.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/styles.css">
  <title>Registro - Mi Tienda</title>
</head>
<body>
  <header>
    <h1>Mi Tienda</h1>
  </header>
  <main>
    <section>
      <h2>Crear Cuenta</h2>
      <article>
        <form id="registroForm">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre"
                 placeholder="Tu nombre"
                 autocomplete="name" required>
          <span id="error-nombre" class="error-message"></span>

          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" name="email"
                 placeholder="ejemplo@correo.com"
                 autocomplete="email" required>
          <span id="error-email" class="error-message"></span>

          <label for="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena"
                 minlength="8"
                 autocomplete="new-password" required>
          <span id="error-contrasena" class="error-message"></span>

          <label for="confirmar">Confirmar Contraseña</label>
          <input type="password" id="confirmar" name="confirmar"
                 minlength="8"
                 autocomplete="new-password" required>
          <span id="error-confirmar" class="error-message"></span>

          <button type="submit">Crear Cuenta</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="login.html">Inicia sesión</a></p>
        <p><a href="main.html">← Volver a la página principal</a></p>
      </article>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Mi Tienda - Evaluación Fullstack II</p>
  </footer>
  <script src="../js/auth.js"></script>
  <script src="../js/login.js"></script>
</body>
</html>
```

### JavaScript - Agregar al final de `src/js/login.js`

Agrega esto al final del archivo `login.js` que ya creaste:

```javascript
// ========================================
// VALIDACIÓN DE REGISTRO
// ========================================

// Verifica que las contraseñas coincidan
function validarContrasenas(contrasena, confirmar) {
  if (contrasena.length < 8) {
    mostrarError("contrasena", "La contraseña debe tener al menos 8 caracteres");
    return false;
  }
  if (contrasena !== confirmar) {
    mostrarError("confirmar", "Las contraseñas no coinciden");
    return false;
  }
  return true;
}

// Event listener para el formulario de registro
// Solo se ejecuta si el formulario de registro existe en la página
const registroForm = document.getElementById("registroForm");
if (registroForm) {
  registroForm.addEventListener("submit", function(event) {
    event.preventDefault();
    limpiarErrores();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmar = document.getElementById("confirmar").value;

    let esValido = true;

    if (!validarCampoVacio(nombre, "nombre")) {
      esValido = false;
    }

    if (!validarCampoVacio(email, "email")) {
      esValido = false;
    } else if (!validarEmail(email)) {
      esValido = false;
    }

    if (!validarCampoVacio(contrasena, "contrasena")) {
      esValido = false;
    }

    if (!validarCampoVacio(confirmar, "confirmar")) {
      esValido = false;
    } else if (!validarContrasenas(contrasena, confirmar)) {
      esValido = false;
    }

    // Si todo es válido, intenta registrar con auth.js
    if (esValido) {
      const registroExitoso = registrarUsuario(nombre, email, contrasena);
      if (registroExitoso) {
        alert("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.");
        window.location.href = "login.html";
      } else {
        mostrarError("email", "Este email ya está registrado");
      }
    }
  });
}
```

**Commit:**
```bash
git add src/pages/registro.html src/js/login.js
git commit -m "feat: crear página de registro con validación"
```

## 5.6. Fase 6: index.html

### HTML - Código completo

Copia esto en `src/pages/index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/styles.css">
  <title>Productos - Mi Tienda</title>
</head>
<body>
  <header>
    <h1>Mi Tienda</h1>
    <nav>
      <ul>
        <li><a href="index.html">PRODUCTOS</a></li>
        <li><a href="#" id="cerrarSesion">CERRAR SESIÓN</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section>
      <h2>Registrar Producto</h2>
      <article>
        <form id="productoForm">
          <label for="prodId">ID</label>
          <input type="number" id="prodId" name="prodId"
                 min="1" required>
          <span id="error-prodId" class="error-message"></span>

          <label for="prodNombre">Nombre</label>
          <input type="text" id="prodNombre" name="prodNombre"
                 placeholder="Ej: Laptop HP" required>
          <span id="error-prodNombre" class="error-message"></span>

          <label for="prodDescripcion">Descripción</label>
          <textarea id="prodDescripcion" name="prodDescripcion"
                    rows="3" placeholder="Describe el producto..."
                    required></textarea>
          <span id="error-prodDescripcion" class="error-message"></span>

          <label for="prodPrecio">Precio</label>
          <input type="number" id="prodPrecio" name="prodPrecio"
                 min="0" step="0.01" placeholder="19999" required>
          <span id="error-prodPrecio" class="error-message"></span>

          <label for="prodCategoria">Categoría</label>
          <select id="prodCategoria" name="prodCategoria" required>
            <option value="">-- Selecciona una categoría --</option>
            <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="alimentos">Alimentos</option>
            <option value="otros">Otros</option>
          </select>
          <span id="error-prodCategoria" class="error-message"></span>

          <label for="prodStock">Stock</label>
          <input type="number" id="prodStock" name="prodStock"
                 min="0" placeholder="10" required>
          <span id="error-prodStock" class="error-message"></span>

          <label for="prodImagen">URL de la Imagen</label>
          <input type="url" id="prodImagen" name="prodImagen"
                 placeholder="https://ejemplo.com/imagen.jpg" required>
          <span id="error-prodImagen" class="error-message"></span>

          <button type="submit" id="btnRegistrar">Registrar Producto</button>
        </form>
      </article>
    </section>
    <section>
      <h2>Productos Registrados</h2>
      <div id="contenedorProductos" class="contenedor-productos">
        <!-- JavaScript genera las tarjetas de productos aquí -->
      </div>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Mi Tienda - Evaluación Fullstack II</p>
  </footer>
  <script src="../js/auth.js"></script>
  <script src="../js/app.js"></script>
</body>
</html>
```

### JavaScript - Código completo

Copia esto en `src/js/app.js`:

```javascript
// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

// Muestra un mensaje de error debajo del campo
function mostrarError(campo, mensaje) {
  const elementoError = document.getElementById("error-" + campo);
  if (elementoError) {
    elementoError.textContent = mensaje;
    elementoError.style.display = "block";
  }
}

// Oculta todos los mensajes de error
function limpiarErrores() {
  const errores = document.querySelectorAll(".error-message");
  errores.forEach(function(error) {
    error.textContent = "";
    error.style.display = "none";
  });
}

// ========================================
// VERIFICACIÓN DE SESIÓN
// ========================================

// Si no hay sesión activa, redirigir a main.html
verificarSesion();

// ========================================
// VARIABLES GLOBALES
// ========================================

// Array para guardar todos los productos (en memoria)
let productos = [];

// Contador para generar IDs únicos
let contadorID = 1;

// ID del producto que se está editando (null si no se está editando)
let editandoId = null;

// ========================================
// CERRAR SESIÓN
// ========================================

document.getElementById("cerrarSesion").addEventListener("click", function(event) {
  event.preventDefault();
  cerrarSesion();
  window.location.href = "main.html";
});

// ========================================
// FUNCIONES CRUD
// ========================================

// Registrar o actualizar un producto
function registrarProducto(event) {
  event.preventDefault();

  // Limpiar errores anteriores
  limpiarErrores();

  // Obtener valores del formulario
  const id = document.getElementById("prodId").value;
  const nombre = document.getElementById("prodNombre").value;
  const descripcion = document.getElementById("prodDescripcion").value;
  const precio = document.getElementById("prodPrecio").value;
  const categoria = document.getElementById("prodCategoria").value;
  const stock = document.getElementById("prodStock").value;
  const imagen = document.getElementById("prodImagen").value;

  // Validar campos
  let esValido = true;

  if (!id || id < 1) {
    mostrarError("prodId", "Ingrese un ID válido (mayor a 0)");
    esValido = false;
  }

  if (!nombre.trim()) {
    mostrarError("prodNombre", "Este campo es obligatorio");
    esValido = false;
  }

  if (!descripcion.trim()) {
    mostrarError("prodDescripcion", "Este campo es obligatorio");
    esValido = false;
  }

  if (!precio || precio < 0) {
    mostrarError("prodPrecio", "Ingrese un precio válido");
    esValido = false;
  }

  if (!categoria) {
    mostrarError("prodCategoria", "Selecciona una categoría");
    esValido = false;
  }

  if (!stock || stock < 0) {
    mostrarError("prodStock", "Ingrese un stock válido");
    esValido = false;
  }

  if (!imagen.trim()) {
    mostrarError("prodImagen", "Este campo es obligatorio");
    esValido = false;
  }

  if (!esValido) return;

  // Crear objeto producto
  const producto = {
    id: parseInt(id),
    nombre: nombre,
    descripcion: descripcion,
    precio: parseFloat(precio),
    categoria: categoria,
    stock: parseInt(stock),
    imagen: imagen
  };

  // Si estamos editando, actualizar. Si no, agregar nuevo.
  if (editandoId !== null) {
    // Actualizar producto existente
    const indice = productos.findIndex(p => p.id === editandoId);
    if (indice !== -1) {
      productos[indice] = producto;
    }
    editandoId = null;
    document.getElementById("btnRegistrar").textContent = "Registrar Producto";
  } else {
    // Verificar que el ID no exista
    const existe = productos.some(p => p.id === parseInt(id));
    if (existe) {
      mostrarError("prodId", "Ya existe un producto con ese ID");
      return;
    }
    // Agregar nuevo producto
    productos.push(producto);
  }

  // Actualizar la lista visual
  renderizarProductos();

  // Limpiar el formulario
  limpiarFormulario();
}

// Renderizar (mostrar) todos los productos en la página
function renderizarProductos() {
  const contenedor = document.getElementById("contenedorProductos");
  let html = "";

  productos.forEach(function(producto) {
    html += `
      <article class="producto-card">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <h3>${producto.nombre}</h3>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>
        <p class="categoria">Categoría: ${producto.categoria}</p>
        <p class="stock">Stock: ${producto.stock}</p>
        <div class="botones-card">
          <button onclick="editarProducto(${producto.id})" class="btn-editar">Editar</button>
          <button onclick="eliminarProducto(${producto.id})" class="btn-eliminar">Eliminar</button>
        </div>
      </article>
    `;
  });

  contenedor.innerHTML = html;
}

// Cargar un producto en el formulario para editarlo
function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  // Llenar el formulario con los datos del producto
  document.getElementById("prodId").value = producto.id;
  document.getElementById("prodId").disabled = true; // No permitir cambiar el ID
  document.getElementById("prodNombre").value = producto.nombre;
  document.getElementById("prodDescripcion").value = producto.descripcion;
  document.getElementById("prodPrecio").value = producto.precio;
  document.getElementById("prodCategoria").value = producto.categoria;
  document.getElementById("prodStock").value = producto.stock;
  document.getElementById("prodImagen").value = producto.imagen;

  // Cambiar el botón a "Actualizar"
  editandoId = id;
  document.getElementById("btnRegistrar").textContent = "Actualizar Producto";
}

// Eliminar un producto
function eliminarProducto(id) {
  if (!confirm("¿Estás seguro de eliminar este producto?")) return;

  productos = productos.filter(p => p.id !== id);
  renderizarProductos();
}

// Limpiar el formulario
function limpiarFormulario() {
  document.getElementById("productoForm").reset();
  document.getElementById("prodId").disabled = false;
  editandoId = null;
  document.getElementById("btnRegistrar").textContent = "Registrar Producto";
}

// ========================================
// EVENT LISTENER
// ========================================

document.getElementById("productoForm").addEventListener("submit", registrarProducto);
```

**Commit:**
```bash
git add src/pages/index.html src/js/app.js
git commit -m "feat: crear página principal con CRUD de productos"
```

## 5.7. Fase 7: styles.css

### CSS - Código completo

Copia esto en `src/css/styles.css`:

```css
/* ==================== */
/* RESET Y VARIABLES    */
/* ==================== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-primario: #2563eb;
  --color-primario-oscuro: #1e40af;
  --color-exito: #16a34a;
  --color-error: #dc2626;
  --color-texto: #1f2937;
  --color-texto-claro: #6b7280;
  --color-fondo: #f9fafb;
  --color-borde: #e5e7eb;
  --color-blanco: #ffffff;
  --radio-borde: 8px;
  --sombra: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ==================== */
/* TIPOGRAFÍA           */
/* ==================== */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-texto);
  background-color: var(--color-fondo);
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

/* ==================== */
/* HEADER               */
/* ==================== */
header {
  background-color: var(--color-primario);
  color: var(--color-blanco);
  padding: 1.5rem 2rem;
  text-align: center;
}

/* ==================== */
/* NAV                  */
/* ==================== */
nav {
  background-color: var(--color-primario-oscuro);
  padding: 0.75rem 2rem;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

nav a {
  color: var(--color-blanco);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: var(--color-borde);
}

/* ==================== */
/* MAIN                 */
/* ==================== */
main {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

section {
  margin-bottom: 2rem;
  background-color: var(--color-blanco);
  padding: 1.5rem;
  border-radius: var(--radio-borde);
  box-shadow: var(--sombra);
}

/* ==================== */
/* FORMULARIOS          */
/* ==================== */
form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

label {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--color-texto);
}

input,
textarea,
select {
  padding: 0.75rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-borde);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-primario);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

textarea {
  resize: vertical;
}

/* ==================== */
/* BOTONES              */
/* ==================== */
button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radio-borde);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

button[type="submit"] {
  background-color: var(--color-primario);
  color: var(--color-blanco);
}

button[type="submit"]:hover {
  background-color: var(--color-primario-oscuro);
}

button[type="submit"]:active {
  transform: scale(0.98);
}

/* ==================== */
/* MENSAJES DE ERROR    */
/* ==================== */
.error-message {
  color: var(--color-error);
  font-size: 0.85rem;
  display: none;
  margin-top: -0.5rem;
}

/* ==================== */
/* TARJETAS PRODUCTOS   */
/* ==================== */
.contenedor-productos {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.producto-card {
  width: 280px;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-borde);
  padding: 1rem;
  background-color: var(--color-blanco);
  box-shadow: var(--sombra);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.producto-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.producto-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: var(--radio-borde);
  margin-bottom: 0.75rem;
}

.producto-card .descripcion {
  color: var(--color-texto-claro);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.producto-card .precio {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-primario);
  margin-bottom: 0.5rem;
}

.producto-card .categoria,
.producto-card .stock {
  font-size: 0.85rem;
  color: var(--color-texto-claro);
  margin-bottom: 0.25rem;
}

.botones-card {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.btn-editar {
  flex: 1;
  background-color: var(--color-exito);
  color: var(--color-blanco);
  font-size: 0.85rem;
  padding: 0.5rem;
}

.btn-editar:hover {
  background-color: #15803d;
}

.btn-eliminar {
  flex: 1;
  background-color: var(--color-error);
  color: var(--color-blanco);
  font-size: 0.85rem;
  padding: 0.5rem;
}

.btn-eliminar:hover {
  background-color: #b91c1c;
}

/* ==================== */
/* LANDING PAGE         */
/* ==================== */
.acceso-container {
  text-align: center;
}

.botones-acceso {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.btn-acceso {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: var(--color-primario);
  color: var(--color-blanco);
  text-decoration: none;
  border-radius: var(--radio-borde);
  font-weight: bold;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.btn-acceso:hover {
  background-color: var(--color-primario-oscuro);
  transform: scale(1.02);
}

.btn-registro {
  background-color: var(--color-exito);
}

.btn-registro:hover {
  background-color: #15803d;
}

/* ==================== */
/* FOOTER               */
/* ==================== */
footer {
  background-color: var(--color-texto);
  color: var(--color-texto-claro);
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
}

/* ==================== */
/* RESPONSIVE           */
/* ==================== */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  nav ul {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .contenedor-productos {
    flex-direction: column;
    align-items: center;
  }

  .producto-card {
    width: 100%;
    max-width: 400px;
  }

  .botones-acceso {
    flex-direction: column;
  }
}
```

**Commit:**
```bash
git add src/css/styles.css
git commit -m "feat: agregar estilos CSS completos"
```

## 5.8. Fase 8: Pulido y pruebas

**Paso 1:** Probar cada página en el navegador

Abre cada archivo HTML en tu navegador (doble clic o "Open with Live Server" en VS Code):
- `src/pages/login.html`
- `src/pages/registro.html`
- `src/pages/index.html`

**Paso 2:** Verificar
- [ ] Landing page (main.html) muestra opciones de Login y Registro
- [ ] Login redirige a index.html con credenciales válidas
- [ ] Login muestra error con credenciales incorrectas
- [ ] Registro crea cuenta y redirige a login.html
- [ ] Registro muestra error si el email ya existe
- [ ] index.html redirige a main.html si no hay sesión
- [ ] Cerrar sesión limpia la sesión y redirige a main.html
- [ ] Productos se agregan y muestran en tarjetas
- [ ] Productos se editan (clic en "Editar", cambia el formulario)
- [ ] Productos se eliminan (con confirmación)
- [ ] Video de YouTube se reproduce en main.html
- [ ] CSS se aplica correctamente (colores, márgenes, bordes)
- [ ] Responsive funciona en celular (abre DevTools y simula un celular)

**Paso 3:** Hacer push a GitHub
```bash
git push origin main
```

---

# 6. Errores Comunes y Soluciones

## 6.1. "Cannot read property of undefined"

**Causa:** JavaScript intenta usar un elemento que no existe.

**Solución:**
```javascript
// MAL: El elemento aún no existe cuando se ejecuta el JS
document.getElementById("miBoton").addEventListener("click", ...);

// BIEN: Espera a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("miBoton").addEventListener("click", ...);
});
```

## 6.2. "El event listener no funciona"

**Causas posibles:**
1. El JS se ejecuta ANTES de que el HTML exista
2. El ID del elemento está mal escrito
3. Hay un error de tipeo en el nombre del evento

**Solución:**
```javascript
// Verificar que el elemento existe
const boton = document.getElementById("miBoton");
console.log(boton);  // Si dice null, el ID está mal o el elemento no existe
```

## 6.3. "El formulario se recarga solo"

**Causa:** Olvidaste `event.preventDefault()`.

**Solución:**
```javascript
formulario.addEventListener("submit", function(event) {
  event.preventDefault();  // ¡ESTO ES OBLIGATORIO!
  // Resto del código de validación
});
```

## 6.4. "El CSS no se aplica"

**Causas posibles:**
1. El `<link>` al CSS tiene la ruta mal
2. El selector CSS no coincide con el elemento
3. Hay un error de sintaxis en el CSS

**Solución:**
```html
<!-- Verificar la ruta. Si login.html está en src/pages/ y CSS en src/css/ -->
<link rel="stylesheet" href="../css/styles.css">
<!--          ../ = sube un nivel de carpeta          -->
```

## 6.5. "El video no se muestra"

**Causas posibles:**
1. El `src` del iframe tiene la URL mal
2. YouTube bloquea el video (privado o eliminado)
3. El `allowfullscreen` no está

**Solución:**
```html
<!-- Asegúrate de usar /embed/ en lugar de /watch?v= -->
<!-- MAL:  https://www.youtube.com/watch?v=ABC123 -->
<!-- BIEN: https://www.youtube.com/embed/ABC123 -->
<iframe src="https://www.youtube.com/embed/ABC123" allowfullscreen></iframe>
```

---

# 7. Recursos Adicionales

## 7.1. Documentación oficial

| Recurso | URL | Para qué sirve |
|---|---|---|
| MDN Web Docs | developer.mozilla.org | La referencia más completa de HTML, CSS y JS |
| W3Schools | w3schools.com | Tutoriales interactivos para principiantes |
| CSS-Tricks | css-tricks.com | Guías y trucos de CSS |
| Can I Use | caniuse.com | Verificar si un navegador soporta una característica |

## 7.2. Herramientas de desarrollo

| Herramienta | Qué es | Cómo abrirla |
|---|---|---|
| Chrome DevTools | Herramientas del navegador | F12 o clic derecho → Inspeccionar |
| VS Code | Editor de código | code.visualstudio.com |
| W3C Validator | Validador de HTML | validator.w3.org |

## 7.3. Siguientes pasos

1. **Aprender React** - Framework de JavaScript para interfaces modernas
2. **Aprender Node.js** - JavaScript en el servidor (backend)
3. **Aprender bases de datos** - MySQL, MongoDB
4. **Aprender Git a fondo** - Ramas, merge, pull requests
5. **Crear un proyecto personal** - Aplicar todo lo aprendido

---

**FIN DE LAS INSTRUCCIONES**

*Guía creada para la Evaluación Formativa N° 1 - Desarrollo Fullstack II (DSY1104)*
