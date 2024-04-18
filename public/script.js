async function init(){
// Timer
let timerElement = document.getElementById('timer');
let totalTimeInSeconds = 15 * 60; // Start at 15 minutes
let timerInterval;
let timerStarted = false;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (totalTimeInSeconds > 0) {
        totalTimeInSeconds--;
        let minutes = Math.floor(totalTimeInSeconds / 60);
        let seconds = totalTimeInSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        clearInterval(timerInterval);
        // Timer has reached 0, you can add any necessary actions here
    }
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
    const userListOuterDiv = document.createElement('div');
    userListOuterDiv.classList.add('text-surface', 'dark:text-white')
    userList.forEach(user => {
        const userElementA = document.createElement('a');
        userElementA.classList.add('block', 'w-full', 'cursor-pointer', 'rounded-lg', 'bg-primary-100', 'p-4', 'text-primary-700', 'dark:bg-slate-900', 'dark:text-primary-500');
        userElementA.setAttribute('href', '#!');
        userElementA.setAttribute('aria-current', 'true');
        const userElement = document.createElement('div');
        userElementA.classList.add('flex', 'items-center', 'mb-2');
        const userElementImage = document.createElement('img');
        userElementImage.classList.add('w-8', 'h-8', 'rounded-full', 'mr-2');
        userElementImage.src = 'https://picsum.photos/50/50';
        userElementImage.alt = 'User Avatar';
        const userElementInnerDiv = document.createElement('div');
        userElementInnerDiv.classList.add('font-medium');
        userElementInnerDiv.textContent = user;
        userElement.appendChild(userElementImage);
        userElement.appendChild(userElementInnerDiv);
        userElementA.appendChild(userElement);
        userListOuterDiv.appendChild(userElementA);
    });
    userListContainer.appendChild(userListOuterDiv);
}

let userList = await getRoomParticipants();

    async function getRoomParticipants() {
        try {
            const response = await fetch('/rooms/1', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            const participantsIds = data.participants;
            if (!participantsIds) {
                console.log('No participants found or invalid data structure:', data);
                return;
            }

            const userList = await Promise.all(participantsIds.map(async (id) => {
                const response = await fetch(`/users/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const userData = await response.json();
                return userData.name;
            }));

            return userList;
        } catch (error) {
            console.error('Failed to fetch participants or user data:', error);
        }
    }


// Populate Chat Messages (Dummy Data)
let messages = await getMessages();

async function getMessages(){
    try {
        const response = await fetch('/rooms/1/messages', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        const messages = data.map(item => ({
            userId: item.userId,
            text: item.text
        }));
        return messages
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

    async function populateChatMessages() {
        messages = await getMessages();
        const chatMessagesContainer = document.querySelector('#chatMessages');
        chatMessagesContainer.innerHTML = '';
        const chatMessageOuterDiv = document.createElement('div');
        chatMessageOuterDiv.classList.add('px-4', 'py-2');
        chatMessagesContainer.appendChild(chatMessageOuterDiv);

        async function getUser(userId) {
            const response = await fetch(`/users/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const userData = await response.json();
            return { user_id: userData.user_id, name: userData.name, avatar: userData.profile_pic_path };
        }

        for (const chat of messages) {
            const user = await getUser(chat.userId);
            const chatMessageElement = document.createElement('div');
            chatMessageElement.classList.add('flex', 'items-center', 'mb-2', 'usermessage');

            const userAvatar = document.createElement('img');
            userAvatar.classList.add('w-8', 'h-8', 'rounded-full', 'mr-2');
            userAvatar.src = user.avatar;
            userAvatar.alt = 'User Avatar';

            const userName = document.createElement('div');
            userName.classList.add('font-medium');
            userName.textContent = user.name;

            const messageText = document.createElement('div');
            messageText.classList.add('bg-white', 'rounded-lg', 'p-2', 'shadow', 'mb-2', 'max-w-sm');
            messageText.textContent = chat.text;

            if (chat.userId === 2) { // Replace 'YourUsername' with the username of the current user
                // If the message is from the current user, display it on the left
                chatMessageElement.appendChild(messageText);
                chatMessageElement.appendChild(userAvatar);
                chatMessageElement.classList.add('flex', 'items-center', 'justify-end', 'usermessage');
                chatMessagesContainer.appendChild(chatMessageElement);
            } else {
                // If the message is from another user, display it on the right
                chatMessageElement.appendChild(userName);
                chatMessageElement.appendChild(userAvatar);
                chatMessagesContainer.appendChild(chatMessageElement);
                chatMessagesContainer.appendChild(messageText);
            }

            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }
    }


// Call functions to populate user list and chat messages
populateUserList();
populateChatMessages();

// Send Message
let messageInput = document.getElementById('messageInput');
let sendMessageButton = document.getElementById('sendMessage');

let chatMessagesContainer = document.getElementById('chatMessages');

async function sendMessage(userId, messageText){
    try {
        const response = await fetch('/rooms/1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId, messageText})
        });
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}


sendMessageButton.addEventListener('click', function() {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
    let message = { user: 2, message: messageInput.value }
    if (message !== '') {
        // Add message to chat
        sendMessage(message.user, message.message);
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
//startTimer();

}


init();