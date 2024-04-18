
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
