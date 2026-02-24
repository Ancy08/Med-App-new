import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";

function Signup() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPass,setConfirmPass] = useState("");
const [error,setError] = useState("");

const navigate = useNavigate();
const location = useLocation();

// Role coming from previous page
const role = location.state?.role || "Patient";

const handleSubmit = async(
e: React.FormEvent<HTMLFormElement>
)=>{

e.preventDefault();

setError("");

// PASSWORD MATCH CHECK

if(password !== confirmPass){

setError("Passwords do not match");
return;

}

try{

// FIREBASE SIGNUP

await createUserWithEmailAndPassword(
auth,
email,
password
);

// SAVE ROLE

localStorage.setItem("role",role);

// AFTER SIGNUP → LOGIN PAGE

navigate("/login");

}
catch(err:any){

setError(err.message);

}

};

return(

<div className="bg-red-100 min-h-screen flex flex-col justify-center items-center">

<h1 className="text-2xl font-bold mb-5 text-gray-800">

Sign Up

</h1>

<form
onSubmit={handleSubmit}
className="p-10"
style={{width:"50%"}}
>

{/* EMAIL */}

<div className="mb-4 flex flex-row">

<label className="block w-40 text-gray-700">

Email:

</label>

<input
type="email"
required
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="mt-1 p-2 w-full border rounded-md"
/>

</div>


{/* PASSWORD */}

<div className="mb-4 flex flex-row">

<label className="block w-40 text-gray-700">

Password:

</label>

<input
type="password"
required
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="mt-1 p-2 w-full border rounded-md"
/>

</div>


{/* CONFIRM PASSWORD */}

<div className="mb-4 flex flex-row">

<label className="block w-40 text-gray-700">

Confirm Password:

</label>

<input
type="password"
required
value={confirmPass}
onChange={(e)=>setConfirmPass(e.target.value)}
className="mt-1 p-2 w-full border rounded-md"
/>

</div>


{/* ERROR */}

{error && (

<p className="text-red-500 text-sm mb-2">

{error}

</p>

)}


<p
className="text-blue-600 cursor-pointer my-2"
onClick={()=>navigate("/login")}
>

Already have an account? Login here

</p>


<button
type="submit"
className="bg-red-500 hover:bg-red-600 border border-black rounded-md text-white py-2 px-4">

Register

</button>

</form>

</div>

);

}

export default Signup;