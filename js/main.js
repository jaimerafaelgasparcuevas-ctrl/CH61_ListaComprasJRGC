const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const cuerpoTabla = document.getElementById("tablaListaCompras") .getElementsByTagName("tbody")[0];

  
let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;


function validarCantidad(cantidad) {
    if (cantidad.length == 0) {
        return false;
    }//Length==0
    if (isNaN(cantidad)) {
        return false;
    }//isNaN
    if (Number(cantidad) <= 0) {
        return false;
    }//cantidad<=0
    return true;


}// validaarCantidad
function getPrecio() {
    return Math.round(Math.random()*10000)/100;
}//getPrecio

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true;

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    if (txtName.value.length < 3) {
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML +=
            "<strong>El Nombre del producto no es correcto</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }// name < 3

    if (!validarCantidad(txtNumber.value)) {
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML +=
            "<br><strong>La Cantidad del producto no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }// ! validarCantidad

    if(isValid){
        let precio = getPrecio();
         cont++;
        let row = `<tr> 
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
       
        totalEnProductos += Number(txtNumber.value);
        costoTotal += precio * Number (txtNumber.value);

        cuerpoTabla.insertAdjacentHTML('beforeend', row);
        contadorProductos.innerText = cont;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();

    }//isValid


    console.log(txtName.value);


}); //btnAgregar click
