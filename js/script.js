

// Timer
let timerElement = document.getElementById('timer');
let totalTimeInSeconds = 0;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let minutes = Math.floor(totalTimeInSeconds / 60);
    let seconds = totalTimeInSeconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    totalTimeInSeconds++;
}

// Dark/Light Mode Toggle
let modeToggle = document.getElementById('modeToggle');
let darkMode = false;

modeToggle.addEventListener('click', function() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.add('dark');
        modeToggle.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark');
        modeToggle.textContent = 'Dark Mode';
    }
});

// Populate User List (Dummy Data)
function populateUserList() {
    const userListContainer = document.querySelector('.user-list');
    userListContainer.innerHTML = '';
    userList.forEach(user => {
        const userElement = document.createElement('div');
        userElement.textContent = user;
        userListContainer.appendChild(userElement);
    });
}

let userList = [
    { user: 'User 1', message: 'Hello everyone!' },
    { user: 'User 2', message: 'Hi there!' },
    { user: 'User 3', message: 'Good to see you all.' }
];

// Populate Chat Messages (Dummy Data)
let chatMessages = document.getElementById('chatMessages');
let messages = [
   
];

messages.forEach(message => {
    let messageDiv = document.createElement('div');
    messageDiv.textContent = `${message.user}: ${message.message}`;
    chatMessages.appendChild(messageDiv);
});

 function populateChatMessages() {
    const chatMessagesContainer = document.querySelector('#chatMessages');
    chatMessagesContainer.innerHTML = '';
    messages.forEach(chat => {
        const chatMessageElement = document.createElement('div');
        chatMessageElement.classList.add('flex', 'items-center', 'mb-2');
        const userAvatar = document.createElement('img');
        userAvatar.classList.add('w-8', 'h-8', 'rounded-full', 'mr-2');
        userAvatar.src = 'https://picsum.photos/50/50';
        userAvatar.alt = 'User Avatar';
        const userName = document.createElement('div');
        userName.classList.add('font-medium');
        userName.textContent = chat.user;
        const messageText = document.createElement('div');
        messageText.classList.add('bg-white', 'rounded-lg', 'p-2', 'shadow', 'mb-2', 'max-w-sm');
        messageText.textContent = chat.message;
        chatMessageElement.appendChild(userAvatar);
        chatMessageElement.appendChild(userName);
        chatMessageElement.appendChild(messageText);
        chatMessagesContainer.appendChild(chatMessageElement);
    });
} 

// Call functions to populate user list and chat messages
populateUserList();
populateChatMessages();

// Send Message
let messageInput = document.getElementById('messageInput');
let sendMessageButton = document.getElementById('sendMessage');

let chatMessagesContainer = document.getElementById('chatMessages');

sendMessageButton.addEventListener('click', function() {
    let message = { user: 'User 1', message: messageInput.value }
    if (message !== '') {
        // Add message to chat
        messages.push(message);
        console.log(messages);
        populateChatMessages();
        // Clear input field
        messageInput.value = '';
    }
});

function appendMessage(user, message) {
    let messageDiv = document.createElement('div');
    messageDiv.textContent = `${user}: ${message}`;
    console.log("something");
    chatMessagesContainer.appendChild(messageDiv);
    // Automatically scroll to the bottom of the chat messages container
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// Start Timer
startTimer();
