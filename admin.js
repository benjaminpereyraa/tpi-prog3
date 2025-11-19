let graficoPedidosInstance = null;
const API_MENU = "https://6915332d84e8bd126af90ca8.mockapi.io/menu";
const API_ORDERS = "https://6911df1052a60f10c81f9c7d.mockapi.io/orders";




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


document.getElementById("btnCargarPedidos").addEventListener("click", cargarPedidos);


async function cargarPedidos() {
    
console.log("📌 Fetching pedidos desde:", API_ORDERS);

const res = await fetch(API_ORDERS);
console.log("📌 Status HTTP:", res.status);

const pedidos = await res.json();
console.log("📌 Pedidos recibidos:", pedidos);
    const contenedor = document.getElementById("listaPedidos");
    contenedor.innerHTML = "<p>Cargando...</p>";
    contenedor.innerHTML = "";


    try {
        console.log("➡️ URL usada:", API_ORDERS);
        const res = await fetch(API_ORDERS);
        const pedidos = await res.json();

  

        contenedor.innerHTML = "";

        pedidos.forEach(p => {
            const div = document.createElement("div");
            div.classList.add("pedido");

            div.innerHTML = `
                <h3>Pedido #${p.id}</h3>
                <p>Usuario: ${p.userid}</p>
                <p>Total: $${p.total}</p>
                <p>Estado: ${p.estado}</p>

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




function generarGrafico(data) {
    const ctx = document.getElementById("graficoPedidos");


    if (graficoPedidosInstance) {
        graficoPedidosInstance.destroy();
    }

    graficoPedidosInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Pendientes", "En proceso", "Completados"],
            datasets: [{
                label: "Cantidad de pedidos",
                data: data,
            }]
        }
    });
}


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

