const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
if (!usuario || usuario.role === "admin") {
    window.location.href = "login.html";
}

document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
});

const API_ORDERS = "https://6915332d84e8bd126af90ca8.mockapi.io/orders";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
    const cont = document.getElementById("itemsCarrito");
    cont.innerHTML = "";

    if (carrito.length === 0) {
        cont.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>Precio: $${item.precio}</p>
            <button onclick="eliminar(${index})">Eliminar</button>
        `;

        cont.appendChild(div);
    });

    const total = carrito.reduce((acc, item) => acc + Number(item.precio), 0);
    document.getElementById("total").textContent = `Total: $${total}`;
}

function eliminar(i) {
    carrito.splice(i, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

mostrarCarrito();

document.getElementById("enviarPedido").addEventListener("click", async () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const total = carrito.reduce((acc, item) => acc + Number(item.precio), 0);

    const pedido = {
        userId: usuario.id,
        items: carrito,
        total: total,
        estado: "pendiente"
    };

    await fetch(API_ORDERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
    });

    alert("Pedido enviado!");
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
});
