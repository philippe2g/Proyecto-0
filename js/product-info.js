var comentsArray = [];
var info = {};


function showProduct(info, arrayComments){

    let htmlContentToAppend = "";
    let comments ="";
        htmlContentToAppend +=` 
    

        <h4> ${info.name}</h4> 
        <p><strong>Precio: </strong>${info.currency} ${info.cost}</p>
        <div id="imgInfo">
        <img src="${info.images[0]}" alt="${info.description}">
        <img src="${info.images[1]}" alt="${info.description}">
        <img src="${info.images[2]}" alt="${info.description}">
        <img src="${info.images[3]}" alt="${info.description}">
        <img src="${info.images[4]}" alt="${info.description}">
        <hr>
        </div>
        <p><strong>Descripción: </strong>${info.description}</p>
        <br>`;
        arrayComments.forEach(function(oldComment) {
            comments +=` 
            <p> ${oldComment.score} </p>
            <p> ${oldComment.user} ${oldComment.dateTime} </p>
            <P> ${oldComment.description}</p>
            <br><hr>
            ` 
        });

        document.getElementById("prueba 02").innerHTML = comments;
     document.getElementById("prueba 01").innerHTML = htmlContentToAppend;


}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            commentsArray = resultObj.data
            showProduct(info, commentsArray);
        }
    
    });

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            info = resultObj.data
            showProduct(info, commentsArray);
        }
    
    });

});