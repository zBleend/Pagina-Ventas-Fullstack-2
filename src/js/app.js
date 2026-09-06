verificarSesion();

let productos = cargarProductos();

let editandoId = null;

renderizarProductos();
let imagenArchivo = null;

function cargarProductos() {
  try {
    const datos = localStorage.getItem("productos");
    if (!datos) {
      const demo = crearProductosDemo();
      localStorage.setItem("productos", JSON.stringify(demo));
      return demo;
    }
    const guardados = JSON.parse(datos);
    if (guardados.length === 0) {
      const demo = crearProductosDemo();
      localStorage.setItem("productos", JSON.stringify(demo));
      return demo;
    }
    return guardados;
  } catch {
    return [];
  }
}

function crearProductosDemo() {
  return [
    {
      id: 1,
      nombre: "Momentum Intense",
      descripcion: "Perfume Bentley con diseño de lujo, ideal para edición nocturna.",
      precio: 89900,
      categoria: "otros",
      stock: 12,
      imagen:
        "https://images.pexels.com/photos/7270666/pexels-photo-7270666.jpeg?auto=compress&cs=tinysrgb&w=1280",
    },
    {
      id: 2,
      nombre: "Chronos Steel",
      descripcion: "Reloj de acero pulido con proporciones limpias y lectura impecable.",
      precio: 159900,
      categoria: "otros",
      stock: 5,
      imagen:
        "https://images.pexels.com/photos/26626530/pexels-photo-26626530.jpeg?auto=compress&cs=tinysrgb&w=1280",
    },
    {
      id: 3,
      nombre: "Studio Silence",
      descripcion: "Audífonos para jornadas de trabajo sin interrupciones.",
      precio: 74900,
      categoria: "electronica",
      stock: 8,
      imagen:
        "https://images.pexels.com/photos/10292808/pexels-photo-10292808.jpeg?auto=compress&cs=tinysrgb&w=1280",
    },
    {
      id: 4,
      nombre: "Frame 02",
      descripcion: "Lentes de sol con una silueta sobria y acabados que marcan la diferencia.",
      precio: 49900,
      categoria: "otros",
      stock: 15,
      imagen:
        "https://images.pexels.com/photos/10837801/pexels-photo-10837801.jpeg?auto=compress&cs=tinysrgb&w=1280",
    },
    {
      id: 5,
      nombre: "Carry Set",
      descripcion: "Billetera y llavero de cuero premium para acompañar cada movimiento.",
      precio: 39900,
      categoria: "ropa",
      stock: 20,
      imagen:
        "https://images.pexels.com/photos/33242820/pexels-photo-33242820.jpeg?auto=compress&cs=tinysrgb&w=1280",
    },
  ];
}

function guardarProductos() {
  try {
    localStorage.setItem("productos", JSON.stringify(productos));
  } catch {
    mostrarError(
      "prodImagen",
      "No se pudo guardar (límite de almacenamiento del navegador)",
    );
  }
}

function mostrarError(campo, mensaje) {
  const elementoError = document.getElementById("error-" + campo);
  if (elementoError) {
    elementoError.textContent = mensaje;
    elementoError.style.display = "block";
  }
}

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

function limpiarErrores() {
  const errores = document.querySelectorAll(".error-message");
  errores.forEach(function (error) {
    error.textContent = "";
    error.style.display = "none";
  });
}

document
  .getElementById("cerrar-sesion")
  .addEventListener("click", function (event) {
    event.preventDefault();
    cerrarSesion();
    window.location.href = "login.html";
  });

function registrarProducto(event) {
  event.preventDefault();

  limpiarErrores();

  const id = document.getElementById("prodId").value;
  const nombre = document.getElementById("prodNombre").value;
  const descripcion = document.getElementById("prodDescripcion").value;
  const precio = document.getElementById("prodPrecio").value;
  const categoria = document.getElementById("prodCategoria").value;
  const stock = document.getElementById("prodStock").value;
  const tipoImagen = document.querySelector(
    'input[name="tipoImagen"]:checked',
  ).value;

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

  let imagen;
  if (tipoImagen === "archivo") {
    imagen = imagenArchivo;
    if (!imagen) {
      mostrarError("prodImagenArchivo", "Seleccione una imagen para subir");
      esValido = false;
    }
  } else {
    imagen = document.getElementById("prodImagen").value;
    if (!imagen.trim()) {
      mostrarError("prodImagen", "Este campo es obligatorio");
      esValido = false;
    }
  }

  if (!esValido) return;

  const producto = {
    id: parseInt(id, 10),
    nombre: nombre,
    descripcion: descripcion,
    precio: parseFloat(precio),
    categoria: categoria,
    stock: parseInt(stock, 10),
    imagen: imagen,
  };

  if (editandoId !== null) {
    const indice = productos.findIndex((p) => p.id === editandoId);
    if (indice !== -1) {
      productos[indice] = producto;
    }
    editandoId = null;
    document.getElementById("btnRegistrar").textContent = "Registrar Producto";
  } else {
    const existe = productos.some((p) => p.id === producto.id);
    if (existe) {
      mostrarError("prodId", "Ya existe un producto con ese ID");
      return;
    }
    productos.push(producto);
  }

  guardarProductos();
  renderizarProductos();
  mostrarVista("lista");

  limpiarFormulario();
}

function renderizarProductos() {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  if (productos.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 7;
    celda.className = "sin-productos";
    celda.textContent = "No hay productos registrados.";
    fila.appendChild(celda);
    contenedor.appendChild(fila);
    return;
  }

  const plantilla = document.getElementById("fila-producto");

  productos.forEach(function (producto) {
    const fila = plantilla.content.cloneNode(true);

    const imagen = fila.querySelector("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    fila.querySelector('[data-label="Nombre"]').textContent = producto.nombre;
    fila.querySelector('[data-label="Descripción"]').textContent =
      producto.descripcion;
    fila.querySelector('[data-label="Precio"]').textContent =
      "$" + producto.precio;
    fila.querySelector('[data-label="Categoría"]').textContent =
      producto.categoria;
    fila.querySelector('[data-label="Stock"]').textContent = producto.stock;

    fila.querySelector(".btn-editar").onclick = function () {
      editarProducto(producto.id);
    };
    fila.querySelector(".btn-eliminar").onclick = function () {
      eliminarProducto(producto.id);
    };

    contenedor.appendChild(fila);
  });
}

function editarProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  document.getElementById("prodId").value = producto.id;
  document.getElementById("prodId").disabled = true;
  document.getElementById("prodNombre").value = producto.nombre;
  document.getElementById("prodDescripcion").value = producto.descripcion;
  document.getElementById("prodPrecio").value = producto.precio;
  document.getElementById("prodCategoria").value = producto.categoria;
  document.getElementById("prodStock").value = producto.stock;
  if (producto.imagen && producto.imagen.startsWith("data:")) {
    setTipoImagen("archivo");
    imagenArchivo = producto.imagen;
  } else {
    setTipoImagen("url");
    document.getElementById("prodImagen").value = producto.imagen || "";
  }

  editandoId = id;
  document.getElementById("btnRegistrar").textContent = "Actualizar Producto";

  mostrarVista("registro");
}

function eliminarProducto(id) {
  if (!confirm("¿Estás seguro de eliminar este producto?")) return;

  productos = productos.filter((p) => p.id !== id);
  guardarProductos();
  renderizarProductos();
}

function limpiarFormulario() {
  document.getElementById("productoForm").reset();
  setTipoImagen("url");
  imagenArchivo = null;
  document.getElementById("prodId").disabled = false;
  editandoId = null;
  document.getElementById("btnRegistrar").textContent = "Registrar Producto";
}

function setTipoImagen(tipo) {
  const campoUrl = document.getElementById("prodImagen");
  const campoArchivo = "prodImagenArchivo";
  document.querySelector(
    'input[name="tipoImagen"][value="' + tipo + '"]',
  ).checked = true;

  campoUrl.hidden = tipo !== "url";
  document.getElementById(campoArchivo).hidden = tipo !== "archivo";
  document.querySelector('label[for="' + campoArchivo + '"]').hidden =
    tipo !== "archivo";
}

document.querySelectorAll('input[name="tipoImagen"]').forEach(function (radio) {
  radio.addEventListener("change", function () {
    setTipoImagen(radio.value);
  });
});

document
  .getElementById("prodImagenArchivo")
  .addEventListener("change", function (event) {
    const archivo = event.target.files[0];
    if (!archivo) {
      imagenArchivo = null;
      return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
      imagenArchivo = e.target.result;
    };
    lector.readAsDataURL(archivo);
  });

document
  .getElementById("productoForm")
  .addEventListener("submit", registrarProducto);

document.querySelectorAll(".tab-btn").forEach(function (boton) {
  boton.addEventListener("click", function () {
    mostrarVista(boton.dataset.vista);
  });
});

document
  .getElementById("btn-nuevo-producto")
  .addEventListener("click", function () {
    limpiarFormulario();
    mostrarVista("registro");
  });
