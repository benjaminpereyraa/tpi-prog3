let graficoPedidosInstance = null;
const API_MENU = "https://6915332d84e8bd126af90ca8.mockapi.io/menu";
const API_ORDERS = "https://6911df1052a60f10c81f9c7d.mockapi.io/orders";
const API_USERS = "https://6915332d84e8bd126af90ca8.mockapi.io/users";
const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
if (!usuario || usuario.role !== "admin") {
    alert("Acceso denegado ❌");
    window.location.href = "login.html";
}
document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
});
document.getElementById("btnCargarMenu").addEventListener("click", cargarMenu);
async function cargarMenu() {
    const contenedor = document.getElementById("listaMenu");
    contenedor.innerHTML = "<p>Cargando...</p>";
    try {
        const res = await fetch(API_MENU);
        const menu = await res.json();
        contenedor.innerHTML = "";
        menu.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${item.nombre}</h3>
                <p>Tipo: ${item.tipo}</p>
                <p>Precio: $${item.precio}</p>
                <p>Disponible: ${item.disponible ? "Sí" : "No"}</p>
                <button onclick="toggleDisponible(${item.id}, ${item.disponible})">
                    Cambiar Disponibilidad
                </button>
                <button onclick="editarMenu(${item.id})">Editar</button>
                <button onclick="eliminarMenu(${item.id})">Eliminar</button>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        contenedor.innerHTML = "Error al cargar menú ❌";
    }
}
async function toggleDisponible(id, estadoActual) {
    await fetch(`${API_MENU}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disponible: !estadoActual })
    });
    cargarMenu();
}
async function editarMenu(id) {
    const nombre = prompt("Nuevo nombre:");
    const precio = parseFloat(prompt("Nuevo precio:"));
    if (!nombre || isNaN(precio)) return;
    try {
        await fetch(`${API_MENU}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, precio })
        });
        cargarMenu();
    } catch (err) {
        alert("Error al editar ❌");
    }
}
async function eliminarMenu(id) {
    if (!confirm("¿Seguro eliminar?")) return;
    try {
        await fetch(`${API_MENU}/${id}`, { method: "DELETE" });
        cargarMenu();
    } catch (err) {
        alert("Error al eliminar ❌");
    }
}
document.getElementById("formAgregarMenu").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nuevo = {
        nombre: document.getElementById("nuevoNombreMenu").value,
        tipo: document.getElementById("nuevoTipo").value,
        precio: parseFloat(document.getElementById("nuevoPrecio").value),
        disponible: document.getElementById("nuevoDisponible").checked
    };
    try {
        await fetch(API_MENU, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo)
        });
        alert("Item agregado!");
        cargarMenu();
    } catch (err) {
        alert("Error al agregar ❌");
    }
});
document.getElementById("btnCargarPedidos").addEventListener("click", cargarPedidos);
async function cargarPedidos() {
    const contenedor = document.getElementById("listaPedidos");
    contenedor.innerHTML = "<p>Cargando...</p>";
    try {
        const res = await fetch(API_ORDERS);
        const pedidos = await res.json();
        contenedor.innerHTML = "";
        pedidos.forEach(p => {
            const div = document.createElement("div");
            div.classList.add("pedido");
            div.innerHTML = `
                <h3>Pedido #${p.id}</h3>
                <p>Usuario ID: ${p.userId}</p>
                <p>Total: $${p.total}</p>
                <p>Estado: ${p.estado}</p>
                <p>Items:</p>
                <ul>${p.items.map(i => `<li>${i.nombre} - $${i.precio}</li>`).join('')}</ul>
                <select onchange="cambiarEstado(${p.id}, this.value)">
                    <option value="pendiente" ${p.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
                    <option value="preparación" ${p.estado === "preparación" ? "selected" : ""}>En preparación</option>
                    <option value="entregado" ${p.estado === "entregado" ? "selected" : ""}>Entregado</option>
                </select>
            `;
            contenedor.appendChild(div);
        });
        generarGrafico(pedidos);
    } catch (error) {
        console.error("❌ ERROR AL CARGAR PEDIDOS:", error);
        contenedor.innerHTML = "Error al cargar pedidos ❌";
    }
}
async function cambiarEstado(id, nuevoEstado) {
    await fetch(`${API_ORDERS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
    });
    cargarPedidos();
}
function generarGrafico(pedidos) {
    const ctx = document.getElementById("graficoPedidos").getContext('2d');
    if (graficoPedidosInstance) {
        graficoPedidosInstance.destroy();
    }
    const counts = [
        pedidos.filter(p => p.estado === "pendiente").length,
        pedidos.filter(p => p.estado === "preparación").length,
        pedidos.filter(p => p.estado === "entregado").length
    ];
    graficoPedidosInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Pendiente", "En preparación", "Entregado"],
            datasets: [{
                label: "Cantidad de pedidos",
                data: counts,
                backgroundColor: ["#ffce56", "#36a2eb", "#4bc0c0"]
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
document.getElementById("btnCargarUsuarios").addEventListener("click", cargarUsuarios);
async function cargarUsuarios() {
    const cont = document.getElementById("usuariosContainer");
    cont.innerHTML = "<p>Cargando...</p>";
    try {
        const res = await fetch(API_USERS);
        const data = await res.json();
        cont.innerHTML = "";
        data.forEach(user => {
            const div = document.createElement("div");
            div.classList.add("card-usuario");
            div.innerHTML = `
                <p><strong>${user.nombre}</strong></p>
                <p>${user.email}</p>
                <p>Rol: ${user.role}</p>
                <button onclick="eliminarUsuario('${user.id}')">Eliminar</button>
                <button onclick="abrirCambioPassword('${user.id}')">Cambiar contraseña</button>
            `;
            cont.appendChild(div);
        });
    } catch (err) {
        console.error("Error al cargar usuarios:", err);
        cont.innerHTML = "<p>Error al cargar usuarios ❌</p>";
    }
}
async function eliminarUsuario(id) {
    const confirmar = confirm("¿Seguro que querés eliminar este usuario?");
    if (!confirmar) return;
    try {
        const res = await fetch(`${API_USERS}/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            throw new Error("Error al eliminar usuario");
        }
        alert("Usuario eliminado correctamente");
        cargarUsuarios();
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el usuario ❌");
    }
}
document.getElementById("formCrearUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nuevoUsuario = {
        nombre: document.getElementById("nuevoNombre").value,
        email: document.getElementById("nuevoEmail").value,
        password: document.getElementById("nuevoPassword").value,
        role: document.getElementById("nuevoRol").value
    };
    await fetch(API_USERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
    });
    alert("Usuario creado!");
    cargarUsuarios();
});
async function abrirCambioPassword(id) {
    const nueva = prompt("Ingresá la nueva contraseña:");
    if (!nueva) return;
    await fetch(`${API_USERS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: nueva })
    });
    alert("Contraseña actualizada");
    cargarUsuarios();
}