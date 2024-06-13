import { headers } from "../components/env.js";

export const getAllProductName = async({search:text} = {search:"Phone"}) => {
    console.log("Esperando ........");
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${text}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL`;
    const option = {
        method: 'Get',
        headers
    };
    let res = await fetch(url, option);
    let data = await res.json();
    return data;
}
export const getAllCategory = async () => {
    const url =`https://real-time-amazon-data.p.rapidapi.com/product-category-list?country=US`;
    const option = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, option);
    let data = await res.json();
    return data
};