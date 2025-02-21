import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state) => state.user?.userData?.loggedInUser);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch({ target: { value } });
  };

  const location = useLocation();
  const navigate = useNavigate();

  const redirectToHomePage = () => {
    navigate("/home");
  };

  return (
    <div className="z-10 flex items-center justify-between fixed top-0 w-full py-3 px-4 md:px-6 bg-gray-800 text-white shadow-md">
      {/* Left: Logo */}
      <div
        onClick={redirectToHomePage}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <img
          src="./twitube1.2.png"
          alt="Logo"
          className="w-10 sm:w-12 md:w-16 h-auto"
        />
        <span className="text-lg sm:text-xl md:text-2xl font-bold">
          Twi<span className="text-blue-600">Tube</span>
        </span>
      </div>

      {/* Search Bar (Always Visible, Adjusts Size) */}
      {location.pathname === "/home" && (
        <div className="flex justify-center flex-grow px-2">
          <form
            className="w-full sm:w-80 md:w-96 lg:w-[500px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={handleSearch}
              className="block w-full p-2 sm:p-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </form>
        </div>
      )}

      {/* Right: Profile Dropdown */}
      {location.pathname !== "/" && location.pathname !== "/login" && user && (
        <div className="flex items-center">
          <ProfileDropdown user={user} />
        </div>
      )}
    </div>
  );
}

export default Header;