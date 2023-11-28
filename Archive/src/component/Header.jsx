import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  const [userRole, setUserRole] = useState('');  // Initialize state for user role

  useEffect(() => {
    // Fetch user role from local storage and update state
    // const role = localStorage.getItem('user_role');
    const role = "admin";
    if (role) {
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    // Here you can also navigate the user back to the login page or refresh the page
    window.location.reload(); // Reload the page

}

  return (
    <div className="bg-blue-500 text-white sticky top-0 z-50">
            <div className="container mx-auto p-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Logo Text on the Left */}
        <div className="text-2xl font-semibold mb-2 sm:mb-0">
          <span><a href="/user">Van Adhyapak</a></span>
        </div>

        {/* Menu Items and Logout Button on the Right */}
        <div className="flex flex-col sm:flex-row items-center">
        <nav className="mb-2 sm:mb-0 sm:mr-4">
        <ul className={`flex ${userRole === 'admin' ? 'flex-col sm:flex-row' : 'flex-row'} space-x-5 `}>              
        {userRole === 'admin' && (
                <>
                  <li><Link to="/user" className="hover:text-gray-300">Users</Link></li>
                  <li><Link to="/taluka" className="hover:text-gray-300">Taluka</Link></li>
                  <li><Link to="/town" className="hover:text-gray-300">Town</Link></li>
                  <li><Link to="/schoolType" className="hover:text-gray-300">School Type</Link></li>
                  <li><Link to="/school" className="hover:text-gray-300">School</Link></li>
                  <li><Link to="/class" className="hover:text-gray-300">Class</Link></li>
                  <li><Link to="/subjects" className="hover:text-gray-300">Subjects</Link></li>
                </>
              )}
              <li ><a href="/studyMaterials" className="hover:text-gray-300">&nbsp; Study Materials &nbsp; </a></li>
                <li className='sm:mx-5'>  | &nbsp; </li>
              <li ><a href="/logs" className="hover:text-gray-300">Logs &nbsp;</a></li>
            </ul>
          </nav>
          {/* Logout Button */}
          {/* <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                        Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;