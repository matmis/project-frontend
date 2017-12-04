import * as item from './services/item.service';

import * as item from './services/item.service';
import Items from './models/Item.class';

let itemlist;

let testjson = {
    id: "I-000000001-85697",
    name: "BMW",
    description: "Zwart 5 deurs",
    latitude: 51.1023,
    longitude: 3.99407,
    userId: null,
    timestamp: null,
    pictures: [
        "http://cdn.bmwblog.com/wp-content/uploads/2016/07/Frozen-Black-BMW-M3-4.jpg",
        "http://www.moibbk.com/images/bmw-m-black-13.jpg"
    ],
    thumbnail: "http://cdn.bmwblog.com/wp-content/uploads/2016/07/Frozen-Black-BMW-M3-4.jpg",
    categories: "vehicles, other",
    pricePerDay: null,
    visible: 1,
    groupId: null
};

function init() {

    itemlist = document.querySelector(".item-list");
    let id = getUrlParameter('id');
    addEventListeners();
    loadItem(id);
    initCarousel();
}

function addEventListeners(){

}

function loadItem(id){
    // console.log(id);
    // let url = `https://neveor.com/api/items/get`;
    // item.getItem(id,url).then(showItem,showError);
    showItem(testjson);
}

function showItem(response){
    response = testjson;
    //TODO delete test

    let htmlBuilder = "";
    htmlBuilder += '<div class="row">' +
        '<div class="col s2">' +
        '</div>';

    let o = response
    let nItem = new Items(o.id,o.name,o.description, o.latitude,o.longitude, o.userId,o.timestamp,o.pictures,o.thumbnail,o.categories,o.pricePerDay,o.visible,o.groupId);

    htmlBuilder += '<div class="col s5">';


    htmlBuilder += '<div class="item-view">';
     if(nItem.pictures.length!==0){
         let l = nItem.pictures.length;
         htmlBuilder += '<div class="carousel carousel-slider" data-indicators="true"><div class="carousel-fixed-item center middle-indicator">' +
             '     <div class="left">' +
             '      <a href="Previo" class="movePrevCarousel middle-indicator-text waves-effect waves-light content-indicator"><i class="material-icons left  middle-indicator-text arrow-buttons">chevron_left</i></a>' +
             '     </div>' +
             '     ' +
             '     <div class="right">' +
             '     <a href="Siguiente" class=" moveNextCarousel middle-indicator-text waves-effect waves-light content-indicator"><i class="material-icons right middle-indicator-text arrow-buttons">chevron_right</i></a>' +
             '     </div>';
         htmlBuilder+='</div>';
         for(let i = 0; i<l; i++) {
            htmlBuilder += `<a class="carousel-item"><img src="${nItem.pictures[i]}" class="item-view__img" class=""></a>`;
         }

     }
    else{
        htmlBuilder += `<img src="../img/noimages.png" class="item-view__img">`;
    }

    htmlBuilder += `</div>`;
    htmlBuilder += `</div>`;
    htmlBuilder += `</div>`;
    htmlBuilder += '<div class="col s2">';
    htmlBuilder += '<div class="card">';
    htmlBuilder += '<div class="row">';
    htmlBuilder += '<div class="col s2">';
    htmlBuilder += `<span class="item-view__name">${nItem.name}</span>`;
    htmlBuilder += '</div>';
    htmlBuilder += '</div>';
    htmlBuilder += '<div class="row">';
    htmlBuilder += '<div class="col s2">';
    htmlBuilder += `<span class="item-view__name">€${nItem.pricePerDay}/day</span>`;
    htmlBuilder += '</div>';
    htmlBuilder += '</div>';
    htmlBuilder += '<div class="row">';
    htmlBuilder += '<div class="col s2">';
    htmlBuilder += '<div class="col s2"><a class="waves-effect waves-light btn btn-message"><i class="material-icons left">message</i>Message seller</a></div>';
    htmlBuilder += '</div>';
    htmlBuilder += '</div>';
    htmlBuilder += '</div>';
    htmlBuilder += '</div>';
    htmlBuilder += '</div>';
    htmlBuilder += `</div>`;
    htmlBuilder += '</div>';
    itemlist.innerHTML = htmlBuilder;
}


function showError(err){
    console.error(err);
}

function initCarousel(){

        $('.carousel.carousel-slider').carousel({fullWidth: true});

        $('.moveNextCarousel').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            $('.carousel').carousel('next');
        });

        // move prev carousel
        $('.movePrevCarousel').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            $('.carousel').carousel('prev');
        });
}
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

init();