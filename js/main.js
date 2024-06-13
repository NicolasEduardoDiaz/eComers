//let header_information = document.queriSelector(".header_information")
import { menulistCategoryIndex } from "./module/menu.js";
import { galleryindex } from "./components/gallery.js";
import { getAllProductName } from "./modules/app.js";

let input_search = document.querySelector("#input_search");
let main_article = document.querySelector(".main_article");
let nav_ul = document.querySelector(".nav_ul");

addEventListener("DOMContentLoaded", async (e) => {
    let data = await getAllCategory();
    nav_ul.innerHTML = await menulistCategoryIndex(data);
})

input_search.addEventListener("change", async e => {
    let data = {search : e.target.value}
    input_search.value = null;
    
    let res = await getAllProductName(data)
    main_article.innerHTML += galleryindex(res);
});