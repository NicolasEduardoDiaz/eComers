//let header_information = document.queriSelector(".header_information")
import { menulistCategoryIndex } from "./module/menu.js";
import { galleryindex } from "./components/gallery.js";
import { getAllProductName, getAllCategory, getAllProductRandom  } from "./modules/app.js";
import { getProductId } from "./modules/detail.js";

let input_search = document.querySelector("#input_search");
let main_article = document.querySelector(".main_article");
let nav_ul = document.querySelector(".nav_ul");

let searchProducts = async e => {
    let params = new URLSearchParams(location.search);
    let dataSearch = { search: e.target.value, id: params.get('id')}
    input_search.value = null
    let res = ""
    if(input_search.dataset.opc == "random"){
        res = await getAllProductRandom({})
        delete input_search.dataset.opc
        history.pushState(null, "", "?id=aps");
        console.log(dataSearch);
    }
    else {
        res = await getAllProductName(dataSearch);
        console.log(dataSearch);
    }
    console.log(res);
    main_article.innerHTML = galleryindex(res, params.get('id'));

    let {data: {products}} = res;
    let asin = products.map(value => {return {id: value.asin}});

    let proceso = new Promise(async(resolve, reject) => {
        for(let i = 0; i < asin.length; i++) {
            if(localStorage.getItem(asin[i].id)) continue;
            let data = await getProductId(asin[i])
            localStorage.setItem(asin[i].id, JSON.stringify(data))
        }
        resolve({message: "Datos buscados correctamente "});
    })
    Promise.all([proceso]).then(res => {console.log(res);})
}

addEventListener("DOMContentLoaded", async (e) => {
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    nav_ul.innerHTML = await menulistCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));

    history.pushState(null, "", "?id=fashion");
    input_search.value = "zapato"
    const eventoChange = new Event('change');
    input_search.dispatchEvent(eventoChange);
})

input_search.addEventListener("change", searchProducts)