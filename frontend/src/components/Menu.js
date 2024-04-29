import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Menu.css'; // Import Menu styles

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false); // State to toggle the menu

    const handleSignOut = () => {
        // Add functionality to sign out the user
        // This could involve clearing local storage, redirecting to the login page, etc.
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu); // Toggle the menu visibility
    };

    return (
        <div className="menu-container">
            <div className="menu-icon" onClick={toggleMenu}>Menu
                {/* <div className={showMenu ? "hamburger-menu open" : "hamburger-menu"}>Menu</div> */}
            </div>
            {showMenu && (
                <div className="menu">
                    <ul>
                        <li><Link to="/user-profile">My Profile</Link></li> {/* Link to My Profile */}
                        <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li> {/* Sign Out button */}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Menu;
