import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState("");

const navigate = useNavigate();

const handleLogin = async(

e:React.FormEvent<HTMLFormElement>

)=>{

e.preventDefault();

setError("");

try{

await signInWithEmailAndPassword(

auth,
email,
password

);

// ⭐ IMPORTANT CHANGE
const role = localStorage.getItem(email);

if(role === "Caretaker"){

navigate("/caretaker");

}

else{

navigate("/patient");

}

}
catch(err:any){

setError(err.message);

}

};

return(

<div className="bg-red-100 min-h-screen flex flex-col justify-center items-center">

<h1 className="text-2xl font-bold mb-5">

Login

</h1>

<form
onSubmit={handleLogin}
className="p-10"
style={{width:"50%"}}
>

<div className="mb-4 flex flex-row">

<label className="block w-40">

Email:

</label>

<input
type="email"
required
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border p-2 w-full rounded"
/>

</div>

<div className="mb-4 flex flex-row">

<label className="block w-40">

Password:

</label>

<input
type="password"
required
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border p-2 w-full rounded"
/>

</div>

{error &&(

<p className="text-red-500">

{error}

</p>

)}

<p
className="text-blue-600 cursor-pointer my-2"
onClick={()=>navigate("/signup")}
>

Create Account ?

</p>

<button

type="submit"

className="bg-red-500 text-white px-4 py-2 rounded"

>

Login

</button>

</form>

</div>

);

}

export default Login;