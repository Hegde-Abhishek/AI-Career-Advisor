import React, { useState } from 'react';
import AnimatedCards from '../components/AnimatedCards';
import Menu from '../components/Menu'; // Import the Menu component
import './HomePage.css';
import submitIcon from './1864224.png'; // Import the submit icon image
import menuIcon from './menu-icon.jpg'; // Import the menu icon image

const HomePage = () => {
    const [showCards, setShowCards] = useState(false);
    const [showMessageBar, setShowMessageBar] = useState(false);
    const [showMenu, setShowMenu] = useState(false); // State to toggle the menu

    const handleGetStarted = () => {
        setShowCards(true);
        setShowMessageBar(true);
    };

    const handleSubmit = () => {
        // Add functionality to submit the text in the message bar
        // This could involve sending the text to the backend for processing
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu); // Toggle the menu visibility
    };

    return (
        <div className="home-container">
            {/* <div className="top-right-menu">
                <img src={menuIcon} alt="Menu" onClick={toggleMenu} /> 
                {showMenu && <Menu />} 
            </div> */}
            <Menu/>
            <div className="ai-character">
                {/* AI character or animation */}
                {/* Example: <img src="ai-character.png" alt="AI Character" /> */}
                <div className="ai-animation">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
            <div className="content">
                <h1>Welcome to Career Advisor</h1>
                <p>Your personalized career guidance platform!</p>
                <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
                {showMessageBar && (
                    <div className="message-bar">Hi, How are you doing today?
                        {/* <input type="text" placeholder="Type your message here..." /> */}
                        {/* <img src={submitIcon} className='submit-icon' alt="Submit" onClick={handleSubmit} /> Submit icon */}
                    </div>
                )}
                {showCards && <AnimatedCards />}
            </div>
        </div>
    );
}

export default HomePage;
