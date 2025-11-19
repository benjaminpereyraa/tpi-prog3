let graficoPedidosInstance = null;
const API_MENU = "https://6915332d84e8bd126af90ca8.mockapi.io/menu";
const API_ORDERS = "https://6911df1052a60f10c81f9c7d.mockapi.io/orders";
<<<<<<< HEAD
const API_USERS = "https://6915332d84e8bd126af90ca8.mockapi.io/users";
=======




>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
if (!usuario || usuario.role !== "admin") {
    alert("Acceso denegado ❌");
    window.location.href = "login.html";
}
<<<<<<< HEAD
=======


>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
});
<<<<<<< HEAD
=======


>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
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
<<<<<<< HEAD
=======


>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
async function toggleDisponible(id, estadoActual) {
    await fetch(`${API_MENU}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disponible: !estadoActual })
    });
    cargarMenu();
}
<<<<<<< HEAD
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
=======


document.getElementById("btnCargarPedidos").addEventListener("click", cargarPedidos);


>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
async function cargarPedidos() {
    
console.log("📌 Fetching pedidos desde:", API_ORDERS);

const res = await fetch(API_ORDERS);
console.log("📌 Status HTTP:", res.status);

const pedidos = await res.json();
console.log("📌 Pedidos recibidos:", pedidos);
    const contenedor = document.getElementById("listaPedidos");
    contenedor.innerHTML = "<p>Cargando...</p>";
<<<<<<< HEAD
=======
    contenedor.innerHTML = "";


>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    try {
        console.log("➡️ URL usada:", API_ORDERS);
        const res = await fetch(API_ORDERS);
        const pedidos = await res.json();
<<<<<<< HEAD
=======

  

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
        contenedor.innerHTML = "";
        pedidos.forEach(p => {
            const div = document.createElement("div");
            div.classList.add("pedido");
            div.innerHTML = `
                <h3>Pedido #${p.id}</h3>
<<<<<<< HEAD
                <p>Usuario ID: ${p.userId}</p>
=======
                <p>Usuario: ${p.userid}</p>
>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
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
<<<<<<< HEAD
        console.error("❌ ERROR AL CARGAR PEDIDOS:", error);
        contenedor.innerHTML = "Error al cargar pedidos ❌";
    }
}
=======
    console.error("❌ ERROR AL CARGAR PEDIDOS:", error);
    contenedor.innerHTML = "Error al cargar pedidos ❌";
    }
}


>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
async function cambiarEstado(id, nuevoEstado) {
    await fetch(`${API_ORDERS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
    });
    cargarPedidos();
}
<<<<<<< HEAD
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
=======




function generarGrafico(data) {
    const ctx = document.getElementById("graficoPedidos");


    if (graficoPedidosInstance) {
        graficoPedidosInstance.destroy();
    }

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    graficoPedidosInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Pendientes", "En proceso", "Completados"],
            datasets: [{
                label: "Cantidad de pedidos",
<<<<<<< HEAD
                data: counts,
                backgroundColor: ["#ffce56", "#36a2eb", "#4bc0c0"]
=======
                data: data,
>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
<<<<<<< HEAD
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
=======


const API_USERS = "https://6915332d84e8bd126af90ca8.mockapi.io/users";


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

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
            div.innerHTML = `
                <p><strong>${user.nombre}</strong></p>
                <p>${user.email}</p>
                <p>Rol: ${user.role}</p>
<<<<<<< HEAD
                <button onclick="eliminarUsuario('${user.id}')">Eliminar</button>
                <button onclick="abrirCambioPassword('${user.id}')">Cambiar contraseña</button>
            `;
=======

                <button onclick="eliminarUsuario('${user.id}')">Eliminar</button>
                <button onclick="abrirCambioPassword('${user.id}')">Cambiar contraseña</button>
            `;

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
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
<<<<<<< HEAD
=======

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    try {
        const res = await fetch(`${API_USERS}/${id}`, {
            method: "DELETE"
        });
<<<<<<< HEAD
        if (!res.ok) {
            throw new Error("Error al eliminar usuario");
        }
        alert("Usuario eliminado correctamente");
        cargarUsuarios();
=======

        if (!res.ok) {
            throw new Error("Error al eliminar usuario");
        }

        alert("Usuario eliminado correctamente");
        cargarUsuarios(); 

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el usuario ❌");
    }
}
<<<<<<< HEAD
document.getElementById("formCrearUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();
=======


document.getElementById("formCrearUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    const nuevoUsuario = {
        nombre: document.getElementById("nuevoNombre").value,
        email: document.getElementById("nuevoEmail").value,
        password: document.getElementById("nuevoPassword").value,
        role: document.getElementById("nuevoRol").value
    };
<<<<<<< HEAD
=======

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    await fetch(API_USERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
    });
<<<<<<< HEAD
    alert("Usuario creado!");
    cargarUsuarios();
});
async function abrirCambioPassword(id) {
    const nueva = prompt("Ingresá la nueva contraseña:");
    if (!nueva) return;
=======

    alert("Usuario creado!");
    cargarUsuarios();
});


async function abrirCambioPassword(id) {
    const nueva = prompt("Ingresá la nueva contraseña:");
    if (!nueva) return;

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    await fetch(`${API_USERS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: nueva })
    });
<<<<<<< HEAD
    alert("Contraseña actualizada");
    cargarUsuarios();
}
=======

    alert("Contraseña actualizada");
    cargarUsuarios();
}

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
