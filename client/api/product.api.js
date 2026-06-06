import axios from "axios";

const baseurl = "http://localhost:8000/api/product";

export async function getAllProducts() {
    const response = await axios.get(baseurl + "/products")
    return response.data;
}

export async function getProductDetails(id) {
    const response = await axios.get(baseurl + "/products/" + id);
    return response.data;
}
