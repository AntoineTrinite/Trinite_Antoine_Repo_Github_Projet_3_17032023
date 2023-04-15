const errorMsg = document.getElementById('error-message');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const logInBtn = document.getElementById('log-in');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;

// Functions de validation email et mdp
function isEmailValid(email) {
  return emailRegex.test(email);
}
function isPasswordValid(password) {
  return passwordRegex.test(password);
}

function connexion(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Check email et password
  if (isEmailValid(email) && isPasswordValid(password)) {
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8' 
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then(response => response.json())
    .then(data => {

      //récupération du token
      token = data.token;
      console.log(token);
      //stockage du token dans un session storage
      sessionStorage.setItem('token',token);
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error:', error);
      errorMsg.style.display = 'block';
    });
  } else {
    errorMsg.style.display = 'block';
  }
}

logInBtn.addEventListener('click', connexion);