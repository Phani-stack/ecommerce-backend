import axios from "axios";

const baseurl = "http://localhost:8000/api/auth";

export async function register(name, email, password) {
    const response = await axios.post(baseurl + "/register", {
        name: name,
        email: email,
        password: password
    });
    return response.data;
}

export async function login(email, password) {
    const response = await axios.post(baseurl + "/login", {
        email: email,
        password: password
    });

    return response.data;
}
