import { buttonCartDetails } from "./components/footer.js";
import { galleryCategory } from "./components/gallery.js";
import { productDetail, titleProductDetail } from "./components/section.js";
import { getProductId } from "./modules/detail.js";

let main_section_galerry = document.querySelector("#main_section_gellery");
let main_section_title = document.querySelector("#main_section_title");
let product_information = document.querySelector("#product_information");
let footer_ul = document.querySelector("#footer_ul");

addEventListener("DOMContentLoaded", async(e)=>{

    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));

    let info = JSON.parse(localStorage.getItem(id));
    main_section_galerry.innerHTML = await galleryCategory(info);
    main_section_title.innerHTML = await titleProductDetail(info);
    let btn_minus = document.querySelector("#btn_minus");
    let btn_plus = document.querySelector("#btn_plus");

    product_information.innerHTML = await productDetail(info);
    footer_ul.innerHTML = await buttonCartDetails(info);
    //let {data} = res;
    //let {
    //    category_path,
    //    about_product,
    //    product_details,
    //    product_information,
    //    product_photos,
    //    product_variations,
    //    rating_distribution,
    //    review_aspects,
    //    ...dataUpdate
    //} = data;
    //console.log(dataUpdate);

    btn_minus.addEventListener("click", quantity)
    btn_plus.addEventListener("click",quantity)
})

const quantity = async (e) => {
    let span_quantity = document.querySelector("#span_quantity");
    let price_discount = document.querySelector("#price_discount");
    let price_original = document.querySelector("#price_original");
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    let res = JSON.parse(localStorage.getItem(id)).data;

    let product_original_price = undefined;
    if(res.product_original_price) product_original_price = Number(res.product_original_price.replace("$", ""));
    let product_price = Number(res.product_price.replace("$", ""));

    if(e.target.id == "btn_plus")span_quantity.innerHTML = Number(span_quantity.innerHTML) + 1
    if(e.target.id == "btn_minus" && span_quantity.innerHTML > "1") span_quantity.innerHTML = Number(span_quantity.innerHTML) - 1

    price_discount.innerHTML = `$${(product_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
    if(product_original_price) price_original.innerHTML = `$${(product_original_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
    //swal.fire({
    //    position: "top-end",
    //    title: <small>Product ${id} with a quantity of ${span_quantity.innerHTML} was added to the cart</small>
    //    showConfirmButton: false,
    //    timer: 2000
    //});
}