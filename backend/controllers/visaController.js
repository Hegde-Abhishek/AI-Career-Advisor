// controllers/visaController.js

const axios = require('axios');
const User = require('../models/User');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure you have this in your .env file

exports.getVisaAdvice = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    if (userProfile.internationalStudent) {
      // Construct the prompt for OpenAI
      const prompt = `Given the user's profile data: ${JSON.stringify(userProfile)}, provide personalized visa advice.`;

      const messages = [{
        role: "system",
        content: prompt
    }];
    
      // Set up the GPT-4 API call
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",  // Make sure to use the correct model available at the time
            messages: messages,
            max_tokens: 1000
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

      // Extract and send the advice as the response
      const advice = response.data.choices[0].message.content.trim();
      res.status(200).json({ advice });
    } else {
      res.status(200).json({ message: 'Not an international student' });
    }
  } catch (error) {
    console.error('Error generating visa advice:', error);
    res.status(500).json({ error: 'Error generating visa advice', details: error.message });
  }
};
