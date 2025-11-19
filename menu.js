const API_URL = "https://6915332d84e8bd126af90ca8.mockapi.io/menu";
<<<<<<< HEAD
=======

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
const categorias = [
    { nombre: "Pizzas", img: "pexels-seanm-166451.jpg" },
    { nombre: "Promociones", img: "pexels-renestrgar-13814644.jpg" },
    { nombre: "Bebidas", img: "pexels-gustavo-santana-3928789-5860659.jpg" }
];
<<<<<<< HEAD
const contCategorias = document.getElementById("categorias-container");
const contProductos = document.getElementById("productos-container");
const tituloCategoria = document.getElementById("titulo-categoria");
const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
if (!usuario || usuario.role !== "user") {
    alert("Debes iniciar sesión como usuario.");
    window.location.href = "login.html";
}
document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
});
=======

const contCategorias = document.getElementById("categorias-container");
const contProductos = document.getElementById("productos-container");
const tituloCategoria = document.getElementById("titulo-categoria");

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
function cargarCategorias() {
    contCategorias.innerHTML = categorias.map(cat => `
        <div class="categoria-card" onclick="mostrarCategoria('${cat.nombre}')">
            <img src="${cat.img}">
            <h3>${cat.nombre.toUpperCase()}</h3>
        </div>
    `).join('');
}
<<<<<<< HEAD
cargarCategorias();
async function mostrarCategoria(cat) {
    tituloCategoria.textContent = cat;
    const r = await fetch(API_URL);
    let productos = await r.json();
    console.log("Productos completos:", productos);
    productos = productos.sort((a, b) => a.precio - b.precio);
=======

cargarCategorias();


// =============== CARGA DE PRODUCTOS DESDE API ==================
async function mostrarCategoria(cat) {
    tituloCategoria.textContent = cat;

    const r = await fetch(API_URL);
    let productos = await r.json();

    console.log("Productos completos:", productos);
    
    // ordenar por precio
    productos = productos.sort((a, b) => a.precio - b.precio);

    // filtro seguro
>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    const filtrados = productos.filter(
        p => p.tipo.trim().toLowerCase() === cat.toLowerCase()
            && (p.disponible === true || p.disponible === "true")
    );
<<<<<<< HEAD
    console.log("Filtrados:", filtrados);
=======

    console.log("Filtrados:", filtrados);

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    contProductos.innerHTML = filtrados.length > 0
        ? filtrados.map(p => `
            <div class="producto-card">
                <img src="${p.imagen || 'https://via.placeholder.com/300'}" />
                <div class="info">
                    <h4>${p.nombre}</h4>
                    <p class="precio">$${p.precio}</p>
                    <button onclick="agregarAlCarrito(${p.id}, '${p.nombre}', ${p.precio}, '${p.imagen || ''}')">
                        Agregar
                    </button>
                </div>
            </div>
        `).join('')
        : `<p>No hay productos en la categoría <strong>${cat}</strong>.</p>`;
}
<<<<<<< HEAD
let carrito = [];
let total = 0;
const contador = document.getElementById("carrito-contador");
const panel = document.getElementById("carrito-panel");
document.getElementById("carrito-icon").onclick = () => {
    panel.classList.toggle("oculto");
};
=======



// ==================== CARRITO ======================
let carrito = [];
let total = 0;

const contador = document.getElementById("carrito-contador");
const panel = document.getElementById("carrito-panel");

document.getElementById("carrito-icon").onclick = () => {
    panel.classList.toggle("oculto");
};

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
function agregarAlCarrito(id, nombre, precio, imagen) {
    carrito.push({ id, nombre, precio, imagen });
    total += precio;
    renderCarrito();
}
<<<<<<< HEAD
=======

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
function renderCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = carrito.map(item => `
        <li>
            <img src="${item.imagen}" width="40">
            ${item.nombre} - $${item.precio}
        </li>
    `).join('');
<<<<<<< HEAD
    document.getElementById("total-carrito").textContent = total;
    contador.textContent = carrito.length;
}
=======

    document.getElementById("total-carrito").textContent = total;
    contador.textContent = carrito.length;
}

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
function vaciarCarrito() {
    carrito = [];
    total = 0;
    renderCarrito();
}
<<<<<<< HEAD
=======

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
async function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
<<<<<<< HEAD
    const orden = {
        userId: usuario.id,
        items: carrito,
        total: total,
        estado: "pendiente"
    };
=======

    const orden = {
        fecha: new Date().toISOString(),
        total: total,
        items: carrito
    };

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    try {
        const r = await fetch("https://6911df1052a60f10c81f9c7d.mockapi.io/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orden)
        });
<<<<<<< HEAD
        if (!r.ok) {
            throw new Error("Error al enviar la orden");
        }
        const data = await r.json();
        alert("Compra realizada con éxito. ID de orden: " + data.id);
        carrito = [];
        total = 0;
        renderCarrito();
=======

        if (!r.ok) {
            throw new Error("Error al enviar la orden");
        }

        const data = await r.json();

        alert("Compra realizada con éxito. ID de orden: " + data.id);

        // vaciar carrito
        carrito = [];
        total = 0;
        renderCarrito();

>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al procesar tu compra.");
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 07d04ee046c5662c35d79539a1ec83ba7c084a58
