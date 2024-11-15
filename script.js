// Variables to hold selected interests, role models, and interest scores
let selectedInterests = [];
let roleModels = [];
let interestScores = {}; // Store interest scores to simulate AI behavior

// Fetch role models data from JSON file
fetch('./assets/data/role_models.json')
    .then(response => response.json())
    .then(data => roleModels = data)
    .catch(error => console.error('Error loading data:', error));

function showInterestSelection() {
    document.getElementById('auth').classList.add('hidden');
    document.getElementById('interest-selection').classList.remove('hidden');
    loadInterests();
}

// Function to load and display interest options
function loadInterests() {
    const interests = ['Technology', 'Science', 'Education', 'Activism', 'Innovation', 'Human Rights'];
    const interestsContainer = document.getElementById('interests');
    interestsContainer.innerHTML = ''; // Clear previous interests
    interests.forEach(interest => {
        const button = document.createElement('button');
        button.textContent = interest;
        button.className = 'bg-gray-200 px-4 py-2 rounded';
        button.onclick = () => toggleInterest(interest, button);
        interestsContainer.appendChild(button);
    });
}

// Toggle interest selection
function toggleInterest(interest, button) {
    if (selectedInterests.includes(interest)) {
        selectedInterests = selectedInterests.filter(i => i !== interest);
        button.classList.remove('bg-blue-300');
    } else {
        selectedInterests.push(interest);
        button.classList.add('bg-blue-300');
        interestScores[interest] = (interestScores[interest] || 0) + 1;
    }
}

// Show the home page with daily affirmation and role models
function showHomePage() {
    document.getElementById('interest-selection').classList.add('hidden');
    document.getElementById('home-page').classList.remove('hidden');

    // Set a daily affirmation
    document.getElementById('affirmation').textContent = "Believe in yourself and all that you are.";

    // Display role models based on selected interests
    const resultsContainer = document.getElementById('role-models-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Calculate the top interests based on scores
    const topInterests = Object.keys(interestScores).sort((a, b) => interestScores[b] - interestScores[a]);

    // Filter role models based on top interests
    const filteredModels = roleModels.filter(model => 
        model.interests.some(interest => topInterests.includes(interest))
    );

   // Display filtered role models
filteredModels.forEach(model => {
    const modelCard = document.createElement('div');
    modelCard.className = 'bg-white bg-opacity-90 rounded-lg p-6 shadow-lg flex-shrink-0 w-64';

    modelCard.innerHTML = `
        <div class="w-full h-32 bg-gray-300 overflow-hidden mx-auto mb-4"> 
            <!-- Changed to rectangular image -->
            <img src="${model.image}" alt="${model.name}" class="w-full h-full object-cover">
        </div>
        <div class="text-center">
            <h4 class="text-xl font-semibold text-gray-800">${model.name}</h4>
            <p class="text-gray-600"><strong>Field:</strong> ${model.field}</p>
            <p class="text-gray-600"><strong>Achievements:</strong> ${model.achievements}</p>
            <blockquote class="italic mt-2 text-black">"${model.quote}"</blockquote>
            <!-- Changed the color of the quote text to black -->
        </div>
    `;

    resultsContainer.appendChild(modelCard);
});


    if (filteredModels.length === 0) {
        resultsContainer.innerHTML = "<p>No role models match your interests. Try selecting different interests.</p>";
    }
}
// Store the predefined questions and answers
const qaData = [
    {
        question: "What are role models?",
        answer: "Role models are individuals who inspire us with their values, actions, and achievements. They show us what's possible and guide us to be our best selves."
    },
    {
        question: "How can I find role models based on my interests?",
        answer: "You can select your interests, and we'll recommend role models who align with them. For example, if you're interested in technology, we’ll show you role models in that field."
    },
    {
        question: "What if I don't know which interest to choose?",
        answer: "No worries! You can select as many interests as you like, or choose based on what inspires you the most at the moment."
    },
    {
        question: "Can I find role models in different fields?",
        answer: "Yes! We offer role models from a variety of fields like technology, education, activism, leadership, and more. Just let us know what you're interested in!"
    },
    {
        question: "How do role models help in my personal development?",
        answer: "Role models provide guidance, motivation, and examples of how to overcome challenges. They show you the value of perseverance and inspire you to reach your goals."
    },
    {
        question: "What if I want to become a role model?",
        answer: "Becoming a role model is about leading by example. Focus on positive actions, stay true to your values, and inspire others through your achievements."
    },
    {
        question: "Can I get daily affirmations from the chatbot?",
        answer: "Absolutely! Every day, I'll send you a positive affirmation to inspire and uplift you. Today’s affirmation: 'Believe in yourself and all that you are.'"
    },
    {
        question: "What is the Role Model Finder?",
        answer: "The Role Model Finder is a platform designed to help you discover inspiring role models, empowering resources, upcoming events, and a supportive community."
    },
    {
        question: "How can I connect with role models directly?",
        answer: "We provide links to events, online communities, and mentorship programs where you can connect with your chosen role models."
    },
    {
        question: "What resources are available to help me?",
        answer: "We offer resources in various categories like education, tech, leadership, and activism to help you grow and achieve your goals."
    },
    {
        question: "How can I participate in events related to my interests?",
        answer: "You can browse our upcoming events section to find workshops, webinars, and conferences related to your areas of interest."
    },
    {
        question: "How do I choose my interests?",
        answer: "You can select your interests from a list of categories such as technology, education, human rights, and more. This helps us recommend the best role models for you."
    },
    {
        question: "Can I change my interests later?",
        answer: "Yes! You can update your interests at any time, and we’ll adjust the role model recommendations accordingly."
    },
    {
        question: "What types of events can I find here?",
        answer: "Our events include networking sessions, workshops, leadership summits, conferences, and more that align with your interests."
    },
    {
        question: "Are these events online or in-person?",
        answer: "We feature both online and in-person events. You can filter events by type or location to find what suits you best."
    },
    {
        question: "Can I attend events without being a member?",
        answer: "Many of our events are open to everyone! Some events may require registration, so be sure to check the details."
    },
    {
        question: "How do I get support from this platform?",
        answer: "We offer a range of support options including guidance through resources, access to support groups, and mentorship programs. We’re here for you!"
    },
    {
        question: "What is the daily affirmation?",
        answer: "Your daily affirmation is a positive message that encourages growth and confidence. It’s meant to keep you motivated and inspired throughout your day."
    },
    {
        question: "Who are the top recommended role models in technology?",
        answer: "We recommend role models like Ada Lovelace, Grace Hopper, and other pioneering figures in tech. Would you like to explore more?"
    },
    {
        question: "How do I join a support group?",
        answer: "You can browse our list of support groups and find one that aligns with your needs. Many groups offer free meetings and virtual discussions."
    },
    {
        question: "What types of leadership programs are available?",
        answer: "We feature various leadership development programs aimed at women, tech professionals, and social activists. These programs help build your leadership skills and expand your network."
    }
];

// Function to display the questions and answers in the chatbox
function askQuestion(index) {
    const qa = qaData[index];
    
    // Display the question
    displayMessage(qa.question, 'bot');

    // Provide an option for the user to request the answer
    const responseButton = document.createElement('button');
    responseButton.className = 'bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mt-4';
    responseButton.textContent = 'Show Answer';
    responseButton.onclick = function() {
        displayMessage(qa.answer, 'bot');
    };

    const chatbox = document.getElementById('chatbox');
    chatbox.appendChild(responseButton);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
}

// Function to initiate the chatbot with options
function startChat() {
    // Greet the user and provide options to choose from
    displayMessage("Hello! How can I assist you today? Here are some topics I can help you with:", 'bot');
    
    qaData.forEach((item, index) => {
        const button = document.createElement('button');
        button.className = 'bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2';
        button.textContent = item.question;
        button.onclick = function() {
            askQuestion(index);
        };
        document.getElementById('chatbox').appendChild(button);
    });
}

// Display the user's message in the chatbox
function displayMessage(message, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const messageText = document.createElement('p');
    messageText.className = sender === 'user' ? 'text-sm text-white' : 'text-sm text-gray-600';

    messageText.textContent = message;

    messageDiv.appendChild(messageText);
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
}

// Toggle the visibility of the chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('hidden'); // Show or hide the chatbot
}

// Initialize the chatbot when the page loads
window.onload = startChat;

