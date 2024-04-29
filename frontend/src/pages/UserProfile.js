import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './UserProfile.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        workHistory: [],
        skills: [],
        preferences: [],
        careerGoal: '',
        workValue: '',
        internationalStudent: 'no',
        education: {
            currentMajor: '',
            degree: '',
            semester: '',
            currentGPA: '',
            programStartDate: '',
            programEndDate: '',
            lookingForSummerInternship: false,
            lookingForCoop: false,
            lookingForFullTimeJob: false,
        },
    });

    // useEffect(() => {
    //     const storedUserId = localStorage.getItem('userId');
    //     if (storedUserId) {
    //         setUserId(storedUserId);
    //     } else {
    //         console.error('User ID not found.');
    //         // Optionally navigate to login or registration
    //     }
    // }, []);
    useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User ID not found.');
            // Optionally navigate to login or registration
        }
      
      const fetchUserProfile = async () => {
          try {
              const { data } = await axios.get(`http://127.0.0.1:5000/api/users/profile/${userId}`);
              setFormData({
                  workHistory: data.workHistory || [],
                  skills: data.skills || [],
                  preferences: data.preferences || [],
                  careerGoal: data.careerGoal || '',
                  workValue: data.workValue || '',
                  internationalStudent: data.internationalStudent ? 'yes' : 'no',
                  education: {
                      currentMajor: data.education?.currentMajor || '',
                      degree: data.education?.degree || '',
                      semester: data.education?.semester || '',
                      currentGPA: data.education?.currentGPA || '',
                      programStartDate: data.education?.programStartDate.split('T')[0] || '',
                      programEndDate: data.education?.programEndDate.split('T')[0] || '',
                      lookingForSummerInternship: data.education.lookingForSummerInternship ? 'yes' : 'no',
                      lookingForCoop: data.education.lookingForCoop ? 'yes' : 'no',
                      lookingForFullTimeJob: data.education.lookingForFullTimeJob ? 'yes' : 'no',                  },
              });
          } catch (error) {
              console.error('Error fetching user profile:', error);
          }
      };
      
      fetchUserProfile();
  }, [userId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEducationChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        education: { ...formData.education, [name]: value },
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Submitting to: http://127.0.0.1:5000/api/users/${userId}`); // Debug: Log the request URL
        if (!userId) {
            console.error('No user ID available for update.');
            return;
        }
        try {
            const response = await axios.put(`http://127.0.0.1:5000/api/users/${userId}`, formData);
            console.log('User profile updated:', response.data);
            navigate('/home')
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit} className="user-profile-form">
        <div className="form-group">
          <label htmlFor="workHistory">Work History:</label>
          <textarea
            id="workHistory"
            name="workHistory"
            value={formData.workHistory}
            onChange={handleChange}
            rows="4"
            cols="50"
            style = {{padding:'10px', width:'450px'}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="preferences">Preferences:</label>
          <input
            type="text"
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="careerGoal">Career Goal:</label>
          <input
            type="text"
            id="careerGoal"
            name="careerGoal"
            value={formData.careerGoal}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="workValue">Work Value:</label>
          <input
            type="text"
            id="workValue"
            name="workValue"
            value={formData.workValue}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>International Student:</label>
          <div>
            <label>
              <input
                type="radio"
                name="internationalStudent"
                value="yes"
                checked={formData.internationalStudent === 'yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="internationalStudent"
                value="no"
                checked={formData.internationalStudent === 'no'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="currentMajor">Current Major:</label>
          <input
            type="text"
            id="currentMajor"
            name="currentMajor"
            value={formData.education.currentMajor}
            onChange={handleEducationChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="degree">Degree:</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.education.degree}
            onChange={handleEducationChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <input
            type="text"
            id="semester"
            name="semester"
            value={formData.education.semester}
            onChange={handleEducationChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentGPA">Current GPA:</label>
          <input
            type="text"
            id="currentGPA"
            name="currentGPA"
            value={formData.education.currentGPA}
            onChange={handleEducationChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="programStartDate">Program Start Date:</label>
          <input
            type="date"
            id="programStartDate"
            name="programStartDate"
            value={formData.education.programStartDate}
            onChange={handleEducationChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="programEndDate">Program End Date:</label>
          <input
            type="date"
            id="programEndDate"
            name="programEndDate"
            value={formData.education.programEndDate}
            onChange={handleEducationChange}
          />
        </div>
        <div className="form-group">
          <label>Are you looking for summer internship?</label>
          <div>
            <label>
              <input
                type="radio"
                name="lookingForSummerInternship"
                value="yes"
                checked={formData.education.lookingForSummerInternship === 'yes'}
                onChange={handleEducationChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="lookingForSummerInternship"
                value="no"
                checked={formData.education.lookingForSummerInternship === 'no'}
                onChange={handleEducationChange}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Are you looking for coop?</label>
          <div>
            <label>
              <input
                type="radio"
                name="lookingForCoop"
                value="yes"
                checked={formData.education.lookingForCoop === 'yes'}
                onChange={handleEducationChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="lookingForCoop"
                value="no"
                checked={formData.education.lookingForCoop === 'no'}
                onChange={handleEducationChange}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Are you looking for full time job?</label>
          <div>
            <label>
              <input
                type="radio"
                name="lookingForFullTimeJob"
                value="yes"
                checked={formData.education.lookingForFullTimeJob === 'yes'}
                onChange={handleEducationChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="lookingForFullTimeJob"
                value="no"
                checked={formData.education.lookingForFullTimeJob === 'no'}
                onChange={handleEducationChange}
              />
              No
            </label>
          </div>
        </div>
        {/* Add more form fields as needed */}
        <button type="submit" className="submit-button">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
