import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListing from './pages/JobListing';
import EventListing from './pages/EventListing';
import VisaAdvice from './pages/VisaAdvicePage';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import DataVisualization from './pages/DataVisualization';
import PersonalizedTips from './pages/PersonalizedTips';

function App() {
  const userId = '';
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job-listing" element={<JobListing />} />
        <Route path="/event-listing" element={<EventListing />} />
        <Route path="/visa-advice" element={<VisaAdvice />} />
        <Route path="/data-visualization" element={<DataVisualization />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-profile" element={<UserProfile userId={userId} />} />
        <Route path="/personalizedTips" element={<PersonalizedTips />} />
      </Routes>
    </Router>
  );
}

export default App;
