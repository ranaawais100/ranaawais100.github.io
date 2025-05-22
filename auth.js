document.addEventListener('DOMContentLoaded', function() {
    // Check if already authenticated
    if (localStorage.getItem('isAuthenticated') && window.location.pathname.includes('admin.html')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // In a real app, you would verify credentials with a server
        // For this demo, we'll use hardcoded credentials
        if (username === 'admin' && password === 'admin123') {
            // Successful login
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'dashboard.html';
        } else {
            // Failed login
            document.getElementById('login-error').textContent = 'Invalid username or password';
        }
    });
});