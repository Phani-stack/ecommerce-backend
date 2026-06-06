import React from 'react'
import { register } from "../../api/auth.api.js";

const Register = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function registerUser() {
        const response = await register(name, email, password);
        localStorage.setItem("token", response.token);
        if (register.success) alert("User registed sucessfully");
    }


    return (
        <div>
            <input type='text' placeholder='name' onChange={(element) => setName(element.target.value)} />
            <input type='email' placeholder='email' onChange={(element) => setEmail(element.target.value)} />
            <input type='password' placeholder='password' onChange={(element) => setPassword(element.target.value)} />
            <button onClick={registerUser}>submit</button>
        </div>
    )
}

export default Register
