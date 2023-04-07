const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// récupération des informations depuis le fichier JSON
fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8' 
  },
  body: {
    "email": "string",
    "password": "string"
  } // replace with your request body if applicable
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});


// curl -X 'POST' \
//   'http://localhost:5678/api/users/login' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "email": "string",
//   "password": "string"
// }'