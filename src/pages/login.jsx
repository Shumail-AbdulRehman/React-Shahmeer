import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH } from '../API';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const { setToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [fields, setFields] = useState([
    {
      type: 'email',
      placeholder: 'Enter your email address',
      name: 'email',
      value: '',
      isRequired: true,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      name: 'password',
      value: '',
      isRequired: true,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});

    axios
      .post(`${AUTH}/user/consumer/login`, data)
      .then((res) => {
        toast.success(res.data.message);
        setFields(
          fields.map((field) => {
            field.value = '';
            return field;
          })
        );
        localStorage.setItem('ticKitToken', res.data.token);
        setToken(res.data.token);
        const redirectPath = location.state?.from || '/';
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden flex justify-center items-center">
      {/* Moving Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-black to-gray-700 opacity-50 animate-pulse"></div>

      <div className="z-10 flex w-full max-w-6xl">
        {/* Left Side "Login" Text */}
        <div className="w-1/2 flex items-center justify-center">
          <h1 className="text-[10rem] md:text-[12rem] font-extrabold text-white opacity-90 animate-bounce">
            Login
          </h1>
        </div>

        {/* Right Side Form */}
        <div className="w-1/2 bg-gray-900 bg-opacity-80 p-10 rounded-lg shadow-xl">
          <h1 className="text-4xl font-extrabold text-center text-white mb-6">
            Welcome Back!
          </h1>
          <p className="text-gray-400 text-center mb-8 text-lg">
            Login to your account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, index) => (
              <div key={index} className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={(e) =>
                    setFields((prevFields) =>
                      prevFields.map((f, i) =>
                        i === index ? { ...f, value: e.target.value } : f
                      )
                    )
                  }
                  placeholder={field.placeholder}
                  required={field.isRequired}
                  className="w-full bg-gray-800 text-white rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg transition-transform transform hover:scale-105"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-3 px-5 rounded-lg hover:bg-yellow-600 transition-all duration-200 text-lg"
            >
              Login
            </button>
          </form>
          <p className="text-gray-400 text-center mt-6 text-lg">
            Don't have an account?{' '}
            <span
              className="text-yellow-500 cursor-pointer hover:underline"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
