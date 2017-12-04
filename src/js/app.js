import * as item from './services/item.service';
import Items from './models/Item.class';
import * as category from './services/category.service';
import Categories from './models/Category.class';

let itemlist,textaddfilters,textlessfilters,min_price,max_price,location_range,extra_filters,categories;
let searchcontentinput,categorycontentinput,location_content_input,btn_search;
let keyword, chosenCategory,location;
let categoriesArray=[];
let pageSize=32,pageNumber = 1;

function init() {
    itemlist = document.querySelector(".item-list");
    textaddfilters = document.querySelector("#text-add-filters");
    textlessfilters = document.querySelector("#text-less-filters");
    min_price = document.querySelector("#min_price");
    max_price = document.querySelector("#max_price");
    location_range = document.querySelector("#location_range");
    extra_filters = document.querySelector(".extra-filters");
    categories = document.querySelector("#categories");

    searchcontentinput = document.querySelector("#searchcontentinput");
    categorycontentinput = document.querySelector("#categorycontentinput");
    location_content_input = document.querySelector("#location-content-input");
    btn_search = document.querySelector(".btn-search");

    initSliders();
    addEventListeners();
    loadItems("","","");
    loadCategories();
}
function initSliders(){
    let price_slider = document.getElementById('price-slider');
    noUiSlider.create(price_slider, {
        start: [20, 80],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 0
        })
    });
    min_price.value = price_slider.noUiSlider.get()[0];
    max_price.value = price_slider.noUiSlider.get()[1];
    price_slider.noUiSlider.on('slide', function(){
        let a= price_slider.noUiSlider.get();
        min_price.value = a[0];
        max_price.value = a[1];
    });

    let location_slider = document.getElementById('location-slider');
    noUiSlider.create(location_slider, {
        start: 40,
        connect: [true, false],
        step: 1,
        orientation: 'horizontal',
        range: {
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 0
        })
    });

    location_range.value = location_slider.noUiSlider.get();
    location_slider.noUiSlider.on('slide', function(){
        location_range.value = location_slider.noUiSlider.get();
    });
}
function addEventListeners(){
    textaddfilters.addEventListener("click",()=>{
        extra_filters.style.display = "block";
        textaddfilters.style.display = "none";
    });
    textlessfilters.addEventListener("click",()=>{
        extra_filters.style.display = "none";
        textaddfilters.style.display = "block";
    });

    btn_search.addEventListener("click",()=>{
        pageNumber = 1;
        keyword = searchcontentinput.value;
        if(categorycontentinput.value !== ""){
            chosenCategory = getCategoryId(categorycontentinput.value);
        }
        else{
            chosenCategory = "";
        }
        location = location_content_input.value;
        loadItems(keyword,chosenCategory,location);
    });
}

function loadItems(keyword,category,location){
    console.log(keyword+ " " + category + " "+location);
    let url = `https://neveor.com/api/items?keyword=${keyword}&categories=${category}&location=${location}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
    pageNumber+=1;
    item.getItems(pageSize,url).then(showItems,showError);
}
function loadCategories(){
    let url = `https://neveor.com/api/categories`;
    category.getCategories(url).then(initCategories,showError)
}

function showItems(response){
    console.log(response);
    let htmlBuilder = "",
        l = response.items.length;
    htmlBuilder += '<div class="row"><div class="col s2"></div>';
    for(let i = 0; i<l; i++){
        if(i!==0&&i%4===0){
            htmlBuilder += '</div><div class="row"><div class="col s2"></div>';
        }
        let o = response.items[i];
        let nItem = new Items(o.id,o.name,o.description, o.latitude,o.longitude, o.userId,o.timestamp,o.pictures,o.thumbnail,o.categories,o.pricePerDay,o.visible,o.groupId);
        htmlBuilder += '<div class="col s2">';
        htmlBuilder += `<a href="/details?id=${nItem.id}" class="item-view__link">`;
        htmlBuilder += '<div class="card">';
        htmlBuilder += '<div class="item-view">';
        if(nItem.thumbnail!==null){
            htmlBuilder += `<img src="${nItem.thumbnail}" class="item-view__img">`;
        }
        else{
            htmlBuilder += `<img src="../img/noimages.png" class="item-view__img">`;
        }
        htmlBuilder += `<div class="row">`;
        htmlBuilder += `<div class="col s12">`;
        htmlBuilder += `<span class="item-view__name">${nItem.name}</span>`;
        htmlBuilder += `</div>`;
        htmlBuilder += `<div class="col s12">`;
        htmlBuilder += `<span class="item-view__price">€${nItem.pricePerDay}/day</span>`;
        htmlBuilder += `</div>`;
        htmlBuilder += `</div>`;
        htmlBuilder += '</div>';
        htmlBuilder += '</div>';
        htmlBuilder += '</a>';
        htmlBuilder += '</div>';
    }
    htmlBuilder += '</div>';
    itemlist.innerHTML = htmlBuilder;
}
function initCategories(response){
    let htmlBuilder = "",
        l = response.length;
    for(let i = 0; i<l; i++) {
        let o = response[i];
        let nItem = new Items(o.id,o.name);
        htmlBuilder+=`<option id=${nItem.id} value="${nItem.name}"></option>`;
        categoriesArray.push([nItem.name,nItem.id]);
    }
    categories.innerHTML = htmlBuilder;
}

function getCategoryId(categoryname) {
    for (let i = 0, len = categoriesArray.length; i < len; i++) {
        if (categoriesArray[i][0] === categoryname) {
            return categoriesArray[i][1];
        }
    }
}

function showError(err){
    console.error(err);
}

init();
