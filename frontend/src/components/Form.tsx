import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from 'react-router-dom';

interface FormProps {
    route: string;
    method: string;
}

const Form: React.FC<FormProps> = ({ route, method }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender]= useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const isLogin = method === "login";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        const payload = isLogin
            ? { email, password }
            : {email, first_name: firstName, last_name: lastName, gender, password };

        try {
            const res = await api.post(route, payload)
            if (isLogin) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
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
        <div className="flex justify-center items-center h-screen w-fill bg-light-slate">
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <div className="flex flex-col justify-center align-middle items-center">
                    <h1 className="block text-gray-700 text-4xl font-bold mb-7">{isLogin ? "Login" : "Register"}</h1>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mb-3 w-full"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="flex flex-col justify-center align-middle">
                        <input
                                className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mb-3"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                required
                            />
                            <input
                                className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mb-3"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                required
                            />
                            <select
                                className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mb-3"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                    </div>
                )}
                <div className="mb-6 flex justify-center items-center flex-col">
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mb-3 w-full"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                {loading && <LoadingIndicator />}
                <div className="flex justify-center items-center flex-col py-1">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                </div>
                {isLogin ? 
                    <div className="mt-5 flex justify-center"> 
                        <Link to="/register">Don't have an account?</Link>
                    </div> : 
                    <div className="mt-5 flex justify-center">
                        <Link to="/login">Already have an account?</Link>
                    </div>
                }
            </form>
        </div>
    );
};

export default Form;