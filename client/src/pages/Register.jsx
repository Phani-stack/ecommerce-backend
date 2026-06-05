import React from 'react'
import { register } from "../../api/auth.api.js";

const Register = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function registerUser() {
        register(name, email, password);
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
