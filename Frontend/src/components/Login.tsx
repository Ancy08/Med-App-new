import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";

function Login() {
  // Form state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch user role from localStorage (or from DB if needed)
      const role = localStorage.getItem("role");

      if (role?.toLowerCase() === "patient") {
        navigate("/patient");
      }
      else if (role?.toLowerCase() === "caretaker") {
        navigate("/caretaker");
      }
      else {
        setError("User role not found. Please login again.");
      }
    } catch (err: any) {
      // Firebase error handling
      if (err.code && err.message) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">Login</h1>

      <form
        onSubmit={handleLogin}
        className="p-10"
        style={{ width: "50%" }}
      >
        {/* Email */}
        <div className="mb-4 flex flex-row">
          <label className="block w-40 text-gray-700">Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Password */}
        <div className="mb-4 flex flex-row">
          <label className="block w-40 text-gray-700">Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Create account link */}
        <p
          className="text-blue-600 cursor-pointer my-2"
          onClick={() => navigate("/signup")}
        >
          Create Account?
        </p>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 border border-black rounded-md text-white py-2 px-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;