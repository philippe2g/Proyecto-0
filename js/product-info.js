var comentsArray = [];
var info = {};
var productsArray = [];

function showProduct(info, arrayComments){

    let htmlContentToAppend = "";
    let comments ="";
        htmlContentToAppend +=` 
    

        <h4> ${info.name}</h4> 
        <p><strong>Precio: </strong>${info.currency} ${info.cost}</p>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
             <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${info.images[0]}" class="d-block w-100" alt="${info.description}">
                </div>
                <div class="carousel-item">
                    <img src="${info.images[1]}" class="d-block w-100" alt="${info.description}">
                </div>
                <div class="carousel-item">
                    <img src="${info.images[2]}" class="d-block w-100" alt="${info.description}">
                </div>
                <div class="carousel-item">
                    <img src="${info.images[3]}" class="d-block w-100" alt="${info.description}">
                </div>
                <div class="carousel-item">
                    <img src="${info.images[4]}" class="d-block w-100" alt="${info.description}">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <hr>
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

function showRelatedProducts(productsArray, relatedProducts){
    let showRP = "";
    showRP += `<div class="row">`;
    relatedProducts.forEach(function(i) {
        showRP +=`
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="${productsArray[i].imgSrc}" alt=""></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${productsArray[i].name}</font></font></a>
                </h4>
                <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${productsArray[i].currency} ${productsArray[i].cost}</font></font></h5>
                <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${productsArray[i].description}</font><font style="vertical-align: inherit;">Amet numquam aspernatur!</font></font></p>
              </div>
              <div class="card-footer">
                <small class="text-muted"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">★ ★ ★ ★ ☆</font></font></small>
              </div>
            </div>
          </div>
        `

    });
    showRP += `</div>`;

    document.getElementById("prueba 03").innerHTML += showRP;
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

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data
            showRelatedProducts(productsArray, info.relatedProducts);
        }
    });
    
});