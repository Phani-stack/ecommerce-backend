import React from 'react'
import { login } from '../../api/auth.api.js';
const Login = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword]= React.useState("");

  async function loginUser() {
    const response = await login(email, password);
    localStorage.setItem("token", response.token);
    if (register.success) alert("User logged in sucessfully");
  }

  return (
    <div>
      <input placeholder='email' onChange={(element) => setEmail(element.target.value)} />
      <input placeholder='password' onChange={(element) => setPassword(element.target.value)} />
      <button onClick={loginUser}>submit</button>
    </div>
  )
}

export default Login;
