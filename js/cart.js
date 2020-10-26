cartArray = [];


function total() {
    let suma = 0;
    let subs = document.getElementsByClassName("subtotal")
    for (let i = 0; i < subs.length; i++) {
        suma += parseInt(subs[i].innerHTML)
    }
    document.getElementById("total").innerHTML = suma;
    shippingAndTotal();
}

function subTotal(unitCost, i) {

    let count = parseInt(document.getElementById(`cantidad${i}`).value);

    subtotal = count * unitCost;

    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    total();
}

function changeCurrency(unitCost, currency) {
    if (currency === "USD") {
        return unitCost * 40
    } else {
        return unitCost
    }
}

function showCartProducts(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        let unitCostDolar = changeCurrency(product.unitCost, product.currency);
        let sub = unitCostDolar * product.count;

        contenido += `
            <tr>
                <th>${i + 1}</th>
                <td><img src='${product.src}' width="100px"></td>

                <td>${product.name}</td>
                
                <td> ${product.currency} ${product.unitCost}</td>
                
                <td><input style="width:45px;" onchange="subTotal(${unitCostDolar}, ${i})" 
                    type="number" id="cantidad${i}" value="${product.count}" min="1"></td>
                
                <td><span class="subtotal" id="productSubtotal${i}" style="font-weight:blod;">${sub}</td>
                <td><button id="${i}" class="btn btn-danger" onclick="eliminar(${i})"> X</button></td>
                </tr>
        `
    }
    document.getElementById("cartProducts").innerHTML += contenido;
    total()
}

function shippingAndTotal() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;
    let elements = document.getElementsByName("envio");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            percent = parseInt(elements[i].value);
            envio = percent * total / 100;
        }
    }

    let totalMasEnvio = total + envio;
    let contenido = `
        <tr>
        <td>UYU ${envio}</td>
        <td>${totalMasEnvio}</td>
        </tr>
    `
    document.getElementById("totalEnvio").innerHTML = contenido;
}

function eliminar(i) {
    if (cartArray.length > 1) {
        cartArray.splice(i, 1);
        document.getElementById("cartProducts").innerHTML = "";
        showCartProducts(cartArray);
    } else {
        cartArray = []
        document.getElementById("productoss").innerHTML =`
            
        <h2>No tiene productos en el carrito</h2>
        `
    }
    total()
}

function selectPayment() {
    var payments = document.getElementsByName("formadepago");
    for (var i = 0; i < payments.length; i++) {
        if (payments[i].checked && (payments[i].value == "1")) {
            document.getElementById("bankPay").classList.add("d-none");
            document.getElementById("cardPay").classList.remove("d-none");
        } else if (payments[i].checked && (payments[i].value == "2")) {
            document.getElementById("cardPay").classList.add("d-none");
            document.getElementById("bankPay").classList.remove("d-none");
        }
    }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_2_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;

            showCartProducts(cartArray);
            shippingAndTotal()
        }
    });
    
    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {
            shippingAndTotal()
        });
    }


    let buttonModalPagar = document.getElementById("modalDatosEnvio");
    buttonModalPagar.addEventListener('click', function (e) {
        let formEnvio = document.getElementById("needs-validation");
        if (formEnvio.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        formEnvio.classList.add('was-validated');
    });

    let confirmPay = document.getElementById("confirmPay");
    confirmPay.addEventListener('click', function (e) {
        let formPay = document.getElementsByName("formadepago");
        let value = null;
        for (var i = 0; i < formPay.length; i++) {
            if (formPay[i].checked) {
                value = formPay[i].value;
                break;
            }
        }

        if (value != null && (value == "1" || value == "2")) {
            let formPayment;
            if (value == "1") { 
                formPayment = document.getElementById('payOption1');
            } else if (value == "2") { 
                formPayment = document.getElementById('payOption2');
            }

            if (formPayment.checkValidity() === false) { 
                e.preventDefault();
                e.stopPropagation();
            } else {
                $('#staticBackdrop').modal('hide');
            }
            formPayment.classList.add('was-validated');
        }
    });


    let tipoPagos = document.getElementsByName("formadepago");
    for (var i = 0; i < tipoPagos.length; i++) {
        tipoPagos[i].addEventListener("change", function () {
            selectPayment();
        });
    }


});