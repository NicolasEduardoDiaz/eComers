export const galleryindex = (res, category) => {
    let {products} = res.data
    let plantilla = "";
    products.forEach((value, index) => {
        plantilla +=  /*html*/
        `<section>
                <div class="section__front_page">
                    <a href="views/detail.html?id=${value.asin}">
                        <img src="${value.products_photo}">
                    </a>
                    <img src="storage/img/heart.svg">
                </div>
                <h5>${value.product_title}</h5>
                <small>${category}</small>
                <div class="section__price">
                    <span>${value.product_price}</span>
                    <div  class="price__score">
                        <img src="storage/img/star.svg">
                        <p>${(value.product_star_rating!=null) ? value.product_star_rating: 0}</p>
                    </div>
                </div>
            </section>
            `;
    });
    return plantilla
};

export const galleryCategory = ({data: {products_photo}} = res) => {
    return /*html*/
    `<article class="article_product">
        <div class="product_image">
            ${products_photo.map(value => `<div class="product_image_item"><img src"${value}"></div>`).join('')}
        </div>
        <div class="product_menu">
            <a href="../?id='fashion'">
                <img src="../storage/img/back.svg">
            </a>
            <img src="../storage/img/heartBlack.svg">
        </div>
    </article>`
}