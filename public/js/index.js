const socket = io();
const lista = document.getElementById("listaProductos");
const btnNuevo = document.getElementById("btnNuevoProducto");

function agregarCard(producto) {
    const div = document.createElement("div");
    div.className = "product-card";
    div.id = `prod-${producto.id}`;
    div.innerHTML = `
            <div class="product-img-box">
                ${producto.thumbnail ? `<img src="${producto.thumbnail}" alt="${producto.title}">` : ""}
            </div>
            <div class="product-info">
                <h3>${producto.title}</h3>
                <p>${producto.description}</p>
                <p class="price">$ ${producto.price}</p>
                <p><strong>Stock:</strong> ${producto.stock}</p>
            </div>
            <div class="actionsDel">
                <button class="btnEliminar" data-id="${producto.id}">Eliminar</button>
            </div>
    `;
    lista.appendChild(div);
}

socket.on("productoNuevo", (producto) => {
    agregarCard(producto);
});

socket.on("productoEliminado", (id) => {
    const item = document.getElementById(`prod-${id}`);
    if (item) item.remove();
});

btnNuevo.addEventListener("click", async () => {
    const { value: formValues } = await Swal.fire({
        title: "Crear nuevo producto",
        html: `
        <input id="swal-title" class="swal2-input" placeholder="Título" required>
        <input id="swal-description" class="swal2-input" placeholder="Descripción" required>
        <input id="swal-price" type="number" class="swal2-input" placeholder="Precio" required>
        <input id="swal-stock" type="number" class="swal2-input" placeholder="Stock" required>
        <input id="swal-thumbnail" class="swal2-input" placeholder="URL Imagen (opcional)">
        <input id="swal-code" class="swal2-input" placeholder="Código único" required>
        <input id="swal-category" class="swal2-input" placeholder="Categoría" required>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Crear",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const description = document.getElementById("swal-description").value;
        const price = parseFloat(document.getElementById("swal-price").value);
        const stock = parseInt(document.getElementById("swal-stock").value);
        const code = document.getElementById("swal-code").value;
        const category = document.getElementById("swal-category").value;
        if (!title || !description || !price || !stock || !code || !category) {
            Swal.showValidationMessage("Todos los campos obligatorios deben completarse");
            return false;
        }
        return {
            title,
            description,
            price,
            stock,
            thumbnail: document.getElementById("swal-thumbnail").value || null,
            code,
            category
        };
        }
    });
    if (formValues) {
        socket.emit("crearProducto", formValues);
    }
});

// ELIMINAR PROD
lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminar")) {
        const id = e.target.dataset.id;
        Swal.fire({
        title: "¿Seguro?",
        text: "Este producto se eliminará permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
        }).then((result) => {
        if (result.isConfirmed) {
            socket.emit("eliminarProducto", id);
        }
        });
    }
});
