import { useEffect, useState } from "react";
import { BASE_URL } from "../../API";
import { FaRegSun } from "react-icons/fa";  // For the sunshine icon in the greeting

const AdminDashboard = () => {
    const [data, setData] = useState([
        {
            title: "Registered Creators",
            value: 0,
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/users/admin/dashboard`);
                const data = await res.json();
                setData([
                    {
                        title: "Registered Creators",
                        value: data.creators,
                    },
                    {
                        title: "Registered Users",
                        value: data.users,
                    },
                ]);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full flex flex-col gap-5 p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen">
            <h1 className="text-4xl font-extrabold text-white flex items-center gap-3 mb-8">
                <FaRegSun size={30} className="text-yellow-300" /> Welcome Back
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 flex flex-col gap-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">{item.title}</h2>
                        <p className="text-4xl font-bold text-indigo-600">{item.value}</p>
                        <div className="mt-4">
                            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
