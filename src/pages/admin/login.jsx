import { useState } from 'react';
import { AUTH } from '../../API';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPortal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const { user, setToken } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            fetch(`${AUTH}/user/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.err) {
                        console.error(data.err);
                        toast.error(data.err);
                        throw new Error(data.err);
                    }
                    const { token } = data;
                    localStorage.setItem('ticKitToken', token);
                    toast.success("Login Successful");
                    setToken(token);
                    setIsOpen(false);
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error(error);
                    toast.error("Login failed");
                }).finally(() => setLoading(false));
        }
        catch (error) {
            console.error(error);
            toast.error("Login failed");
        }
    }

    if (user && user.role === 'admin') {
        return <Navigate to={location.state?.from || '/dashboard'} replace />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="transform transition-all duration-500 bg-white rounded-xl shadow-lg p-8 w-96 mx-auto animate-slideDown"
                    >
                        <h2 className="text-3xl text-gray-800 font-extrabold text-center mb-8">Login to Tickit</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={credentials.email}
                                    onChange={(e) =>
                                        setCredentials({
                                            ...credentials,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={credentials.password}
                                    onChange={(e) =>
                                        setCredentials({
                                            ...credentials,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-3 text-center flex items-center justify-center disabled:cursor-not-allowed rounded-lg font-semibold disabled:opacity-60 hover:bg-indigo-700 transition"
                            >
                                {loading ? (
                                    <div className='w-5 h-5 border-2 border-r-white animate-spin rounded-full ' />
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800 text-sm">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPortal;
