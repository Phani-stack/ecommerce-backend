import axios from "axios";

const baseurl = "http://localhost:8000/api/cart"
const token = localStorage.getItem("token");

export async function addProductToCart(productId) {
    const response = await axios.post(baseurl + "/add",
        {
            productId,
            quantity : 1
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}
