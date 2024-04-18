
const button = document.getElementById('user-menu-button');
const menu = document.querySelector('#profile-dropdown > div:last-child');


function toggleMenu() {
    menu.classList.toggle('hidden');
}


button.addEventListener('click', toggleMenu);


document.addEventListener('click', function(event) {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickInsideButton = button.contains(event.target);
    if (!isClickInsideMenu && !isClickInsideButton) {
        menu.classList.add('hidden');
    }
});

const logoutBtn = document.getElementById('user-menu-item-2');
logoutBtn.addEventListener('click', function (event) {
    event.preventDefault();
    fetch('/users/logout', {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Logout failed');
        })
        .then(data => {
            console.log('Logged out successfully:', data.message);
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
});

const homeBtn = document.getElementById('home');
homeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '/index.html';
});

const debateBtn = document.getElementById('debate');
debateBtn.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '/debateroom.html';
});

const leaderboardBtn = document.getElementById('leaderboard');
leaderboardBtn.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '/leaderboard.html';
});
