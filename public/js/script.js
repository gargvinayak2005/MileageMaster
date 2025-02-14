document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        const data = await response.json();
        
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            document.getElementById("errorMessage").textContent = data.error;
            document.getElementById("errorMessage").style.display = 'block';
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            document.getElementById("registerMessage").textContent = 'Registration successful! Please login.';
            document.getElementById("registerMessage").style.display = 'block';
            showLogin();
        } else {
            const error = await response.json();
            document.getElementById("registerMessage").textContent = error.error;
            document.getElementById("registerMessage").style.display = 'block';
        }
    } catch (error) {
        console.error('Registration failed:', error);
    }
});

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}
// Handle mobile menu toggle
const mobileMenu = () => {
    const nav = document.querySelector('.navbar ul');
    nav.classList.toggle('mobile-visible');
}

// Add hamburger menu for mobile
const addMobileMenu = () => {
    const header = document.querySelector('.header-container');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.onclick = mobileMenu;
    header.insertBefore(hamburger, header.firstChild);
}

// Run on page load
window.addEventListener('DOMContentLoaded', addMobileMenu);