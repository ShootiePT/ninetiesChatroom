function createRoom() {
    const roomId = document.getElementById('roomId').value;
    fetch('/rooms', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ roomId, maxParticipants: 10 }) // Example maxParticipants
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function joinRoom() {
    const roomId = document.getElementById('roomId').value;
    // Implement logic to handle joining a room
}

function sendMessage() {
    const roomId = document.getElementById('roomId').value;
    const message = document.getElementById('message').value;
    fetch(`/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayMessage(message);
    })
    .catch(error => console.error('Error:', error));
}

function displayMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const msgElement = document.createElement('div');
    msgElement.textContent = message;
    messagesContainer.appendChild(msgElement);
}