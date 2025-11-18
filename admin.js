const API_MENU = "https://6915332d84e8bd126af90ca8.mockapi.io/menu";
const API_ORDERS = "https://6915332d84e8bd126af90ca8.mockapi.io/orders";

/* -------------------------------
   🚨 PROTECCIÓN PARA SOLO ADMIN
--------------------------------*/
const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

if (!usuario || usuario.role !== "admin") {
    alert("Acceso denegado ❌");
    window.location.href = "login.html";
}

/* -------------------------------
   🔹 Cerrar sesión
--------------------------------*/
document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
});

/* -------------------------------
   📌 Cargar Menú
--------------------------------*/
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

/* Cambiar disponible / no disponible */
async function toggleDisponible(id, estadoActual) {
    await fetch(`${API_MENU}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disponible: !estadoActual })
    });

    cargarMenu();
}

/* -------------------------------
   📦 Cargar Pedidos
--------------------------------*/
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
                <p>Usuario: ${p.userId}</p>
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
        contenedor.innerHTML = "Error al cargar pedidos ❌";
    }
}

/* Cambiar estado */
async function cambiarEstado(id, nuevoEstado) {
    await fetch(`${API_ORDERS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
    });

    cargarPedidos();
}

/* -------------------------------
   📊 Dashboard con Chart.js
--------------------------------*/
function generarGrafico(pedidos) {
    const estados = {
        pendiente: 0,
        preparación: 0,
        entregado: 0
    };

    pedidos.forEach(p => estados[p.estado]++);

    const ctx = document.getElementById("graficoPedidos");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Pendiente", "En preparación", "Entregado"],
            datasets: [{
                data: [
                    estados.pendiente,
                    estados.preparación,
                    estados.entregado
                ]
            }]
        }
    });
}
