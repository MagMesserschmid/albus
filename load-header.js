document.addEventListener('DOMContentLoaded', function() {
    // Determine the correct path to header.html based on current directory depth
    let headerPath = 'header.html';
    const pathParts = window.location.pathname.split('/').filter(p => p);
    
    // If we're in a subdirectory (e.g., /ueber-uns/), use ../header.html
    if (pathParts.length > 0) {
        headerPath = '../header.html';
    }
    
    // Load header from header.html
    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                // Update active link based on current page
                updateActiveNavLink();
            }
        })
        .catch(error => console.error('Error loading header:', error));
});

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}
