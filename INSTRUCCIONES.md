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

El sistema tendrá 3 páginas:

| Página | Qué hace |
|---|---|
| `login.html` | Página principal con formulario de login, imagen de portada y enlace a registro |
| `registro.html` | Crear una cuenta nueva |
| `index.html` | Panel de gestión de productos (protegido) |

**Lo que podrás hacer al finalizar:**
- Ver la página principal con formulario de login, imagen de portada y enlace a registro
- Iniciar sesión con usuarios predefinidos
- Crear cuentas nuevas
- Acceder al panel de productos solo si estás autenticado
- Agregar productos con ID, nombre, descripción, precio, categoría, stock e imagen
- Ver todos los productos en una tabla horizontal
- Editar productos existentes
- Eliminar productos
- Cerrar sesión y ser redirigido a la página de login

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
Pagina-Ventas-Fullstack-2/
├── src/
│   ├── pages/
│   │   ├── login.html          ← Página principal (login + portada)
│   │   ├── registro.html       ← Registro de usuario
│   │   └── index.html          ← Gestión de productos (protegido)
│   ├── css/
│   │   ├── styles-login.css    ← Estilos de la página de login
│   │   ├── styles-registro.css ← Estilos de la página de registro
│   │   └── styles.css          ← Estilos del panel de productos (index)
│   ├── js/
│   │   ├── auth.js             ← Usuarios predefinidos y lógica de sesión
│   │   ├── login.js            ← Validación de formularios (login + registro)
│   │   ├── app.js              ← Lógica de productos y verificación de sesión
│   │   └── transitions.js      ← Animaciones entre login y registro
│   └── assets/
│       └── images/
│           └── portada.png     ← Imagen de portada de la tienda
├── .gitignore
├── README.md
├── PLAN.md
└── INSTRUCCIONES.md
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
    <li><a href="login.html">INICIO</a></li>
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
1. `<header>` con un `<h1>` que diga "Yorozu 万 / よろず"
2. `<main>` con:
   - Imagen de portada (`portada.png`)
   - Sección con el formulario de login (email + contraseña + botón)
   - Enlace "¿No tiene cuenta? Regístrese ahora mismo" → registro.html
3. `<footer>` con copyright

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

**Paso 1:** Abre `src/css/styles-login.css`

**Paso 2:** Agrega el import de Google Fonts, el reset global y las variables (copia el código de las secciones 3.7 y 3.9)

**Paso 3:** Estiliza en este orden:
1. Reset y variables (`:root`)
2. Tipografía base (`body.login-page`)
3. Header
4. Grid del main: imagen de portada a la izquierda, tarjeta de login a la derecha
5. Formulario (inputs, labels, botón)
6. Mensajes de error
7. Footer
8. Responsive (`@media`)

**Resultado esperado:**
- La página tiene fondo oscuro (`#0a0e17`)
- Layout en grid de 2 columnas: imagen de portada con borde cyan y tarjeta con el login
- La tarjeta del formulario tiene fondo `#1a2035` y borde sutil
- Los inputs tienen fondo oscuro, bordes redondeados y al enfocarse el borde se ilumina cyan
- El botón es cyan con hover con glow
- Los errores se muestran en rojo (`#f87171`) debajo del campo
- El footer tiene borde superior sutil y texto apagado
- En móvil la imagen pasa arriba del formulario (grid de 1 columna)

**Si no te funciona, verifica:**
- ¿Conectaste el CSS en el HTML con `<link rel="stylesheet" href="../css/styles-login.css">`?
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
Pagina-Ventas-Fullstack-2/
├── src/
│   ├── pages/
│   │   ├── login.html
│   │   ├── registro.html
│   │   └── index.html
│   ├── css/
│   │   ├── styles-login.css
│   │   ├── styles-registro.css
│   │   └── styles.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── login.js
│   │   ├── app.js
│   │   └── transitions.js
│   └── assets/
│       └── images/
│           └── portada.png
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

Los 4 usuarios predefinidos están en `USUARIOS_INICIALES`. Los usuarios que se registran en `registro.html` se **persisten en `localStorage`** (clave `usuariosRegistrados`): al recargar o navegar, la cuenta creada sigue existiendo y puede iniciar sesión. Al cargar, el array `usuarios` combina los predefinidos con los guardados.

```javascript
const USUARIOS_INICIALES = [
  { nombre: "Admin", email: "admin@correo.com", contrasena: "12345678" },
  { nombre: "Juan", email: "juan@correo.com", contrasena: "12345678" },
  { nombre: "Cristobal", email: "cris@correo.com", contrasena: "12345678" },
  { nombre: "Francisca", email: "fran@correo.com", contrasena: "12345678" },
];

let usuarios = cargarUsuarios();

function cargarUsuarios() {
  let guardados = [];
  try {
    const datos = localStorage.getItem("usuariosRegistrados");
    if (datos) {
      guardados = JSON.parse(datos);
    }
  } catch {}
  return USUARIOS_INICIALES.concat(guardados);
}

function guardarUsuarios() {
  try {
    const registrados = usuarios.filter(function (usuario) {
      return !USUARIOS_INICIALES.some(function (inicial) {
        return inicial.email === usuario.email;
      });
    });
    localStorage.setItem("usuariosRegistrados", JSON.stringify(registrados));
  } catch {}
}

// ponytail: contraseñas en texto plano en localStorage, suficiente para la práctica.
// Para un sistema real usar hash del lado del servidor.

function buscarUsuario(email) {
  return usuarios.find(function (usuario) {
    return usuario.email === email;
  });
}

function validarLogin(email, contrasena) {
  const usuario = buscarUsuario(email);
  if (usuario && usuario.contrasena === contrasena) {
    return true;
  }
  return false;
}

function registrarUsuario(nombre, email, contrasena) {
  const existe = buscarUsuario(email);
  if (existe) {
    return false;
  }
  usuarios.push({
    nombre: nombre,
    email: email,
    contrasena: contrasena,
  });
  guardarUsuarios();
  return true;
}

function guardarSesion(usuario) {
  sessionStorage.setItem(
    "usuarioActivo",
    JSON.stringify({
      nombre: usuario.nombre,
      email: usuario.email,
    }),
  );
}

function obtenerSesion() {
  const sesion = sessionStorage.getItem("usuarioActivo");
  if (sesion) {
    return JSON.parse(sesion);
  }
  return null;
}

function cerrarSesion() {
  sessionStorage.removeItem("usuarioActivo");
}

function verificarSesion() {
  const sesion = obtenerSesion();
  if (!sesion) {
    window.location.href = "login.html";
  }
}
```

**Commit:**
```bash
git add src/js/auth.js
git commit -m "feat: implementar auth.js con usuarios predefinidos y lógica de sesión"
```

## 5.3. Fase 3: login.html - Página Principal

### HTML - Código completo

Crea el archivo `src/pages/login.html` con el siguiente código:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yorozu 万 / よろず - Iniciar Sesión</title>
    <link rel="stylesheet" href="../css/styles-login.css" />
  </head>
  <body class="login-page">
    <header>
      <h1>Yorozu 万 / よろず - Registro de productos</h1>
    </header>

    <main class="login-main">
      <section class="login-section" aria-labelledby="login-title">
        <h2 id="login-title">Iniciar sesión</h2>

        <form id="loginForm" novalidate>
          <label for="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="cristobal@gmail.com"
            autocomplete="email"
            aria-describedby="error-email"
            required
          />
          <span
            id="error-email"
            class="error-message"
            aria-live="polite"
          ></span>

          <label for="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            minlength="8"
            autocomplete="current-password"
            placeholder="Contraseña"
            aria-describedby="error-contrasena"
            required
          />
          <span
            id="error-contrasena"
            class="error-message"
            aria-live="polite"
          ></span>

          <button type="submit">Iniciar sesión</button>
        </form>

        <section class="boton-cuenta-nueva">
          <p>¿No tiene cuenta? ¡Regístrese ahora mismo!</p>
          <a href="registro.html" class="button">Crear cuenta nueva</a>
        </section>
      </section>

      <section class="imagen-portada">
        <img
          src="../assets/images/portada.png"
          alt="Portada de la tienda con productos"
          height="600"
          width="600"
        />
      </section>
    </main>

    <footer>
      <p>&copy; Registro de productos - Evaluación Fullstack II</p>
    </footer>

    <script src="../js/auth.js"></script>
    <script src="../js/login.js"></script>
    <script src="../js/transitions.js"></script>
  </body>
</html>
```

> **Nota:** `login.html` y `registro.html` NO cargan `app.js`. Ese archivo es exclusivo del panel protegido (`index.html`); cargarlo en login/registro redirigiría a login.html al no existir sesión, rompiendo el registro.

**Commit:**
```bash
git add src/pages/login.html
git commit -m "feat: crear página principal login.html con formulario y portada"
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
  errores.forEach(function (error) {
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
    mostrarError("email", "El correo debe contener @");
    return false;
  }
  if (!email.includes(".")) {
    mostrarError("email", "El correo debe contener un dominio (ej: .com)");
    return false;
  }
  return true;
}

// ========================================
// VALIDACIÓN DE LOGIN
// ========================================

// El listener solo se crea si el formulario de login existe en la página
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    // Previene que la página se recargue
    event.preventDefault();
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
      mostrarError(
        "contrasena",
        "La contraseña debe tener al menos 8 caracteres",
      );
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
        mostrarError("email", "Correo o contraseña incorrecto");
      }
    }
  });
}

// ========================================
// VALIDACIÓN DE REGISTRO
// ========================================

// Verifica que las contraseñas coincidan
function validarContrasenas(contrasena, confirmar) {
  if (contrasena.length < 8) {
    mostrarError(
      "contrasena",
      "La contraseña debe tener al menos 8 caracteres",
    );
    return false;
  }
  if (contrasena !== confirmar) {
    mostrarError("confirmar", "Las contraseñas no coinciden");
    return false;
  }
  return true;
}

// El listener solo se crea si el formulario de registro existe en la página
const registroForm = document.getElementById("registerForm");
if (registroForm) {
  registroForm.addEventListener("submit", function (event) {
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
        alert("¡Cuenta creada con exito! Ahora puedes iniciar sesión.");
        window.location.href = "login.html";
      } else {
        mostrarError("email", "El correo ya está registrado");
      }
    }
  });
}
```

> **Nota:** `login.js` sirve para login.html y registro.html. Los listeners se crean solo si existe el formulario correspondiente en la página (`if (loginForm)`, `if (registroForm)`).

**Commit:**
```bash
git add src/js/login.js
git commit -m "feat: implementar validación de login y registro"
```

## 5.4. Fase 4: registro.html

### HTML - Código completo

Copia esto en `src/pages/registro.html`:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yorozu 万 / よろず - Registro</title>
    <link rel="stylesheet" href="../css/styles-registro.css" />
  </head>
  <body class="register-page">
    <header>
      <h1>Yorozu 万 / よろず - Registro de productos</h1>
      <section class="imagen-portada">
        <img
          src="../assets/images/portada.png"
          alt="Portada de la tienda con productos"
        />
      </section>
    </header>

    <main class="register-main">
      <h2>Registrarse en el Sistema</h2>
      <form id="registerForm">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Nombre de usuario"
          autocomplete="name"
          required
        />
        <span id="error-nombre" class="error-message"></span>

        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="cristobal@gmail.com"
          autocomplete="email"
          required
        />
        <span id="error-email" class="error-message"></span>

        <label for="contrasena">Contraseña</label>
        <input
          type="password"
          name="contrasena"
          id="contrasena"
          minlength="8"
          autocomplete="new-password"
          placeholder="Contraseña"
          required
        />
        <span id="error-contrasena" class="error-message"></span>

        <label for="confirmar">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmar"
          id="confirmar"
          minlength="8"
          autocomplete="new-password"
          placeholder="Confirmar Contraseña"
          required
        />
        <span id="error-confirmar" class="error-message"></span>

        <button type="submit">Crear cuenta</button>
      </form>
      <p>¿Ya tienes cuenta? <a href="login.html">Inicia sesion</a></p>
    </main>

    <footer>
      <p>&copy; Registro de productos - Evaluación Fullstack II</p>
    </footer>
    <script src="../js/auth.js"></script>
    <script src="../js/login.js"></script>
    <script src="../js/transitions.js"></script>
  </body>
</html>
```

> **Nota:** No se agrega JavaScript nuevo aquí. La validación de registro ya está en `login.js` (sección 5.3), donde el listener de `#registerForm` se crea solo si el formulario existe.

**Commit:**
```bash
git add src/pages/registro.html
git commit -m "feat: crear página de registro con validación"
```

## 5.6. Fase 6: index.html - Panel de Productos

El panel tiene **dos interfaces separadas** dentro del mismo HTML, conmutables con las pestañas: una para **registrar/editar** productos y otra para **verlos** en una tabla horizontal.

### HTML - Código completo

Copia esto en `src/pages/index.html`:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/styles.css" />
    <title>Yorozu 万 / よろず - Panel de Productos</title>
  </head>
  <body>
    <header>
      <h1>Yorozu 万 / よろず - Registro de productos</h1>
      <nav>
        <ul>
          <li><a href="index.html">PRODUCTOS</a></li>
          <li><a href="#" id="cerrar-sesion">CERRAR SESIÓN</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <nav class="vistas-nav" aria-label="Secciones del panel">
        <button
          type="button"
          class="tab-btn activa"
          data-vista="registro"
          aria-selected="true"
        >
          Registrar Producto
        </button>
        <button
          type="button"
          class="tab-btn"
          data-vista="lista"
          aria-selected="false"
        >
          Ver Productos
        </button>
      </nav>

      <section
        id="vista-registro"
        class="vista activa"
        aria-labelledby="registro-producto-title"
      >
        <h2 id="registro-producto-title">Registrar Producto</h2>
        <article>
          <form id="productoForm" novalidate>
            <label for="prodId">ID</label>
            <input
              type="number"
              id="prodId"
              name="prodId"
              min="1"
              placeholder="1"
              required
            />
            <span
              id="error-prodId"
              class="error-message"
              aria-live="polite"
            ></span>

            <label for="prodNombre">Nombre</label>
            <input
              type="text"
              id="prodNombre"
              name="prodNombre"
              placeholder="Ej: Laptop HP"
              autocomplete="off"
              required
            />
            <span
              id="error-prodNombre"
              class="error-message"
              aria-live="polite"
            ></span>

            <label for="prodDescripcion">Descripción</label>
            <textarea
              id="prodDescripcion"
              name="prodDescripcion"
              rows="3"
              placeholder="Describe el producto..."
              required
            ></textarea>
            <span
              id="error-prodDescripcion"
              class="error-message"
              aria-live="polite"
            ></span>

            <label for="prodPrecio">Precio</label>
            <input
              type="number"
              id="prodPrecio"
              name="prodPrecio"
              min="0"
              step="0.01"
              placeholder="19999"
              required
            />
            <span
              id="error-prodPrecio"
              class="error-message"
              aria-live="polite"
            ></span>

            <label for="prodCategoria">Categoría</label>
            <select id="prodCategoria" name="prodCategoria" required>
              <option value="">-- Selecciona una categoría --</option>
              <option value="electronica">Electrónica</option>
              <option value="ropa">Ropa</option>
              <option value="alimentos">Alimentos</option>
              <option value="otros">Otros</option>
            </select>
            <span
              id="error-prodCategoria"
              class="error-message"
              aria-live="polite"
            ></span>

            <label for="prodStock">Stock</label>
            <input
              type="number"
              id="prodStock"
              name="prodStock"
              min="0"
              placeholder="10"
              required
            />
            <span
              id="error-prodStock"
              class="error-message"
              aria-live="polite"
            ></span>

            <label for="prodImagen">URL de la Imagen</label>
            <input
              type="url"
              id="prodImagen"
              name="prodImagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              required
            />
            <span
              id="error-prodImagen"
              class="error-message"
              aria-live="polite"
            ></span>

            <button type="submit" id="btnRegistrar">Registrar Producto</button>
          </form>
        </article>
      </section>

      <section
        id="vista-lista"
        class="vista"
        aria-labelledby="productos-title"
      >
        <div class="lista-cabecera">
          <h2 id="productos-title">Productos Registrados</h2>
          <button type="button" id="btn-nuevo-producto">
            Agregar Producto
          </button>
        </div>
        <article class="tabla-contenedor">
          <table aria-label="Lista de productos registrados">
            <thead>
              <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoría</th>
                <th scope="col">Stock</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody id="contenedorProductos">
              <!-- JavaScript genera las filas de productos aquí -->
            </tbody>
          </table>
        </article>
      </section>
    </main>

    <footer>
      <p>&copy; Registro de productos - Evaluación Fullstack II</p>
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
// VERIFICACIÓN DE SESIÓN
// ========================================

// Si no hay sesión activa, redirige a login.html
verificarSesion();

// ========================================
// VARIABLES GLOBALES
// ========================================

// Array para guardar los productos (en memoria)
let productos = [];

// ID del producto que se está editando (null si no se está editando)
let editandoId = null;

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

// Muestra una de las dos vistas del panel y marca la pestaña activa
function mostrarVista(vista) {
  document.querySelectorAll(".vista").forEach(function (seccion) {
    seccion.classList.toggle("activa", seccion.id === "vista-" + vista);
  });

  document.querySelectorAll(".tab-btn").forEach(function (boton) {
    const activo = boton.dataset.vista === vista;
    boton.classList.toggle("activa", activo);
    boton.setAttribute("aria-selected", activo ? "true" : "false");
  });
}

// Oculta todos los mensajes de error
function limpiarErrores() {
  const errores = document.querySelectorAll(".error-message");
  errores.forEach(function (error) {
    error.textContent = "";
    error.style.display = "none";
  });
}

// ========================================
// CERRAR SESIÓN
// ========================================

document
  .getElementById("cerrar-sesion")
  .addEventListener("click", function (event) {
    event.preventDefault();
    cerrarSesion();
    window.location.href = "login.html";
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
    id: parseInt(id, 10),
    nombre: nombre,
    descripcion: descripcion,
    precio: parseFloat(precio),
    categoria: categoria,
    stock: parseInt(stock, 10),
    imagen: imagen,
  };

  // Si estamos editando, actualizar. Si no, agregar nuevo.
  if (editandoId !== null) {
    const indice = productos.findIndex((p) => p.id === editandoId);
    if (indice !== -1) {
      productos[indice] = producto;
    }
    editandoId = null;
    document.getElementById("btnRegistrar").textContent = "Registrar Producto";
  } else {
    // Verificar que el ID no exista
    const existe = productos.some((p) => p.id === producto.id);
    if (existe) {
      mostrarError("prodId", "Ya existe un producto con ese ID");
      return;
    }
    productos.push(producto);
  }

  // Actualizar la lista visual y mostrar la vista de productos
  renderizarProductos();
  mostrarVista("lista");

  // Limpiar el formulario
  limpiarFormulario();
}

// Renderizar (mostrar) todos los productos en una tabla horizontal
function renderizarProductos() {
  const contenedor = document.getElementById("contenedorProductos");

  if (productos.length === 0) {
    contenedor.innerHTML = `
      <tr>
        <td colspan="7" class="sin-productos">No hay productos registrados.</td>
      </tr>
    `;
    return;
  }

  let html = "";

  productos.forEach(function (producto) {
    html += `
      <tr>
        <td data-label="Imagen">
          <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        </td>
        <td data-label="Nombre">${producto.nombre}</td>
        <td data-label="Descripción">${producto.descripcion}</td>
        <td data-label="Precio">$${producto.precio}</td>
        <td data-label="Categoría">${producto.categoria}</td>
        <td data-label="Stock">${producto.stock}</td>
        <td class="acciones">
          <button onclick="editarProducto(${producto.id})" class="btn-editar">Editar</button>
          <button onclick="eliminarProducto(${producto.id})" class="btn-eliminar">Eliminar</button>
        </td>
      </tr>
    `;
  });

  contenedor.innerHTML = html;
}

// Cargar un producto en el formulario para editarlo
function editarProducto(id) {
  const producto = productos.find((p) => p.id === id);
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

  // Mostrar la vista del formulario para editar
  mostrarVista("registro");
}

// Eliminar un producto
function eliminarProducto(id) {
  if (!confirm("¿Estás seguro de eliminar este producto?")) return;

  productos = productos.filter((p) => p.id !== id);
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

document
  .getElementById("productoForm")
  .addEventListener("submit", registrarProducto);

// Cambiar de vista con las pestañas
document.querySelectorAll(".tab-btn").forEach(function (boton) {
  boton.addEventListener("click", function () {
    mostrarVista(boton.dataset.vista);
  });
});

// Botón "Agregar Producto": limpia el formulario y va a la vista de registro
document
  .getElementById("btn-nuevo-producto")
  .addEventListener("click", function () {
    limpiarFormulario();
    mostrarVista("registro");
  });

// ponytail: productos en memoria (sin persistencia), el plan exige array en memoria.
// Para persistir entre recargas, usar localStorage agregando 2 líneas en registrar/eliminar.
```

> **Nota:** `app.js` NO se carga en `login.html` ni `registro.html`. Solo existe en `index.html` (protegido). Al cargar ejecuta `verificarSesion()`; si no hay sesión, `auth.js` redirige a login.

**Commit:**
```bash
git add src/pages/index.html src/js/app.js
git commit -m "feat: crear página principal con CRUD de productos"
```

## 5.7. Fase 7: styles-login.css

### CSS - Código completo

Copia esto en `src/css/styles-login.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg-primary: #0a0e17;
  --bg-secondary: #111827;
  --bg-card: #1a2035;
  --bg-input: #0d1321;
  --border-subtle: #1e293b;
  --border-focus: #00d4ff;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-cyan: #00d4ff;
  --accent-cyan-dim: rgba(0, 212, 255, 0.15);
  --accent-purple: #a855f7;
  --accent-purple-dim: rgba(168, 85, 247, 0.12);
  --glow-cyan: 0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1);
  --glow-purple:
    0 0 20px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.1);
  --radius: 6px;
  --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

html {
  color-scheme: dark;
}

@view-transition {
  navigation: auto;
}

body.login-page {
  margin: 0;
  padding: 0;
  font-family:
    "Outfit",
    system-ui,
    -apple-system,
    sans-serif;
  background-color: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--accent-cyan-dim);
  color: var(--accent-cyan);
}

header {
  width: 100%;
  max-width: 1100px;
  text-align: right;
  padding: 24px 32px;
}

header h1 {
  font-size: 25px;
  font-weight: 500;
  color: var(--text-muted);
  text-align: center;
  text-transform: uppercase;
}

.login-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 48px;
  row-gap: 0;
  width: 100%;
  max-width: 1100px;
  align-items: center;
  justify-items: center;
  padding: 0 32px;
  flex: 1;
}

.imagen-portada {
  border-radius: 10px;
  grid-column: 1;
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
}

.imagen-portada img {
  border-radius: 10px;
  max-width: 100%;
  height: auto;
  display: block;
  border: 2px solid #0ff;
  opacity: 0.9;
  transition: opacity var(--transition);
  box-shadow:
    0 0 10px #0ff,
    0 0 20px #0ff,
    inset 0 0 10px #0ff;
}

.imagen-portada img:hover {
  opacity: 1;
}

.login-section {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  justify-self: center;
  width: 100%;
  max-width: 380px;
  view-transition-name: main-card;
}

.boton-cuenta-nueva {
  width: 100%;
  max-width: 320px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
  text-align: center;
  font-size: 14px;
}

.login-section h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
}

form label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

form input {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-family: "Outfit", sans-serif;
  color: var(--text-primary);
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  margin-bottom: 20px;
  transition:
    border-color var(--transition),
    box-shadow var(--transition);
  outline: none;
}

form input::placeholder {
  color: var(--text-muted);
}

form input:focus {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 0 3px var(--accent-cyan-dim);
}

form button {
  width: 100%;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
  color: var(--bg-primary);
  background: var(--accent-cyan);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    background var(--transition),
    box-shadow var(--transition),
    transform var(--transition);
  margin-top: 4px;
  letter-spacing: 0.02em;
}

form button:hover {
  background: #33dfff;
  box-shadow: var(--glow-cyan);
  transform: translateY(-1px);
}

form button:active {
  transform: translateY(0);
}

.boton-cuenta-nueva {
  grid-column: 2;
  grid-row: 1;
  text-align: center;
  font-size: 14px;
  align-self: end;
  justify-self: center;
  width: 100%;
  max-width: 380px;
  padding-bottom: 24px;
}

.boton-cuenta-nueva p {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.boton-cuenta-nueva a.button {
  color: var(--accent-purple);
  text-decoration: none;
  font-weight: 500;
  transition:
    color var(--transition),
    text-shadow var(--transition);
}

.boton-cuenta-nueva a.button:hover {
  color: #c084fc;
  text-shadow: var(--glow-purple);
}

.error-message {
  color: #f87171;
  font-size: 12px;
  margin-top: -14px;
  margin-bottom: 8px;
  min-height: 16px;
}

footer {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 24px 32px;
  border-top: 1px solid var(--border-subtle);
}

footer a {
  color: var(--text-muted);
  text-decoration: none;
  margin: 0 12px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  transition: color var(--transition);
}

footer a:hover {
  color: var(--accent-cyan);
}

footer p {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: 11px;
}

@media (max-width: 768px) {
  .login-main {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 20px;
    justify-items: center;
  }

  .imagen-portada {
    grid-column: 1;
    grid-row: auto;
    order: -1;
    justify-self: center;
  }

  .imagen-portada img {
    max-width: 320px;
  }

  .login-section {
    grid-column: 1;
    grid-row: auto;
    padding: 28px;
    max-width: 380px;
    width: 100%;
  }

  header {
    text-align: center;
    padding: 20px;
  }
}
```

**Commit:**
```bash
git add src/css/styles-login.css
git commit -m "feat: crear estilos CSS para la página de login"
```

## 5.8. Fase 8: styles-registro.css

### CSS - Código completo

Copia esto en `src/css/styles-registro.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg-primary: #0a0e17;
  --bg-secondary: #111827;
  --bg-card: #1a2035;
  --bg-input: #0d1321;
  --border-subtle: #1e293b;
  --border-focus: #00d4ff;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-cyan: #00d4ff;
  --accent-cyan-dim: rgba(0, 212, 255, 0.15);
  --accent-purple: #a855f7;
  --accent-purple-dim: rgba(168, 85, 247, 0.12);
  --glow-cyan: 0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1);
  --glow-purple:
    0 0 20px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.1);
  --radius: 6px;
  --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

html {
  color-scheme: dark;
}

@view-transition {
  navigation: auto;
}

body.register-page {
  margin: 0;
  padding: 0;
  font-family:
    "Outfit",
    system-ui,
    -apple-system,
    sans-serif;
  background-color: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--accent-cyan-dim);
  color: var(--accent-cyan);
}

header {
  width: 100%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 32px;
}

header h1 {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: var(--text-muted);
  text-transform: uppercase;
}

.imagen-portada {
  width: 72px;
  height: 72px;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--accent-cyan);
  box-shadow: var(--glow-cyan);
}

.imagen-portada img {
  display: block;
  width: 72px;
  height: 72px;
  object-fit: cover;
  transform: scale(1.7);
  transform-origin: center;
  opacity: 0.9;
  transition: opacity var(--transition);
}

.imagen-portada:hover {
  opacity: 1;
}

.register-main {
  width: 100%;
  max-width: 460px;
  padding: 40px 32px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  margin: 0 20px 40px;
  view-transition-name: main-card;
}

.register-main h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

form label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

form input {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-family: "Outfit", sans-serif;
  color: var(--text-primary);
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  margin-bottom: 20px;
  transition:
    border-color var(--transition),
    box-shadow var(--transition);
  outline: none;
}

form input::placeholder {
  color: var(--text-muted);
}

form input:focus {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 0 3px var(--accent-cyan-dim);
}

form button {
  width: 100%;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
  color: var(--bg-primary);
  background: var(--accent-cyan);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    background var(--transition),
    box-shadow var(--transition),
    transform var(--transition);
  margin-top: 4px;
  letter-spacing: 0.02em;
}

form button:hover {
  background: #33dfff;
  box-shadow: var(--glow-cyan);
  transform: translateY(-1px);
}

form button:active {
  transform: translateY(0);
}

.register-main p {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: var(--text-secondary);
}

.register-main p a {
  color: var(--accent-purple);
  text-decoration: none;
  font-weight: 500;
  transition:
    color var(--transition),
    text-shadow var(--transition);
}

.register-main p a:hover {
  color: #c084fc;
  text-shadow: var(--glow-purple);
}

.error-message {
  color: #f87171;
  font-size: 12px;
  margin-top: -14px;
  margin-bottom: 8px;
  min-height: 16px;
}

footer {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 24px 32px;
  border-top: 1px solid var(--border-subtle);
  margin-top: auto;
}

footer a {
  color: var(--text-muted);
  text-decoration: none;
  margin: 0 12px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  transition: color var(--transition);
}

footer a:hover {
  color: var(--accent-cyan);
}

footer p {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: 11px;
}

@media (max-width: 768px) {
  .register-main {
    padding: 28px 20px;
    margin: 0 16px 32px;
  }

  .register-main h2 {
    font-size: 24px;
  }

  header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }
}
```

**Commit:**
```bash
git add src/css/styles-registro.css
git commit -m "feat: crear estilos CSS para la página de registro"
```

## 5.9. Fase 9: styles.css - Panel de Productos

`index.html` enlaza los estilos del panel con `../css/styles.css`. Usa las mismas variables del tema dark cyberpunk (cyan/purple) de las otras dos hojas.

### CSS - Código completo

Copia esto en `src/css/styles.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg-primary: #0a0e17;
  --bg-secondary: #111827;
  --bg-card: #1a2035;
  --bg-input: #0d1321;
  --border-subtle: #1e293b;
  --border-focus: #00d4ff;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-cyan: #00d4ff;
  --accent-cyan-dim: rgba(0, 212, 255, 0.15);
  --accent-purple: #a855f7;
  --accent-purple-dim: rgba(168, 85, 247, 0.12);
  --glow-cyan: 0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1);
  --glow-purple:
    0 0 20px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.1);
  --radius: 6px;
  --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

html {
  color-scheme: dark;
}

@view-transition {
  navigation: auto;
}

body {
  margin: 0;
  padding: 0;
  font-family:
    "Outfit",
    system-ui,
    -apple-system,
    sans-serif;
  background-color: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--accent-cyan-dim);
  color: var(--accent-cyan);
}

header {
  width: 100%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 32px;
}

header h1 {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: var(--text-muted);
  text-transform: uppercase;
}

nav ul {
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
}

nav a {
  color: var(--text-muted);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  transition:
    color var(--transition),
    text-shadow var(--transition);
}

nav a:hover {
  color: var(--accent-cyan);
  text-shadow: var(--glow-cyan);
}

nav #cerrar-sesion:hover {
  color: #f87171;
  text-shadow: none;
}

main {
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 32px 40px;
  flex: 1;
}

main h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.vistas-nav {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border-subtle);
}

.vistas-nav .tab-btn {
  padding: 10px 18px;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid transparent;
  border-radius: var(--radius) var(--radius) 0 0;
  font-size: 13px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    color var(--transition),
    border-color var(--transition),
    background var(--transition);
}

.vistas-nav .tab-btn:hover {
  color: var(--text-secondary);
}

.vistas-nav .tab-btn.activa {
  color: var(--accent-cyan);
  background: var(--bg-card);
  border-color: var(--border-subtle);
  border-bottom-color: var(--bg-card);
}

.vista {
  display: none;
}

.vista.activa {
  display: block;
}

section article,
.tabla-contenedor {
  padding: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  view-transition-name: main-card;
}

.lista-cabecera {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.lista-cabecera h2 {
  margin-bottom: 16px;
}

#btn-nuevo-producto {
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
  color: var(--accent-cyan);
  background: transparent;
  border: 1px solid var(--accent-cyan);
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    background var(--transition),
    box-shadow var(--transition);
}

#btn-nuevo-producto:hover {
  background: var(--accent-cyan-dim);
  box-shadow: var(--glow-cyan);
}

.tabla-contenedor {
  padding: 0;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-width: 720px;
}

thead th {
  text-align: left;
  padding: 14px 16px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--border-subtle);
}

tbody td {
  padding: 14px 16px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr {
  transition: background var(--transition);
}

tbody tr:hover {
  background: rgba(30, 41, 59, 0.5);
}

tbody img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: var(--radius);
  border: 1px solid var(--border-subtle);
  display: block;
}

td.acciones {
  white-space: nowrap;
}

.acciones button {
  padding: 6px 12px;
  margin-right: 8px;
  font-size: 12px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
  background: transparent;
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    background var(--transition),
    color var(--transition),
    box-shadow var(--transition);
}

.acciones .btn-editar {
  color: var(--accent-cyan);
  border: 1px solid var(--accent-cyan);
}

.acciones .btn-editar:hover {
  background: var(--accent-cyan-dim);
  box-shadow: var(--glow-cyan);
}

.acciones .btn-eliminar {
  color: #f87171;
  border: 1px solid #f87171;
  margin-right: 0;
}

.acciones .btn-eliminar:hover {
  background: rgba(248, 113, 113, 0.12);
  box-shadow: 0 0 20px rgba(248, 113, 113, 0.3);
}

.sin-productos {
  text-align: center;
  padding: 40px 16px;
  color: var(--text-muted);
  font-size: 14px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

form label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

form input,
form textarea,
form select {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-family: "Outfit", sans-serif;
  color: var(--text-primary);
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  margin-bottom: 20px;
  transition:
    border-color var(--transition),
    box-shadow var(--transition);
  outline: none;
}

form textarea {
  resize: vertical;
  line-height: 1.5;
}

form select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

form input:disabled {
  color: var(--text-muted);
  cursor: not-allowed;
}

form input::placeholder,
form textarea::placeholder {
  color: var(--text-muted);
}

form input:focus,
form textarea:focus,
form select:focus {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 0 3px var(--accent-cyan-dim);
}

form button {
  width: 100%;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
  color: var(--bg-primary);
  background: var(--accent-cyan);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    background var(--transition),
    box-shadow var(--transition),
    transform var(--transition);
  margin-top: 4px;
  letter-spacing: 0.02em;
}

form button:hover {
  background: #33dfff;
  box-shadow: var(--glow-cyan);
  transform: translateY(-1px);
}

form button:active {
  transform: translateY(0);
}

.error-message {
  color: #f87171;
  font-size: 12px;
  margin-top: -14px;
  margin-bottom: 8px;
  min-height: 16px;
}

footer {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 24px 32px;
  border-top: 1px solid var(--border-subtle);
}

footer p {
  color: var(--text-muted);
  font-size: 11px;
}

@media (max-width: 768px) {
  main {
    padding: 0 20px 32px;
  }

  header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  section article,
  .tabla-contenedor {
    padding: 24px 20px;
  }

  .tabla-contenedor {
    padding: 0;
  }

  .lista-cabecera {
    flex-direction: column;
    align-items: flex-start;
  }

  main h2 {
    font-size: 24px;
  }
}
```

**Commit:**
```bash
git add src/css/styles.css
git commit -m "feat: agregar estilos CSS para el panel de productos"
```

## 5.10. Fase 10: transitions.js

### JavaScript - Código completo

Copia esto en `src/js/transitions.js`:

```javascript
const isLogin = document.body.classList.contains("login-page");
const card =
  document.querySelector(".login-section") ||
  document.querySelector(".register-main");
const h1 = document.querySelector("header h1");
const trigger =
  document.querySelector(".boton-cuenta-nueva a.button") ||
  document.querySelector(".register-main p a");

const rectToJson = (r) => ({
  left: r.left,
  top: r.top,
  width: r.width,
  height: r.height,
});

const animateMorph = (el, rect) => {
  if (!el || !rect) return;
  el.style.opacity = "0";

  requestAnimationFrame(() => {
    const natural = el.getBoundingClientRect();
    const dx = rect.left - natural.left;
    const dy = rect.top - natural.top;

    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = "none";

    requestAnimationFrame(() => {
      el.style.transition =
        "transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease";
      el.style.opacity = "1";
      el.style.transform = "";
    });
  });
};

window.addEventListener("pageswap", (e) => {
  if (e.viewTransition && window.__skipNativeVT) {
    e.viewTransition.skipTransition();
  }
});

let stored = null;
try {
  stored = sessionStorage.getItem("morph");
  sessionStorage.removeItem("morph");
} catch {}

if (stored) {
  const pos = JSON.parse(stored);
  animateMorph(card, pos.card);
  animateMorph(h1, pos.h1);
}

if (trigger) {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(
        "morph",
        JSON.stringify({
          card: rectToJson(card.getBoundingClientRect()),
          h1: rectToJson(h1.getBoundingClientRect()),
        }),
      );
    } catch {}

    window.__skipNativeVT = true;
    window.location.href = trigger.href;
  });
}

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    [card, h1].forEach((el) => {
      el.style.transform = "";
      el.style.opacity = "";
      el.style.transition = "";
    });
  }
});
```

La página de destino debe tener `@view-transition { navigation: auto; }` (ya incluido en `styles-login.css` y `styles-registro.css`) para los View Transitions del navegador.

**Nota:** Se carga en `login.html` y `registro.html`, después de `login.js`:

```html
<script src="../js/auth.js"></script>
<script src="../js/login.js"></script>
<script src="../js/transitions.js"></script>
```

**Commit:**
```bash
git add src/js/transitions.js src/css/styles-login.css src/css/styles-registro.css
git commit -m "feat: implement login and registration page transitions with animations"
```

## 5.11. Fase 11: Pulido y pruebas

**Paso 1:** Probar cada página en el navegador

Abre cada archivo HTML en tu navegador (doble clic o "Open with Live Server" en VS Code):
- `src/pages/login.html`
- `src/pages/registro.html`
- `src/pages/index.html`

**Paso 2:** Verificar
- [ ] Página principal (login.html) muestra formulario de login y portada
- [ ] Login redirige a index.html con credenciales válidas
- [ ] Login muestra error con credenciales incorrectas
- [ ] Registro crea cuenta y redirige a login.html
- [ ] El usuario registrado puede iniciar sesión después de recargar la página (se guarda en localStorage)
- [ ] Registro muestra error si el email ya existe
- [ ] index.html redirige a login.html si no hay sesión
- [ ] Cerrar sesión limpia la sesión y redirige a login.html
- [ ] Las pestañas "Registrar Producto" / "Ver Productos" cambian de vista
- [ ] Productos se agregan y muestran como filas en la tabla horizontal
- [ ] El botón "Agregar Producto" limpia el form y muestra la vista de registro
- [ ] Productos se editan (clic en "Editar" lleva al formulario con los datos)
- [ ] Productos se eliminan (con confirmación)
- [ ] CSS se aplica correctamente (colores, márgenes, bordes)
- [ ] Responsive funciona en celular (abre DevTools y simula un celular)

**Paso 3:** Hacer push a GitHub
```bash
git push origin main
```
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
<link rel="stylesheet" href="../css/styles-login.css">
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
