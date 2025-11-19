const formLogin = document.getElementById("iniciar");
const API_URL = "https://6915332d84e8bd126af90ca8.mockapi.io/users";
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const res = await fetch(API_URL);
    const users = await res.json();
    const usuario = users.find(
      (u) => u.email === email && u.password === password
    );
    if (usuario) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      if (usuario.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "menu.html";
      }
    } else {
      alert("Email o contraseña incorrectos ❌");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al conectar con el servidor");
  }
});