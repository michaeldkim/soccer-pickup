import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";

interface FormProps {
    route: string;
    method: string;
}

const Form: React.FC<FormProps> = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                console.log("LOGGING IN AS:" + res.data)
                navigate("/dashboard")
            } else {
                navigate("/login")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response)
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-light-slate">
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <div className="mb-4 flex justify-center items-center flex-col">
                    <h1 className="block text-gray-700 text-4xl font-bold mb-7">{name}</h1>
                    <input
                        className="placeholder:pl-1 indent-1"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div className="mb-6 flex justify-center items-center flex-col">
                    <input
                        className="placeholder:pl-1 indent-1"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                {loading && <LoadingIndicator />}
                <div className="flex justify-center items-center flex-col py-1">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {name === "Login" ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;