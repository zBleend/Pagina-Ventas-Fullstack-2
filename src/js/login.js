function mostrarError(campo, mensaje) {
  const elementoError = document.getElementById("error-" + campo);
  if (elementoError) {
    elementoError.textContent = mensaje;
    elementoError.style.display = "block";
  }
}

function limpiarErrores() {
  const errores = document.querySelectorAll(".error-message");
  errores.forEach(function (error) {
    error.textContent = "";
    error.style.display = "none";
  });
}

function validarCampoVacio(valor, nombreCampo) {
  if (valor.trim() === "") {
    mostrarError(nombreCampo, "Este campo es obligatorio");
    return false;
  }
  return true;
}

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

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    limpiarErrores();

    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

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
