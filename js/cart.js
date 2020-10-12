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
});