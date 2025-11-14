const form = document.getElementById("registrar");
const API_URL = "https://6915332d84e8bd126af90ca8.mockapi.io/users";

form.addEventListener("submit", async (e) => {
  e.preventDefault();


  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmar = document.getElementById("confirmar-password").value;
  const role = document.getElementById("role").value;

  mensaje.textContent = "";
  mensaje.className = "";
  if (password !== confirmar) {
    mensaje.textContent = "La contraseña y su confirmación no coinciden.";
    mensaje.classList.add('error');
    return;
  }
  


  if (!role) {
    mensaje.textContent = "Debes seleccionar un rol.";
    mensaje.classList.add('error');
    return;
  }

  try {

    const checkRes = await fetch(API_URL);
    const usuarios = await checkRes.json();
    const existe = usuarios.some((u) => u.email === email);

    if (existe) {
      mensaje.textContent = "El email ya está registrado.";
      mensaje.classList.add('error');
      return;
    }


    const nuevoUsuario = { nombre, email, password, role };

    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });

    if (respuesta.ok) {
      mensaje.textContent = "Usuario registrado con éxito. Redirigiendo al login...";
      mensaje.classList.add('exito');
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      mensaje.textContent = "Error al registrar el usuario.";
      mensaje.classList.add('error');
    }
  } catch (error) {
    console.error("Error:", error);
    mensaje.textContent = "⚠️ No se pudo conectar con el servidor";
    mensaje.classList.add('error');
  }
});
