const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody")[0];

let datos = [];

function validarCantidad(cantidad) {
    if (cantidad.length == 0) return false;
    if (isNaN(cantidad)) return false;
    if (Number(cantidad) <= 0) return false;
    return true;
}

function getPrecio() {
    return Math.round(Math.random() * 10000) / 100;
}


function actualizarResumen() {
    let totalProductos = 0;
    let costoTotalLocal = 0;

    datos.forEach((item) => {
        totalProductos += Number(item.cantidad);
        costoTotalLocal += Number(item.precio) * Number(item.cantidad);
    });

    contadorProductos.innerText = datos.length;
    productosTotal.innerText = totalProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(costoTotalLocal);

    localStorage.setItem("datos", JSON.stringify(datos));
}


function renderizarTabla() {
    cuerpoTabla.innerHTML = "";

    datos.forEach((item, index) => {
        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${item.precio}</td>
            </tr>
        `;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    actualizarResumen();
}


btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();

    let isValid = true;

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    if (txtName.value.length < 3) {
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<strong>El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (!validarCantidad(txtNumber.value)) {
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<br><strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        const precio = getPrecio();

        const producto = {
            nombre: txtName.value,
            cantidad: Number(txtNumber.value),
            precio: precio
        };

        datos.push(producto);
        renderizarTabla();

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
});

btnClear.addEventListener("click", function () {

    // Reiniciar arreglo
    datos = [];

    // Limpiar tabla
    cuerpoTabla.innerHTML = "";

    // Reiniciar totales
    contadorProductos.innerText = 0;
    productosTotal.innerText = 0;
    precioTotal.innerText = "$0";

    // Limpiar localStorage
    localStorage.removeItem("datos");

    // Reset visual
    txtName.value = "";
    txtNumber.value = "";
    alertValidaciones.style.display = "none";
    txtName.focus();
});

window.addEventListener("load", function () {
    if (localStorage.getItem("datos") != null) {
        datos = JSON.parse(localStorage.getItem("datos"));
    }
    renderizarTabla();
});
