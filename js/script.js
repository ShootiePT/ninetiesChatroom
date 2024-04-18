
// Timer
/*let timerElement = document.getElementById('Date');
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
}*/
let dest = new Date("apr 25, 2024 10:00:00").getTime();
  let x = setInterval(function () {
    let now = new Date().getTime();
    let diff = dest - now;
    
    // Check if the countdown has reached zero or negative
    if (diff <= 0) {
        clearInterval(x); // Stop the countdown
        return; // Exit the function
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 15)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days < 10) {
      days = `0${days}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // Get elements by class name
    let countdownElements = document.getElementsByClassName("countdown-element");

    // Loop through the elements and update their content
    for (let i = 0; i < countdownElements.length; i++) {
      let className = countdownElements[i].classList[1]; // Get the second class name
      switch (className) {
        case "days":
          countdownElements[i].innerHTML = days;
          break;
        case "hours":
          countdownElements[i].innerHTML = hours;
          break;
        case "minutes":
          countdownElements[i].innerHTML = minutes;
          break;
        case "seconds":
          countdownElements[i].innerHTML = seconds;
          break;
        default:
          break;
      }
    }
  }, 1000);



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

 /*function populateChatMessages() {
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
} */

function populateChatMessages() {
    const chatMessagesContainer = document.querySelector('#chatMessages');
    chatMessagesContainer.innerHTML = '';

    messages.forEach(chat => {
        const chatMessageElement = document.createElement('div');
        chatMessageElement.classList.add('flex', 'items-center', 'mb-2', 'usermessage');

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

        if (chat.user === 'YourUsername') { // Replace 'YourUsername' with the username of the current user
            // If the message is from the current user, display it on the left
            chatMessageElement.appendChild(userAvatar);
            chatMessageElement.appendChild(userName);
            chatMessageElement.appendChild(messageText);
        } else {
            // If the message is from another user, display it on the right
            chatMessageElement.appendChild(messageText);
            chatMessageElement.appendChild(userName);
            chatMessageElement.appendChild(userAvatar);
            chatMessageElement.style.justifyContent = 'flex-end';
        }

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
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
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
//startTimer();
