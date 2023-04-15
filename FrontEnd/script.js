const gallery = document.querySelector('.gallery')
const btnGroup = document.querySelector('#category-group');
let data = null
const logoutBtn = document.getElementById('log');
const projects = document.getElementById('projects');
// récupération des informations depuis le fichier JSON
fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then(response => {
    data = response
    updateDom();
})
.catch(error => {
    console.error(error);
});


function updateDom() {
   //affichage de l'image et des titres
   data.forEach(function(works) {
    const fig = document.createElement('figure')
    const titre = document.createElement('figcaption')
    const img = document.createElement('img')

    // récupération de l'image, du titre et des catégories.
    const imageURL = works.imageUrl;
    img.src = imageURL;
    titre.innerText = works.title;
    let category = works.category.name;

    // ajout du code à l'HTML
    fig.appendChild(img);
    fig.appendChild(titre);
    gallery.appendChild(fig);

    works.fig = fig;
});
// Tableau set
const setOfCategories = new Set();

// création du bouton "tous"
const tousBtn = document.createElement('button');
    tousBtn.innerText = "Tous";
    tousBtn.classList.add('category-btn');
    tousBtn.classList.add('tous-btn');
    btnGroup.appendChild(tousBtn);

// première itération pour ajouter les catégories uniques
data.forEach(function(works) {
    setOfCategories.add(works.category.name);
});
// deuxième itération pour créer les boutons des catégories
setOfCategories.forEach(function(category) {
    let btn = document.createElement('button');
    btn.innerText = category;
    btn.classList.add('category-btn');
    btnGroup.appendChild(btn);
});

    const buttons = document.querySelectorAll('.category-btn');
    let tousButton = buttons[0];
    tousButton.classList.add('btn-active');

    //création de la boucle pour actualiser les boutons et le contenu
    buttons.forEach(function(buttonCat) {
        buttonCat.addEventListener('click', () => {
            let category = buttonCat.textContent;
    
            data.forEach(function(works) {
                let work = works.category.name;
                if (work === category || category === 'Tous') {
                    works.fig.style.display = 'block';
                } else {
                    works.fig.style.display = 'none';
                }
            });
    
            // ajout de classe pour les boutons
            buttons.forEach(function(btn) {
                btn.classList.remove('btn-active');
            });
            buttonCat.classList.add('btn-active');
        });
    });
};

// Récupération du token de connexion
const token = sessionStorage.getItem('token');
console.log(token)

// Option de déconnexion
if (token) {
    logoutBtn.innerText = 'Logout';
} else {
    logoutBtn.innerText = 'Login'
}
logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
})

//création du bouton modifier pour la fenêtre modale
const modifyBtn = document.createElement("button");
    modifyBtn.textContent = 'modifier';
    modifyBtn.style.backgroundColor = 'transparent';
    modifyBtn.style.border = 'none';
    modifyBtn.style.color = 'black';
    modifyBtn.style.fontSize = '14px';
const modifyIcon = document.createElement("i");
    modifyIcon.className = "fa-regular fa-pen-to-square";
    modifyIcon.style.fontSize = '14px';
    modifyIcon.style.color = 'black';
    modifyIcon.style.paddingLeft = '31px';

    modifyIcon.appendChild(modifyBtn);
    projects.appendChild(modifyIcon);

modifyBtn.addEventListener('click', (event) => {
    
  });