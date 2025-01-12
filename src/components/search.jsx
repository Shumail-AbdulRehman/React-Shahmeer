import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../API';

const Search = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  // Debounce function to delay API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchUsers(query);
      } else {
        setUsers([]);
        setNoResults(false);
      }
    }, 300); // Debounce delay of 300ms

    return () => clearTimeout(timer);
  }, [query]);

  // Function to fetch users from the API
  const searchUsers = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/search?search=${searchTerm}`);
      const data = await response.json();

      if (data.length > 0) {
        setUsers(data);
        setNoResults(false);
      } else {
        setUsers([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle user selection from the dropdown
  const handleUserSelect = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="relative w-full  ">
      {/* Search Input */}
     <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search Here "
  className="w-full px-3 py-2 rounded-full text-gray-800 bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 ease-in-out shadow-sm"
/>

{query.trim() && (
  <div className="absolute mt-2 bg-black border border-gray-700 rounded-md shadow-lg w-fit z-10">
    {loading ? (
      <div className="p-3 text-center text-gray-400">Loading...</div>
    ) : (
      <>
        {users.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {users.map((user) => (
              <li
                key={user._id}
                className="px-4 py-3 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleUserSelect(user._id)}
              >
                <p className="font-medium text-white">{user.username}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-3 text-center text-gray-400">No record found</div>
        )}
      </>
    )}
  </div>
)}


     
    </div>
  );
};

export default Search;
