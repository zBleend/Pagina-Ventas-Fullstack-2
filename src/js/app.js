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