const axios = require('axios');
const User = require('../models/User');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

exports.generatePersonalizedTips = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Construct a detailed prompt using user data
        const prompt = createPromptWithUserData(user);
        
        const messages = [{
            role: "system",
            content: prompt
        }];

        const openAiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",  // Make sure to use the correct model available at the time
            messages: messages,
            max_tokens: 1000
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const responseText = openAiResponse.data.choices[0].message.content.trim();
        res.json({ response: responseText });
    } catch (error) {
        console.error('Error in chatWithUser:', error);
        res.status(500).json({ message: 'Error communicating with OpenAI', error: error.response?.data || error.message });
    }
};

// function createPromptWithUserData(user) {
//     const userProfileDetails = `The user is currently in their ${user.education.semester} semester, studying ${user.education.currentMajor} with a GPA of ${user.education.currentGPA}. Their skills include ${user.skills.join(', ')}, and they are interested in ${user.preferences.join(', ')}.`;
//     const prompt = `Given this user profile: ${userProfileDetails}, provide personalized career advice.`;
//     return prompt;
// }

function createPromptWithUserData(user) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    let opportunityType = '';
    let applicationTimeline = '';
    let preparationTimeline = '';
    let projectSuggestions = '';
    let networkingAdvice = '';
    // Define timelines and advice based on the type of job opportunity
    if (user.education.lookingForSummerInternship) {
        opportunityType = 'summer internship';
        applicationTimeline = 'Applications for summer internships typically start opening up to a year in advance, with peak hiring occurring between January and March.';
        preparationTimeline = 'If you are seeking an internship in the next summer season, you should be preparing now.';
        projectSuggestions = 'Consider working on software projects or contributing to open source to enhance your portfolio.';
        networkingAdvice = 'Begin networking immediately by connecting with professionals on LinkedIn and attending virtual career fairs this semester.';
    } else if (user.education.lookingForCoop) {
        opportunityType = 'co-op';
        applicationTimeline = 'Co-op positions often require application submission at least two semesters before the start date.';
        preparationTimeline = 'To prepare for a co-op, you should start researching companies and roles now.';
        projectSuggestions = 'Engage in projects that are relevant to the industries you are targeting for your co-op.';
        networkingAdvice = 'Reach out to your university’s co-op office and leverage alumni networks for opportunities.';
    } else if (user.education.lookingForFullTimeJob) {
        opportunityType = 'full-time position';
        applicationTimeline = 'Job applications for full-time positions should begin in the final year of your program, ideally two semesters before your graduation date.';
        preparationTimeline = 'With graduation approaching, ensure your resume and portfolio are up to date.';
        projectSuggestions = 'Work on capstone projects or internships that align with your desired job role.';
        networkingAdvice = 'Utilize LinkedIn to connect with industry leaders and join professional groups in your field.';
    }
 
    // Personalized profile string construction
    const userProfileDetails = `${user.name} is in the ${user.education.semester} of their ${user.education.degree} program, targeting a ${opportunityType}.`;
    // Full prompt construction with dynamic, personalized advice
    const prompt = `Today's date is ${currentMonth}/${currentYear}. ${userProfileDetails} Here's how to move forward: ${applicationTimeline} ${preparationTimeline} Projects you should focus on include: ${projectSuggestions} For networking: ${networkingAdvice}, give me personalized academic and career advise based on the data`;
    return prompt;
}
  

