//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function relog(){
    var inputEmail = document.getElementById("inputEmail").value
    var inputPass = document.getElementById("inputPassword").value
    var remem = document.getElementById("rememberMe").checked
    if ((inputEmail != '') && (inputPass != '')) {
        localStorage.setItem("user", inputEmail)
        window.location = "PaginaPrincipal.html"
    }
}