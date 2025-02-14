// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.status === 200) {
        window.location.href = '/dashboard'; // Redirect to dashboard after successful login
      } else {
        document.getElementById('errorMessage').innerText = result.error;
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
  
  // Register form submission
  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.status === 201) {
        document.getElementById('registerMessage').innerText = 'User registered successfully';
      } else {
        document.getElementById('registerMessage').innerText = result.error;
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
  