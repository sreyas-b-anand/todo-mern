import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Log In
        </h3>

        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          Log In
        </button>
        <p className="w-[100%] flex items-center justify-center p-4 gap-3">
          Create a new account?{" "}
          <Link
            className="p-1 bg-blue-600 rounded text-white opacity-[0.8] hover:opacity-[1]"
            to={"/signup"}
          >
            Sign Up
          </Link>
        </p>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
