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
