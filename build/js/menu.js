const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    
    mobileMenuToggle.addEventListener('click', function () {
        
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'false';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);

        mobileMenu.classList.toggle('hidden');
    });